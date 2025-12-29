// ===== IMAGE MANAGER PARA EVENTOS RELIGIOSOS =====

class EventosReligiososImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'arreglo-de-templo': [
                'templo1.png',
                'templo2.png',
                'templo3.png',
                'templo4.png',
                'templo5.png',
                'templo6.png',
                'templo7.png',
                'templo8.png',
                'templo9.png',
                'templo10.png',
                'templo11.png',
                'templo12.png',
                'templo13.png',
                'templo14.png',
                'templo15.png',
                'templo16.png',
                'templo17.png',
                'templo18.png',
                'templo19.png',
                'templo20.png',
                'templo21.png',
                'templo23.png'
            ],
            'bautizo': [
                'bautizo1.png',
                'bautizo2.png',
                'bautizo3.png',
                'bautizo4.png'
            ],
            'hermita': [
                'hermita1.png',
                'hermita2.png',
                'hermita3.png',
                'hermita4.jpg',
                'hermita4.png',
                'hermita5.png',
                'hermita6.png',
                'hermita7.png',
                'hermita8.png',
                'hermita9.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'arreglo-de-templo': 'Arreglos florales sagrados diseñados especialmente para ceremonias en templos, creando un ambiente de paz y espiritualidad.',
            'bautizo': 'Arreglos florales delicados y puros perfectos para celebrar el sacramento del bautizo con elegancia y devoción.',
            'hermita': 'Arreglos florales tradicionales para hermitas y lugares de oración, honrando la fe con belleza floral.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Arreglo de templo
            'templo1.png': 'Arreglo floral sagrado con flores blancas y tonos suaves perfectos para ceremonias en templo.',
            'templo2.png': 'Diseño floral ceremonial que crea un ambiente de paz y reverencia en el templo.',
            'templo3.png': 'Arreglo de altar con flores selectas que honran la solemnidad de las ceremonias religiosas.',
            'templo4.png': 'Combinación floral sagrada con elementos tradicionales para servicios en templo.',
            'templo5.png': 'Arreglo refinado con flores de temporada perfectas para ocasiones religiosas especiales.',
            'templo6.png': 'Diseño ceremonial con flores importadas que añaden elegancia al espacio sagrado.',
            'templo7.png': 'Arreglo floral de templo con presentación tradicional y flores de alta calidad.',
            'templo8.png': 'Diseño sagrado que combina tradición y belleza para ceremonias religiosas importantes.',
            'templo9.png': 'Arreglo de altar con flores puras que crean una atmósfera de devoción.',
            'templo10.png': 'Combinación floral ceremonial equilibrada para servicios religiosos especiales.',
            'templo11.png': 'Arreglo premium con técnicas tradicionales y flores de la más alta calidad.',
            'templo12.png': 'Diseño perfecto que representa la solemnidad en su máxima expresión.',
            'templo13.png': 'Arreglo floral sagrado con elementos clásicos para ceremonias en templo.',
            'templo14.png': 'Diseño ceremonial elegante que honra la tradición religiosa con belleza floral.',
            'templo15.png': 'Arreglo de templo único con presentación contemporánea y elementos sagrados.',
            'templo16.png': 'Combinación floral tradicional que transforma el espacio en un santuario de paz.',
            'templo17.png': 'Arreglo sofisticado que combina colores suaves y texturas para crear reverencia.',
            'templo18.png': 'Diseño ceremonial que corona la decoración del templo con estilo y devoción.',
            'templo19.png': 'Arreglo floral sagrado con flores selectas para ceremonias religiosas importantes.',
            'templo20.png': 'Diseño de altar con presentación ceremonial perfecta para servicios en templo.',
            'templo21.png': 'Arreglo tradicional con elementos sagrados que honran la fe con belleza.',
            'templo23.png': 'Combinación floral ceremonial final que completa la decoración sagrada del templo.',
            
            // Bautizo
            'bautizo1.png': 'Arreglo floral delicado en tonos suaves perfectos para celebrar el sacramento del bautizo.',
            'bautizo2.png': 'Diseño floral puro con flores blancas que simbolizan la inocencia del bautismo.',
            'bautizo3.png': 'Arreglo ceremonial con elementos tradicionales para la celebración del bautizo.',
            'bautizo4.png': 'Combinación floral angelical que crea una atmósfera de pureza y bendición.',
            
            // Hermita
            'hermita1.png': 'Arreglo floral tradicional perfecto para hermitas y lugares de oración contemplativa.',
            'hermita2.png': 'Diseño sagrado con flores de campo que honran la simplicidad de la fe.',
            'hermita3.png': 'Arreglo de hermita con elementos naturales que crean un ambiente de recogimiento.',
            'hermita4.jpg': 'Combinación floral rústica perfecta para espacios de oración tradicionales.',
            'hermita4.png': 'Diseño contemplativo con flores silvestres que invitan a la reflexión espiritual.',
            'hermita5.png': 'Arreglo de campo con presentación sencilla pero elegante para hermitas.',
            'hermita6.png': 'Combinación floral que combina tradición y naturaleza en perfecta armonía.',
            'hermita7.png': 'Arreglo sagrado con flores locales que honran las tradiciones religiosas.',
            'hermita8.png': 'Diseño de hermita con elementos orgánicos que crean paz interior.',
            'hermita9.png': 'Arreglo final que representa la belleza en la simplicidad de la fe.'
        };

        this.config = window.EVENTOS_RELIGIOSOS_CONFIG || {
            ROUTES: {
                eventosReligiosos: '../../assets/eventosReligiosos/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return this.config.ROUTES.eventosReligiosos || '../../assets/eventosReligiosos/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);
        const categoryFolder = category === 'arreglo-de-templo' ? 'arregloDeTemplo' : category;

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Arreglo floral sagrado de alta calidad con flores selectas y diseño ceremonial.',
            image: `${basePath}${categoryFolder}/${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.eventosReligiososUtils) {
            return window.eventosReligiososUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'arreglo-de-templo':
                return `Arreglo de Templo ${number}`;
            case 'bautizo':
                return `Arreglo de Bautizo ${number}`;
            case 'hermita':
                return `Arreglo de Hermita ${number}`;
            default:
                return `Arreglo Religioso ${number}`;
        }
    }

    /**
     * Obtiene todos los productos de todas las categorías
     */
    getAllProducts() {
        const allProducts = [];
        
        Object.keys(this.imageDatabase).forEach(category => {
            const categoryProducts = this.generateCategoryProducts(category);
            allProducts.push(...categoryProducts);
        });
        
        return allProducts;
    }

    /**
     * Obtiene categorías disponibles
     */
    getAvailableCategories() {
        return Object.keys(this.imageDatabase);
    }

    /**
     * Obtiene estadísticas de productos
     */
    getProductStats() {
        const stats = {};
        Object.keys(this.imageDatabase).forEach(category => {
            stats[category] = this.imageDatabase[category].length;
        });
        return stats;
    }
}

// Hacer disponible globalmente
window.EventosReligiososImageManager = EventosReligiososImageManager;