/* empty css                        */
import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderScript, b as renderTemplate, A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as IncompatibleDescriptorOptions, d as UnsupportedImageConversion, t as toStyleString, N as NoImageMetadata, F as FailedToFetchRemoteImageDimensions, e as ExpectedImageOptions, f as ExpectedNotESMImage, g as InvalidImageService, h as ImageMissingAlt, i as addAttribute, s as spreadAttributes, j as ExperimentalFontsNotEnabled, k as FontFamilyNotFound, u as unescapeHTML, l as renderComponent, n as renderHead, o as renderSlot } from './astro/server.BpeNOtHH.js';
import 'piccolore';
import 'clsx';
import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { isRemoteAllowed } from '@astrojs/internal-helpers/remote';
import * as mime from 'mrmime';
import '../renderers.mjs';

const $$Astro$9 = createAstro("https://www.tusanagustin.com");
const $$ScrollToTop = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ScrollToTop;
  return renderTemplate`${maybeRenderHead()}<button id="scroll-to-top" class="fixed bottom-6 right-6 z-[100] p-4 bg-[#333638] text-white rounded-full shadow-2xl border-2 border-white/20 transform translate-y-20 opacity-0 transition-all duration-500 hover:scale-110 active:scale-95 group cursor-pointer" aria-label="Ir al inicio" data-astro-cid-hnzwq3ap> <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4EAC9F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" data-astro-cid-hnzwq3ap></div> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="relative z-10" data-astro-cid-hnzwq3ap> <path d="m18 15-6-6-6 6" data-astro-cid-hnzwq3ap></path> </svg> </button> ${renderScript($$result, "E:/homev3/src/components/ui/ScrollToTop.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/ui/ScrollToTop.astro", void 0);

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size then image width is the max size,
    // otherwise it's the width of the screen
    case "constrained":
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case "fixed":
      return `${width}px`;
    // Image is always the width of the screen
    case "full-width":
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  if (typeof src === "object" && "then" in src) {
    const resource = await src;
    return resource.default ?? resource;
  }
  return src;
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const sortNumeric = (a, b) => a - b;
function verifyOptions(options) {
  if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        JSON.stringify(options.src),
        typeof options.src,
        JSON.stringify(options, (_, v) => v === void 0 ? null : v)
      )
    });
  }
  if (!isESMImportedImage(options.src)) {
    if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
      throw new AstroError({
        ...LocalImageUsedWrongly,
        message: LocalImageUsedWrongly.message(options.src)
      });
    }
    let missingDimension;
    if (!options.width && !options.height) {
      missingDimension = "both";
    } else if (!options.width && options.height) {
      missingDimension = "width";
    } else if (options.width && !options.height) {
      missingDimension = "height";
    }
    if (missingDimension) {
      throw new AstroError({
        ...MissingImageDimension,
        message: MissingImageDimension.message(missingDimension, options.src)
      });
    }
  } else {
    if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
      throw new AstroError({
        ...UnsupportedImageFormat,
        message: UnsupportedImageFormat.message(
          options.src.format,
          options.src.src,
          VALID_SUPPORTED_FORMATS
        )
      });
    }
    if (options.widths && options.densities) {
      throw new AstroError(IncompatibleDescriptorOptions);
    }
    if (options.src.format === "svg" && options.format !== "svg" || options.src.format !== "svg" && options.format === "svg") {
      throw new AstroError(UnsupportedImageConversion);
    }
  }
}
const baseService = {
  validateOptions(options) {
    if (isESMImportedImage(options.src) && options.src.format === "svg") {
      options.format = "svg";
    }
    verifyOptions(options);
    if (!options.format) {
      options.format = DEFAULT_OUTPUT_FORMAT;
    }
    if (options.width) options.width = Math.round(options.width);
    if (options.height) options.height = Math.round(options.height);
    if (options.layout && options.width && options.height) {
      options.fit ??= "cover";
      delete options.layout;
    }
    if (options.fit === "none") {
      delete options.fit;
    }
    return options;
  },
  getHTMLAttributes(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const {
      src,
      width,
      height,
      format,
      quality,
      densities,
      widths,
      formats,
      layout,
      priority,
      fit,
      position,
      ...attributes
    } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getSrcSet(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const aspectRatio = targetWidth / targetHeight;
    const { widths, densities } = options;
    const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
    let transformedWidths = (widths ?? []).sort(sortNumeric);
    let imageWidth = options.width;
    let maxWidth = Infinity;
    if (isESMImportedImage(options.src)) {
      imageWidth = options.src.width;
      maxWidth = imageWidth;
      if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
        transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
        transformedWidths.push(maxWidth);
      }
    }
    transformedWidths = Array.from(new Set(transformedWidths));
    const {
      width: transformWidth,
      height: transformHeight,
      ...transformWithoutDimensions
    } = options;
    let allWidths = [];
    if (densities) {
      const densityValues = densities.map((density) => {
        if (typeof density === "number") {
          return density;
        } else {
          return parseFloat(density);
        }
      });
      const densityWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density));
      allWidths = densityWidths.map((width, index) => ({
        width,
        descriptor: `${densityValues[index]}x`
      }));
    } else if (transformedWidths.length > 0) {
      allWidths = transformedWidths.map((width) => ({
        width,
        descriptor: `${width}w`
      }));
    }
    return allWidths.map(({ width, descriptor }) => {
      const height = Math.round(width / aspectRatio);
      const transform = { ...transformWithoutDimensions, width, height };
      return {
        transform,
        descriptor,
        attributes: {
          type: `image/${targetFormat}`
        }
      };
    });
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format",
      fit: "fit",
      position: "position"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/.", imageConfig.endpoint.route);
    let url = `${imageEndpoint}?${searchParams}`;
    if (imageConfig.assetQueryParams) {
      const assetQueryString = imageConfig.assetQueryParams.toString();
      if (assetQueryString) {
        url += "&" + assetQueryString;
      }
    }
    return url;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q"),
      fit: params.get("fit"),
      position: params.get("position") ?? void 0
    };
    return transform;
  }
};
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const cssFitValues = ["fill", "contain", "cover", "scale-down"];
function addCSSVarsToStyle(vars, styles) {
  const cssVars = Object.entries(vars).filter(([_, value]) => value !== void 0 && value !== false).map(([key, value]) => `--${key}: ${value};`).join(" ");
  if (!styles) {
    return cssVars;
  }
  const style = typeof styles === "string" ? styles : toStyleString(styles);
  return `${cssVars} ${style}`;
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  avis: "avif",
  // avif-sequence
  mif1: "heif",
  msf1: "heif",
  // heif-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected || "avis" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(i);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  let result;
  try {
    result = lookup(data);
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  if (!result.height || !result.width || !result.type) {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  const { width, height, type, orientation } = result;
  const isPortrait = (orientation || 0) >= 5;
  return {
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

async function inferRemoteSize(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

const PLACEHOLDER_BASE = "astro://placeholder";
function createPlaceholderURL(pathOrUrl) {
  return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
function stringifyPlaceholderURL(url) {
  return url.href.replace(PLACEHOLDER_BASE, "");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './sharp.BeSFP6Bt.js'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  if (options.inferSize && isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
    const result = await inferRemoteSize(resolvedOptions.src);
    resolvedOptions.width ??= result.width;
    resolvedOptions.height ??= result.height;
    originalWidth = result.width;
    originalHeight = result.height;
    delete resolvedOptions.inferSize;
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.layout ?? "none";
  if (resolvedOptions.priority) {
    resolvedOptions.loading ??= "eager";
    resolvedOptions.decoding ??= "sync";
    resolvedOptions.fetchpriority ??= "high";
    delete resolvedOptions.priority;
  } else {
    resolvedOptions.loading ??= "lazy";
    resolvedOptions.decoding ??= "async";
    resolvedOptions.fetchpriority ??= "auto";
  }
  if (layout !== "none") {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    delete resolvedOptions.densities;
    resolvedOptions.style = addCSSVarsToStyle(
      {
        fit: cssFitValues.includes(resolvedOptions.fit ?? "") && resolvedOptions.fit,
        pos: resolvedOptions.position
      },
      resolvedOptions.style
    );
    resolvedOptions["data-astro-image"] = layout;
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  } else if (imageConfig.assetQueryParams) {
    const imageURLObj = createPlaceholderURL(imageURL);
    imageConfig.assetQueryParams.forEach((value, key) => {
      imageURLObj.searchParams.set(key, value);
    });
    imageURL = stringifyPlaceholderURL(imageURLObj);
    srcSets = srcSets.map((srcSet) => {
      const urlObj = createPlaceholderURL(srcSet.url);
      imageConfig.assetQueryParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value);
      });
      return {
        ...srcSet,
        url: stringifyPlaceholderURL(urlObj)
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$8 = createAstro("https://www.tusanagustin.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  if (layout !== "none") {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "E:/homev3/node_modules/astro/components/Image.astro", void 0);

const $$Astro$7 = createAstro("https://www.tusanagustin.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  const useResponsive = layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = {
    ...imgAdditionalAttributes,
    ...fallbackImage.attributes
  };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "E:/homev3/node_modules/astro/components/Picture.astro", void 0);

const fontsMod = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

function filterPreloads(data, preload) {
  if (!preload) {
    return null;
  }
  if (preload === true) {
    return data;
  }
  return data.filter(
    ({ weight, style, subset }) => preload.some((p) => {
      if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) {
        return false;
      }
      if (p.style !== void 0 && p.style !== style) {
        return false;
      }
      if (p.subset !== void 0 && p.subset !== subset) {
        return false;
      }
      return true;
    })
  );
}
function checkWeight(input, target) {
  const trimmedInput = input.trim();
  if (trimmedInput.includes(" ")) {
    return trimmedInput === target;
  }
  if (target.includes(" ")) {
    const [a, b] = target.split(" ");
    const parsedInput = Number.parseInt(input);
    return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
  }
  return input === target;
}

const $$Astro$6 = createAstro("https://www.tusanagustin.com");
const $$Font = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Font;
  const { internalConsumableMap } = fontsMod;
  if (!internalConsumableMap) {
    throw new AstroError(ExperimentalFontsNotEnabled);
  }
  const { cssVariable, preload = false } = Astro2.props;
  const data = internalConsumableMap.get(cssVariable);
  if (!data) {
    throw new AstroError({
      ...FontFamilyNotFound,
      message: FontFamilyNotFound.message(cssVariable)
    });
  }
  const filteredPreloadData = filterPreloads(data.preloadData, preload);
  return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "E:/homev3/node_modules/astro/components/Font.astro", void 0);

const assetQueryParams = undefined;
							const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[],"responsiveStyles":false};
							Object.defineProperty(imageConfig, 'assetQueryParams', {
								value: assetQueryParams,
								enumerable: false,
								configurable: true,
							});
							const getImage = async (options) => await getImage$1(options, imageConfig);

const logoVerde = new Proxy({"src":"/_astro/logo-verde.rX9kckO8.webp","width":300,"height":156,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/logo-verde.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/logo-verde.webp");
							return target[name];
						}
					});

const $$SearchModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="search-modal" class="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300 flex items-center justify-center px-4"> <!-- Modal Content --> <div class="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-6 md:p-8 transform scale-95 transition-transform duration-300 relative overflow-hidden"> <!-- Close Button --> <button id="close-search" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 z-10" aria-label="Cerrar búsqueda"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg> </button> <div class="flex flex-col items-center text-center"> <!-- Logo --> ${renderComponent($$result, "Image", $$Image, { "src": logoVerde, "alt": "San Agust\xEDn Logo", "class": "h-12 md:h-16 w-auto mb-6 object-contain", "width": 150, "height": 78, "loading": "lazy" })} <h2 class="text-xl md:text-2xl font-bold text-[#2D3748] mb-4" style="font-family: 'Poppins', sans-serif;">
¿Qué estás buscando?
</h2> <!-- Search Form --> <form id="search-form" class="w-full relative group"> <input type="text" id="search-input" placeholder="Escribe aquí tu búsqueda..." class="w-full bg-gray-100 border-2 border-transparent focus:border-[#4EAC9F] focus:bg-white text-gray-800 px-6 py-3.5 rounded-2xl outline-none transition-all text-base placeholder:text-gray-400 font-normal" style="font-family: 'Poppins', sans-serif;"> <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 bg-[#333638] text-white p-2.5 rounded-xl hover:bg-[#4EAC9F] transition-all shadow-lg active:scale-95"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> </button> </form> <p class="mt-6 text-gray-400 text-sm font-light italic" style="font-family: 'Poppins', sans-serif;">
Presiona Enter para buscar lo mejor para tu próximo evento
</p> </div> <!-- Decorative background elements --> <div class="absolute -top-24 -left-24 w-48 h-48 bg-[#4EAC9F]/5 rounded-full blur-3xl"></div> <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D1C1A3]/10 rounded-full blur-3xl"></div> </div> </div> ${renderScript($$result, "E:/homev3/src/components/ui/SearchModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/ui/SearchModal.astro", void 0);

const imgBodasUnique = new Proxy({"src":"/_astro/fotografia.B-cJhZIU.webp","width":4096,"height":2730,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/fotografia.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/fotografia.webp");
							return target[name];
						}
					});

const $$Astro$5 = createAstro("https://www.tusanagustin.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const optimizedLCP = await getImage({ src: imgBodasUnique, width: 800, quality: 80, format: "webp" });
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${`inicio | ${title}`}</title><meta name="description" content="Somos Tu San Agustín, una empresa especializada en realizar los mejores eventos sociales, empresariales y de ciudad. Ofrecemos asesoría en planeación, organización, logística, alimentación y decoración."><!-- Preload Critical Fonts --><link rel="preload" href="./Alice-Regular.ttf" as="font" type="font/ttf" crossorigin><link rel="preload" href="./Poppins-Regular_0.ttf" as="font" type="font/ttf" crossorigin><!-- Preload LCP Image -->${title === "Home" && renderTemplate`<link rel="preload" as="image"${addAttribute(optimizedLCP.src, "href")} fetchpriority="high">`}<!-- Open Graph / SEO --><meta property="og:title"${addAttribute(`inicio | ${title}`, "content")}><meta property="og:type" content="website"><meta property="og:url" content="https://www.tusanagustin.com"><meta property="og:image" content="https://www.tusanagustin.com/assets/media/logo-header-new_extraLargeThumb.webp"><meta property="og:description" content="Especialistas en la planeación y organización de eventos sociales y empresariales en Antioquia."><meta property="og:site_name" content="Tu San Agustín"><meta property="og:locale" content="es_LA"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(`inicio | ${title}`, "content")}><meta name="twitter:description" content="Especialistas en la planeación y organización de eventos sociales y empresariales en Antioquia."><link rel="shortcut icon" href="https://www.tusanagustin.com/assets/media/logo-header-new_extraLargeThumb.webp"><link rel="canonical" href="https://www.tusanagustin.com">${renderHead()}</head> <body class="min-h-screen font-sans antialiased"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "ScrollToTop", $$ScrollToTop, {})} ${renderComponent($$result, "SearchModal", $$SearchModal, {})} </body></html>`;
}, "E:/homev3/src/layouts/Layout.astro", void 0);

