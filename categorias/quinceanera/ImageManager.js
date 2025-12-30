// ===== IMAGE MANAGER PARA QUINCEAÑERA =====

class QuinceaneraImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        // Actualización: reflejar imágenes reales en assets/quinceanera
        this.imageDatabase = {
            'centroDeMesa': [
                // Ejemplo: agregar los nombres reales de las imágenes en assets/quinceanera/centroDeMesa
                'centroDeMesa1.png', 'centroDeMesa2.png', 'centroDeMesa3.png'
            ],
            'ramos': [
                // Ejemplo: agregar los nombres reales de las imágenes en assets/quinceanera/ramos
                'ramo1.png', 'ramo2.png', 'ramo3.png'
            ],
            'templo': [
                // Ejemplo: agregar los nombres reales de las imágenes en assets/quinceanera/templo
                'templo1.png', 'templo2.png', 'templo3.png'
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
            'centroDeMesa1.png': 'Centro de mesa elegante con flores frescas.',
            'centroDeMesa2.png': 'Centro de mesa colorido para quinceañera.',
            'centroDeMesa3.png': 'Centro de mesa clásico y sofisticado.',
            // Ramos
            'ramo1.png': 'Ramo especial para quinceañera, diseño único.',
            'ramo2.png': 'Ramo tradicional con flores variadas.',
            'ramo3.png': 'Ramo moderno y elegante para la celebración.',
            // Templo
            'templo1.png': 'Arreglo floral para templo, ideal para ceremonia.',
            'templo2.png': 'Decoración de templo con flores blancas.',
            'templo3.png': 'Arreglo especial para altar de quinceañera.'
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