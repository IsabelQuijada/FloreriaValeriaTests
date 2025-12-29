/**
 * OptimizedImageLoader - Sistema unificado y optimizado de carga de imágenes
 * 
 * Combina las mejores funcionalidades de LazyLoader y ResponsiveImageLoader
 * en un sistema más ligero y eficiente.
 */

class OptimizedImageLoader {
    constructor(options = {}) {
        this.options = {
            // Configuración básica de lazy loading
            rootMargin: '50px',
            threshold: 0.1,
            
            // Configuración de breakpoints
            breakpoints: {
                mobile: { max: 480, quality: 70, size: 'small' },
                tablet: { max: 768, quality: 75, size: 'medium' },
                desktop: { max: 1200, quality: 85, size: 'large' },
                large: { max: Infinity, quality: 90, size: 'xlarge' }
            },
            
            // Configuración de preload
            preloadCritical: true,
            criticalImages: 3,
            
            ...options
        };
        
        this.observer = null;
        this.currentBreakpoint = this.detectBreakpoint();
        this.supportsWebP = false;
        this.preloadedImages = new Set();
        
        this.init();
    }
    
    /**
     * Inicialización del sistema
     */
    async init() {
        // Detectar soporte WebP
        this.supportsWebP = await this.detectWebPSupport();
        
        // Configurar Intersection Observer
        this.setupIntersectionObserver();
        
        // Configurar listener para cambios de tamaño
        this.setupResizeListener();
        
        // Precargar imágenes críticas
        if (this.options.preloadCritical) {
            this.preloadCriticalImages();
        }
        
        // Observar imágenes existentes
        this.observeImages();
        
        console.log('🖼️ OptimizedImageLoader inicializado', {
            breakpoint: this.currentBreakpoint.name,
            webpSupport: this.supportsWebP
        });
    }
    
    /**
     * Detecta el breakpoint actual
     */
    detectBreakpoint() {
        const width = window.innerWidth;
        
        for (const [name, config] of Object.entries(this.options.breakpoints)) {
            if (width <= config.max) {
                return { name, ...config };
            }
        }
        
        return { name: 'desktop', ...this.options.breakpoints.desktop };
    }
    
    /**
     * Detecta soporte para WebP
     */
    detectWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = function () {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    /**
     * Configura el Intersection Observer
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores antiguos
            this.initFallback();
            return;
        }
        
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            }
        );
    }
    
    /**
     * Fallback para navegadores sin IntersectionObserver
     */
    initFallback() {
        this.fallbackImages = [];
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
        }, 250);
    }
    
    /**
     * Verifica si un elemento está en el viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top >= -50 &&
            rect.bottom <= windowHeight + 50
        );
    }
    
    /**
     * Configura listener para cambios de tamaño
     */
    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.detectBreakpoint();
                if (newBreakpoint.name !== this.currentBreakpoint.name) {
                    this.currentBreakpoint = newBreakpoint;
                    console.log(`📱 Breakpoint cambió a: ${newBreakpoint.name}`);
                }
            }, 250);
        });
    }
    
    /**
     * Observa imágenes para lazy loading
     */
    observeImages(selector = 'img[data-src]:not(.observed), img.lazy:not(.observed)') {
        const images = document.querySelectorAll(selector);
        
        images.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            } else {
                this.fallbackImages.push(img);
            }
            img.classList.add('observed');
        });
        
        return images.length;
    }
    
    /**
     * Carga una imagen específica
     */
    async loadImage(imgElement) {
        if (imgElement.classList.contains('loaded') || 
            imgElement.classList.contains('loading')) {
            return;
        }

        imgElement.classList.add('loading');
        
        const originalSrc = imgElement.getAttribute('data-src') || imgElement.src;
        if (!originalSrc) {
            imgElement.classList.remove('loading');
            return;
        }

        try {
            // Intentar cargar la imagen
            const success = await this.tryLoadImage(originalSrc);
            
            if (success) {
                this.setImageSrc(imgElement, originalSrc);
            } else {
                this.handleImageError(imgElement, originalSrc);
            }
            
        } catch (error) {
            console.warn('Error loading image:', error);
            this.handleImageError(imgElement, originalSrc);
        }
    }
    
    /**
     * Intenta cargar una imagen
     */
    tryLoadImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            
            // Timeout de 5 segundos
            setTimeout(() => resolve(false), 5000);
            
            img.src = url;
        });
    }
    
    /**
     * Establece la fuente de la imagen y maneja las clases
     */
    setImageSrc(imgElement, src) {
        imgElement.src = src;
        imgElement.classList.remove('loading');
        imgElement.classList.add('loaded');
        
        // Disparar evento personalizado
        imgElement.dispatchEvent(new CustomEvent('imageLoaded', { 
            detail: { src, element: imgElement }
        }));
    }
    
    /**
     * Maneja errores de carga de imagen
     */
    handleImageError(imgElement, originalSrc) {
        imgElement.classList.remove('loading');
        imgElement.classList.add('error');
        
        // Intentar con fallback si está disponible
        const fallbackSrc = imgElement.getAttribute('data-fallback-src');
        if (fallbackSrc && !imgElement.hasAttribute('data-fallback-tried')) {
            imgElement.setAttribute('data-fallback-tried', 'true');
            imgElement.setAttribute('data-src', fallbackSrc);
            this.loadImage(imgElement);
            return;
        }
        
        // Usar placeholder como última opción
        imgElement.src = this.generatePlaceholder();
        
        console.warn('❌ Error loading image:', originalSrc);
    }
    
    /**
     * Genera un placeholder SVG
     */
    generatePlaceholder(width = 400, height = 400) {
        const color = '#f0f0f0';
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color}'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-family='Arial' font-size='16' dy='0.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E`;
    }
    
    /**
     * Precarga imágenes críticas
     */
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('.hero img, .critical-image');
        const limit = Math.min(criticalImages.length, this.options.criticalImages);
        
        for (let i = 0; i < limit; i++) {
            const img = criticalImages[i];
            const src = img.getAttribute('data-src') || img.src;
            
            if (src && !this.preloadedImages.has(src)) {
                this.preloadImage(src);
                this.preloadedImages.add(src);
            }
        }
    }
    
    /**
     * Precarga una imagen específica
     */
    preloadImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    }
    
    /**
     * Método público para cargar nuevas imágenes dinámicamente
     */
    loadNewImages(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            const imageCount = this.observeImages('img[data-src]:not(.observed), img.lazy:not(.observed)');
            console.log(`🔄 Observando ${imageCount} nuevas imágenes`);
        }
    }
    
    /**
     * Obtiene estadísticas de carga
     */
    getStats() {
        const allImages = document.querySelectorAll('img');
        const loadedImages = document.querySelectorAll('img.loaded');
        const loadingImages = document.querySelectorAll('img.loading');
        
        return {
            total: allImages.length,
            loaded: loadedImages.length,
            loading: loadingImages.length,
            pending: allImages.length - loadedImages.length - loadingImages.length,
            breakpoint: this.currentBreakpoint.name,
            webpSupport: this.supportsWebP
        };
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
        
        this.preloadedImages.clear();
    }
}

// Auto-inicializar cuando esté listo el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (!window.optimizedImageLoader) {
        window.optimizedImageLoader = new OptimizedImageLoader({
            preloadCritical: true,
            criticalImages: 5
        });
    }
});

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.OptimizedImageLoader = OptimizedImageLoader;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedImageLoader;
}