const imgBoda = new Proxy({"src":"/_astro/banner-boda.BJKlMFFq.webp","width":1913,"height":1275,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/banner-boda.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/banner-boda.webp");
							return target[name];
						}
					});

const imgQuince = new Proxy({"src":"/_astro/quince.sTfLMUcZ.webp","width":4096,"height":2725,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/quince.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/quince.webp");
							return target[name];
						}
					});

const imgGastronomia = new Proxy({"src":"/_astro/gastronomia.IHidJ6eT.webp","width":4096,"height":2747,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/gastronomia.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/gastronomia.webp");
							return target[name];
						}
					});

const imgLugares = new Proxy({"src":"/_astro/lugares-para-eventos.CH8axdc6.webp","width":3891,"height":2997,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/lugares-para-eventos.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/lugares-para-eventos.webp");
							return target[name];
						}
					});

const imgBodas = new Proxy({"src":"/_astro/bodas.-g_K3uU9.webp","width":4096,"height":2731,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/bodas.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/bodas.webp");
							return target[name];
						}
					});

const $$Banner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="w-[calc(100%-8px)]  md:w-[calc(100%-16px)] max-w-[2000px] h-[650px] md:h-[800px] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mx-auto" data-astro-cid-kggsjsm4> <div class="swiper mySwiper w-full h-full" data-astro-cid-kggsjsm4> <div class="swiper-wrapper" data-astro-cid-kggsjsm4> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgBoda, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Boda", "loading": "eager", "fetchpriority": "high", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/30" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-3xl md:text-5xl lg:text-6xl font-medium text-white drop-shadow-lg leading-tight" data-astro-cid-kggsjsm4>
Momentos para toda la vida
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto " data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgQuince, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Catering", "loading": "lazy", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "decoding": "async", "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/40" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-4xl md:text-7xl text-white drop-shadow-lg" data-astro-cid-kggsjsm4>
Fiesta de quince años
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto" data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> <!-- Gastronomía --> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgGastronomia, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Gastronom\xEDa", "loading": "lazy", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "decoding": "async", "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/40" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-4xl md:text-7xl text-white drop-shadow-lg" data-astro-cid-kggsjsm4>
Gastronomía
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto" data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> <!-- Lugares para eventos --> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgLugares, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Lugares para eventos", "loading": "lazy", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "decoding": "async", "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/40" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-4xl md:text-7xl text-white drop-shadow-lg" data-astro-cid-kggsjsm4>
Lugares para eventos
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto" data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> <!-- Fotografía --> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgBodasUnique, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Fotograf\xEDa", "loading": "lazy", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "decoding": "async", "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/40" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-4xl md:text-7xl text-white drop-shadow-lg" data-astro-cid-kggsjsm4>
Fotografía
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto" data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> <!-- Bodas --> <div class="swiper-slide relative" data-astro-cid-kggsjsm4> ${renderComponent($$result, "Image", $$Image, { "src": imgBodas, "class": "absolute inset-0 w-full h-full object-cover", "style": "object-position: center 15%;", "alt": "Bodas", "loading": "lazy", "width": 1600, "height": 900, "widths": [480, 768, 1024, 1280, 1600], "quality": 70, "decoding": "async", "data-astro-cid-kggsjsm4": true })} <div class="absolute inset-0 bg-black/40" data-astro-cid-kggsjsm4></div> <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24 md:pb-20" data-astro-cid-kggsjsm4> <h1 class="text-4xl md:text-7xl text-white drop-shadow-lg" data-astro-cid-kggsjsm4>
Bodas
</h1> <br data-astro-cid-kggsjsm4> <a href="https://wa.me/573168753305?text=Hola!" class="action-btn w-full md:w-auto" data-astro-cid-kggsjsm4>
Agenda una asesoría
</a> </div> </div> </div> <!-- Navigation Arrows --> <div class="swiper-button-prev-banner absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white cursor-pointer transition-all hover:scale-110" data-astro-cid-kggsjsm4> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kggsjsm4><path d="m15 18-6-6 6-6" data-astro-cid-kggsjsm4></path></svg> </div> <div class="swiper-button-next-banner absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white cursor-pointer transition-all hover:scale-110" data-astro-cid-kggsjsm4> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kggsjsm4><path d="m9 18 6-6-6-6" data-astro-cid-kggsjsm4></path></svg> </div> </div> <div class="absolute bottom-0 left-0 right-0 z-30 w-full px-4 py-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-5" data-astro-cid-kggsjsm4> <div class="hidden md:flex flex-1 justify-start gap-6 pb-3" data-astro-cid-kggsjsm4> <a href="https://www.tusanagustin.com/" class="nav-text-link" data-astro-cid-kggsjsm4>Inicio</a> <a href="https://www.tusanagustin.com/eventos" class="nav-text-link" data-astro-cid-kggsjsm4>Eventos</a> <a href="https://www.tusanagustin.com/servicios" class="nav-text-link" data-astro-cid-kggsjsm4>Servicios</a> </div> <div class="w-full md:w-auto flex justify-center shrink-0" data-astro-cid-kggsjsm4> <button data-open-search class="action-btn w-auto min-w-[200px]" data-astro-cid-kggsjsm4>
Busca por categoría
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-2 opacity-70" data-astro-cid-kggsjsm4> <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" data-astro-cid-kggsjsm4></path> </svg> </button> </div> <div class="hidden md:flex flex-1 justify-end gap-6 pb-3" data-astro-cid-kggsjsm4> <a href="https://www.tusanagustin.com/blog" class="nav-text-link" data-astro-cid-kggsjsm4>Blog</a> <a href="https://www.tusanagustin.com/quienes-somos" class="nav-text-link" data-astro-cid-kggsjsm4>Nosotros</a> <a href="https://www.tusanagustin.com/contacto" class="nav-text-link" data-astro-cid-kggsjsm4>Contacto</a> </div> </div> </div>   ${renderScript($$result, "E:/homev3/src/components/Banner.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/Banner.astro", void 0);

const imgLaura = new Proxy({"src":"/_astro/productora-de-eventos-laura.Ca6ANUbJ.webp","width":2730,"height":4096,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/productora-de-eventos-laura.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/productora-de-eventos-laura.webp");
							return target[name];
						}
					});

const imgAdriana = new Proxy({"src":"/_astro/planner-adriana.Dj6Mlhvb.webp","width":2730,"height":4096,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/planner-adriana.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/planner-adriana.webp");
							return target[name];
						}
					});

const imgCamilo = new Proxy({"src":"/_astro/planner-camilo.CMkUCBxC.webp","width":800,"height":1200,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/planner-camilo.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/planner-camilo.webp");
							return target[name];
						}
					});

