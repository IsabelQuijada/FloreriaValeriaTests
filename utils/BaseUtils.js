/**
 * Base Utility Class - Consolidación de utilidades comunes
 * Elimina duplicación entre diferentes utils de categorías
 */
class BaseUtils {
    constructor(categoryConfig) {
        this.categoryConfig = categoryConfig;
    }
    
    /**
     * Formatea nombre de producto de manera consistente
     * @param {string} filename - Nombre del archivo
     * @param {string} category - Categoría del producto
     * @returns {string} Nombre formateado
     */
    formatProductName(filename, category) {
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        const categoryDisplayName = this.categoryConfig.categoryDisplayNames?.[category] || 
                                   this.formatCategoryName(category);
        
        return `${categoryDisplayName} ${number}`;
    }
    
    /**
     * Formatea nombre de categoría para display
     * @param {string} category - Nombre de categoría técnico
     * @returns {string} Nombre formateado para mostrar
     */
    formatCategoryName(category) {
        return category
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    /**
     * Genera mensaje de WhatsApp personalizado por categoría
     * @param {string} productName - Nombre del producto
     * @param {string} category - Categoría del producto
     * @returns {string} Mensaje de WhatsApp
     */
    generateWhatsAppMessage(productName, category) {
        const categoryDisplayName = this.formatCategoryName(category);
        const categoryContext = this.categoryConfig.contextMessages?.[category] || 
                               `de la categoría ${categoryDisplayName}`;
        
        return `¡Hola! Me interesa el producto "${productName}" ${categoryContext}. ¿Podrían darme más información sobre precios y disponibilidad?`;
    }
    
    /**
     * Genera descripción por defecto para productos
     * @param {string} category - Categoría
     * @param {number} index - Índice del producto
     * @returns {string} Descripción
     */
    generateDefaultDescription(category, index) {
        const baseDescription = this.categoryConfig.baseDescription || 'Producto de calidad premium';
        const categoryName = this.formatCategoryName(category);
        
        return `${categoryName} ${index} - ${baseDescription} con diseño exclusivo y materiales de primera calidad.`;
    }
    
    /**
     * Valida configuración de producto
     * @param {Object} product - Objeto producto
     * @returns {Object} Resultado de validación
     */
    validateProduct(product) {
        const required = ['id', 'name', 'image', 'category'];
        const missing = required.filter(field => !product[field]);
        
        return {
            isValid: missing.length === 0,
            missing,
            warnings: this.getProductWarnings(product)
        };
    }
    
    /**
     * Obtiene advertencias de producto
     * @private
     */
    getProductWarnings(product) {
        const warnings = [];
        
        if (!product.description || product.description.length < 10) {
            warnings.push('Description is too short or missing');
        }
        
        if (!product.price) {
            warnings.push('Price information missing');
        }
        
        if (product.image && !this.isValidImagePath(product.image)) {
            warnings.push('Image path may be invalid');
        }
        
        return warnings;
    }
    
    /**
     * Valida ruta de imagen
     * @private
     */
    isValidImagePath(imagePath) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
        return validExtensions.some(ext => 
            imagePath.toLowerCase().includes(ext)
        );
    }
    
    /**
     * Inicializa comportamientos comunes
     */
    initializeCommonBehaviors() {
        this.setupImageErrorHandling();
        this.setupAccessibilityEnhancements();
        this.setupPerformanceOptimizations();
    }
    
    /**
     * Configura manejo de errores de imagen
     * @private
     */
    setupImageErrorHandling() {
        window.eventManager.addDelegatedEventListener(
            document, 'img', 'error', (event) => {
                const img = event.target;
                if (!img.dataset.errorHandled) {
                    img.dataset.errorHandled = 'true';
                    img.src = this.categoryConfig.fallbackImage || 
                             '/assets/placeholders/image-not-found.png';
                    img.alt = 'Imagen no disponible';
                }
            }
        );
    }
    
    /**
     * Mejoras de accesibilidad
     * @private
     */
    setupAccessibilityEnhancements() {
        // Mejorar navegación por teclado
        window.eventManager.addDelegatedEventListener(
            document, '.product-card', 'keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.target.click();
                }
            }
        );
        
        // Añadir atributos ARIA faltantes
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach((card, index) => {
                if (!card.getAttribute('role')) {
                    card.setAttribute('role', 'button');
                }
                if (!card.getAttribute('aria-label')) {
                    const productName = card.querySelector('.product-title')?.textContent;
                    if (productName) {
                        card.setAttribute('aria-label', `Ver detalles de ${productName}`);
                    }
                }
                card.setAttribute('tabindex', '0');
            });
        }, 500);
    }
    
    /**
     * Optimizaciones de rendimiento
     * @private
     */
    setupPerformanceOptimizations() {
        // Preload de imágenes críticas
        if (this.categoryConfig.preloadImages) {
            this.preloadCriticalImages();
        }
        
        // Optimización de scroll
        let ticking = false;
        window.eventManager.addEventListener(window, 'scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /**
     * Preload de imágenes críticas
     * @private
     */
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('img[data-critical="true"]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    }
    
    /**
     * Maneja eventos de scroll optimizados
     * @private
     */
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // Trigger eventos personalizados para componentes
        document.dispatchEvent(new CustomEvent('optimizedScroll', {
            detail: { scrollTop, scrollPercent }
        }));
    }
    
    /**
     * Debug y logging específico por categoría
     */
    debug(message, data = null) {
        if (window.FloreriaLogger) {
            window.FloreriaLogger.debug(`[${this.categoryConfig.name}] ${message}`, data);
        }
    }
    
    /**
     * Cleanup de recursos específicos
     */
    cleanup() {
        // Override en subclases si necesario
    }
}

/**
 * Factory para crear utilities específicas por categoría
 */
class UtilsFactory {
    static instances = new Map();
    
    /**
     * Obtiene o crea utility para categoría específica
     */
    static getUtils(categoryType, config) {
        if (!this.instances.has(categoryType)) {
            const UtilsClass = this.getUtilsClass(categoryType);
            this.instances.set(categoryType, new UtilsClass(config));
        }
        return this.instances.get(categoryType);
    }
    
    /**
     * Obtiene clase de utility según tipo
     * @private
     */
    static getUtilsClass(categoryType) {
        // Para mantener compatibilidad, primero buscar clases específicas existentes
        const classNames = {
            'ramos-elegantes': 'RamosElegantesUtils',
            'ramos-clasicos': 'RamosClasicosUtils',
            'quinceanera': 'QuinceaneraUtils',
            'bodas': 'BodasDeEnsuenioUtils',
            'celebraciones': 'CelebracionesEspecialesUtils',
            'cumpleanos': 'CumpleanosUtils',
            'eventos-religiosos': 'EventosReligiososUtils',
            'galeria-funeraria': 'GaleriaFunerariaUtils'
        };
        
        const className = classNames[categoryType];
        if (className && window[className]) {
            return window[className];
        }
        
        // Fallback a BaseUtils
        return BaseUtils;
    }
    
    /**
     * Limpia todas las instancias
     */
    static cleanup() {
        this.instances.forEach(instance => {
            if (typeof instance.cleanup === 'function') {
                instance.cleanup();
            }
        });
        this.instances.clear();
    }
}

// Export global
if (typeof window !== 'undefined') {
    window.BaseUtils = BaseUtils;
    window.UtilsFactory = UtilsFactory;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BaseUtils, UtilsFactory };
}