import { toast } from "react-toastify";

/**
 * Downloads an image with specified format and quality
 * @param {string} imageUrl - The source image URL
 * @param {string} filename - Base filename without extension
 * @param {string} format - Image format ('png', 'jpg', 'webp')
 * @param {number} quality - Image quality (0.1 to 1.0, only applies to jpg/webp)
 */
export const downloadImage = async (imageUrl, filename, format = 'jpg', quality = 0.9) => {
  try {
    // Validate format
    const validFormats = ['png', 'jpg', 'webp'];
    if (!validFormats.includes(format.toLowerCase())) {
      throw new Error(`Invalid format: ${format}. Supported formats: ${validFormats.join(', ')}`);
    }

    // Validate quality
    if (quality < 0.1 || quality > 1.0) {
      quality = 0.9; // Default fallback
    }

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create an image element
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed
    
    // Load the image
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Set canvas dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw the image on canvas
    ctx.drawImage(img, 0, 0);

    // Convert to desired format
    let mimeType;
    let extension;
    
    switch (format.toLowerCase()) {
      case 'png':
        mimeType = 'image/png';
        extension = 'png';
        break;
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        extension = 'jpg';
        break;
      case 'webp':
        mimeType = 'image/webp';
        extension = 'webp';
        break;
      default:
        mimeType = 'image/jpeg';
        extension = 'jpg';
    }

    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      if (format.toLowerCase() === 'png') {
        // PNG doesn't support quality parameter
        canvas.toBlob(resolve, mimeType);
      } else {
        // Apply quality for JPEG and WebP
        canvas.toBlob(resolve, mimeType, quality);
      }
    });

    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Clean filename and add extension
    const cleanFilename = filename.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    link.href = url;
    link.download = `${cleanFilename}.${extension}`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    const qualityText = format.toLowerCase() === 'png' ? '' : ` (${Math.round(quality * 100)}% quality)`;
    toast.success(`Image downloaded as ${format.toUpperCase()}${qualityText}!`);
    
  } catch (error) {
    console.error('Download failed:', error);
    toast.error(`Failed to download image: ${error.message}`);
  }
};

// Predefined quality presets
export const QUALITY_PRESETS = {
  low: { value: 0.6, label: 'Low (60%)' },
  medium: { value: 0.8, label: 'Medium (80%)' },
  high: { value: 0.9, label: 'High (90%)' },
  maximum: { value: 1.0, label: 'Maximum (100%)' }
};

// Supported formats
export const SUPPORTED_FORMATS = [
  { value: 'jpg', label: 'JPEG', description: 'Best for photos, smaller file size' },
  { value: 'png', label: 'PNG', description: 'Best for graphics, supports transparency' },
  { value: 'webp', label: 'WebP', description: 'Modern format, smallest file size' }
];