const $$Carousel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-16 bg-[#FCF4E7] overflow-hidden min-h-[700px] flex flex-col items-center justify-center gap-8" data-astro-cid-wfe7xcno> <div class="container mx-auto px-4 text-center" data-astro-cid-wfe7xcno> <div class="mb-12" data-astro-cid-wfe7xcno> <h2 class="text-5xl md:text-6xl font-bold italic tracking-tight leading-tight mb-2" data-astro-cid-wfe7xcno> <span style="color: #333638;" data-astro-cid-wfe7xcno>Equipo</span> <span style="color: #4EAC9F;" data-astro-cid-wfe7xcno>San Agustín</span> </h2> <p class="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto" data-astro-cid-wfe7xcno>
Las mentes que convierten ideas en experiencias
</p> </div> <div class="carousel-wrapper" data-astro-cid-wfe7xcno> <button class="nav-arrow left-2 md:-left-16 carousel-prev" aria-label="Previous" data-astro-cid-wfe7xcno> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6" data-astro-cid-wfe7xcno> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-astro-cid-wfe7xcno></path> </svg> </button> <!-- Only one container needed, content will be swapped via JS --> <div class="carousel-container" data-astro-cid-wfe7xcno> <!-- 5 Cards structure --> ${Array.from({ length: 5 }).map((_, i) => renderTemplate`<div${addAttribute(`card pos-${i + 1}`, "class")}${addAttribute(i, "data-index")} data-astro-cid-wfe7xcno> <img src=""${addAttribute(`Card ${i + 1}`, "alt")} loading="lazy" data-astro-cid-wfe7xcno> <div class="card-overlay" data-astro-cid-wfe7xcno> <h4 class="card-title text-white text-lg" data-astro-cid-wfe7xcno></h4> <p class="card-desc text-gray-200 text-xs mt-1 mb-3" data-astro-cid-wfe7xcno></p> </div> </div>`)} </div> <button class="nav-arrow right-2 md:-right-16 carousel-next" aria-label="Next" data-astro-cid-wfe7xcno> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6" data-astro-cid-wfe7xcno> <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-astro-cid-wfe7xcno></path> </svg> </button> </div> <!-- CATEGORY TABS --> <div class="flex justify-center gap-6 mt-12 bg-white px-8 py-3 rounded-full shadow-lg inline-flex mx-auto border border-gray-100" data-astro-cid-wfe7xcno> <button id="btn-momentos" class="category-btn active flex items-center gap-2 text-sm uppercase tracking-wider text-brandGreen transition-all" data-astro-cid-wfe7xcno> <span data-astro-cid-wfe7xcno>Planners</span> </button> <div class="w-px h-6 bg-gray-300" data-astro-cid-wfe7xcno></div> <button id="btn-opiniones" class="category-btn flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400 hover:text-gray-600 transition-all" data-astro-cid-wfe7xcno> <span data-astro-cid-wfe7xcno>Nuestros Expertos</span> </button> </div> </div> </section> <!-- Pass image sources to JS via data attributes --> <div id="carousel-data"${addAttribute(imgLaura.src, "data-img-laura")}${addAttribute(imgAdriana.src, "data-img-adriana")}${addAttribute(imgCamilo.src, "data-img-camilo")} hidden data-astro-cid-wfe7xcno></div>  ${renderScript($$result, "E:/homev3/src/components/Carousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/Carousel.astro", void 0);

const $$Astro$4 = createAstro("https://www.tusanagustin.com");
const $$ServiceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ServiceCard;
  const {
    title,
    description,
    image,
    variant = "default",
    url = "#",
    width = 450,
    height = 450,
    loading = "lazy",
    fetchpriority = "auto"
  } = Astro2.props;
  const isAsset = typeof image !== "string";
  return renderTemplate`${maybeRenderHead()}<div class="swiper-slide group cursor-grab active:cursor-grabbing pb-12 text-center"> <div class="relative w-full h-80 md:h-64 mb-6"> ${isAsset ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": image, "alt": title, "width": width, "height": height, "loading": loading, "fetchpriority": fetchpriority, "class": "w-full h-full object-cover rounded-[32px] shadow-md pointer-events-none select-none", "widths": [400, 600, 800], "quality": 70 })}` : renderTemplate`<img${addAttribute(image, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover rounded-[32px] shadow-md pointer-events-none select-none"${addAttribute(loading, "loading")}${addAttribute(fetchpriority, "fetchpriority")}${addAttribute(width, "width")}${addAttribute(height, "height")}>`} <a${addAttribute(url, "href")} class="absolute -bottom-4 -right-4 bg-[#333638] text-white w-14 h-14 rounded-full flex items-center justify-center border-[6px] border-[#FDF5E9] transition-transform group-hover:scale-110 z-20"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg> </a> </div> <div class="px-4"> <h3 class="text-xl font-bold text-[#4EAC9F] mb-2" style="font-family: 'Poppins', sans-serif;"> ${title} </h3> ${description && renderTemplate`<p class="text-[#333638] text-sm leading-relaxed" style="font-family: 'Poppins', sans-serif;">${description}</p>`} </div> </div>`;
}, "E:/homev3/src/components/ui/ServiceCard.astro", void 0);

const imgCelebraciones = new Proxy({"src":"/_astro/home-18.B8n6DDNK.png","width":2450,"height":1636,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-18.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-18.png");
							return target[name];
						}
					});

const imgPlanner = new Proxy({"src":"/_astro/home-01.DBByVLQ7.webp","width":405,"height":372,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-01.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-01.webp");
							return target[name];
						}
					});

const $$Astro$3 = createAstro("https://www.tusanagustin.com");
const $$Intro = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Intro;
  return renderTemplate`${maybeRenderHead()}<div class="w-full max-w-7xl relative mx-auto px-4 md:px-16 py-10" data-astro-cid-u43ozx4m> <button class="swiper-prev-custom absolute left-0 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" aria-label="Anterior" data-astro-cid-u43ozx4m> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-u43ozx4m><path d="m15 18-6-6 6-6" data-astro-cid-u43ozx4m></path></svg> </button> <button class="swiper-next-custom absolute right-0 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" aria-label="Siguiente" data-astro-cid-u43ozx4m> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-u43ozx4m><path d="m9 18 6-6-6-6" data-astro-cid-u43ozx4m></path></svg> </button> <div class="swiper mySwiperIntro !p-6" data-astro-cid-u43ozx4m> <div class="swiper-wrapper" data-astro-cid-u43ozx4m>  <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Fiestas de 15 a\xF1os", "image": imgQuince, "url": "https://www.tusanagustin.com/servicios/15-anos", "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div> <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Celebraciones", "image": imgCelebraciones, "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div> <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Event & wedding planner", "image": imgPlanner, "url": "https://www.tusanagustin.com/servicios/event-planner", "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div>  <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Fiestas de 15 a\xF1os", "image": imgQuince, "url": "https://www.tusanagustin.com/servicios/15-anos", "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div> <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Celebraciones", "image": imgCelebraciones, "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div> <div class="swiper-slide pb-12" data-astro-cid-u43ozx4m> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Event & wedding planner", "image": imgPlanner, "url": "https://www.tusanagustin.com/servicios/event-planner", "width": 500, "height": 700, "data-astro-cid-u43ozx4m": true })} </div> </div> </div> <!-- CTA Button --> <div class="flex justify-center mt-8" data-astro-cid-u43ozx4m> <button class="bg-[#333638] text-white px-12 py-3 rounded-full text-lg italic font-light tracking-wide hover:bg-opacity-90 transition-all shadow-lg" data-astro-cid-u43ozx4m>
Ver más
</button> </div> </div>  ${renderScript($$result, "E:/homev3/src/components/Intro.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/Intro.astro", void 0);

const flagColombia = new Proxy({"src":"/_astro/colombia.gIt7YGB2.webp","width":32,"height":32,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/colombia.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/colombia.webp");
							return target[name];
						}
					});

const iconFb = new Proxy({"src":"/_astro/icon-facebook.CNx_4F6E.webp","width":16,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-facebook.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-facebook.webp");
							return target[name];
						}
					});

const iconIg = new Proxy({"src":"/_astro/icon-instagram.4PG4E0eW.webp","width":28,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-instagram.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-instagram.webp");
							return target[name];
						}
					});

const iconTk = new Proxy({"src":"/_astro/icon-tiktok.CZSxukdW.webp","width":25,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-tiktok.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-tiktok.webp");
							return target[name];
						}
					});

const iconLi = new Proxy({"src":"/_astro/icon-linkedin.BvcjmOse.webp","width":30,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-linkedin.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-linkedin.webp");
							return target[name];
						}
					});

const iconYt = new Proxy({"src":"/_astro/icon-youtube.B6-jNeU3.webp","width":40,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-youtube.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-youtube.webp");
							return target[name];
						}
					});

const iconWa = new Proxy({"src":"/_astro/icon-whatsapp.BF58-iwv.webp","width":28,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-whatsapp.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-whatsapp.webp");
							return target[name];
						}
					});

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none transition-opacity duration-300" data-astro-cid-ssfzsv2f></div> <aside id="sidebar" class="fixed top-0 right-0 h-full w-[85%] max-w-md bg-[#FDF5E9] z-50 transform translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl flex flex-col" data-astro-cid-ssfzsv2f> <!-- Header with Close Button --> <div class="flex items-center justify-between p-6 border-b border-gray-100" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": logoVerde, "alt": "San Agust\xEDn Logo", "class": "h-10 w-auto object-contain", "width": 150, "height": 78, "loading": "lazy", "data-astro-cid-ssfzsv2f": true })} <button id="close-sidebar" class="p-2 rounded-full hover:bg-gray-100 transition-colors group" aria-label="Cerrar menú" data-astro-cid-ssfzsv2f> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-[#4EAC9F] transition-colors" data-astro-cid-ssfzsv2f><path d="M18 6 6 18" data-astro-cid-ssfzsv2f></path><path d="m6 6 12 12" data-astro-cid-ssfzsv2f></path></svg> </button> </div> <!-- Scrollable Content --> <div class="flex-1 overflow-y-auto py-8 px-8 space-y-10" data-astro-cid-ssfzsv2f> <!-- Navigation Links --> <nav class="flex flex-col space-y-6" data-astro-cid-ssfzsv2f> <a href="https://www.tusanagustin.com/" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Inicio</a> <a href="https://www.tusanagustin.com/servicios" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Eventos</a> <a href="https://www.tusanagustin.com/servicios" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Servicios</a> <a href="https://www.tusanagustin.com/blog" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Blog</a> <a href="https://www.tusanagustin.com/quienes-somos" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Nosotros</a> <a href="https://www.tusanagustin.com/contacto" class="text-3xl font-serif text-[#333638] hover:text-[#4EAC9F] hover:pl-4 transition-all duration-300 cursor-pointer" data-astro-cid-ssfzsv2f>Contacto</a> </nav> <hr class="border-gray-100" data-astro-cid-ssfzsv2f> <!-- Language Selector --> <div class="space-y-4" data-astro-cid-ssfzsv2f> <p class="text-sm uppercase tracking-widest text-gray-400 font-medium" data-astro-cid-ssfzsv2f>Idioma</p> <div class="flex items-center gap-4" data-astro-cid-ssfzsv2f> <button class="lang-btn active group flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 hover:border-[#4EAC9F] transition-all bg-white shadow-sm" data-lang="es" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": flagColombia, "alt": "Colombia", "class": "w-6 h-6 object-cover rounded-full shadow-sm", "width": 24, "height": 24, "loading": "lazy", "data-astro-cid-ssfzsv2f": true })} <span class="text-sm font-medium text-gray-600 group-hover:text-[#4EAC9F]" data-astro-cid-ssfzsv2f>Español</span> </button> <button class="lang-btn group flex items-center gap-3 px-4 py-2 rounded-full border border-transparent hover:bg-white hover:shadow-sm hover:border-gray-200 transition-all opacity-50 hover:opacity-100" data-lang="en" data-astro-cid-ssfzsv2f> <!-- USA Flag SVG since local image might not exist, ensuring visual consistency --> <div class="w-6 h-6 rounded-full overflow-hidden shadow-sm relative" data-astro-cid-ssfzsv2f> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="w-full h-full object-cover" data-astro-cid-ssfzsv2f> <path fill="#bd3d44" d="M0 0h640v480H0" data-astro-cid-ssfzsv2f></path> <path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" data-astro-cid-ssfzsv2f></path> <path fill="#192f5d" d="M0 0h364.8v258.5H0" data-astro-cid-ssfzsv2f></path> </svg> </div> <span class="text-sm font-medium text-gray-600 group-hover:text-[#4EAC9F]" data-astro-cid-ssfzsv2f>English</span> </button> </div> </div> <!-- Social Media --> <div class="space-y-4" data-astro-cid-ssfzsv2f> <p class="text-sm uppercase tracking-widest text-gray-400 font-medium" data-astro-cid-ssfzsv2f>Síguenos</p> <div class="flex gap-4 flex-wrap" data-astro-cid-ssfzsv2f> <a href="https://www.facebook.com/tusanagustineventos/" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconFb, "alt": "Facebook", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> <a href="https://www.instagram.com/tusanagustin/" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconIg, "alt": "Instagram", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> <a href="https://www.tiktok.com/@tusanagustin" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconTk, "alt": "TikTok", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> <a href="https://www.linkedin.com/company/tusanagustin/" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconLi, "alt": "LinkedIn", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> <a href="https://www.youtube.com/@tusanagustin" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconYt, "alt": "YouTube", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> <a href="https://wa.me/573168753305?text=Hola!" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#4EAC9F] hover:bg-[#4EAC9F] hover:text-white transition-all shadow-sm" data-astro-cid-ssfzsv2f> ${renderComponent($$result, "Image", $$Image, { "src": iconWa, "alt": "WhatsApp", "class": "h-5 w-5 object-contain", "width": 20, "height": 20, "data-astro-cid-ssfzsv2f": true })} </a> </div> </div> </div> </aside> ${renderScript($$result, "E:/homev3/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/Sidebar.astro", void 0);

const iconPh = new Proxy({"src":"/_astro/icon-phone.Ca6qjAqC.webp","width":39,"height":40,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-phone.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-phone.webp");
							return target[name];
						}
					});

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="w-full bg-[#FDF5E9] border-b border-gray-100 py-2 sm:py-3 relative z-30 font-['Poppins']" data-astro-cid-5blmo7yk> <div class="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between" data-astro-cid-5blmo7yk> <!-- Left Section: Language & Socials (Hidden on mobile) --> <div class="hidden md:flex items-center gap-4 sm:gap-6 flex-1 justify-start" data-astro-cid-5blmo7yk> <!-- Language Toggle Desktop --> <button id="lang-toggle-desktop" class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group relative" aria-label="Cambiar idioma" data-astro-cid-5blmo7yk> <div class="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all" data-astro-cid-5blmo7yk> <!-- Colombia Flag (Default) --> ${renderComponent($$result, "Image", $$Image, { "id": "flag-col", "src": flagColombia, "alt": "Colombia", "class": "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100", "width": 28, "height": 28, "loading": "eager", "data-astro-cid-5blmo7yk": true })} <!-- USA Flag (Hidden by default) --> <div id="flag-usa" class="absolute inset-0 w-full h-full bg-white transition-opacity duration-300 opacity-0" data-astro-cid-5blmo7yk> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="w-full h-full object-cover" data-astro-cid-5blmo7yk> <path fill="#bd3d44" d="M0 0h640v480H0" data-astro-cid-5blmo7yk></path> <path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" data-astro-cid-5blmo7yk></path> <path fill="#192f5d" d="M0 0h364.8v258.5H0" data-astro-cid-5blmo7yk></path> </svg> </div> </div> <span id="lang-text" class="text-gray-800 text-sm font-medium w-6" data-astro-cid-5blmo7yk>ES</span> </button> <div class="h-4 w-px bg-gray-300" data-astro-cid-5blmo7yk></div> <div class="flex items-center gap-3" data-astro-cid-5blmo7yk> <a href="https://www.facebook.com/tusanagustineventos/" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconFb, "alt": "Facebook", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> <a href="https://www.instagram.com/tusanagustin/" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconIg, "alt": "Instagram", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> <a href="https://www.tiktok.com/@tusanagustin" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconTk, "alt": "TikTok", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> <a href="https://www.linkedin.com/company/tusanagustin/" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconLi, "alt": "LinkedIn", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> <a href="https://www.youtube.com/@tusanagustin" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconYt, "alt": "YouTube", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> <a href="https://wa.me/573168753305?text=Hola!" class="hover:scale-110 transition-transform" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconWa, "alt": "WhatsApp", "class": "h-4 w-4 object-contain text-[#4EAC9F]", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> </div> </div> <!-- Center: Logo (Absolute centered on mobile to handle the hamburger) --> <div class="flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 md:flex md:justify-center" data-astro-cid-5blmo7yk> ${renderComponent($$result, "Image", $$Image, { "src": logoVerde, "alt": "San Agust\xEDn Logo", "class": "h-10 sm:h-12 md:h-14 w-auto object-contain", "width": 150, "height": 78, "loading": "eager", "data-astro-cid-5blmo7yk": true })} </div> <!-- Right Section: Contact & Menu --> <div class="flex items-center gap-2 md:gap-4 flex-1 justify-end" data-astro-cid-5blmo7yk> <!-- Contact (Hidden mobile) --> <div class="hidden md:flex items-center gap-2 md:gap-4 mr-4" data-astro-cid-5blmo7yk> <div class="bg-[#e0f2fe] p-1.5 rounded-full hover:scale-110 transition-transform" data-astro-cid-5blmo7yk> <a href="https://wa.me/573168753305?text=Hola!" data-astro-cid-5blmo7yk>${renderComponent($$result, "Image", $$Image, { "src": iconPh, "alt": "Phone", "class": "h-4 w-4 object-contain", "width": 16, "height": 16, "loading": "eager", "data-astro-cid-5blmo7yk": true })}</a> </div> <a href="https://wa.me/573168753305?text=Hola!" class="flex flex-row items-center gap-2 hover:opacity-80 transition-opacity" data-astro-cid-5blmo7yk> <span class="text-gray-800 text-sm md:text-lg font-medium whitespace-nowrap font-['Poppins']" data-astro-cid-5blmo7yk>(+57) 316 875 33 05</span> <span class="text-xs text-[#4EAC9F] font-semibold uppercase tracking-wider shrink-0 font-['Poppins']" data-astro-cid-5blmo7yk>Llámanos</span> </a> </div> <!-- Search Button --> <button data-open-search class="p-2 rounded-full hover:bg-gray-100 transition-colors group" aria-label="Buscar" data-astro-cid-5blmo7yk> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 group-hover:text-[#4EAC9F] transition-colors" data-astro-cid-5blmo7yk><circle cx="11" cy="11" r="8" data-astro-cid-5blmo7yk></circle><path d="m21 21-4.3-4.3" data-astro-cid-5blmo7yk></path></svg> </button> <!-- Hamburger Button (Mobile Only) --> <button id="menu-toggle" class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors group" aria-label="Abrir menú" data-astro-cid-5blmo7yk> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 group-hover:text-[#4EAC9F] transition-colors" data-astro-cid-5blmo7yk><line x1="3" x2="21" y1="6" y2="6" data-astro-cid-5blmo7yk></line><line x1="3" x2="21" y1="12" y2="12" data-astro-cid-5blmo7yk></line><line x1="3" x2="21" y1="18" y2="18" data-astro-cid-5blmo7yk></line></svg> </button> </div> </div> </nav> ${renderComponent($$result, "Sidebar", $$Sidebar, { "data-astro-cid-5blmo7yk": true })} ${renderScript($$result, "E:/homev3/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/Navbar.astro", void 0);

