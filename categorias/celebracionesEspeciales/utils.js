// ===== UTILIDADES ESPECÍFICAS PARA CELEBRACIONES ESPECIALES =====

class CelebracionesEspecialesUtils {
    
    /**
     * Inicializa comportamientos específicos de la galería de celebraciones especiales
     */
    static initializeCelebracionesEspecialesBehaviors() {
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
        let categoryViews = JSON.parse(localStorage.getItem('celebracionesEspecialesViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('celebracionesEspecialesViews', JSON.stringify(categoryViews));
                }
            }
        });
    }

    /**
     * Genera mensaje de WhatsApp contextual
     */
    static generateWhatsAppMessage(productName, category) {
        let categoryText;
        switch (category) {
            case 'canastas-florales':
                categoryText = 'una canasta floral';
                break;
            case 'centros-de-mesa-festivos':
                categoryText = 'un centro de mesa festivo';
                break;
            case 'detalles-en-forma-de-corazon':
                categoryText = 'un detalle en forma de corazón';
                break;
            default:
                categoryText = 'un arreglo para celebración especial';
        }
        
        return `Hola, me interesa ${categoryText}: "${productName}" para mi celebración especial. ¿Podrían darme más información sobre disponibilidad y precio?`;
    }

    /**
     * Formatea nombres de productos para mejor legibilidad
     */
    static formatProductName(filename, category) {
        // Extraer número del archivo
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'canastas-florales':
                return `Canasta Floral ${number}`;
            case 'centros-de-mesa-festivos':
                return `Centro de Mesa Festivo ${number}`;
            case 'detalles-en-forma-de-corazon':
                return `Detalle Corazón ${number}`;
            default:
                return `Arreglo Especial ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.celebracionesEspecialesUtils = CelebracionesEspecialesUtils;