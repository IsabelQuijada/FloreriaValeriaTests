// ===== IMAGE MANAGER PARA CUMPLEAÑOS =====

class CumpleanosImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'arreglos-festivos': [
                'cumpleanos1.png',
                'cumpleanos2.png',
                'cumpleanos3.png',
                'cumpleanos4.png',
                'cumpleanos5.png',
                'cumpleanos6.png'
            ],
            'decoraciones-especiales': [
                'cumpleanos7png.png',
                'cumpleanos8.png',
                'cumpleanos9.png',
                'cumpleanos10.png',
                'cumpleanos11.png',
                'cumpleanos12.png'
            ],
            'centros-mesa-cumpleanos': [
                'cumpleanos13.png',
                'cumpleanos14.png',
                'cumpleanos15.png',
                'cumpleanos16.png',
                'cumpleanos17.png',
                'cumpleanos18.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'arreglos-festivos': 'Arreglos florales festivos y coloridos especialmente diseñados para hacer de tu cumpleaños una celebración única y memorable.',
            'decoraciones-especiales': 'Decoraciones florales especiales que añaden elegancia y alegría a tus celebraciones de cumpleaños.',
            'centros-mesa-cumpleanos': 'Centros de mesa diseñados especialmente para cumpleaños que transforman cualquier espacio en una fiesta llena de color y vida.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Arreglos festivos
            'cumpleanos1.png': 'Arreglo floral festivo con colores vibrantes perfectos para celebraciones de cumpleaños inolvidables.',
            'cumpleanos2.png': 'Diseño floral alegre con flores frescas que añaden vida y color a tu cumpleaños especial.',
            'cumpleanos3.png': 'Arreglo único con flores selectas que hacen de cada cumpleaños una celebración memorable.',
            'cumpleanos4.png': 'Combinación floral elegante con diseño exclusivo para hacer tu cumpleaños extraordinario.',
            'cumpleanos5.png': 'Arreglo refinado con flores de temporada y técnicas florales avanzadas para cumpleaños especiales.',
            'cumpleanos6.png': 'Diseño contemporáneo con flores importadas perfectas para celebraciones únicas de cumpleaños.',
            
            // Decoraciones especiales
            'cumpleanos7png.png': 'Decoración floral sofisticada que combina tradición y modernidad para tu celebración.',
            'cumpleanos8.png': 'Arreglo de lujo con presentación ceremonial ideal para cumpleaños importantes y especiales.',
            'cumpleanos9.png': 'Decoración exclusiva con flores exóticas que creará una atmosfera mágica en tu cumpleaños.',
            'cumpleanos10.png': 'Arreglo artesanal equilibrado con flores selectas para celebraciones de cumpleaños especiales.',
            'cumpleanos11.png': 'Decoración premium con técnicas avanzadas y flores de la más alta calidad.',
            'cumpleanos12.png': 'Arreglo perfecto que representa la elegancia en su máxima expresión para tu cumpleaños.',
            
            // Centros de mesa para cumpleaños
            'cumpleanos13.png': 'Centro de mesa festivo que crea una atmósfera alegre y colorida para tu cumpleaños.',
            'cumpleanos14.png': 'Arreglo de mesa elegante con flores vibrantes que añade vida a tu celebración de cumpleaños.',
            'cumpleanos15.png': 'Centro de mesa único con diseño contemporáneo perfecto para fiestas de cumpleaños.',
            'cumpleanos16.png': 'Arreglo festivo con flores de temporada que transforma tu mesa en el centro de atención.',
            'cumpleanos17.png': 'Centro de mesa sofisticado que combina colores y texturas para crear impacto visual.',
            'cumpleanos18.png': 'Arreglo final que corona la decoración de tu cumpleaños con estilo y elegancia.'
        };

        this.config = window.CUMPLEANOS_CONFIG || {
            ROUTES: {
                cumpleanos: '../../assets/cumpleanos/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return '../../assets/cumpleanos/';
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
        if (window.cumpleanosUtils) {
            return window.cumpleanosUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'arreglos-festivos':
                return `Arreglo Festivo ${number}`;
            case 'decoraciones-especiales':
                return `Decoración Especial ${number}`;
            case 'centros-mesa-cumpleanos':
                return `Centro de Mesa ${number}`;
            default:
                return `Arreglo de Cumpleaños ${number}`;
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
window.CumpleanosImageManager = CumpleanosImageManager;