const imgQuinceUnique = new Proxy({"src":"/_astro/fiesta-quince.CExThHdI.webp","width":4096,"height":2730,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/fiesta-quince.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/fiesta-quince.webp");
							return target[name];
						}
					});

const imgEmpresarialesUnique = new Proxy({"src":"/_astro/0j8a0641.BD5pyb-M.webp","width":3696,"height":2463,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/0j8a0641.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/0j8a0641.webp");
							return target[name];
						}
					});

const $$EventosUnicos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[#FDF5E9 ] py-8 md:py-16" data-astro-cid-3lcc7tqz> <div class="max-w-7xl mx-auto px-4 md:px-16" data-astro-cid-3lcc7tqz> <h2 class="text-4xl md:text-7xl text-center mb-12" data-astro-cid-3lcc7tqz> <span class="text-[#4EAC9F]" data-astro-cid-3lcc7tqz>Eventos</span> <span class="text-[#2D3748]" data-astro-cid-3lcc7tqz>Únicos</span> </h2> <div class="relative w-full group" data-astro-cid-3lcc7tqz> <button class="swiper-prev-events absolute left-0 md:-left-14 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" data-astro-cid-3lcc7tqz> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3lcc7tqz><path d="m15 18-6-6 6-6" data-astro-cid-3lcc7tqz></path></svg> </button> <button class="swiper-next-events absolute right-0 md:-right-14 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" data-astro-cid-3lcc7tqz> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3lcc7tqz><path d="m9 18 6-6-6-6" data-astro-cid-3lcc7tqz></path></svg> </button> <div class="swiper mySwiperEvents !p-6" data-astro-cid-3lcc7tqz> <div class="swiper-wrapper" data-astro-cid-3lcc7tqz> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Bodas", "image": imgBodasUnique, "url": "https://www.tusanagustin.com/servicios/bodas", "loading": "eager", "fetchpriority": "high", "data-astro-cid-3lcc7tqz": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "15 a\xF1os", "image": imgQuinceUnique, "url": "https://www.tusanagustin.com/servicios/15-anos", "data-astro-cid-3lcc7tqz": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Eventos empresariales", "image": imgEmpresarialesUnique, "url": "https://www.tusanagustin.com/servicios/eventos-empresariales", "data-astro-cid-3lcc7tqz": true })}  ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Bodas", "image": imgBodasUnique, "url": "https://www.tusanagustin.com/servicios/bodas", "data-astro-cid-3lcc7tqz": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "15 a\xF1os", "image": imgQuinceUnique, "url": "https://www.tusanagustin.com/servicios/15-anos", "data-astro-cid-3lcc7tqz": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Eventos empresariales", "image": imgEmpresarialesUnique, "url": "https://www.tusanagustin.com/servicios/eventos-empresariales", "data-astro-cid-3lcc7tqz": true })} </div> </div> </div> </div> <div class="w-full border-t border-b border-gray-300 mt-6" data-astro-cid-3lcc7tqz> <div class="max-w-7xl mx-auto grid grid-cols-3 text-center text-sm md:text-base text-gray-500 font-alice opciones" data-astro-cid-3lcc7tqz> <a href="https://www.tusanagustin.com/servicios" class="py-1 hover:text-[#4EAC9F] cursor-pointer" data-astro-cid-3lcc7tqz>Eventos sociales</a> <a href="https://www.tusanagustin.com/servicios/eventos-empresariales" class="py-1 hover:text-[#4EAC9F] cursor-pointer" data-astro-cid-3lcc7tqz>Eventos empresariales</a> <a href="https://www.tusanagustin.com/servicios/turismo" class="py-1 hover:text-[#4EAC9F] cursor-pointer" data-astro-cid-3lcc7tqz>Servicios institucionales</a> </div> </div> </div>  ${renderScript($$result, "E:/homev3/src/components/EventosUnicos.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/EventosUnicos.astro", void 0);

const imgDecoracion = new Proxy({"src":"/_astro/decoracion-img.--PYTF9P.webp","width":991,"height":662,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/decoracion-img.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/decoracion-img.webp");
							return target[name];
						}
					});

const imgGastronomiaThumb = new Proxy({"src":"/_astro/home-54.Dgykf1Wx.webp","width":957,"height":782,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-54.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-54.webp");
							return target[name];
						}
					});

const $$ServiciosDestacados = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[#FDF5E9 ] py-8 md:py-16 relative" data-astro-cid-glr2sywo> <div class="max-w-7xl mx-auto px-4 md:px-16" data-astro-cid-glr2sywo> <!-- Main Title --> <h2 class="text-4xl md:text-7xl text-start mb-12 leading-none" data-astro-cid-glr2sywo> <span class="text-[#4EAC9F] block" data-astro-cid-glr2sywo>Servicios</span> <span class="text-[#2D3748] block" data-astro-cid-glr2sywo>Destacados</span> </h2> <div class="relative w-full group" data-astro-cid-glr2sywo> <!-- Navigation Arrows --> <button class="swiper-prev-servicios absolute left-0 md:-left-12 top-[22%] md:top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center hover:scale-110 transition-all text-gray-600 cursor-pointer" data-astro-cid-glr2sywo> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-glr2sywo><path d="m15 18-6-6 6-6" data-astro-cid-glr2sywo></path></svg> </button> <button class="swiper-next-servicios absolute right-0 md:-right-12 top-[22%] md:top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center hover:scale-110 transition-all text-gray-600 cursor-pointer" data-astro-cid-glr2sywo> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-glr2sywo><path d="m9 18 6-6-6-6" data-astro-cid-glr2sywo></path></svg> </button> <!-- Carousel --> <div class="swiper mySwiperServicios" data-astro-cid-glr2sywo> <div class="swiper-wrapper" data-astro-cid-glr2sywo> <!-- Slide 1: Decoración --> <div class="swiper-slide" data-astro-cid-glr2sywo> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center" data-astro-cid-glr2sywo> <div class="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]" data-astro-cid-glr2sywo> ${renderComponent($$result, "Image", $$Image, { "src": imgDecoracion, "alt": "Decoraci\xF3n", "class": "w-full h-full object-cover", "width": 800, "height": 600, "loading": "lazy", "widths": [400, 600, 800], "quality": 70, "data-astro-cid-glr2sywo": true })} </div> <div class="flex flex-col items-start text-left space-y-6" data-astro-cid-glr2sywo> <h3 class="text-[#4EAC9F] text-2xl md:text-3xl font-medium" data-astro-cid-glr2sywo>Decoración</h3> <p class="text-gray-600 text-base md:text-lg leading-relaxed border-l-2 border-gray-300 pl-4" data-astro-cid-glr2sywo>
Cada evento es una oportunidad para expresar las necesidades, gustos y sentimientos de nuestros clientes a través de cada detalle, cada maravilloso espacio decorado fina y hermosamente para que vivas experiencias llenas de magia, alegría y diversión.
</p> <a href="https://www.tusanagustin.com/servicios/decoracion/" class="bg-[#333638] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-sm font-medium tracking-wide inline-block" data-astro-cid-glr2sywo>
Ver más
</a> </div> </div> </div> <!-- Slide 2: Gastronomía --> <div class="swiper-slide" data-astro-cid-glr2sywo> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center" data-astro-cid-glr2sywo> <div class="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/3]" data-astro-cid-glr2sywo> ${renderComponent($$result, "Image", $$Image, { "src": imgGastronomiaThumb, "alt": "Gastronom\xEDa", "class": "w-full h-full object-cover", "width": 800, "height": 600, "loading": "lazy", "widths": [400, 600, 800], "quality": 70, "data-astro-cid-glr2sywo": true })} </div> <div class="flex flex-col items-start text-left space-y-6" data-astro-cid-glr2sywo> <h3 class="text-[#4EAC9F] text-2xl md:text-3xl font-medium" data-astro-cid-glr2sywo>Gastronomía</h3> <p class="text-gray-600 text-base md:text-lg leading-relaxed border-l-2 border-gray-300 pl-4" data-astro-cid-glr2sywo>
Somos una empresa líder en el sector gastronómico y Catering de Medellín. Desde nuestra fundación hemos llevado la bandera de la excelencia que se refleja en nuestra cocina llena de inspiración y sabor. De esta manera ofrecemos nuestra experiencia en la preparación de platos fuertes, entradas, canapés, brunch, desayunos, parrilladas, buffet internacional, catering industrial, coctelería, entre otros.
</p> <a href="https://www.tusanagustin.com/servicios/gastronomia" class="bg-[#333638] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-sm font-medium tracking-wide inline-block" data-astro-cid-glr2sywo>
Ver más
</a> </div> </div> </div> </div> </div> </div> </div> <!-- Footer Navigation --> <div class="w-full border-t border-b border-gray-300 mt-16 " data-astro-cid-glr2sywo> <div class="max-w-7xl mx-auto px-4 overflow-x-auto opciones" data-astro-cid-glr2sywo> <div class="flex md:grid md:grid-cols-6 text-center text-sm text-gray-600 font-medium min-w-max md:min-w-0" data-astro-cid-glr2sywo> <a href="https://www.tusanagustin.com/servicios/gastronomia" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Gastronomía</a> <a href="https://www.tusanagustin.com/servicios/decoracion/" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Decoración</a> <a href="https://www.tusanagustin.com/servicios/event-planner" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Event Planner</a> <a href="https://www.tusanagustin.com/servicios/event-planner" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Wedding Planner</a> <a href="https://www.tusanagustin.com/servicios/fotografia-y-espectaculos/" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Fotografía y video</a> <a href="https://www.tusanagustin.com/servicios/mobiliario" class="py-2 px-4 hover:text-[#4EAC9F] cursor-pointer whitespace-nowrap" data-astro-cid-glr2sywo>Alquiler de Mobiliario</a> </div> </div> </div> </div>  ${renderScript($$result, "E:/homev3/src/components/ServiciosDestacados.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/ServiciosDestacados.astro", void 0);

const imgRionegro = new Proxy({"src":"/_astro/loc-rionegro.Dkf_W0fO.webp","width":560,"height":448,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/loc-rionegro.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/loc-rionegro.webp");
							return target[name];
						}
					});

const imgEnvigado = new Proxy({"src":"/_astro/loc-envigado.mAAefoQV.webp","width":565,"height":451,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/loc-envigado.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/loc-envigado.webp");
							return target[name];
						}
					});

