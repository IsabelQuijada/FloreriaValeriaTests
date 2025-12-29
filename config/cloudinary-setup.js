/**
 * Configuración para Cloudinary - CDN gratuito para imágenes
 * 
 * Pasos para configurar:
 * 1. Crear cuenta gratuita en cloudinary.com
 * 2. Obtener cloud_name de tu dashboard
 * 3. Reemplazar YOUR_CLOUD_NAME con tu cloud name real
 * 4. Subir las imágenes a Cloudinary
 */

// Agregar esta configuración a global-config.js
window.FLORERIA_CONFIG.IMAGES.CDN = {
    enabled: true,
    provider: 'cloudinary',
    baseUrl: 'https://res.cloudinary.com/YOUR_CLOUD_NAME',
    cloudName: 'YOUR_CLOUD_NAME',
    
    // Configuración de transformaciones automáticas
    defaultTransformations: {
        format: 'auto', // Formato automático (WebP, AVIF, etc.)
        quality: 'auto', // Calidad automática
        fetchFormat: 'auto'
    }
};

/**
 * Función helper para generar URLs de Cloudinary
 */
window.FLORERIA_UTILS.getCloudinaryURL = function(imagePath, options = {}) {
    const config = window.FLORERIA_CONFIG.IMAGES.CDN;
    
    if (!config.enabled || !config.cloudName) {
        return imagePath; // Fallback a imagen local
    }
    
    const {
        width = 800,
        height = 600,
        quality = 'auto',
        format = 'auto',
        crop = 'fill'
    } = options;
    
    // Limpiar path de imagen
    const cleanPath = imagePath.replace(/^\.\/assets\//, '').replace(/^assets\//, '');
    
    // Generar transformaciones
    const transforms = [
        `w_${width}`,
        `h_${height}`,
        `c_${crop}`,
        `q_${quality}`,
        `f_${format}`
    ].join(',');
    
    return `${config.baseUrl}/image/upload/${transforms}/${cleanPath}`;
};

// Ejemplo de uso:
// window.FLORERIA_UTILS.getCloudinaryURL('./assets/ramosElegantes/Ramo1.png', {
//     width: 400,
//     height: 400,
//     quality: 80
// });