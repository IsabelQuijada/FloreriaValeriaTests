// ===== UTILIDADES ESPECÍFICAS PARA QUINCEAÑERA =====

class QuinceaneraUtils {
    
    /**
     * Inicializa comportamientos específicos de quinceañera
     */
    static initializeQuinceaneraBehaviors() {
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
        let categoryViews = JSON.parse(localStorage.getItem('quinceaneraViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('quinceaneraViews', JSON.stringify(categoryViews));
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
            case 'centroDeMesa':
                categoryText = 'un centro de mesa para quinceañera';
                break;
            case 'templo':
                categoryText = 'un arreglo de templo para quinceañera';
                break;
            case 'ramos':
                categoryText = 'un ramo para quinceañera';
                break;
            default:
                categoryText = 'un producto para quinceañera';
        }
        return `Hola, me interesa ${categoryText}: "${productName}" para una celebración de quinceañera. ¿Podrían darme más información sobre disponibilidad y precio?`;
    }

    /**
     * Formatea nombres de productos para mejor legibilidad
     */
    static formatProductName(filename, category) {
        // Extraer número del archivo
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        switch (category) {
            case 'centroDeMesa':
                return `Centro de Mesa ${number}`;
            case 'templo':
                return `Arreglo de Templo ${number}`;
            case 'ramos':
                return `Ramo para Quinceañera ${number}`;
            default:
                return `Producto Quinceañera ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.quinceaneraUtils = QuinceaneraUtils;