const imgMedellin = new Proxy({"src":"/_astro/loc-medellin.Bhzo4m0E.webp","width":627,"height":523,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/loc-medellin.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/loc-medellin.webp");
							return target[name];
						}
					});

const $$Locaciones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[#FDF5E9 ] py-8 md:py-16" data-astro-cid-ffgfcf5z> <div class="max-w-7xl mx-auto px-4 md:px-16" data-astro-cid-ffgfcf5z> <h2 class="text-4xl md:text-7xl text-center mb-12" data-astro-cid-ffgfcf5z> <span class="text-[#4EAC9F]" data-astro-cid-ffgfcf5z>Locaciones</span> <span class="text-[#2D3748]" data-astro-cid-ffgfcf5z>Para Tus Eventos</span> </h2> <div class="relative w-full group" data-astro-cid-ffgfcf5z> <button class="swiper-prev-locaciones-fixed absolute left-0 md:-left-14 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" data-astro-cid-ffgfcf5z> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ffgfcf5z><path d="m15 18-6-6 6-6" data-astro-cid-ffgfcf5z></path></svg> </button> <button class="swiper-next-locaciones-fixed absolute right-0 md:-right-14 top-[40%] -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer" data-astro-cid-ffgfcf5z> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ffgfcf5z><path d="m9 18 6-6-6-6" data-astro-cid-ffgfcf5z></path></svg> </button> <div class="swiper swiperLocacionesFixed !p-6" data-astro-cid-ffgfcf5z> <div class="swiper-wrapper" data-astro-cid-ffgfcf5z> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Rionegro", "image": imgRionegro, "url": "https://www.tusanagustin.com/lugares/rionegro", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Envigado", "image": imgEnvigado, "url": "https://www.tusanagustin.com/lugares/envigado", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Medell\xEDn", "image": imgMedellin, "url": "https://www.tusanagustin.com/lugares/medellin", "data-astro-cid-ffgfcf5z": true })}  ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Rionegro", "description": "", "image": imgRionegro, "url": "https://www.tusanagustin.com/lugares/rionegro", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Envigado", "description": "", "image": imgEnvigado, "url": "https://www.tusanagustin.com/lugares/envigado", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Medell\xEDn", "description": "", "image": imgMedellin, "url": "https://www.tusanagustin.com/lugares/medellin", "data-astro-cid-ffgfcf5z": true })}  ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Rionegro", "description": "", "image": imgRionegro, "url": "https://www.tusanagustin.com/lugares/rionegro", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Envigado", "description": "", "image": imgEnvigado, "url": "https://www.tusanagustin.com/lugares/envigado", "data-astro-cid-ffgfcf5z": true })} ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "title": "Medell\xEDn", "description": "", "image": imgMedellin, "url": "https://www.tusanagustin.com/lugares/medellin", "data-astro-cid-ffgfcf5z": true })} </div> </div> </div> <div class="flex justify-center mt-8 mb-12" data-astro-cid-ffgfcf5z> <a href="https://wa.me/573168753305?text=Hola!" class="bg-[#333638] text-white px-10 py-3 rounded-full hover:bg-opacity-90 transition-all font-medium" data-astro-cid-ffgfcf5z>
Quiero Reservar
</a> </div> </div> </div>  ${renderScript($$result, "E:/homev3/src/components/Locaciones.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/Locaciones.astro", void 0);

const $$VideoSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[#FDF5E9 ] py-8 md:py-16" data-astro-cid-luhcq7zj> <div class="max-w-4xl mx-auto px-4" data-astro-cid-luhcq7zj> <div id="video-container" class="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black group cursor-pointer" data-astro-cid-luhcq7zj> <!-- Facade / Thumbnail --> <div id="video-facade" class="absolute inset-0 w-full h-full flex items-center justify-center" data-astro-cid-luhcq7zj> <img src="https://img.youtube.com/vi/dQEdLQl1O5g/hqdefault.jpg" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" loading="lazy" data-astro-cid-luhcq7zj> <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" data-astro-cid-luhcq7zj></div> <!-- Play Button --> <div class="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white group-hover:scale-110 transition-all duration-300" data-astro-cid-luhcq7zj> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" class="text-[#4EAC9F] ml-1" data-astro-cid-luhcq7zj> <path d="M8 5v14l11-7z" data-astro-cid-luhcq7zj></path> </svg> </div> </div> <!-- YouTube Iframe (will be injected) --> <div id="video-iframe-placeholder" class="w-full h-full" data-astro-cid-luhcq7zj></div> </div> </div> </div> ${renderScript($$result, "E:/homev3/src/components/VideoSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/VideoSection.astro", void 0);

const imgJBalvin = new Proxy({"src":"/_astro/jbalvin.MWxUI_Lz.webp","width":831,"height":1294,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/jbalvin.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/jbalvin.webp");
							return target[name];
						}
					});

const imgKarolG = new Proxy({"src":"/_astro/2-8.Dz3XkasY.webp","width":338,"height":598,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/2-8.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/2-8.webp");
							return target[name];
						}
					});

const imgMaluma = new Proxy({"src":"/_astro/1-8.h0baKi15.webp","width":338,"height":596,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/1-8.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/1-8.webp");
							return target[name];
						}
					});

