/**
 * Image optimization utilities
 * Helps optimize external and local images for better performance
 */

/**
 * Get optimized image URL with query parameters for external CDNs
 * Many CDNs support query parameters for on-the-fly optimization
 */
export function getOptimizedImageUrl(url: string, options: {
  width?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
} = {}): string {
  const { width = 1920, quality = 80, format = 'webp' } = options;
  
  // If it's a local image, return as-is
  if (url.startsWith('/')) {
    return url;
  }
  
  // For external images, try to add optimization parameters
  // This works with many CDNs like Cloudinary, imgix, etc.
  try {
    const urlObj = new URL(url);
    
    // Check if it's already optimized or has parameters
    if (urlObj.search) {
      return url; // Already has parameters, don't modify
    }
    
    // For common CDN patterns, add optimization params
    // Note: This is a fallback - ideally images should be downloaded and optimized locally
    if (urlObj.hostname.includes('unsplash.com')) {
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('fm', format);
      return urlObj.toString();
    }
    
    if (urlObj.hostname.includes('pexels.com')) {
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('auto', 'compress');
      return urlObj.toString();
    }
    
    // For other external images, return as-is
    // Performance warning will still show, but at least we tried
    return url;
  } catch {
    return url;
  }
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(url: string, sizes: number[] = [640, 1024, 1920]): string {
  if (url.startsWith('/')) {
    // Local images - just return the URL for each size
    // In production, you'd want to generate these sizes
    return sizes.map(size => `${url} ${size}w`).join(', ');
  }
  
  // For external images with CDN support
  return sizes.map(size => {
    const optimized = getOptimizedImageUrl(url, { width: size, quality: 80 });
    return `${optimized} ${size}w`;
  }).join(', ');
}

/**
 * Get appropriate sizes attribute based on layout
 */
export function getSizesAttribute(layout: 'full' | 'half' | 'third' | 'hero' = 'full'): string {
  switch (layout) {
    case 'hero':
      return '100vw';
    case 'full':
      return '(max-width: 1280px) 100vw, 1280px';
    case 'half':
      return '(max-width: 768px) 100vw, 50vw';
    case 'third':
      return '(max-width: 768px) 100vw, 33vw';
    default:
      return '100vw';
  }
}

/**
 * Check if image is external
 */
export function isExternalImage(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Get image loading strategy based on position
 */
export function getLoadingStrategy(index: number, isAboveFold: boolean = false): {
  loading: 'eager' | 'lazy';
  fetchpriority: 'high' | 'low' | 'auto';
  decoding: 'async' | 'sync' | 'auto';
} {
  if (isAboveFold && index === 0) {
    return {
      loading: 'eager',
      fetchpriority: 'high',
      decoding: 'async'
    };
  }
  
  return {
    loading: 'lazy',
    fetchpriority: 'low',
    decoding: 'async'
  };
}
