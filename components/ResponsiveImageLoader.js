/**
 * ResponsiveImageLoader - Sistema avanzado de carga optimizada de imágenes
 * 
 * Características:
 * - Detección de tamaño de pantalla
 * - Soporte para WebP con fallback
 * - Lazy loading inteligente
 * - Compresión adaptativa
 * - Preload de imágenes críticas
 */

class ResponsiveImageLoader {
    constructor(options = {}) {
        this.options = {
            // Breakpoints para diferentes tamaños
            breakpoints: {
                mobile: { max: 480, quality: 70, size: 'small' },
                tablet: { max: 768, quality: 75, size: 'medium' },
                desktop: { max: 1200, quality: 85, size: 'large' },
                large: { max: Infinity, quality: 90, size: 'xlarge' }
            },
            
            // Configuración de formatos
            formats: ['webp', 'jpg', 'png'],
            
            // Configuración de lazy loading
            rootMargin: '50px',
            threshold: 0.1,
            
            // Configuración de preload
            preloadCritical: true,
            criticalImages: 3,
            
            ...options
        };
        
        this.currentBreakpoint = this.detectBreakpoint();
        this.supportsWebP = false;
        this.observer = null;
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
        
        console.log('🚀 ResponsiveImageLoader inicializado', {
            breakpoint: this.currentBreakpoint,
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
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
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
                    this.updateVisibleImages();
                }
            }, 250);
        });
    }
    
    /**
     * Genera URL optimizada para una imagen
     */
    generateOptimizedUrl(originalUrl, options = {}) {
        const { 
            size = this.currentBreakpoint.size,
            quality = this.currentBreakpoint.quality,
            format = this.supportsWebP ? 'webp' : 'jpg'
        } = options;
        
        // Si la imagen ya está optimizada, devolver tal como está
        if (originalUrl.includes('optimized') || originalUrl.includes('.webp')) {
            return originalUrl;
        }
        
        // Generar nueva ruta con parámetros de optimización
        const pathParts = originalUrl.split('/');
        const fileName = pathParts.pop();
        const nameWithoutExt = fileName.split('.')[0];
        
        // Crear nombre optimizado
        const optimizedName = `${nameWithoutExt}_${size}_q${quality}.${format}`;
        const optimizedPath = [...pathParts, 'optimized', optimizedName].join('/');
        
        return optimizedPath;
    }
    
    /**
     * Carga una imagen con la estrategia optimizada
     */
    async loadImage(imgElement) {
        const originalSrc = imgElement.getAttribute('data-src') || imgElement.src;
        
        if (!originalSrc) return;
        
        // Marcar como cargando
        imgElement.classList.add('loading');
        
        try {
            // Intentar cargar versión optimizada
            const optimizedUrl = this.generateOptimizedUrl(originalSrc);
            const success = await this.tryLoadImage(optimizedUrl);
            
            if (success) {
                this.setImageSrc(imgElement, optimizedUrl);
            } else {
                // Fallback a imagen original
                this.setImageSrc(imgElement, originalSrc);
                console.warn('📸 Fallback to original image:', originalSrc);
            }
            
        } catch (error) {
            console.error('❌ Error loading image:', error);
            // Fallback a imagen original
            this.setImageSrc(imgElement, originalSrc);
        }
        
        // Quitar del observer
        this.observer.unobserve(imgElement);
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
     * Observa imágenes para lazy loading
     */
    observeImages(selector = 'img[data-src], img.lazy') {
        const images = document.querySelectorAll(selector);
        
        images.forEach(img => {
            if (!img.classList.contains('observed')) {
                this.observer.observe(img);
                img.classList.add('observed');
            }
        });
        
        return images.length;
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
        link.href = this.generateOptimizedUrl(src);
        document.head.appendChild(link);
    }
    
    /**
     * Actualiza imágenes visibles cuando cambia el breakpoint
     */
    updateVisibleImages() {
        const visibleImages = document.querySelectorAll('img.loaded');
        
        visibleImages.forEach(img => {
            const originalSrc = img.getAttribute('data-original-src') || img.src;
            const newOptimizedUrl = this.generateOptimizedUrl(originalSrc);
            
            if (img.src !== newOptimizedUrl) {
                img.src = newOptimizedUrl;
            }
        });
    }
    
    /**
     * Método público para cargar nuevas imágenes dinámicamente
     */
    loadNewImages(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (container) {
            const newImages = container.querySelectorAll('img[data-src]:not(.observed)');
            newImages.forEach(img => {
                this.observer.observe(img);
                img.classList.add('observed');
            });
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
}

// Inicialización automática cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveImageLoader = new ResponsiveImageLoader({
        preloadCritical: true,
        criticalImages: 5
    });
    
    // Observar imágenes existentes
    const imageCount = window.responsiveImageLoader.observeImages();
    console.log(`🖼️ Observando ${imageCount} imágenes para lazy loading`);
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveImageLoader;
}