const $$ArtistasEspectaculos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[#FDF5E9 ] py-8 md:py-16 overflow-hidden relative" data-astro-cid-72ud5mvh> <div class="max-w-7xl mx-auto px-4 md:px-10 relative" data-astro-cid-72ud5mvh> <h2 class="text-4xl md:text-7xl font-extrabold text-center mb-12 tracking-tight" data-astro-cid-72ud5mvh> <span class="text-[#4EAC9F]" data-astro-cid-72ud5mvh>Artistas</span> <span class="text-[#2D3748]" data-astro-cid-72ud5mvh>& Espectáculos</span> </h2> <div class="relative w-full mb-8 md:mb-16 px-8 md:px-12" data-astro-cid-72ud5mvh> <button class="swiper-prev-artistas absolute left-0 top-1/2 -translate-y-[60%] z-20 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#4EAC9F] hover:scale-110 transition-all cursor-pointer outline-none" data-astro-cid-72ud5mvh> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-72ud5mvh><path d="M15 18l-6-6 6-6" data-astro-cid-72ud5mvh></path></svg> </button> <button class="swiper-next-artistas absolute right-0 top-1/2 -translate-y-[60%] z-20 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#4EAC9F] hover:scale-110 transition-all cursor-pointer outline-none" data-astro-cid-72ud5mvh> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-72ud5mvh><path d="M9 18l6-6-6-6" data-astro-cid-72ud5mvh></path></svg> </button> <div class="swiper swiperArtistas w-full" data-astro-cid-72ud5mvh> <div class="swiper-wrapper" data-astro-cid-72ud5mvh> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgJBalvin, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 25%;", "alt": "J Balvin", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>J Balvin</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#333638] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgKarolG, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 30%;", "alt": "Karol G", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Karol G</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgMaluma, "class": "w-full h-full object-cover rounded-full", "alt": "Maluma", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Maluma</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgJBalvin, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 25%;", "alt": "J Balvin", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>J Balvin</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgKarolG, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 30%;", "alt": "Karol G", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Karol G</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgMaluma, "class": "w-full h-full object-cover rounded-full", "alt": "Maluma", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Maluma</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgJBalvin, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 25%;", "alt": "J Balvin", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>J Balvin</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgKarolG, "class": "w-full h-full object-cover rounded-full", "style": "object-position: center 30%;", "alt": "Karol G", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Karol G</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> <div class="swiper-slide" data-astro-cid-72ud5mvh> <div class="flex flex-col items-center justify-center group cursor-pointer" data-astro-cid-72ud5mvh> <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-[6px] border-[#C5B391] p-1 mb-5 transition-transform duration-300 group-hover:scale-105 bg-white shadow-sm" data-astro-cid-72ud5mvh> ${renderComponent($$result, "Image", $$Image, { "src": imgMaluma, "class": "w-full h-full object-cover rounded-full", "alt": "Maluma", "width": 240, "height": 240, "loading": "lazy", "quality": 70, "data-astro-cid-72ud5mvh": true })} </div> <h3 class="text-xl md:text-2xl  text-[#2D3748] mb-2 font-serif" data-astro-cid-72ud5mvh>Maluma</h3> <a href="https://www.tusanagustin.com/artistas" class="bg-[#2D3748] text-white px-8 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:bg-[#4EAC9F] transition-colors shadow-md text-center inline-block" data-astro-cid-72ud5mvh>
Ver más
</a> </div> </div> </div> </div> </div> </div><div class="w-full border-t border-b border-[#2D3748]/20 py-1.5 mb-8 md:mb-16 opciones" data-astro-cid-72ud5mvh> <div class="max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center text-[#2D3748] text-sm md:text-lg font-alice tracking-wide gap-4 md:gap-0" data-astro-cid-72ud5mvh> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=73" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Cantantes</a> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=122" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Imitadores</a> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=78" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Orquestas</a> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=121" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Grupos</a> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=92" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Música Popular</a> <a href="https://www.tusanagustin.com/artistas?orderBy=recently&filter[categoriesIntersected][0]=80" class="px-2 hover:text-[#4EAC9F] transition-colors" data-astro-cid-72ud5mvh>Shows</a> </div> </div> <div class="max-w-7xl mx-auto px-4 md:px-10 relative" data-astro-cid-72ud5mvh> <div class="flex justify-center pb-4 md:pb-8" data-astro-cid-72ud5mvh> <a href="https://www.tusanagustin.com/artistas" class="bg-[#333638] text-white px-8 md:px-12 py-3 md:py-4 rounded-full hover:bg-opacity-90 transition-all text-base md:text-lg italic font-light tracking-wide shadow-xl transform hover:-translate-y-1 inline-block text-center" style="font-family: 'Poppins', sans-serif;" data-astro-cid-72ud5mvh>
Ingresa a la sección de Artistas y Espectáculos
</a> </div> </div> </div>  ${renderScript($$result, "E:/homev3/src/components/ArtistasEspectaculos.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/ArtistasEspectaculos.astro", void 0);

const $$Astro$2 = createAstro("https://www.tusanagustin.com");
const $$TestimonialCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TestimonialCard;
  const { image, text, link, linkUrl, noHighlight = false } = Astro2.props;
  const highlightNames = (text2) => {
    if (noHighlight) return text2;
    const names = ["Fincadool", "Fincal Forest", "San Agust\xEDn", "Orquideorama"];
    let result = text2;
    names.forEach((name) => {
      const regex = new RegExp(name, "g");
      result = result.replace(regex, `<span class="text-[#4a9a8c]">${name}</span>`);
    });
    result = result.replace(/Orquideorama Jardín(?:&nbsp;|\s)Botánico/g, '<span class="whitespace-nowrap">Orquideorama Jard\xEDn Bot\xE1nico</span>');
    return result;
  };
  const highlightedText = highlightNames(text);
  const isAsset = image && typeof image !== "string";
  return renderTemplate`${maybeRenderHead()}<div class="testimonial-card flex flex-col items-center transition-all w-full max-w-[280px]" data-astro-cid-3ba2o4vp> <div class="relative z-10 mb-[-70px]" data-astro-cid-3ba2o4vp> <div class="rounded-full overflow-hidden border-4 border-[#f5f0e6] w-[140px] h-[140px] shadow-md bg-white" data-astro-cid-3ba2o4vp> ${image ? isAsset ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": image, "alt": link, "width": 140, "height": 140, "class": "object-cover w-full h-full", "loading": "lazy", "quality": 70, "widths": [140, 280], "data-astro-cid-3ba2o4vp": true })}` : renderTemplate`<img${addAttribute(image, "src")}${addAttribute(link, "alt")} class="object-cover w-full h-full" loading="lazy" data-astro-cid-3ba2o4vp>` : (
    /* Placeholder si no hay imagen */
    renderTemplate`<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400" data-astro-cid-3ba2o4vp>Sin img</div>`
  )} </div> </div> <div class="bg-[#D9D3CA] rounded-[30px] px-8 pt-24 pb-10 flex flex-col items-center justify-between text-center min-h-[420px] w-full shadow-sm" style="font-family: 'Poppins', sans-serif;" data-astro-cid-3ba2o4vp> <div class="flex-grow flex items-center justify-center w-full" data-astro-cid-3ba2o4vp> <p class="text-[#3a3a3a] leading-relaxed italic font-light text-[14px] max-w-[250px]" data-astro-cid-3ba2o4vp>${unescapeHTML(highlightedText)}</p> </div> <div class="mt-6 flex flex-col items-center" data-astro-cid-3ba2o4vp> <h3 class="text-[#4a9a8c] mb-4 text-sm font-medium" data-astro-cid-3ba2o4vp> ${link} </h3> <a${addAttribute(linkUrl, "href")} class="bg-[#009688] text-white rounded-full px-8 py-2.5 hover:bg-[#00796b] transition-colors text-sm font-semibold shadow-sm inline-block cursor-pointer" data-astro-cid-3ba2o4vp>
Ver más
</a> </div> </div> </div> `;
}, "E:/homev3/src/components/TestimonialCard.astro", void 0);

const imgTestimonial1 = new Proxy({"src":"/_astro/home-img01.C22vVA2Z.webp","width":199,"height":197,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-img01.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-img01.webp");
							return target[name];
						}
					});

const imgTestimonial2 = new Proxy({"src":"/_astro/home-img02.p6SIf1nD.webp","width":150,"height":150,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-img02.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-img02.webp");
							return target[name];
						}
					});

const imgTestimonial3 = new Proxy({"src":"/_astro/testimonial.DGNHe5jv.webp","width":596,"height":398,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/testimonial.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/testimonial.webp");
							return target[name];
						}
					});

const $$HistoriasEventos = createComponent(($$result, $$props, $$slots) => {
  const testimonials = [
    {
      image: imgTestimonial1,
      text: "Laura & Andr\xE9s una historia de amor realizada en nuestro lugar para eventos freebad en esta historia se refleja la felicidad y pasi\xF3n de una pareja que nos di\xF3 su entera confianza para capturar momentos que ser\xE1n recordados para toda la vida.",
      link: "Laura y Andr\xE9s Boda",
      linkUrl: "https://www.tusanagustin.com/historias-de-eventos-reales/fizebad//laura-andres-boda",
      noHighlight: true
    },
    {
      image: imgTestimonial2,
      text: "Fiesta de 15 a\xF1os realizada en nuestra alias Fincal Forest en Envigado, ideal para realizar fiestas y celebraciones llenas de magia y diversi\xF3n, cuenta con este maravilloso lugar y el mejor servicio de San Agust\xEDn.",
      link: "Fiesta de 15 A\xF1os Mariam",
      linkUrl: "https://www.tusanagustin.com/historias-de-eventos-reales/fiesta-de-quince-anos-mariam-forest"
    },
    {
      image: imgTestimonial3,
      text: "Realizamos celebraci\xF3n de los 50 a\xF1os de Mitsubishi, un evento empresarial en el que ofrecimos un servicio integral en la operaci\xF3n y log\xEDstica en nuestro lugar para eventos Orquideorama Jard\xEDn&nbsp;Bot\xE1nico.",
      link: "Mitsubishi",
      linkUrl: "https://www.tusanagustin.com/historias-de-eventos-reales/mitsubishi-evento-empresarial"
    }
  ];
  const doubleTestimonials = [...testimonials, ...testimonials];
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#FDF5E9 ] py-12 md:py-32 overflow-hidden relative" data-astro-cid-clcjckl3> <div class="max-w-7xl mx-auto px-4 relative" data-astro-cid-clcjckl3> <h2 class="text-4xl md:text-7xl font-extrabold text-center mb-10 md:mb-12 tracking-tight" data-astro-cid-clcjckl3> <span class="text-[#4EAC9F]" data-astro-cid-clcjckl3>Historias</span> <span class="text-[#2D3748]" data-astro-cid-clcjckl3>De Eventos Reales</span> </h2> <div class="relative w-full mb-8 md:mb-16 px-4 md:px-12" data-astro-cid-clcjckl3> <button class="swiper-prev-historias absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#4EAC9F] hover:scale-110 transition-all cursor-pointer outline-none" data-astro-cid-clcjckl3> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-clcjckl3><path d="M15 18l-6-6 6-6" data-astro-cid-clcjckl3></path></svg> </button> <button class="swiper-next-historias absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[#4EAC9F] hover:scale-110 transition-all cursor-pointer outline-none" data-astro-cid-clcjckl3> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-clcjckl3><path d="M9 18l6-6-6-6" data-astro-cid-clcjckl3></path></svg> </button> <div class="swiper swiperHistorias w-full py-8 md:py-12" data-astro-cid-clcjckl3> <div class="swiper-wrapper" data-astro-cid-clcjckl3> ${doubleTestimonials.map((testimonial) => renderTemplate`<div class="swiper-slide" data-astro-cid-clcjckl3> ${renderComponent($$result, "TestimonialCard", $$TestimonialCard, { ...testimonial, "data-astro-cid-clcjckl3": true })} </div>`)} </div> </div> </div> <div class="flex flex-col items-center mt-12" data-astro-cid-clcjckl3> <a href="https://www.tusanagustin.com/testimonios class=" bg-[#333638] text-white px-8 py-4 rounded-full flex items-center gap-4 hover:scale-105 transition-transform shadow-lg group" data-astro-cid-clcjckl3> <span class="text-xl font-normal italic font-sans" style="font-family: 'Poppins', sans-serif;" data-astro-cid-clcjckl3>Ver testimonios</span> <div class="flex gap-1 group-hover:scale-110 transition-transform" data-astro-cid-clcjckl3> ${[1, 2, 3, 4, 5].map(() => renderTemplate`<svg class="w-5 h-5 text-[#f5a623] fill-current" viewBox="0 0 24 24" data-astro-cid-clcjckl3> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-clcjckl3></path> </svg>`)} </div> </a> </div> </div> </section>  ${renderScript($$result, "E:/homev3/src/components/HistoriasEventos.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/homev3/src/components/HistoriasEventos.astro", void 0);

const imgDisney = new Proxy({"src":"/_astro/disney-castle.CAWLt1Ft.webp","width":2000,"height":2500,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/disney-castle.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/disney-castle.webp");
							return target[name];
						}
					});

const imgBeach = new Proxy({"src":"/_astro/beach-wedding.DK535plz.webp","width":2730,"height":4096,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/beach-wedding.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/beach-wedding.webp");
							return target[name];
						}
					});

const imgCruise = new Proxy({"src":"/_astro/cruise-ship.BwREY15v.webp","width":2730,"height":4096,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/cruise-ship.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/cruise-ship.webp");
							return target[name];
						}
					});

const $$TurismoBlock = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#FDF5E9 ] py-8 md:py-14 px-4 md:px-10 overflow-hidden"> <div class="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 items-end lg:justify-center"> <!-- Left Side: Header, Desc and Smaller Images --> <div class="lg:w-auto flex flex-col gap-3 max-w-md"> <div class="space-y-1"> <h3 class="text-gray-600 text-base md:text-lg font-medium tracking-tight">Conoce Nuestros planes de</h3> <h2 class="text-4xl md:text-7xl font-extrabold flex flex-col leading-[1.05]"> <span class="text-[#4EAC9F]">Turismo</span> <span class="text-[#D1C1A3]">Especializado</span> </h2> </div> <!-- Description Box with Button --> <div class="relative w-full bg-[#D1C1A3] p-6 md:p-7 rounded-[32px] shadow-sm"> <p class="text-white text-sm md:text-base leading-relaxed font-light">
Descubre destinos increíbles. Lunas de miel, Excursiones de 15 años y más. Explora nuestros paquetes turísticos ¡Vive la aventura!
</p> <div class="absolute -bottom-3 right-4 md:-right-2"> <a href="https://www.tusanagustin.com/servicios/turismo" class="bg-[#333638] text-white px-6 py-2 rounded-full text-xs italic font-light tracking-wide hover:bg-opacity-90 transition-all shadow-xl inline-block">
Ver más
</a> </div> </div> <!-- Two Smaller Images Side-by-Side --> <div class="grid grid-cols-2 gap-2 mt-1"> <div class="aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg w-full"> ${renderComponent($$result, "Image", $$Image, { "src": imgDisney, "alt": "Disney Castle", "class": "w-full h-full object-cover", "width": 240, "height": 300, "loading": "lazy", "widths": [240, 480], "quality": 70 })} </div> <div class="aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg w-full"> ${renderComponent($$result, "Image", $$Image, { "src": imgBeach, "alt": "Beach Wedding", "class": "w-full h-full object-cover", "width": 240, "height": 300, "loading": "lazy", "widths": [240, 480], "quality": 70 })} </div> </div> </div> <!-- Right Side: Single Large Image --> <div class="lg:w-auto z-10"> <div class="w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] lg:aspect-[0.85/1.1] rounded-[48px] overflow-hidden shadow-2xl"> ${renderComponent($$result, "Image", $$Image, { "src": imgCruise, "alt": "Cruise Ship", "class": "w-full h-full object-cover", "width": 320, "height": 400, "loading": "lazy", "widths": [320, 640], "quality": 70 })} </div> </div> </div> </section>`;
}, "E:/homev3/src/components/TurismoBlock.astro", void 0);

const imgBlog1 = new Proxy({"src":"/_astro/home-47.B77QNjR9.webp","width":377,"height":259,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-47.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-47.webp");
							return target[name];
						}
					});

const imgBlog2 = new Proxy({"src":"/_astro/home-50.CwE4x8On.webp","width":379,"height":259,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-50.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-50.webp");
							return target[name];
						}
					});

const imgBlog3 = new Proxy({"src":"/_astro/home-53.OBX1OBuv.webp","width":377,"height":259,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home-53.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home-53.webp");
							return target[name];
						}
					});

const $$Astro$1 = createAstro("https://www.tusanagustin.com");
const $$BlogsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogsSection;
  const blogs = [
    {
      title: "Bodas Destino",
      description: "El Destino Perfecto para tu Boda de Ensue\xF1o",
      image: imgBlog1,
      url: "https://www.tusanagustin.com/blog/medellin-te-espera-dile-si-quiero-en-la-ciudad-de-la-eterna-primavera"
    },
    {
      title: "Mejores lugares para eventos",
      description: "\xA1Descubre los 20 Mejores Lugares para Eventos en Medell\xEDn!",
      image: imgBlog2,
      url: "https://www.tusanagustin.com/blog/descubre-los-20-mejores-lugares-para-eventos-en-medellin"
    },
    {
      title: "Alimentaci\xF3n Hospitalaria",
      description: "Alimentaci\xF3n Hospitalaria: Un Pilar Fundamental en la Recuperaci\xF3n y Bienestar del Paciente.",
      image: imgBlog3,
      url: "https://www.tusanagustin.com/blog/alimentacion-hospitalaria"
    }
  ];
  const infiniteBlogs = [...blogs, ...blogs];
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#FDF5E9 ] pt-10 pb-4 md:py-20 px-4 md:px-10" data-astro-cid-qbywmxa5> <div class="max-w-[1400px] mx-auto space-y-12" data-astro-cid-qbywmxa5> <!-- Heading --> <h2 class="text-4xl md:text-7xl font-extrabold flex flex-col leading-[1.05] max-w-6xl mx-auto" data-astro-cid-qbywmxa5> <span class="text-[#4EAC9F]" data-astro-cid-qbywmxa5>Blog, Ideas Y</span> <span class="text-[#D1C1A3]" data-astro-cid-qbywmxa5>Consejos</span> </h2> <div class="relative group" data-astro-cid-qbywmxa5> <!-- Navigation Buttons --> <button class="swiper-prev-blogs absolute left-0 md:-left-12 top-[40%] md:top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer duration-300" data-astro-cid-qbywmxa5> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qbywmxa5><path d="m15 18-6-6 6-6" data-astro-cid-qbywmxa5></path></svg> </button> <button class="swiper-next-blogs absolute right-0 md:-right-12 top-[40%] md:top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-gray-800 cursor-pointer duration-300" data-astro-cid-qbywmxa5> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-qbywmxa5><path d="m9 18 6-6-6-6" data-astro-cid-qbywmxa5></path></svg> </button> <!-- Swiper Carousel --> <div class="swiper mySwiperBlogs !pb-12 !px-4" data-astro-cid-qbywmxa5> <div class="swiper-wrapper" data-astro-cid-qbywmxa5> ${infiniteBlogs.map((blog, index) => renderTemplate`<div class="swiper-slide" data-astro-cid-qbywmxa5> ${renderComponent($$result, "ServiceCard", $$ServiceCard, { "variant": "blog", "title": blog.title, "description": blog.description, "image": blog.image, "url": blog.url, "data-astro-cid-qbywmxa5": true })} </div>`)} </div> <div class="swiper-pagination" data-astro-cid-qbywmxa5></div> </div> </div> </div> </section> ${renderScript($$result, "E:/homev3/src/components/BlogsSection.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/BlogsSection.astro", void 0);

