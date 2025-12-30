// ===== IMAGE MANAGER PARA QUINCEAÑERA =====

class QuinceaneraImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        // Actualización: reflejar imágenes reales en assets/quinceanera
        this.imageDatabase = {
            'centroDeMesa': [
                'ArregloFloral1.png',
                'arregloFloral2.png',
                'centroDeMesa1.jpeg',
                'centroDeMesa2.png',
                'centroDeMesa3.png'
            ],
            'ramos': [
                'ramo-quinceanera1.png',
                'ramo-quinceanera2.png',
                'ramo-quincenera4.png',
                'ramo-quincenera5.png',
                'ramo-quincenera6.png',
                'ramo-quincenera7.png',
                'ramo-quincenera8.png',
                'ramo-quincenera9.png',
                'ramo-quincenera10.png',
                'ramo-quincenera11.png'
            ],
            'templo': [
                'templo1.jpeg',
                'templo3.jpeg',
                'templo4.jpeg',
                'templo5.jpeg',
                'templo6.jpeg',
                'templo8.jpeg',
                'templo9.jpeg',
                'templo11.jpeg',
                'templo12.jpeg',
                'templo13.jpeg',
                'templo16.jpeg',
                'templo17.jpeg',
                'templo18.jpeg',
                'templo22.jpeg',
                'templo24.jpeg',
                'templo25.jpeg',
                'templo27.jpeg',
                'templo28.jpeg',
                'templo29.jpeg',
                'templo30.jpeg'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'centroDeMesa': 'Centros de mesa elegantes y decorativos para quinceañera.',
            'ramos': 'Ramos especiales diseñados para quinceañeras.',
            'templo': 'Arreglos florales para la ceremonia en el templo.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Centro de Mesa
            'ArregloFloral1.png': 'Centro de mesa con rosas rosas, gerberas fucsia, rosas crema, flores de dragón y follaje gris, ideal para eventos juveniles.',
            'arregloFloral2.png': 'Centro de mesa con flores lilas, moradas y rosas, acentuado con follaje verde y ginger rosa. Elegancia natural y fresca.',
            'centroDeMesa1.jpeg': 'Centro de mesa con rosas blancas, gypsophila y follaje verde. Elegancia fresca y natural.',
            'centroDeMesa2.png': 'Centro de mesa con rosas blancas, rosas rosadas, lilas y follaje verde. Toque fresco y colorido.',
            'centroDeMesa3.png': 'Centro de mesa con lisianthus lila, rosas blancas, flores silvestres y follaje gris. Frescura y elegancia natural.',
            // Ramos
            'ramo-quinceanera1.png': 'Ramo elegante con rosas rosadas y lisianthus lila, fresco y sofisticado.',
            'ramo-quinceanera2.png': 'Ramo con girasoles y rosas blancas, alegre y natural.',
            'ramo-quincenera4.png': 'Ramo cascada de rosas y lisianthus blancos, puro y sofisticado.',
            'ramo-quincenera5.png': 'Ramo elegante con rosas rosadas y lisianthus lila, fresco y sofisticado.',
            'ramo-quincenera6.png': 'Ramo de rosas y lisianthus, elegante y fresco para quinceañera.',
            'ramo-quincenera7.png': 'Ramo cascada de rosas crema y orquídeas blancas, elegante y natural.',
            'ramo-quincenera8.png': 'Ramo cascada de rosas y orquídeas blancas, sofisticado y fresco.',
            'ramo-quincenera9.png': 'Ramo de rosas blancas y margaritas, fresco y encantador.',
            'ramo-quincenera10.png': 'Ramo de rosas blancas y follaje plateado, delicado y natural.',
            'ramo-quincenera11.png': 'Ramo de rosas rojas y rosadas, vibrante y elegante.',
            // Templo
            'templo1.jpeg': 'Arreglo de altar con lirios rosados, margaritas blancas y follaje fresco. Elegancia natural y armonía.',
            'templo3.jpeg': 'Arreglos altos con margaritas blancas, gypsophila y follaje verde. Frescura y distinción para el templo.',
            'templo4.jpeg': 'Arreglo de altar con margaritas blancas, aves del paraíso y follaje verde. Sencillez y belleza para la ceremonia.',
            'templo5.jpeg': 'Arreglo de altar con gerberas rosadas, lirios y follaje verde. Toque delicado y armonioso.',
            'templo6.jpeg': 'Arreglos de altar con gerberas rosadas, rosas y follaje verde. Dulzura y elegancia para la ceremonia.',
            'templo8.jpeg': 'Arreglos de gypsophila blanca y follaje verde. Ligereza y frescura para el templo.',
            'templo9.jpeg': 'Lirios rosados, margaritas blancas y follaje verde. Elegante y sencillo.',
            'templo11.jpeg': 'Margaritas blancas y rosas rojas, armonía y color en el altar.',
            'templo12.jpeg': 'Arreglo de flores blancas, elegante y fresco para altar.',
            'templo13.jpeg': 'Rosas rojas y follaje verde, elegancia y vida en el altar.',
            'templo16.jpeg': 'Lirios amarillos y margaritas blancas, alegría y frescura en la iglesia.',
            'templo17.jpeg': 'Girasoles y margaritas blancas, luz y alegría en el altar.',
            'templo18.jpeg': 'Lirios amarillos y rosas blancas, alegría y elegancia en el altar.',
            'templo22.jpeg': 'Gerberas rosas y margaritas blancas, frescura y color en el altar.',
            'templo24.jpeg': 'Arreglo de altar con rosas blancas, lirios y follaje verde. Elegancia sencilla y fresca.',
            'templo25.jpeg': 'Arreglo de altar con rosas blancas, lirios y follaje verde. Elegancia sencilla y fresca.',
            'templo27.jpeg': 'Arreglo de altar con gerberas rosas, lirios, rosas rojas y gypsophila. Natural, elegante y lleno de vida.',
            'templo28.jpeg': 'Arreglo de altar con lirios amarillos, gerberas naranjas y follaje verde. Vibrante, cálido y elegante.',
            'templo29.jpeg': 'Arreglo con lirios amarillos, gerberas naranjas y follaje verde. Vibrante, cálido y elegante.',
            'templo30.jpeg': 'Arreglo de altar con rosas blancas y rojas, follaje verde y detalles colgantes. Clásico, fresco y sofisticado.',
        };

        this.config = window.QUINCEANERA_CONFIG || {
            ROUTES: {
                quinceanera: '../../assets/quinceanera/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        // Ruta base actualizada para assets/quinceanera
        return '../../assets/quinceanera/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);
        // Carpeta coincide con el nombre de la categoría
        const categoryFolder = category;

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Producto floral para quinceañera.',
            image: `${basePath}${categoryFolder}/${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.quinceaneraUtils) {
            return window.quinceaneraUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        switch (category) {
            case 'centroDeMesa':
                return `Centro de Mesa ${number}`;
            case 'ramos':
                return `Ramo Quinceañera ${number}`;
            case 'templo':
                return `Arreglo de Templo ${number}`;
            default:
                return `Producto Quinceañera ${number}`;
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
window.QuinceaneraImageManager = QuinceaneraImageManager;