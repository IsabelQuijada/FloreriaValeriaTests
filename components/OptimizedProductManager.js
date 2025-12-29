/**
 * OptimizedProductManager - Versión optimizada y simplificada del ProductManager
 * 
 * Elimina funcionalidades redundantes y mejora el rendimiento
 * manteniendo solo las características esenciales.
 */

class OptimizedProductManager {
    /**
     * @param {Object} config - Configuración del manager
     * @param {string} config.containerId - ID del contenedor donde renderizar
     * @param {Array} config.products - Array de productos
     * @param {Object} config.globalActions - Acciones globales para todos los productos
     * @param {Object} config.options - Opciones adicionales
     */
    constructor(config) {
        this.containerId = config.containerId;
        this.container = document.getElementById(this.containerId);
        this.products = config.products || [];
        this.globalActions = config.globalActions || {};
        this.options = {
            enableLazyLoading: true,
            animationDelay: 100,
            ...config.options
        };
        
        this.currentFilter = null;
        this.currentSearch = '';
        
        this.init();
    }
    
    /**
     * Inicializa el manager
     */
    init() {
        if (!this.container) {
            console.error(`Container with ID "${this.containerId}" not found`);
            return;
        }
        
        this.setupContainer();
        this.render();
        this.setupGlobalEvents();
        
        console.log(`📦 OptimizedProductManager inicializado con ${this.products.length} productos`);
    }
    
    /**
     * Configura el contenedor principal
     */
    setupContainer() {
        this.container.classList.add('product-grid');
        
        // Agregar atributos de accesibilidad
        this.container.setAttribute('role', 'grid');
        this.container.setAttribute('aria-label', 'Galería de productos');
    }
    
    /**
     * Renderiza todos los productos
     */
    render() {
        this.clear();
        
        const filteredProducts = this.getFilteredProducts();
        
        if (filteredProducts.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Crear fragment para mejor rendimiento
        const fragment = document.createDocumentFragment();
        
        filteredProducts.forEach((product, index) => {
            const productElement = this.createProductElement(product, index);
            fragment.appendChild(productElement);
        });
        
        this.container.appendChild(fragment);
        
        // Inicializar lazy loading si está habilitado
        if (this.options.enableLazyLoading && window.optimizedImageLoader) {
            window.optimizedImageLoader.loadNewImages(this.container);
        }
    }
    
    /**
     * Crea el elemento HTML de un producto
     */
    createProductElement(product, index) {
        const element = document.createElement('div');
        element.className = 'product-card';
        element.setAttribute('data-product-id', product.id);
        element.setAttribute('role', 'gridcell');
        element.setAttribute('tabindex', '0');
        
        // Añadir delay de animación
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.style.animationDelay = `${index * this.options.animationDelay}ms`;
        }
        
        // Placeholder optimizado
        const placeholderSVG = window.ImageUtils ? 
            window.ImageUtils.generatePlaceholder() :
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3C/svg%3E`;
        
        element.innerHTML = `
            <div class="product-image-wrapper">
                <div class="product-category-tag">${product.category.toUpperCase()}</div>
                <img src="${placeholderSVG}" 
                     data-src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image lazy-load" 
                     loading="lazy">
                <div class="product-overlay"></div>
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    ${product.price ? `<span class="product-price">${product.price}</span>` : ''}
                </div>
            </div>
        `;
        
        // Añadir event listeners
        this.attachProductEvents(element, product);
        
        return element;
    }
    
    /**
     * Añade event listeners a un producto
     */
    attachProductEvents(element, product) {
        // Click en el producto
        element.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                this.handleProductClick(product, element);
            }
        });
        
        // Accesibilidad: Enter key
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleProductClick(product, element);
            }
        });
        
        // Focus management
        element.addEventListener('focus', () => {
            element.classList.add('product-card-focused');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('product-card-focused');
        });
    }
    
    /**
     * Maneja el click en un producto
     */
    handleProductClick(product, element) {
        if (this.globalActions.onQuickView) {
            this.globalActions.onQuickView(product, element);
        }
    }
    
    /**
     * Obtiene productos filtrados
     */
    getFilteredProducts() {
        let filtered = this.products;
        
        // Aplicar filtro por categoría
        if (this.currentFilter && this.currentFilter !== 'all') {
            filtered = filtered.filter(product => 
                product.category === this.currentFilter
            );
        }
        
        // Aplicar búsqueda
        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered;
    }
    
    /**
     * Configura eventos globales
     */
    setupGlobalEvents() {
        // Manejo del redimensionamiento de ventana
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    /**
     * Maneja el redimensionamiento de ventana
     */
    handleResize() {
        // Re-calcular lazy loading si es necesario
        if (this.options.enableLazyLoading && window.optimizedImageLoader) {
            window.optimizedImageLoader.loadNewImages(this.container);
        }
    }
    
    /**
     * Limpia el contenedor
     */
    clear() {
        this.container.innerHTML = '';
    }
    
    /**
     * Muestra estado vacío
     */
    showEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'product-grid-empty';
        emptyState.innerHTML = `
            <div class="empty-icon">🌸</div>
            <h3>No se encontraron productos</h3>
            <p>Intenta con otros criterios de búsqueda</p>
        `;
        this.container.appendChild(emptyState);
    }
    
    /**
     * Filtra productos por categoría
     * @param {string} category - Categoría a filtrar ('all' para todas)
     */
    filterByCategory(category) {
        this.currentFilter = category;
        this.render();
    }
    
    /**
     * Busca productos por texto
     * @param {string} searchTerm - Término de búsqueda
     */
    search(searchTerm) {
        this.currentSearch = searchTerm;
        this.render();
    }
    
    /**
     * Actualiza la lista de productos
     * @param {Array} newProducts - Nueva lista de productos
     */
    updateProducts(newProducts) {
        this.products = newProducts;
        this.render();
    }
    
    /**
     * Obtiene estadísticas del manager
     */
    getStats() {
        return {
            totalProducts: this.products.length,
            filteredProducts: this.getFilteredProducts().length,
            currentFilter: this.currentFilter,
            currentSearch: this.currentSearch
        };
    }
    
    /**
     * Destruye el manager y limpia event listeners
     */
    destroy() {
        this.clear();
        // Los event listeners se limpian automáticamente al limpiar innerHTML
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.OptimizedProductManager = OptimizedProductManager;
    
    // Mantener compatibilidad con el nombre anterior
    window.ProductManager = OptimizedProductManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedProductManager;
}