/**
 * Ramos Elegantes Gallery - Refactorizado
 * Extiende BaseGallery eliminando código duplicado
 */
class RamosElegantesGallery extends BaseGallery {
    constructor() {
        const categoryConfig = {
            name: 'RamosElegantes',
            containerId: 'products-grid'
        };
        
        super(categoryConfig);
    }
    
    /**
     * Nombre de la instancia global
     */
    getGlobalInstanceName() {
        return 'ramosElegantesGallery';
    }
    
    /**
     * Obtiene productos para esta galería
     */
    getProducts() {
        const imageManager = ImageManagerFactory.getManager('ramos-elegantes', {});
        return imageManager.generateCategoryProducts('ramos-elegantes');
    }
    
    /**
     * Inicialización específica
     */
    onInit() {
        // Inicializar behaviors específicos si existen
        if (window.ramosElegantesUtils && typeof window.ramosElegantesUtils.initializeRamosElegantesBehaviors === 'function') {
            window.ramosElegantesUtils.initializeRamosElegantesBehaviors();
        }
    }
    
    /**
     * Genera mensaje WhatsApp específico
     */
    generateWhatsAppMessage(config) {
        const categoryText = 'Ramos Elegantes';
        return `¡Hola! Me interesa el ${config.name} de la categoría ${categoryText}. ¿Podrían darme más información sobre precios y disponibilidad?`;
    }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (!window.ramosElegantesGallery) {
        new RamosElegantesGallery();
    }
});

// Export
if (typeof window !== 'undefined') {
    window.RamosElegantesGallery = RamosElegantesGallery;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RamosElegantesGallery;
}