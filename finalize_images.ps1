$path = "c:\Users\LENOVO\Desktop\homev3\src\assets\images"
Get-ChildItem -Path $path | ForEach-Object {
    $oldName = $_.Name
    # Basic normalization
    $newName = $oldName.ToLower() -replace ' ', '-'
    
    # Replace common Spanish characters manually to be safe with encoding
    $newName = $newName -replace 'á', 'a' -replace 'é', 'e' -replace 'í', 'i' -replace 'ó', 'o' -replace 'ú', 'u' -replace 'ñ', 'n'
    $newName = $newName -replace 'à', 'a' -replace 'è', 'e' -replace 'ì', 'i' -replace 'ò', 'o' -replace 'ù', 'u'
    $newName = $newName -replace 'â', 'a' -replace 'ê', 'e' -replace 'î', 'i' -replace 'ô', 'o' -replace 'û', 'u'
    $newName = $newName -replace 'ã', 'a' -replace 'õ', 'o'
    
    # Remove parentheses and other special chars
    $newName = $newName -replace '\(', '' -replace '\)', '' -replace '\[', '' -replace '\]', ''
    $newName = $newName -replace '_', '-'
    
    # Remove duplicate dashes
    while ($newName -like "*-*-*") { $newName = $newName -replace '--', '-' }
    $newName = $newName -replace '--', '-'
    
    # Cleanup trailing/leading dashes before extension
    $newName = $newName -replace '-\.', '.'
    
    if ($oldName -ne $newName) {
        Write-Host "Renaming '$oldName' to '$newName'"
        try {
            Rename-Item -Path $_.FullName -NewName $newName -ErrorAction Stop
        } catch {
            Write-Host "Failed to rename '$oldName': $($_.Exception.Message)"
        }
    }
}
