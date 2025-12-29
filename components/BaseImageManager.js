/**
 * Base ImageManager - Abstract class para manejar imágenes por categoría
 * Elimina duplicación de código entre categories
 * 
 * @abstract
 */
class BaseImageManager {
    constructor(categoryConfig) {
        if (this.constructor === BaseImageManager) {
            throw new Error('BaseImageManager is abstract and cannot be instantiated directly');
        }
        
        this.categoryConfig = categoryConfig;
        this.imageDatabase = {};
        this.descriptions = {};
        this.config = this.getConfig();
        
        this.init();
    }
    
    /**
     * Template method pattern - debe ser implementado por subclases
     * @abstract
     */
    init() {
        throw new Error('init() must be implemented by subclass');
    }
    
    /**
     * Template method pattern - debe ser implementado por subclases
     * @abstract
     */
    getConfig() {
        throw new Error('getConfig() must be implemented by subclass');
    }
    
    /**
     * Obtiene la ruta base para una categoría específica
     * @param {string} category - Nombre de la categoría
     * @returns {string} Ruta de la categoría
     */
    getCategoryPath(category) {
        const basePath = this.config.ROUTES[this.categoryConfig.baseRoute] || '../../assets/';
        const subPath = this.categoryConfig.subcategories?.[category] || '';
        return `${basePath}${subPath}`;
    }
    
    /**
     * Genera productos para una categoría específica
     * @param {string} category - Nombre de la categoría
     * @returns {Array} Array de productos
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category];
        if (!images) {
            console.warn(`Category ${category} not found in imageDatabase`);
            return [];
        }
        
        const basePath = this.getCategoryPath(category);
        
        return images.map((filename, index) => ({
            id: `${this.categoryConfig.name.toLowerCase().replace(/\s+/g, '-')}-${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            description: this.descriptions[filename] || this.getDefaultDescription(category, index + 1),
            image: `${basePath}${filename}`,
            category: category,
            price: '',
            link: this.categoryConfig.link || '#'
        }));
    }
    
    /**
     * Genera un nombre descriptivo para el producto
     * @param {string} filename - Nombre del archivo
     * @param {string} category - Categoría del producto
     * @returns {string} Nombre del producto
     */
    generateProductName(filename, category) {
        // Buscar utility específica de la categoría
        const utilityName = `${this.categoryConfig.name.toLowerCase().replace(/\s+/g, '')}Utils`;
        const categoryUtils = window[utilityName];
        
        if (categoryUtils && typeof categoryUtils.formatProductName === 'function') {
            return categoryUtils.formatProductName(filename, category);
        }
        
        // Fallback genérico
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        const categoryDisplayName = this.categoryConfig.categoryDisplayNames?.[category] || category;
        
        return `${categoryDisplayName} ${number}`;
    }
    
    /**
     * Obtiene descripción por defecto
     * @param {string} category - Categoría
     * @param {number} index - Índice del producto
     * @returns {string} Descripción
     */
    getDefaultDescription(category, index) {
        return `${this.categoryConfig.categoryDisplayNames?.[category] || category} ${index} - ${this.categoryConfig.defaultDescription || 'Producto de calidad premium'}`;
    }
    
    /**
     * Obtiene todos los productos de todas las categorías
     * @returns {Array} Array completo de productos
     */
    getAllProducts() {
        return Object.keys(this.imageDatabase).reduce((allProducts, category) => {
            return [...allProducts, ...this.generateCategoryProducts(category)];
        }, []);
    }
    
    /**
     * Obtiene categorías disponibles
     * @returns {Array} Array de categorías
     */
    getAvailableCategories() {
        return Object.keys(this.imageDatabase);
    }
    
    /**
     * Obtiene estadísticas de productos
     * @returns {Object} Estadísticas
     */
    getProductStats() {
        const stats = { total: 0, byCategory: {} };
        
        Object.entries(this.imageDatabase).forEach(([category, images]) => {
            const count = images.length;
            stats.byCategory[category] = count;
            stats.total += count;
        });
        
        return stats;
    }
}

/**
 * Factory para crear ImageManagers específicos
 */
class ImageManagerFactory {
    static managers = new Map();
    
    /**
     * Crea o retorna ImageManager existente para una categoría
     * @param {string} categoryType - Tipo de categoría
     * @param {Object} config - Configuración específica
     * @returns {BaseImageManager} Instance del manager
     */
    static getManager(categoryType, config) {
        if (!this.managers.has(categoryType)) {
            const Manager = this.getManagerClass(categoryType);
            this.managers.set(categoryType, new Manager(config));
        }
        return this.managers.get(categoryType);
    }
    
    /**
     * Obtiene la clase del manager según el tipo
     * @private
     */
    static getManagerClass(categoryType) {
        switch (categoryType) {
            case 'ramos-elegantes':
                return RamosElegantesImageManager;
            case 'ramos-clasicos':
                return RamosClasicosImageManager;
            case 'quinceanera':
                return QuinceaneraImageManager;
            case 'bodas':
                return BodasDeEnsuenioImageManager;
            case 'celebraciones':
                return CelebracionesEspecialesImageManager;
            case 'cumpleanos':
                return CumpleanosImageManager;
            case 'eventos-religiosos':
                return EventosReligiososImageManager;
            case 'galeria-funeraria':
                return GaleriaFunerariaImageManager;
            default:
                throw new Error(`Unknown category type: ${categoryType}`);
        }
    }
    
    /**
     * Limpia managers para evitar memory leaks
     */
    static cleanup() {
        this.managers.clear();
    }
}

// Export para uso global
if (typeof window !== 'undefined') {
    window.BaseImageManager = BaseImageManager;
    window.ImageManagerFactory = ImageManagerFactory;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BaseImageManager, ImageManagerFactory };
}