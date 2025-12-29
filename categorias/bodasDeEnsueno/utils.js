// ===== UTILIDADES ESPECÍFICAS PARA BODAS DE ENSUEÑO =====

class BodasDeEnsuenioUtils {
    
    /**
     * Inicializa comportamientos específicos de la galería de bodas de ensueño
     */
    static initializeBodasDeEnsuenioBehaviors() {
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
        let categoryViews = JSON.parse(localStorage.getItem('bodasDeEnsuenioViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('bodasDeEnsuenioViews', JSON.stringify(categoryViews));
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
            case 'ramos-novia':
                categoryText = 'un ramo de novia';
                break;
            case 'arreglos-centros-mesa':
                categoryText = 'un arreglo para centro de mesa';
                break;
            case 'templo':
                categoryText = 'decoración para templo';
                break;
            default:
                categoryText = 'un arreglo para boda';
        }
        
        return `Hola, me interesa ${categoryText}: "${productName}" para mi boda. ¿Podrían darme más información sobre disponibilidad y precio?`;
    }

    /**
     * Formatea nombres de productos para mejor legibilidad
     */
    static formatProductName(filename, category) {
        // Extraer número del archivo
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'ramos-novia':
                return `Ramo de Novia ${number}`;
            case 'arreglos-centros-mesa':
                return `Centro de Mesa ${number}`;
            case 'templo':
                return `Decoración de Templo ${number}`;
            default:
                return `Arreglo de Boda ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.bodasDeEnsuenioUtils = BodasDeEnsuenioUtils;