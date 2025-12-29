/**
 * LazyLoader - Sistema de carga diferida de imágenes simple y confiable
 * 
 * Versión simplificada que se centra en funcionalidad básica sin complicaciones
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.1,
            loadingClass: 'lazy-loading',
            loadedClass: 'lazy-loaded',
            errorClass: 'lazy-error',
            enableIntersectionObserver: 'IntersectionObserver' in window,
            fallbackPolling: 250,
            ...options
        };

        this.observer = null;
        this.fallbackImages = [];
        this.pollInterval = null;
        
        this.init();
    }

    /**
     * Inicializa el sistema de lazy loading
     */
    init() {
        if (this.options.enableIntersectionObserver) {
            this.initIntersectionObserver();
        } else {
            this.initFallback();
        }
        
        this.observeImages();
        this.setupDynamicObserver();
    }

    /**
     * Configura el Intersection Observer
     */
    initIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        });
    }

    /**
     * Configura fallback para navegadores antiguos
     */
    initFallback() {
        this.startPolling();
    }

    /**
     * Observa todas las imágenes con lazy loading
     */
    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src]:not(.lazy-observed)');
        
        lazyImages.forEach(img => {
            img.classList.add('lazy-observed');
            
            if (this.observer) {
                this.observer.observe(img);
            } else {
                this.fallbackImages.push(img);
            }
        });
    }

    /**
     * Carga una imagen específica
     */
    loadImage(img) {
        if (img.classList.contains(this.options.loadedClass) || 
            img.classList.contains(this.options.loadingClass)) {
            return;
        }

        img.classList.add(this.options.loadingClass);
        
        const src = img.getAttribute('data-src');
        if (!src) {
            img.classList.remove(this.options.loadingClass);
            return;
        }

        // Precargar imagen
        const imageLoader = new Image();
        
        // Configurar timeout más largo para conexiones lentas
        const timeout = setTimeout(() => {
            this.handleImageError(img, 'Timeout de carga');
        }, 10000);
        
        imageLoader.onload = () => {
            clearTimeout(timeout);
            this.handleImageSuccess(img, src);
        };
        
        imageLoader.onerror = () => {
            clearTimeout(timeout);
            this.handleImageError(img, 'Error de carga de imagen');
        };
        
        // Intentar cargar la imagen
        imageLoader.src = src;
    }

    /**
     * Maneja el éxito de carga de imagen
     */
    handleImageSuccess(img, src) {
        img.src = src;
        img.classList.remove(this.options.loadingClass);
        img.classList.add(this.options.loadedClass);
        
        // Triggear evento personalizado
        img.dispatchEvent(new CustomEvent('imageLoaded', { 
            detail: { src, success: true } 
        }));
    }

    /**
     * Maneja errores de carga de imagen
     */
    handleImageError(img, errorMessage) {
        img.classList.remove(this.options.loadingClass);
        img.classList.add(this.options.errorClass);
        
        console.warn(`LazyLoader: ${errorMessage} para ${img.getAttribute('data-src')}`);
        
        // Intentar con fallback si está disponible
        const fallbackSrc = img.getAttribute('data-fallback-src');
        if (fallbackSrc && !img.hasAttribute('data-fallback-tried')) {
            img.setAttribute('data-fallback-tried', 'true');
            img.setAttribute('data-src', fallbackSrc);
            this.loadImage(img);
            return;
        }
        
        // Usar placeholder como última opción
        if (window.ImagePathResolver) {
            img.src = window.ImagePathResolver.generatePlaceholder();
        } else {
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3Ctext x="200" y="200" text-anchor="middle" fill="%23999" font-family="Arial" font-size="16"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
        }
        
        // Triggear evento de error
        img.dispatchEvent(new CustomEvent('imageError', { 
            detail: { originalSrc: img.getAttribute('data-src'), error: errorMessage } 
        }));
        
        imageLoader.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.loadedClass);
        };
        
        imageLoader.onerror = () => {
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.errorClass);
            img.removeAttribute('data-src');
            console.warn('Failed to load image:', src);
        };
        
        imageLoader.src = src;
    }

    /**
     * Sistema de polling para navegadores sin IntersectionObserver
     */
    startPolling() {
        this.pollInterval = setInterval(() => {
            this.fallbackImages = this.fallbackImages.filter(img => {
                if (this.isInViewport(img)) {
                    this.loadImage(img);
                    return false;
                }
                return true;
            });

            if (this.fallbackImages.length === 0) {
                clearInterval(this.pollInterval);
                this.pollInterval = null;
            }
        }, this.options.fallbackPolling);
    }

    /**
     * Verifica si un elemento está en el viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -50 &&
            rect.left >= -50 &&
            rect.bottom <= windowHeight + 50 &&
            rect.right <= windowWidth + 50
        );
    }

    /**
     * Configura observador para elementos añadidos dinámicamente
     */
    setupDynamicObserver() {
        if ('MutationObserver' in window) {
            const mutationObserver = new MutationObserver(() => {
                clearTimeout(this.dynamicTimeout);
                this.dynamicTimeout = setTimeout(() => {
                    this.observeImages();
                }, 100);
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    /**
     * Destructor
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
        
        this.fallbackImages = [];
    }

    /**
     * Método estático para inicialización
     */
    static init(options = {}) {
        if (typeof window !== 'undefined') {
            return new LazyLoader(options);
        }
    }
}

// Auto-inicializar cuando esté listo el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (!window.lazyLoader) {
        window.lazyLoader = new LazyLoader();
    }
});

// Exportar
if (typeof window !== 'undefined') {
    window.LazyLoader = LazyLoader;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}