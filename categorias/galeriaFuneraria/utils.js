// ===== UTILIDADES ESPECÍFICAS PARA GALERÍA FUNERARIA =====

class GaleriaFunerariaUtils {
    
    /**
     * Inicializa comportamientos específicos de la galería funeraria
     */
    static initializeGaleriaFunerariaBehaviors() {
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
        let categoryViews = JSON.parse(localStorage.getItem('galeriaFunerariaViews') || '{}');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.filter-btn')) {
                const category = e.target.getAttribute('data-category');
                if (category && category !== 'all') {
                    categoryViews[category] = (categoryViews[category] || 0) + 1;
                    localStorage.setItem('eventosReligiososViews', JSON.stringify(categoryViews));
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
            case 'coronas':
                categoryText = 'una corona funeraria';
                break;
            case 'cruces':
                categoryText = 'una cruz floral funeraria';
                break;
            case 'cubre-caja':
                categoryText = 'un cubre caja funerario';
                break;
            case 'pie-caja-altar':
                categoryText = 'un arreglo para pie de caja o altar';
                break;
            default:
                categoryText = 'un arreglo funerario';
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
            case 'coronas':
                return `Corona ${number}`;
            case 'cruces':
                return `Cruz ${number}`;
            case 'cubre-caja':
                return `Cubre Caja ${number}`;
            case 'pie-caja-altar':
                return `Pie Caja/Altar ${number}`;
            default:
                return `Arreglo Funerario ${number}`;
        }
    }
}

// Hacer disponible globalmente
window.galeriaFunerariaUtils = GaleriaFunerariaUtils;