const imgPorcentaje = new Proxy({"src":"/_astro/porcentaje.BydswUy6.webp","width":174,"height":171,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/porcentaje.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/porcentaje.webp");
							return target[name];
						}
					});

const imgFontur = new Proxy({"src":"/_astro/cert-fontur.BgZSmE2p.webp","width":203,"height":203,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/cert-fontur.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/cert-fontur.webp");
							return target[name];
						}
					});

const imgCamara = new Proxy({"src":"/_astro/logo-camara-comercio-medellin.XRPUbkZx.webp","width":2983,"height":1220,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/logo-camara-comercio-medellin.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/logo-camara-comercio-medellin.webp");
							return target[name];
						}
					});

const imgTrayectoria = new Proxy({"src":"/_astro/cert-trayectoria.QMCjwiAI.webp","width":281,"height":195,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/cert-trayectoria.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/cert-trayectoria.webp");
							return target[name];
						}
					});

const $$BrandInfo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#FDF5E9 ] pt-4 pb-10 md:py-20 px-4 md:px-10" data-astro-cid-lpkfxxsj> <div class="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12" data-astro-cid-lpkfxxsj> <!-- Heading --> <h2 class="flex flex-col items-center leading-tight" data-astro-cid-lpkfxxsj> <span class="text-3xl md:text-5xl font-extrabold text-[#2D3748]" data-astro-cid-lpkfxxsj>Descubre más de</span> <span class="text-4xl md:text-7xl font-extrabold text-[#4EAC9F]" data-astro-cid-lpkfxxsj>Tu San Agustín</span> </h2> <!-- Subscription Form Section --> <div class="flex flex-col items-center gap-4 w-full max-w-2xl" data-astro-cid-lpkfxxsj> <p class="text-gray-600 text-sm md:text-base font-medium" data-astro-cid-lpkfxxsj>Suscríbete al boletín</p> <div class="flex gap-4 mb-2" data-astro-cid-lpkfxxsj> <!-- WhatsApp Icon (Teal) --> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-[#4EAC9F] cursor-pointer hover:opacity-80" aria-label="WhatsApp" data-astro-cid-lpkfxxsj> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.063 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.933 3.659 1.423 5.631 1.423s3.945-.494 5.672-1.423l6.335 1.662-1.662-6.335a11.82 11.82 0 001.752-6.173c-.003-6.557-5.338-11.892-11.893-11.892z" fill="currentColor" data-astro-cid-lpkfxxsj></path> </svg> <!-- Email Icon (Teal) --> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#4EAC9F] cursor-pointer hover:opacity-80" aria-label="Email" data-astro-cid-lpkfxxsj> <rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-lpkfxxsj></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-lpkfxxsj></path> </svg> </div> <!-- Custom Form --> <form class="flex w-full max-w-md bg-[#646464] rounded-full overflow-hidden shadow-lg h-10" aria-label="Boletín de suscripción" data-astro-cid-lpkfxxsj> <input type="email" placeholder="Escribe tu correo*" class="bg-transparent border-none text-white px-6 py-2 w-full text-xs md:text-sm focus:outline-none placeholder:text-gray-300 italic" required data-astro-cid-lpkfxxsj> <button type="submit" class="bg-[#4EAC9F] text-white px-8 py-2 text-xs md:text-sm font-medium hover:bg-opacity-90 transition-all" data-astro-cid-lpkfxxsj>
Suscribirme
</button> </form> </div> <!-- Badges Row --> <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 items-start pt-8 w-full max-w-5xl" data-astro-cid-lpkfxxsj> <!-- Calificación Badge --> <div class="flex flex-col items-center" data-astro-cid-lpkfxxsj> <span class="text-sm font-bold text-gray-700 mb-2 italic" data-astro-cid-lpkfxxsj>Calificación Anual</span> <span class="text-2xl font-black text-[#4EAC9F] mb-1" data-astro-cid-lpkfxxsj>4.7</span> <div class="w-24 h-24 flex items-center justify-center" data-astro-cid-lpkfxxsj> ${renderComponent($$result, "Image", $$Image, { "src": imgPorcentaje, "alt": "Calificaci\xF3n Anual", "class": "max-h-full object-contain drop-shadow-sm w-auto h-auto", "width": 96, "height": 96, "loading": "lazy", "data-astro-cid-lpkfxxsj": true })} </div> <div class="flex gap-1 mt-3" data-astro-cid-lpkfxxsj> ${[1, 2, 3, 4, 5].map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FFD700" data-astro-cid-lpkfxxsj> <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" data-astro-cid-lpkfxxsj></path> </svg>`)} </div> </div> <!-- FONTUR Badge --> <div class="flex flex-col items-center gap-4" data-astro-cid-lpkfxxsj> <span class="text-sm font-bold text-gray-700 italic" data-astro-cid-lpkfxxsj>Registro Nacional de Turismo</span> <div class="w-32 h-32 flex items-center justify-center" data-astro-cid-lpkfxxsj> ${renderComponent($$result, "Image", $$Image, { "src": imgFontur, "alt": "Registro Nacional de Turismo", "class": "max-h-full object-contain drop-shadow-sm w-auto h-auto", "width": 128, "height": 128, "loading": "lazy", "data-astro-cid-lpkfxxsj": true })} </div> </div> <!-- Camara de Comercio Badge --> <div class="flex flex-col items-center gap-4" data-astro-cid-lpkfxxsj> <span class="text-sm font-bold text-gray-700 italic" data-astro-cid-lpkfxxsj>Acreditación Mercantil</span> <div class="w-40 h-32 flex items-center justify-center" data-astro-cid-lpkfxxsj> ${renderComponent($$result, "Image", $$Image, { "src": imgCamara, "alt": "Acreditaci\xF3n Mercantil", "class": "max-h-full object-contain drop-shadow-sm w-auto h-auto", "width": 160, "height": 128, "loading": "lazy", "data-astro-cid-lpkfxxsj": true })} </div> </div> <!-- Years Badge --> <div class="flex flex-col items-center gap-4" data-astro-cid-lpkfxxsj> <span class="text-sm font-bold text-gray-700 italic" data-astro-cid-lpkfxxsj>Reconocimiento</span> <div class="w-32 h-32 flex items-center justify-center" data-astro-cid-lpkfxxsj> ${renderComponent($$result, "Image", $$Image, { "src": imgTrayectoria, "alt": "38 A\xF1os de Trayectoria", "class": "max-h-full object-contain drop-shadow-sm w-auto h-auto", "width": 128, "height": 128, "loading": "lazy", "data-astro-cid-lpkfxxsj": true })} </div> </div> </div> </div> </section> `;
}, "E:/homev3/src/components/BrandInfo.astro", void 0);

const iconPi = new Proxy({"src":"/_astro/icon-pinterest.afqg7Lac.webp","width":23,"height":28,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/icon-pinterest.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/icon-pinterest.webp");
							return target[name];
						}
					});

const imgVisa = new Proxy({"src":"/_astro/visa.int71ITQ.webp","width":138,"height":56,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/visa.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/visa.webp");
							return target[name];
						}
					});

const imgMastercard = new Proxy({"src":"/_astro/mastercard.CtyX3pUV.webp","width":95,"height":56,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/mastercard.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/mastercard.webp");
							return target[name];
						}
					});

const imgPaypal = new Proxy({"src":"/_astro/paypal.CsAQGOL6.webp","width":197,"height":59,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/paypal.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/paypal.webp");
							return target[name];
						}
					});

const imgPse = new Proxy({"src":"/_astro/pse.BUFSsZyF.webp","width":155,"height":66,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/pse.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/pse.webp");
							return target[name];
						}
					});

const imgWompi = new Proxy({"src":"/_astro/wompi.CvLSIJPN.webp","width":140,"height":49,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/wompi.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/wompi.webp");
							return target[name];
						}
					});

const award1 = new Proxy({"src":"/_astro/home_tusanagustin-29.DOPuVTPQ.webp","width":1282,"height":1282,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-29.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-29.webp");
							return target[name];
						}
					});

const award2 = new Proxy({"src":"/_astro/home_tusanagustin-30.Dhs0SYXa.webp","width":1114,"height":847,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-30.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-30.webp");
							return target[name];
						}
					});

const award3 = new Proxy({"src":"/_astro/home_tusanagustin-31.Cs9-dPnH.webp","width":1102,"height":999,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-31.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-31.webp");
							return target[name];
						}
					});

const award4 = new Proxy({"src":"/_astro/home_tusanagustin-32.CxsgrUDw.webp","width":1172,"height":1173,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-32.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-32.webp");
							return target[name];
						}
					});

const award5 = new Proxy({"src":"/_astro/home_tusanagustin-34-1.C2_XsAta.webp","width":1312,"height":1312,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-34-1.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-34-1.webp");
							return target[name];
						}
					});

const award6 = new Proxy({"src":"/_astro/home_tusanagustin-35.DFsvjQRI.webp","width":1102,"height":1072,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-35.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-35.webp");
							return target[name];
						}
					});

const award7 = new Proxy({"src":"/_astro/home_tusanagustin-36.VJVSOJ4y.webp","width":1133,"height":1137,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-36.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-36.webp");
							return target[name];
						}
					});

const award8 = new Proxy({"src":"/_astro/home_tusanagustin-37.Dli4IywY.webp","width":1102,"height":919,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-37.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-37.webp");
							return target[name];
						}
					});

const award9 = new Proxy({"src":"/_astro/home_tusanagustin-38.BzgRnXvU.webp","width":1102,"height":1327,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-38.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-38.webp");
							return target[name];
						}
					});

const award10 = new Proxy({"src":"/_astro/home_tusanagustin-41.DzLcKwvj.webp","width":1172,"height":1172,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/homev3/src/assets/images/home_tusanagustin-41.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("E:/homev3/src/assets/images/home_tusanagustin-41.webp");
							return target[name];
						}
					});

