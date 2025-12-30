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
            'ArregloFloral1.png': 'Centro de mesa floral elegante para quinceañera.',
            'arregloFloral2.png': 'Centro de mesa con diseño moderno para quinceañera.',
            'centroDeMesa1.jpeg': 'Centro de mesa clásico para quinceañera.',
            'centroDeMesa2.png': 'Centro de mesa colorido para quinceañera.',
            'centroDeMesa3.png': 'Centro de mesa sofisticado para quinceañera.',
            // Ramos
            'ramo-quinceanera1.png': 'Ramo especial para quinceañera, diseño único.',
            'ramo-quinceanera2.png': 'Ramo tradicional con flores variadas.',
            'ramo-quincenera4.png': 'Ramo moderno y elegante para la celebración.',
            'ramo-quincenera5.png': 'Ramo vibrante para quinceañera.',
            'ramo-quincenera6.png': 'Ramo delicado para quinceañera.',
            'ramo-quincenera7.png': 'Ramo con flores frescas para quinceañera.',
            'ramo-quincenera8.png': 'Ramo colorido para quinceañera.',
            'ramo-quincenera9.png': 'Ramo elegante para la celebración.',
            'ramo-quincenera10.png': 'Ramo especial para evento de quince años.',
            'ramo-quincenera11.png': 'Ramo exclusivo para quinceañera.',
            // Templo
            'templo1.jpeg': 'Arreglo floral para templo, ideal para ceremonia.',
            'templo3.jpeg': 'Decoración de templo con flores blancas.',
            'templo4.jpeg': 'Arreglo especial para altar de quinceañera.',
            'templo5.jpeg': 'Arreglo floral elegante para templo.',
            'templo6.jpeg': 'Decoración clásica para templo.',
            'templo8.jpeg': 'Arreglo moderno para ceremonia en templo.',
            'templo9.jpeg': 'Arreglo de flores frescas para templo.',
            'templo11.jpeg': 'Decoración especial para quinceañera en templo.',
            'templo12.jpeg': 'Arreglo de flores blancas para altar.',
            'templo13.jpeg': 'Arreglo sofisticado para ceremonia.',
            'templo16.jpeg': 'Decoración floral para evento religioso.',
            'templo17.jpeg': 'Arreglo elegante para templo.',
            'templo18.jpeg': 'Arreglo especial para quince años en templo.',
            'templo22.jpeg': 'Decoración de templo con flores coloridas.',
            'templo24.jpeg': 'Arreglo floral para altar de quinceañera.',
            'templo25.jpeg': 'Arreglo moderno para ceremonia religiosa.',
            'templo27.jpeg': 'Decoración especial para evento en templo.',
            'templo28.jpeg': 'Arreglo clásico para altar.',
            'templo29.jpeg': 'Arreglo elegante para ceremonia en templo.',
            'templo30.jpeg': 'Decoración floral exclusiva para quinceañera.'
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