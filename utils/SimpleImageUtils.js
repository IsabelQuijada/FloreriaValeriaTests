/**
 * SimpleImageUtils - Utilidades simplificadas para manejo de imágenes
 * 
 * Reemplaza tanto image-path-resolver.js como simple-image-utils.js
 * con una implementación más simple y eficiente.
 */

class SimpleImageUtils {
    constructor() {
        this.baseUrl = this.getBaseUrl();
        this.webpSupport = null;
    }
    
    /**
     * Obtiene la URL base según el entorno
     */
    getBaseUrl() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        const isDevelopment = (
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '' ||
            protocol === 'file:' ||
            hostname.includes('localhost')
        );
        
        return isDevelopment ? './assets/' : window.location.origin + '/assets/';
    }
    
    /**
     * Resuelve la ruta completa de una imagen
     */
    resolveImagePath(category, filename) {
        // Mapeo simplificado de categorías
        const categoryPaths = {
            'ramos-elegantes': 'ramosElegantes/',
            'ramos-clasicos': 'ramosClasicos/',
            'ramo-estilizado': 'ramosClasicos/ramoEstilizado/',
            'ramo-girasoles': 'ramosClasicos/ramoGirasoles/',
            'ramo-mix': 'ramosClasicos/ramoMix/',
            'ramo-rosas': 'ramosClasicos/ramoRosas/',
            'ramo-tulipanes': 'ramosClasicos/ramoTulipanes/',
            'bodas-de-ensueno': 'bodasDeEnsueno/',
            'celebraciones-especiales': 'celebracionesEspeciales/',
            'cumpleanos': 'cumpleanos/',
            'eventos-religiosos': 'eventosReligiosos/',
            'galeria-funeraria': 'galeriaFuneraria/',
            'landing-page': 'landingPage/'
        };
        
        const categoryPath = categoryPaths[category];
        if (!categoryPath) {
            console.warn(`Categoría no encontrada: ${category}`);
            return this.generatePlaceholder();
        }
        
        return this.baseUrl + categoryPath + filename;
    }
    
    /**
     * Detecta soporte para WebP de forma sincrónica
     */
    supportsWebP() {
        if (this.webpSupport !== null) {
            return this.webpSupport;
        }
        
        // Método sincrónico simple
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            this.webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (e) {
            this.webpSupport = false;
        }
        
        return this.webpSupport;
    }
    
    /**
     * Genera un placeholder SVG optimizado
     */
    generatePlaceholder(width = 400, height = 400) {
        const color = window.FLORERIA_CONFIG?.IMAGES?.PLACEHOLDER_COLOR || '#f0f0f0';
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color}'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16' dy='0.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E`;
    }
    
    /**
     * Preload de imágenes críticas
     */
    preloadImages(imagePaths) {
        if (!Array.isArray(imagePaths)) return;
        
        imagePaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = path;
            document.head.appendChild(link);
        });
    }
    
    /**
     * Optimiza la URL de una imagen (placeholder por ahora)
     */
    optimizeImageUrl(url, options = {}) {
        // Por ahora devuelve la URL original
        // En el futuro se puede implementar optimización con CDN
        return url;
    }
}

// Instancia global
window.ImageUtils = new SimpleImageUtils();

// Helper functions globales para compatibilidad
window.resolveImagePath = (category, filename) => {
    return window.ImageUtils.resolveImagePath(category, filename);
};

window.optimizeImageUrl = function(url, options = {}) {
    return window.ImageUtils.optimizeImageUrl(url, options);
};

console.log(`🖼️ SimpleImageUtils inicializado - Base URL: ${window.ImageUtils.baseUrl}`);

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleImageUtils;
}