const $$Astro = createAstro("https://www.tusanagustin.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  const awards = [award1, award2, award3, award4, award5, award6, award7, award8, award9, award10];
  return renderTemplate`${maybeRenderHead()}<section class="bg-[#FDF5E9 ] py-10 md:py-20 px-4 md:px-10" data-astro-cid-sz7xmlte> <div class="max-w-7xl mx-auto space-y-12 md:space-y-24" data-astro-cid-sz7xmlte> <!-- TOP SECTION: CONÓCENOS / QUIÉNES SOMOS --> <div class="flex flex-col lg:flex-row justify-between items-start gap-12" data-astro-cid-sz7xmlte> <div class="space-y-6 flex-1" data-astro-cid-sz7xmlte> <div class="space-y-2" data-astro-cid-sz7xmlte> <h3 class="text-2xl md:text-3xl font-extrabold text-[#4EAC9F] tracking-tight" data-astro-cid-sz7xmlte>Conócenos</h3> <h2 class="text-4xl md:text-7xl font-extrabold text-[#2D3748] leading-none" data-astro-cid-sz7xmlte>¿Quiénes Somos?</h2> </div> <!-- Description Box (Wider but Thinner) --> <div class="relative max-w-xl bg-[#D1C1A3] px-10 py-8 rounded-[40px] border border-white/5" data-astro-cid-sz7xmlte> <p class="text-sm md:text-lg leading-relaxed font-light text-white" data-astro-cid-sz7xmlte>
Somos Tu San Agustín, la empresa líder en operación de eventos. Con más de 35 años, ofrecemos soluciones integrales y personalizadas para cualquier tipo de evento.
</p> <div class="flex justify-end mt-4" data-astro-cid-sz7xmlte> <a href="https://www.tusanagustin.com/sobre-nosotros" class="bg-white text-black px-8 py-2.5 rounded-full text-xs hover:bg-opacity-90 transition-all uppercase tracking-widest shadow-lg inline-block" data-astro-cid-sz7xmlte>
Ver Mas
</a> </div> </div> </div> <!-- Awards Carousel with Arrows --> <div class="lg:w-1/3 w-full flex flex-col items-center gap-6 mt-6 md:mt-12" data-astro-cid-sz7xmlte> <p class="text-lg font-bold tracking-widest text-[#4EAC9F] text-center" data-astro-cid-sz7xmlte>Premios Y Certificaciones</p> <div class="relative w-80 mx-auto flex items-center justify-center" data-astro-cid-sz7xmlte> <!-- Custom Arrows (Absolutely positioned relative to this centered box) --> <div class="swiper-button-prev-awards absolute left-0 z-10 text-[#4EAC9F] cursor-pointer hover:scale-110 transition-transform" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="m15 18-6-6 6-6" data-astro-cid-sz7xmlte></path></svg> </div> <div class="swiper awardsSwiper w-40 h-56 overflow-hidden mx-auto" data-astro-cid-sz7xmlte> <div class="swiper-wrapper" data-astro-cid-sz7xmlte> ${awards.map((award) => renderTemplate`<div class="swiper-slide flex items-center justify-center" data-astro-cid-sz7xmlte> <div class="w-40 h-40 flex items-center justify-center p-2" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": award, "alt": "Premio o Certificaci\xF3n", "class": "max-h-full object-contain drop-shadow-lg", "width": 200, "height": 200, "loading": "lazy", "data-astro-cid-sz7xmlte": true })} </div> </div>`)} </div> </div> <div class="swiper-button-next-awards absolute right-0 z-10 text-[#4EAC9F] cursor-pointer hover:scale-110 transition-transform" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="m9 18 6-6-6-6" data-astro-cid-sz7xmlte></path></svg> </div> </div> </div> </div> <!-- MIDDLE SECTION: CONTACT FORM --> <div class="flex flex-col items-center space-y-12" data-astro-cid-sz7xmlte> <h3 class="text-[#4EAC9F] text-4xl md:text-7xl font-extrabold mb-6 md:mb-12" data-astro-cid-sz7xmlte>Contáctanos</h3> <form class="w-full max-w-xl space-y-4" data-astro-cid-sz7xmlte> <div class="space-y-4" data-astro-cid-sz7xmlte> <input type="text" placeholder="Nombre y Apellido*" class="w-full bg-[#333638] text-white px-8 py-4 rounded-xl focus:outline-none focus:ring-2 ring-[#4EAC9F]/50 placeholder:text-gray-400 font-medium" data-astro-cid-sz7xmlte> <input type="tel" placeholder="Whatsapp*" class="w-full bg-[#333638] text-white px-8 py-4 rounded-xl focus:outline-none focus:ring-2 ring-[#4EAC9F]/50 placeholder:text-gray-400 font-medium" data-astro-cid-sz7xmlte> <input type="email" placeholder="Email*" class="w-full bg-[#333638] text-white px-8 py-4 rounded-xl focus:outline-none focus:ring-2 ring-[#4EAC9F]/50 placeholder:text-gray-400 font-medium" data-astro-cid-sz7xmlte> <select required class="w-full bg-[#333638] text-white px-8 py-4 rounded-xl focus:outline-none focus:ring-2 ring-[#4EAC9F]/50 appearance-none font-medium" aria-label="Tipo de Evento" data-astro-cid-sz7xmlte> <option value="" disabled selected hidden data-astro-cid-sz7xmlte>Tipo de Evento</option> <option data-astro-cid-sz7xmlte>Boda</option> <option data-astro-cid-sz7xmlte>Quince Años</option> <option data-astro-cid-sz7xmlte>Corporativo</option> <option data-astro-cid-sz7xmlte>Otro</option> </select> <textarea placeholder="Mensaje" rows="1" class="w-full bg-[#333638] text-white px-8 py-4 rounded-xl focus:outline-none focus:ring-2 ring-[#4EAC9F]/50 placeholder:text-gray-400 font-medium" data-astro-cid-sz7xmlte></textarea> </div> <div class="flex justify-center pt-4" data-astro-cid-sz7xmlte> <button type="submit" class="bg-[#4EAC9F] text-white px-16 py-3 rounded-xl text-lg  hover:bg-opacity-90 transition-all shadow-xl" data-astro-cid-sz7xmlte>
Enviar
</button> </div> </form> </div> </div> </section> <footer class="bg-[#333638] text-white py-10 md:py-20 px-4 md:px-10" data-astro-cid-sz7xmlte> <div class="max-w-7xl mx-auto" data-astro-cid-sz7xmlte> <!-- BOTTOM SECTION: BRANDING & LINKS --> <div class="pt-20 border-t border-white/5 flex flex-col lg:flex-row gap-16 lg:gap-24" data-astro-cid-sz7xmlte> <!-- Branding Column --> <div class="lg:w-1/3 space-y-8" data-astro-cid-sz7xmlte> <div class="relative inline-block" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": logoVerde, "alt": "San Agust\xEDn Logo", "class": "h-24 md:h-28 invert brightness-0 w-auto", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} </div> <div class="space-y-4" data-astro-cid-sz7xmlte> <p class="text-[#4EAC9F] text-xl font-bold italic tracking-tight" data-astro-cid-sz7xmlte>Síguenos @tusanagustin</p> <div class="flex gap-4" data-astro-cid-sz7xmlte> <a href="https://www.facebook.com/tusanagustineventos/" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconFb, "alt": "Facebook", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="https://www.instagram.com/tusanagustin/" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconIg, "alt": "Instagram", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="https://wa.me/573168753305?text=Hola!" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconWa, "alt": "WhatsApp", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="https://www.tiktok.com/@tusanagustin" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconTk, "alt": "TikTok", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="https://www.youtube.com/@tusanagustin" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconYt, "alt": "YouTube", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="https://www.linkedin.com/company/tusanagustin/" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconLi, "alt": "LinkedIn", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> <a href="#" class="hover:scale-110 transition-transform" data-astro-cid-sz7xmlte>${renderComponent($$result, "Image", $$Image, { "src": iconPi, "alt": "Pinterest", "class": "h-5 w-5 object-contain invert brightness-0", "loading": "lazy", "data-astro-cid-sz7xmlte": true })}</a> </div> </div> <div class="space-y-4" data-astro-cid-sz7xmlte> <p class="text-[#4EAC9F] text-lg font-bold" data-astro-cid-sz7xmlte>Contáctanos</p> <div class="space-y-4" data-astro-cid-sz7xmlte> <div class="flex items-center gap-3 group cursor-pointer" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": iconPh, "alt": "Phone", "class": "h-6 w-6 object-contain invert brightness-0 group-hover:scale-110 transition-transform", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} <span class="text-base text-gray-300 font-medium" data-astro-cid-sz7xmlte>(+57) 316 875 33 05</span> </div> <div class="flex items-center gap-3 group cursor-pointer" data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" class="group-hover:scale-110 transition-transform" data-astro-cid-sz7xmlte><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" data-astro-cid-sz7xmlte></path></svg> <span class="text-base text-gray-300 font-medium" data-astro-cid-sz7xmlte>contacto@tusanagustin.com</span> </div> </div> </div> </div> <div class="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8" data-astro-cid-sz7xmlte> <nav aria-label="Footer Navigation Primary" data-astro-cid-sz7xmlte> <ul class="space-y-1.5" data-astro-cid-sz7xmlte> ${[
    { name: "Inicio", url: "https://www.tusanagustin.com/" },
    { name: "Eventos", url: "https://www.tusanagustin.com/eventos" },
    { name: "Servicios", url: "https://www.tusanagustin.com/servicios" },
    { name: "Galer\xEDas", url: "https://www.tusanagustin.com/galeria" },
    { name: "Lugares", url: "https://www.tusanagustin.com/lugares" },
    { name: "Event Planners", url: "https://www.tusanagustin.com/event-planners" },
    { name: "Artistas", url: "https://www.tusanagustin.com/artistas" },
    { name: "Historias", url: "https://www.tusanagustin.com/historias" },
    { name: "Blog", url: "https://www.tusanagustin.com/blog" }
  ].map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.url, "href")} class="text-gray-300 hover:text-[#4EAC9F] flex items-center gap-2 text-base font-medium transition-colors" style="font-family: 'Poppins', sans-serif;" data-astro-cid-sz7xmlte> <span class="w-1.5 h-1.5 rounded-full bg-[#4EAC9F]" data-astro-cid-sz7xmlte></span> ${link.name} </a></li>`)} </ul> </nav> <nav aria-label="Footer Navigation Secondary" data-astro-cid-sz7xmlte> <ul class="space-y-1.5" data-astro-cid-sz7xmlte> ${[
    { name: "Cont\xE1ctanos", url: "https://www.tusanagustin.com/contactanos" },
    { name: "Sobre nosotros", url: "https://www.tusanagustin.com/sobre-nosotros" },
    { name: "Preguntas frecuentes", url: "https://www.tusanagustin.com/preguntas-frecuentes" },
    { name: "Condiciones legales", url: "https://www.tusanagustin.com/condiciones-legales" },
    { name: "Pol\xEDticas de privacidad", url: "https://www.tusanagustin.com/politicas-de-privacidad" },
    { name: "Consentimiento de cookies", url: "https://www.tusanagustin.com/cookies" },
    { name: "Mapa del sitio", url: "https://www.tusanagustin.com/mapa-del-sitio" }
  ].map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.url, "href")} class="text-gray-300 hover:text-[#4EAC9F] flex items-center gap-2 text-base font-medium transition-colors" style="font-family: 'Poppins', sans-serif;" data-astro-cid-sz7xmlte> <span class="w-1.5 h-1.5 rounded-full bg-[#4EAC9F]" data-astro-cid-sz7xmlte></span> ${link.name} </a></li>`)} </ul> </nav> <nav aria-label="Footer Navigation Tertiary" data-astro-cid-sz7xmlte> <ul class="space-y-1.5" data-astro-cid-sz7xmlte> ${[
    { name: "Trabaja con nosotros", url: "https://www.tusanagustin.com/trabaja-con-nosotros" },
    { name: "Events & Wedding Planners", url: "https://www.tusanagustin.com/planeadores" },
    { name: "Artistas y espect\xE1culos", url: "https://www.tusanagustin.com/artistas-y-espectaculos" },
    { name: "Lugares para eventos", url: "https://www.tusanagustin.com/lugares-eventos" },
    { name: "Proveedores", url: "https://www.tusanagustin.com/proveedores" }
  ].map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.url, "href")} class="text-gray-300 hover:text-[#4EAC9F] flex items-center gap-2 text-base font-medium transition-colors" style="font-family: 'Poppins', sans-serif;" data-astro-cid-sz7xmlte> <span class="w-1.5 h-1.5 rounded-full bg-[#4EAC9F]" data-astro-cid-sz7xmlte></span> ${link.name} </a></li>`)} </ul> </nav> </div> </div> <!-- PAYMENT METHODS --> <div class="flex flex-col items-end w-full mt-10 pr-4" data-astro-cid-sz7xmlte> <div class="flex flex-col items-center space-y-2" data-astro-cid-sz7xmlte> <p class="text-[#4EAC9F] text-lg italic font-medium opacity-90" data-astro-cid-sz7xmlte>Medios de Pago</p> <div class="bg-[#E5E0D8] px-8 py-3 rounded-2xl flex flex-wrap justify-center items-center gap-6 shadow-md" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": imgVisa, "alt": "Visa", "class": "h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$Image, { "src": imgMastercard, "alt": "Mastercard", "class": "h-10 w-auto opacity-70 hover:opacity-100 transition-all duration-300", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$Image, { "src": imgPaypal, "alt": "PayPal", "class": "h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$Image, { "src": imgPse, "alt": "PSE", "class": "h-14 w-auto opacity-70 hover:opacity-100 transition-all duration-300", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} ${renderComponent($$result, "Image", $$Image, { "src": imgWompi, "alt": "Wompi", "class": "h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300", "loading": "lazy", "data-astro-cid-sz7xmlte": true })} </div> </div> </div> </div> </footer> ${renderScript($$result, "E:/homev3/src/components/Footer.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/homev3/src/components/Footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="min-h-screen"> ${renderComponent($$result2, "Banner", $$Banner, {})} ${renderComponent($$result2, "Eventos", $$EventosUnicos, {})} ${renderComponent($$result2, "ServiciosDestacados", $$ServiciosDestacados, {})} ${renderComponent($$result2, "Locaciones", $$Locaciones, {})} ${renderComponent($$result2, "VideoSection", $$VideoSection, {})} ${renderComponent($$result2, "ArtistasEspectaculos", $$ArtistasEspectaculos, {})} ${renderComponent($$result2, "HistoriasEventos", $$HistoriasEventos, {})} ${renderComponent($$result2, "Intro", $$Intro, {})} <div class="md:my-16"></div> ${renderComponent($$result2, "Carousel", $$Carousel, {})} <div class="md:my-16"></div> ${renderComponent($$result2, "TurismoBlock", $$TurismoBlock, {})} <div class="md:my-16"></div> ${renderComponent($$result2, "BlogsSection", $$BlogsSection, {})} <div class="my-0 md:my-10"></div> ${renderComponent($$result2, "BrandInfo", $$BrandInfo, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} </main> ` })}`;
}, "E:/homev3/src/pages/index.astro", void 0);

const $$file = "E:/homev3/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page as a, baseService as b, parseQuality as p };
