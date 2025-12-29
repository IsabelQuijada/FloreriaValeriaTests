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
            'ramo-novia1.png': 'Ramo en cascada con rosas blancas y follaje, elegante y fresco para bodas románticas.',
            'ramo-novia2.png': 'Bouquet alegre con girasoles, rosas y margaritas, ideal para bodas campestres.',
            'ramo-novia3.png': 'Ramo redondo con rosas y lisianthus, vibrante y original para destacar en tu día.',
            'ramo-novia4.png': 'Ramo clásico de rosas y lisianthus blancos, elegante y fresco para ceremonias tradicionales.',
            'ramo-novia5.png': 'Cascada de rosas y orquídeas, romántico y sofisticado para momentos inolvidables.',
            'ramo-novia6.png': 'Cascada de rosas y orquídeas blancas, natural y elegante para bodas modernas.',
            'ramo-novia7.png': 'Ramo redondo de rosas y margaritas, fresco y alegre para bodas modernas.',
            'ramo-novia8.png': 'Ramo etéreo de rosas, alstroemerias y gypsophila, delicado y distinguido.',
            
            // Arreglos y centros de mesa
            'arreglo-centro-mesa1.png': 'Arreglo de rosas, lirios y lisianthus, elegante y fresco para tu celebración.',
            'arreglo-centro-mesa2.png': 'Gerberas, lirios y margaritas, natural y alegre para eventos especiales.',
            'arreglo-centro-mesa3.png': 'Crisantemos, lirios y margaritas, fresco y voluminoso para cualquier ocasión.',
            'arreglo-centro-mesa4.png': 'Lirios y alstroemerias con follaje, elegante y natural para tu evento.',
            'arreglo-centro-mesa5.png': 'Centro grande de rosas y margaritas, clásico y fresco para bodas y fiestas.',
            'arreglo-centro-mesa6.png': 'Centro redondo de crisantemos y lirios, luminoso y elegante.',
            'arreglo-centro-mesa7.png': 'Crisantemos, margaritas y lirios, artesanal y elegante para bodas.',
            'arreglo-centro-mesa8.png': 'Centro exuberante de rosas lilas y lisianthus, romántico y colorido.',
            'arreglo-centro-mesa9.png': 'Lirios, rosas y crisantemos, sofisticado y armonioso para eventos.',
            'arreglo-centro-mesa10.png': 'Centro elegante de rosas y boca de dragón, fresco y armonioso.',
            'arreglo-centro-mesa11.png': 'Crisantemos, lirios y rosas, elegante y puro para cualquier ocasión.',
            
            // Templo
              'Templo 1.jpg': 'Altar con gladiolas, crisantemos y claveles, elegante y fresco para el templo.',
              'Templo 2.jpg': 'Altar con gladiolas y crisantemos, armonioso y elegante para la ceremonia.',
              'Templo 3.jpg': 'Arreglo de rosas y lirios, romántico y delicado para el altar.',
              'Templo 4.jpg': 'Corona floral con claveles y crisantemos, delicada y fresca para bautizo.',
              'Templo 4.1.jpg': 'Corona floral con claveles y crisantemos, delicada y fresca para bautizo.',
              'Templo 5.jpg': 'Altar con lirios, rosas y orquídeas, vibrante y elegante.',
              'Templo 6.jpg': 'Arreglo de crisantemos y lirios, alegre y luminoso para el templo.',
              'Templo 7.jpg': 'Entrada con rosas y lisianthus, elegante y fresca para recibir.',
              'Templo 8.jpg': 'Corona floral con rosas y margaritas, delicada y elegante para bautizo.',
              'Templo 9.jpg': 'Altar con rosas y lisianthus, elegante y fresco para el templo.',
              'Templo 10.jpg': 'Arreglo de crisantemos y lirios, alegre y luminoso para el altar.'
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