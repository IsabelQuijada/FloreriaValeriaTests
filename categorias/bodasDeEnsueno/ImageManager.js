// ===== IMAGE MANAGER PARA BODAS DE ENSUEÑO =====

class BodasDeEnsuenioImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'ramos-novia': [
                'ramo-novia1.png',
                'ramo-novia2.png', 
                'ramo-novia3.png',
                'ramo-novia4.png',
                'ramo-novia5.png',
                'ramo-novia6.png',
                'ramo-novia7.png',
                'ramo-novia8.png'
            ],
            'arreglos-centros-mesa': [
                'arreglo-centro-mesa1.png',
                'arreglo-centro-mesa2.png',
                'arreglo-centro-mesa3.png',
                'arreglo-centro-mesa4.png',
                'arreglo-centro-mesa5.png',
                'arreglo-centro-mesa6.png',
                'arreglo-centro-mesa7.png',
                'arreglo-centro-mesa8.png',
                'arreglo-centro-mesa9.png',
                'arreglo-centro-mesa10.png',
                'arreglo-centro-mesa11.png'
            ],
            'templo': [
                'Templo 1.jpg',
                'Templo 2.jpg',
                'Templo 3.jpg',
                'Templo 4.jpg',
                'Templo 4.1.jpg',
                'Templo 5.jpg',
                'Templo 6.jpg',
                'Templo 7.jpg',
                'Templo 8.jpg',
                'Templo 9.jpg',
                'Templo 10.jpg'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'ramos-novia': 'Ramos de novia únicos y especiales, diseñados con las flores más hermosas para el día más importante de tu vida.',
            'arreglos-centros-mesa': 'Arreglos elegantes y centros de mesa sofisticados que crean la atmósfera perfecta para tu celebración de boda.',
            'templo': 'Decoraciones especiales para templo y ceremonia que transforman el espacio sagrado en un ambiente mágico y memorable.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Ramos de novia
            'ramo-novia1.png': 'Ramo de novia en cascada elaborado con rosas blancas, lisianthus, claveles y follaje de eucalipto. Un diseño elegante y fresco que simboliza pureza, delicadeza y un amor eterno, ideal para bodas sofisticadas y románticas.',
            'ramo-novia2.png': 'Ramo de novia tipo bouquet con girasoles, rosas blancas, margaritas, gypsophila y follaje. Un diseño alegre y luminoso que simboliza felicidad, pureza y energía positiva, ideal para bodas con un toque campestre y original.',
            'ramo-novia3.png': 'Ramo de novia redondo con rosas rosa, lisianthus morado y blanco, hortensias verdes y gypsophila. Un diseño vibrante y sofisticado que combina elegancia, frescura y un toque de originalidad, ideal para novias que buscan destacar en su gran día.',
            'ramo-novia4.png': 'Ramo de novia redondo elaborado con rosas blancas, lisianthus blanco y follaje verde. Un diseño clásico y elegante que transmite pureza, frescura y sofisticación, ideal para ceremonias tradicionales y románticas.',
            'ramo-novia5.png': 'Ramo de novia en cascada con rosas blancas y marfil, rosas rojas y orquídeas blancas. Un diseño sofisticado y romántico que simboliza amor, pasión y elegancia, ideal para ceremonias inolvidables.',
            'ramo-novia6.png': 'Ramo de novia en cascada con rosas blancas, lisianthus, orquídeas blancas y follaje de eucalipto. Un diseño elegante y natural que transmite pureza, sofisticación y frescura, ideal para bodas clásicas y modernas.',
            'ramo-novia7.png': 'Ramo de novia redondo con rosas blancas, margaritas, lisianthus y follaje de eucalipto. Un diseño fresco y elegante que transmite pureza, alegría y naturalidad, ideal para bodas románticas y modernas.',
            'ramo-novia8.png': 'Ramo de novia redondo con rosas blancas, alstroemerias, gypsophila y follaje plateado. Un diseño etéreo y elegante que transmite pureza, delicadeza y distinción, ideal para bodas sofisticadas y románticas.',
            
            // Arreglos y centros de mesa
            'arreglo-centro-mesa1.png': 'Arreglo con rosas blancas, lirios, lisianthus y follaje de eucalipto. Un diseño elegante y majestuoso que aporta frescura, pureza y distinción a cualquier celebración nupcial.',
            'arreglo-centro-mesa2.png': 'Arreglo con gerberas blancas, lirios, margaritas y follaje de eucalipto. Un diseño natural y luminoso que aporta frescura, alegría y elegancia a cualquier evento nupcial.',
            'arreglo-centro-mesa3.png': 'Arreglo con crisantemos blancos, lirios, margaritas, gypsophila, eucalipto y hojas de monstera. Un diseño fresco y voluminoso que aporta elegancia, naturalidad y luz a cualquier evento especial.',
            'arreglo-centro-mesa4.png': 'Arreglo con lirios blancos, alstroemerias, follaje verde y hojas de monstera. Un diseño elegante y vertical que aporta frescura, distinción y un toque natural a cualquier celebración.',
            'arreglo-centro-mesa5.png': 'Centro de mesa grande con rosas blancas, margaritas, lirios, gypsophila, eucalipto y hojas de monstera. Un diseño elegante y fresco que combina texturas y flores clásicas, ideal para bodas sofisticadas y eventos especiales.',
            'arreglo-centro-mesa6.png': 'Centro de mesa redondo con crisantemos blancos y amarillos, margaritas blancas, lirios blancos, rosas blancas, flores de encaje blanco (Ammi majus), gypsophila y follaje de eucalipto. Un diseño elegante y luminoso que aporta frescura, pureza y distinción a cualquier evento especial.',
            'arreglo-centro-mesa7.png': 'Arreglo con crisantemos blancos, margaritas, lirios, rosas, gypsophila y follaje de eucalipto. Un diseño artesanal y elegante que resalta la belleza natural de cada flor, ideal para bodas y eventos distinguidos.',
            'arreglo-centro-mesa8.png': 'Centro de mesa exuberante con rosas lilas, lisianthus rosados, margaritas moradas, flores de encaje blanco, boca de dragón blanca, follaje de eucalipto y verdes variados. Un diseño elegante y silvestre que aporta frescura, color y un toque romántico a cualquier celebración.',
            'arreglo-centro-mesa9.png': 'Arreglo elegante con lirios blancos, rosas blancas, crisantemos, alstroemerias, gypsophila, follaje de eucalipto y hojas de monstera. Un diseño sofisticado y armonioso que aporta frescura, pureza y distinción a cualquier evento especial.',
            'arreglo-centro-mesa10.png': 'Centro de mesa elegante con rosas blancas, boca de dragón blanca, flores de encaje blanco, follaje de eucalipto y verdes variados. Un diseño sofisticado y fresco que aporta pureza, armonía y distinción a cualquier evento especial.',
            'arreglo-centro-mesa11.png': 'Arreglo con crisantemos blancos, lirios blancos, rosas blancas, gypsophila y follaje de eucalipto. Un diseño elegante y puro que aporta frescura, armonía y distinción a cualquier evento especial.',
            
            // Templo
            'Templo 1.jpg': 'Decoración de altar con arreglos florales compuestos por gladiolas rosas, crisantemos blancos y lilas, claveles y follaje verde. Un diseño elegante y fresco que aporta color, armonía y distinción al espacio sagrado.',
            'Templo 2.jpg': 'Decoración de altar con arreglos florales de gladiolas rosas, crisantemos blancos y lilas, claveles y follaje verde. Un diseño armonioso y elegante que realza la solemnidad y belleza del templo.',
            'Templo 3.jpg': 'Arreglo de altar con rosas blancas y rosas, lirios, crisantemos lilas, claveles, flores de encaje blanco (Ammi majus) y follaje verde. Un diseño romántico y delicado que aporta frescura, armonía y distinción al templo.',
            'Templo 4.jpg': 'Corona floral para pila bautismal con claveles blancos, crisantemos lilas, lisianthus rosados y blancos, follaje de eucalipto y verdes variados. Un diseño delicado y fresco que aporta pureza y armonía al rito bautismal.',
            'Templo 4.1.jpg': 'Corona floral para pila bautismal con claveles blancos, crisantemos lilas, lisianthus rosados y blancos, follaje de eucalipto y verdes variados. Un diseño delicado y fresco que aporta pureza y armonía al rito bautismal.',
            'Templo 5.jpg': 'Arreglo de altar con lirios blancos, rosas amarillas, orquídeas amarillas, follaje verde y detalles de coco seco. Un diseño vibrante y elegante que aporta luz, alegría y distinción al espacio sagrado.',
            'Templo 6.jpg': 'Arreglo de altar con crisantemos amarillos y blancos, lirios blancos, margaritas, gypsophila y follaje verde. Un diseño alegre y luminoso que aporta frescura y vitalidad al espacio sagrado.',
            'Templo 7.jpg': 'Arreglos de entrada al templo con rosas blancas y rosas, lisianthus lilas, crisantemos, flores de encaje blanco, follaje de eucalipto y verdes variados. Un diseño elegante y fresco que da la bienvenida con armonía y distinción.',
            'Templo 8.jpg': 'Corona floral para pila bautismal con rosas blancas y rosas, lisianthus rosados, margaritas lilas, follaje de eucalipto y verdes variados. Un diseño delicado y elegante que aporta pureza y armonía al rito bautismal.',
            'Templo 9.jpg': 'Arreglo de altar con rosas blancas y rosas, lisianthus lilas, flores de encaje blanco (Ammi majus), lirios blancos y follaje verde. Un diseño elegante y armonioso que aporta distinción y frescura al espacio sagrado.',
            'Templo 10.jpg': 'Arreglo de altar con crisantemos amarillos y blancos, lirios blancos, margaritas, gypsophila y follaje verde. Un diseño alegre y luminoso que aporta frescura y vitalidad al espacio sagrado.'
        };

        this.config = window.BODAS_DE_ENSUENO_CONFIG || {
            ROUTES: {
                bodasDeEnsueno: '../../assets/bodasDeEnsueno/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        const folderMap = {
            'ramos-novia': '../../assets/bodasDeEnsueno/ramosNovia/',
            'arreglos-centros-mesa': '../../assets/bodasDeEnsueno/arreglosCentrosDeMesa/',
            'templo': '../../assets/bodasDeEnsueno/templo/'
        };
        return folderMap[category] || '../../assets/bodasDeEnsueno/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Ramo elegante de alta calidad con flores selectas y diseño sofisticado.',
            image: `${basePath}${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.bodasDeEnsuenioUtils) {
            return window.bodasDeEnsuenioUtils.formatProductName(filename, category);
        }

        // Fallback simple
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
window.BodasDeEnsuenioImageManager = BodasDeEnsuenioImageManager;