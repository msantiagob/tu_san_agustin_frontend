import { useState, useRef } from 'react';
import { Plus, Trash2, Star, Upload, Link as LinkIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/auth';

interface VenueImage {
  id?: number;
  url: string;
  titulo: string;
  es_portada: boolean;
  orden: number;
}

interface VenueImagesManagerProps {
  venueId: number | null;
  images: VenueImage[];
  onImagesChange: () => void;
}

export default function VenueImagesManager({
  venueId,
  images,
  onImagesChange,
}: VenueImagesManagerProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validar cantidad
    if (files.length > 10) {
      alert('Máximo 10 imágenes a la vez');
      return;
    }

    // Validar cada archivo
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of files) {
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        continue;
      }

      // Validar tamaño (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} es muy grande. Máximo 10MB por imagen`);
        continue;
      }

      validFiles.push(file);

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === validFiles.length) {
          setPreviewUrls(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    }

    setSelectedFiles(validFiles);
  };

  const handleUploadFiles = async () => {
    if (!venueId || selectedFiles.length === 0) {
      alert('Por favor selecciona al menos una imagen');
      return;
    }

    setLoading(true);
    try {
      // 1. Subir archivos al servidor
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      const uploadResponse = await fetch(`${API_BASE_URL}/upload/images?optimize=true`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al subir las imágenes');
      }

      const uploadData = await uploadResponse.json();

      // 2. Asociar cada imagen con el venue
      let successCount = 0;
      let currentOrder = images.length + 1;

      for (const result of uploadData.results) {
        if (result.success) {
          const response = await fetch(`${API_BASE_URL}/venues/${venueId}/images`, {
            method: 'POST',
            headers: authService.getAuthHeaders(),
            body: JSON.stringify({
              url: result.url,
              titulo: result.original_filename,
              es_portada: images.length === 0 && successCount === 0,
              orden: currentOrder++,
            }),
          });

          if (response.ok) {
            successCount++;
          }
        }
      }

      // Limpiar y actualizar
      setSelectedFiles([]);
      setPreviewUrls([]);
      setNewImageTitle('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (successCount > 0) {
        alert(`${successCount} imagen(es) subida(s) correctamente`);
        onImagesChange();
      }

      if (uploadData.failed > 0) {
        alert(`${uploadData.failed} imagen(es) fallaron al subir`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error al subir las imágenes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageFromUrl = async () => {
    if (!venueId || !newImageUrl) {
      alert('Por favor ingresa una URL válida');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/venues/${venueId}/images`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({
          url: newImageUrl,
          titulo: newImageTitle || 'Sin título',
          es_portada: images.length === 0,
          orden: images.length + 1,
        }),
      });

      if (response.ok) {
        setNewImageUrl('');
        setNewImageTitle('');
        onImagesChange();
      } else if (response.status === 401) {
        alert('Sesión expirada');
        window.location.reload();
      } else {
        alert('Error al agregar imagen');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Error al agregar imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!venueId || !confirm('¿Eliminar esta imagen?')) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/venues/${venueId}/images/${imageId}`,
        {
          method: 'DELETE',
          headers: authService.getAuthHeaders(),
        }
      );

      if (response.ok) {
        onImagesChange();
      } else {
        alert('Error al eliminar imagen');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error al eliminar imagen');
    }
  };

  const handleSetCover = async (imageId: number) => {
    if (!venueId) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/venues/${venueId}/images/${imageId}`,
        {
          method: 'PUT',
          headers: authService.getAuthHeaders(),
          body: JSON.stringify({ es_portada: true }),
        }
      );

      if (response.ok) {
        onImagesChange();
      } else {
        alert('Error al establecer imagen de portada');
      }
    } catch (error) {
      console.error('Error setting cover:', error);
      alert('Error al establecer imagen de portada');
    }
  };

  const clearFileSelection = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  if (!venueId) {
    return (
      <div className="bg-muted/50 border border-dashed rounded-lg p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Guarda el lugar primero para poder agregar imágenes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-3">Imágenes del Lugar</h4>

        {/* Selector de modo */}
        <div className="flex gap-2 mb-4">
          <Button
            type="button"
            variant={uploadMode === 'file' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('file')}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir Archivo
          </Button>
          <Button
            type="button"
            variant={uploadMode === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setUploadMode('url')}
            className="flex-1"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Desde URL
          </Button>
        </div>

        {/* Formulario de subida de archivo */}
        {uploadMode === 'file' && (
          <div className="border rounded-lg p-4 mb-4 space-y-3">
            <div>
              <Label htmlFor="fileUpload" className="text-xs">
                Seleccionar imágenes (máx. 10)
              </Label>
              <Input
                id="fileUpload"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WEBP, GIF (máx. 10MB cada una). Las imágenes serán optimizadas automáticamente.
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">
                  {selectedFiles.length} imagen(es) seleccionada(s)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {selectedFiles[index].name.length > 20
                          ? selectedFiles[index].name.substring(0, 20) + '...'
                          : selectedFiles[index].name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="button"
              onClick={handleUploadFiles}
              disabled={loading || selectedFiles.length === 0}
              size="sm"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {loading
                ? 'Subiendo...'
                : `Subir ${selectedFiles.length > 0 ? selectedFiles.length : ''} Imagen${selectedFiles.length !== 1 ? 'es' : ''}`}
            </Button>
          </div>
        )}

        {/* Formulario de URL */}
        {uploadMode === 'url' && (
          <div className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="imageUrl" className="text-xs">
                  URL de la imagen
                </Label>
                <Input
                  id="imageUrl"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="imageTitle" className="text-xs">
                  Título (opcional)
                </Label>
                <Input
                  id="imageTitle"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="Ej: Salón Principal"
                  className="text-sm"
                />
              </div>
            </div>
            <Button
              type="button"
              onClick={handleAddImageFromUrl}
              disabled={loading || !newImageUrl}
              size="sm"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Imagen
            </Button>
          </div>
        )}

        {/* Images grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id || image.url}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.titulo}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{image.titulo}</p>
                  {image.es_portada && (
                    <p className="text-xs text-yellow-600 font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Portada
                    </p>
                  )}
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {!image.es_portada && image.id && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-7 w-7 p-0"
                      onClick={() => handleSetCover(image.id!)}
                      title="Establecer como portada"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  )}
                  {image.id && (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="h-7 w-7 p-0"
                      onClick={() => handleDeleteImage(image.id!)}
                      title="Eliminar"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No hay imágenes. {uploadMode === 'file' ? 'Sube tus' : 'Agrega las'} primeras imágenes arriba.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
