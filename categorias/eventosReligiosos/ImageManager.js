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
            'templo1.png': 'Crisantemos blancos y pompones amarillos con gypsophila, ideal para un ambiente puro y devoto.',
            'templo2.png': 'Rosas coral, crisantemos y claveles rosados con gypsophila, para un altar lleno de belleza.',
            'templo3.png': 'Peonías blancas y eucalipto con gypsophila en candelabros dorados, elegante y solemne.',
            'templo4.png': 'Rosas rojas, crisantemos blancos y follaje de temporada, arreglos que transforman el altar.',
            'templo5.png': 'Rosas blancas, lisianthus morados y eucalipto en pedestales, clásico y majestuoso.',
            'templo6.png': 'Lirios amarillos, rosas blancas y follaje en el altar y pedestales, para una ceremonia especial.',
            'templo7.png': 'Crisantemos amarillos, blancos y lirios con follaje, arreglos que realzan el altar.',
            'templo8.png': 'Rosas blancas, delphiniums azules y eucalipto en pedestal, toque celestial y elegante.',
            'templo9.png': 'Rosas azules y blancas con gypsophila y follaje, para un altar lleno de devoción.',
            'templo10.png': 'Rosas blancas y follaje en altar y pedestales, elegancia bajo la arquitectura sagrada.',
            'templo11.png': 'Rosas azules, blancas y lirios con flores pequeñas y follaje, belleza celestial y terrenal.',
            'templo12.png': 'Rosas azules, blancas y eucalipto en maceta, presencia imponente y sofisticada.',
            'templo13.png': 'Rosas azules, blancas, lirios y eucalipto, arreglos en armonía para el altar.',
            'templo14.png': 'Rosas azules, blancas y lirios con follaje, volumen y elegancia sobre el altar.',
            'templo15.png': 'Gladiolos blancos, waxflower rosado y helecho, composición que realza el altar.',
            'templo16.png': 'Lirios amarillos, rosas blancas y margaritas con follaje, alegría y devoción.',
            'templo17.png': 'Lirios rosados, gerberas coral y rosas suaves con gypsophila, calidez y alegría.',
            'templo18.png': 'Lirios amarillos, rosas naranjas y margaritas, arreglos que celebran y dan luz.',
            'templo19.png': 'Lirios rosados, gerberas, rosas y claveles suaves con gypsophila, ternura y armonía.',
            'templo20.png': 'Gerberas rosadas, rosas y alstroemerias con gypsophila y follaje, frescura y ternura.',
            'templo20.png': 'Gerberas rosadas, rosas, alstroemerias y gypsophila con follaje y hojas tropicales, frescura y armonía.',
            'templo23.png': 'Lirios blancos y amarillos, anturios, margaritas y follaje, elegancia y frescura en el altar.',
            
            // Bautizo
            'bautizo1.png': 'Arreglo de rosas blancas y lilas, margaritas y follaje fresco, ideal para decorar la pila bautismal y transmitir pureza, ternura y alegría en la ceremonia.',
            'bautizo2.png': 'Corona de flores blancas y rosas, claveles, crisantemos y follaje verde, diseñada para rodear la pila bautismal y aportar un toque de frescura, elegancia y dulzura a la celebración.',
            'bautizo3.png': 'Arreglo circular con lisianthus, rosas, crisantemos y follaje abundante, pensado para realzar la pila bautismal y crear un ambiente de pureza y celebración.',
            'bautizo4.png': 'Corona de lirios y crisantemos blancos con follaje verde, diseñada para rodear la pila bautismal y aportar un ambiente de pureza, luz y serenidad a la ceremonia.',
            
            // Hermita
            'hermita1.png': 'Arreglos de flores blancas y amarillas con follaje verde, ideales para acompañar imágenes religiosas y crear un ambiente solemne y lleno de fe.',
            'hermita2.png': 'Arreglos de margaritas, crisantemos y follaje verde, perfectos para realzar celebraciones religiosas y transmitir devoción y alegría.',
            'hermita3.png': 'Arreglos de cempasúchil y follaje verde, ideales para altares y celebraciones religiosas, llenando el espacio de color, tradición y espiritualidad.',
            'hermita4.jpg': 'Arreglos de flores blancas, amarillas y rojas con follaje, ideales para acompañar imágenes religiosas y crear un ambiente solemne y festivo.',
            'hermita4.png': 'Arreglos de flores blancas, amarillas y rojas con follaje, ideales para acompañar imágenes religiosas y crear un ambiente solemne y festivo.',
            'hermita5.png': 'Arreglos de lirios blancos y follaje verde en canastos, perfectos para altares y espacios de oración, transmitiendo paz y solemnidad.',
            'hermita6.png': 'Arreglos de crisantemos amarillos, flores naranjas y follaje, ideales para altares y procesiones, evocando tradición y alegría.',
            'hermita7.png': 'Arreglos de crisantemos amarillos y follaje, enmarcando imágenes religiosas y alfombras florales, ideales para celebraciones tradicionales llenas de color y devoción.',
            'hermita8.png': 'Arreglos de flores amarillas, rojas y blancas con follaje, ideales para altares y procesiones, transmitiendo alegría, tradición y devoción.',
            'hermita9.png': 'Simplicidad y belleza en la fe.'
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