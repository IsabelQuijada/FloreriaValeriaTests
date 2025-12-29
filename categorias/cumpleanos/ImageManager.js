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
                'cumpleanos6.png',
                'cumpleanos7png.png',
                'cumpleanos8.png',
                'cumpleanos9.png',
                'cumpleanos10.png',
                'cumpleanos11.png',
                'cumpleanos12.png',
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
            'arreglos-festivos': 'Arreglos florales festivos y coloridos especialmente diseñados para hacer de tu cumpleaños una celebración única y memorable, incluyendo centros de mesa y decoraciones especiales.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Arreglos festivos
            'cumpleanos1.png': 'Centro de mesa con girasoles y rosas suaves, alegre y elegante.',
            'cumpleanos2.png': 'Rosas en blanco, rosa y coral con follaje, colorido y fresco.',
            'cumpleanos3.png': 'Rosas rojas y follaje verde, clásico y lleno de amor.',
            'cumpleanos4.png': 'Girasoles, rosas y gerberas, un toque alegre y sofisticado.',
            'cumpleanos5.png': 'Lirios, gerberas y rosas en tonos vivos, pura alegría.',
            'cumpleanos6.png': 'Girasol, rosas rosas y flores moradas, vibrante y fresco.',
            
            // Decoraciones especiales
            'cumpleanos7png.png': 'Gerberas y rosas rosas con flores lilas, romántico y delicado.',
            'cumpleanos8.png': 'Lirios, rosas y gerberas en tonos cálidos, lleno de color.',
            'cumpleanos9.png': 'Girasoles, rosas y lirios con follaje exótico, muy alegre.',
            'cumpleanos10.png': 'Girasoles y rosas con aves del paraíso, alegre y elegante.',
            'cumpleanos11.png': 'Gerberas, claveles y alstroemerias en tonos suaves, delicado.',
            'cumpleanos12.png': 'Rosas rosas y follaje verde, tierno y sofisticado.',
            
            // Centros de mesa para cumpleaños
            'cumpleanos13.png': 'Lirios amarillos, gerberas y girasol, lleno de vida.',
            'cumpleanos14.png': 'Rosas rojas y follaje verde, elegante y clásico.',
            'cumpleanos15.png': 'Rosas blancas y rosas con lazo, delicado y elegante.',
            'cumpleanos16.png': 'Lirios y rosas en blanco y rosa, fresco y elegante.',
            'cumpleanos17.png': 'Gerberas amarillas, rosas lilas y mariposas, alegre y original.',
            'cumpleanos18.png': 'Rosas, girasoles y gerberas en abanico, colorido y vistoso.'
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
        
        return `Arreglo Festivo ${number}`;
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