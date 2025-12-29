/**
 * Utilidad Simple de Optimización de Imágenes
 * 
 * Versión minimalista que SOLO proporciona utilidades opcionales
 * NO interfiere con el funcionamiento normal del sitio
 */

// Utilidad simple para generar URLs de CDN cuando esté configurado
window.ImageUtils = {
    /**
     * Genera URL optimizada solo si CDN está configurado
     */
    getCDNUrl: function(originalUrl, options = {}) {
        const config = window.FLORERIA_CONFIG?.IMAGES?.CDN;
        
        if (!config || !config.enabled || !originalUrl) {
            return originalUrl;
        }
        
        const { size = 'medium', quality = 85 } = options;
        
        try {
            // Solo para Cloudinary por ahora
            if (config.provider === 'cloudinary') {
                const cleanPath = originalUrl.replace(/^\.\//, '').replace(/^assets\//, '');
                
                const sizeMap = {
                    small: 'w_300,h_300',
                    medium: 'w_600,h_600', 
                    large: 'w_1200,h_1200'
                };
                
                const transforms = `${sizeMap[size] || sizeMap.medium},c_fill,f_auto,q_${quality}`;
                return `${config.baseUrl}/image/upload/${transforms}/${cleanPath}`;
            }
            
            return originalUrl;
        } catch (error) {
            console.warn('Error generating CDN URL:', error);
            return originalUrl;
        }
    },
    
    /**
     * Detecta soporte de WebP
     */
    supportsWebP: function() {
        if (this._webpSupport !== undefined) {
            return Promise.resolve(this._webpSupport);
        }
        
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                this._webpSupport = webP.height === 2;
                resolve(this._webpSupport);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },
    
    /**
     * Crea un placeholder simple
     */
    createPlaceholder: function(width = 300, height = 300, text = '🌸') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#999';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, width/2, height/2 + 8);
        
        return canvas.toDataURL();
    }
};

// Función simple para usar CDN si está disponible
window.optimizeImageUrl = function(url, options = {}) {
    return window.ImageUtils.getCDNUrl(url, options);
};

console.log('Simple Image Utils loaded');