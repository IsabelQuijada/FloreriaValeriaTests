// ===== UTILIDADES ESPECÍFICAS PARA CUMPLEAÑOS =====

class CumpleanosUtils {
    
    /**
     * Inicializa comportamientos específicos de la galería de cumpleaños
     */
    static initializeCumpleanosBehaviors() {
        // Configurar lazy loading para optimización
        this.setupLazyLoading();
        
        // Configurar tracking de categorías más populares
        this.setupCategoryTracking();
    }

    /**
     * Configura lazy loading para las imágenes
     */
    static setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            // Observar imágenes lazy cuando se agreguen al DOM
            const observeImages = () => {
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            };

            // Observar después de que se carguen los productos
            setTimeout(observeImages, 1000);
        }
    }

    /**
     * Configura tracking básico de categorías
     */
    static setupCategoryTracking() {
        // Tracking simple de preferencias de categorías
        let categoryViews = JSON.parse(localStorage.getItem('cumpleanosViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('cumpleanosViews', JSON.stringify(categoryViews));
                }
            }
        });
    }

    /**
     * Genera mensaje de WhatsApp contextual
     */
    static generateWhatsAppMessage(productName, category) {
        // Usar utilidad global con contexto específico
        return window.FLORERIA_UTILS.generateProductWhatsAppMessage(
            `${productName} para cumpleaños`, 
            category || 'cumpleaños'
        );
    }

    /**
     * Formatea nombres de productos para mejor legibilidad
     */
    static formatProductName(filename, category) {
        // Extraer número del archivo
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'arreglos-festivos':
                return `Arreglo Festivo ${number}`;
            case 'decoraciones-especiales':
                return `Decoración Especial ${number}`;
            case 'centros-mesa-cumpleanos':
                return `Centro de Mesa ${number}`;
            default:
                return `Arreglo de Cumpleaños ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.cumpleanosUtils = CumpleanosUtils;