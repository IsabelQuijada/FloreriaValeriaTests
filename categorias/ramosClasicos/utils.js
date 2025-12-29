// ===== UTILIDADES ESPECÍFICAS PARA RAMOS CLÁSICOS =====

class RamosClasicosUtils {
    
    /**
     * Inicializa comportamientos específicos de la galería de ramos clásicos
     */
    static initializeRamosClasicoseBehaviors() {
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
        let categoryViews = JSON.parse(localStorage.getItem('ramosClasicosViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('ramosClasicosViews', JSON.stringify(categoryViews));
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
            case 'ramo-estilizado':
                categoryText = 'un ramo estilizado';
                break;
            case 'ramo-girasoles':
                categoryText = 'un ramo de girasoles';
                break;
            case 'ramo-mix':
                categoryText = 'un ramo mixto';
                break;
            case 'ramo-rosas':
                categoryText = 'un ramo de rosas';
                break;
            case 'ramo-tulipanes':
                categoryText = 'un ramo de tulipanes';
                break;
            default:
                categoryText = 'un ramo clásico';
        }
        
        return `Hola, me interesa ${categoryText}: "${productName}". ¿Podrían darme más información sobre disponibilidad y precio?`;
    }

    /**
     * Formatea nombres de productos para mejor legibilidad
     */
    static formatProductName(filename, category) {
        // Extraer número del archivo
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'ramo-estilizado':
                return `Ramo Estilizado ${number}`;
            case 'ramo-girasoles':
                return `Ramo de Girasoles ${number}`;
            case 'ramo-mix':
                return `Ramo Mixto ${number}`;
            case 'ramo-rosas':
                return `Ramo de Rosas ${number}`;
            case 'ramo-tulipanes':
                return `Ramo de Tulipanes ${number}`;
            default:
                return `Ramo Clásico ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.ramosClasicosUtils = RamosClasicosUtils;