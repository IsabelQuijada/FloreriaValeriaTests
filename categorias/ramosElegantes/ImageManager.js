// ===== IMAGE MANAGER PARA RAMOS ELEGANTES =====

class RamosElegantesImageManager {
    constructor() {
        // Base de datos de imágenes - todos los ramos están en la carpeta principal
        this.imageDatabase = {
            'ramos-elegantes': [
                'Ramo1.png',
                'Ramo2.png', 
                'Ramo3.png',
                'Ramo4.png',
                'Ramo5.png',
                'Ramo6.png',
                'Ramo7.png',
                'Ramo8.png',
                'Ramo9.png',
                'Ramo10.png',
                'Ramo11.png',
                'Ramo12.png',
                'Ramo13.png',
                'Ramo14.png',
                'Ramo15.png',
                'ramo16.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'ramos-elegantes': 'Ramos elegantes con diseños exclusivos y sofisticados, creados con las flores más selectas y técnicas artesanales de vanguardia para ocasiones especiales.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            'Ramo1.png': 'Tulipanes rosas y lisianthus lila con delicado follaje, un ramo fresco, elegante y lleno de vida.',
            'Ramo2.png': 'Rosas blancas y rosas con margaritas, frescura y elegancia en cada detalle.',
            'Ramo3.png': 'Rosas en tonos rosa y crema, elegancia natural y armonía en cada flor.',
            'Ramo4.png': 'Gerberas y margaritas rosas con verdes, alegre y elegante para cualquier ocasión.',
            'Ramo5.png': 'Tulipanes y rosas en tonos suaves, frescura y delicadeza en un solo ramo.',
            'Ramo6.png': 'Lirios y rosas blancas con lisianthus, elegancia clásica en tonos suaves.',
            'Ramo7.png': 'Gerberas en tonos rosa y blanco, alegre, elegante y lleno de vida.',
            'Ramo8.png': 'Gerberas rosas y rosas claras con toques de verde, un ramo alegre y elegante para cualquier ocasión.',
            'Ramo9.png': 'Peonías blancas y follaje gris, un ramo elegante y sereno que inspira pureza y calma.',
            'Ramo10.png': 'Rosas durazno, margaritas y flores pastel, un ramo alegre y elegante para celebrar momentos especiales.',
            'Ramo11.png': 'Gerberas blancas, rosas rosas y eucalipto, un ramo fresco y elegante para alegrar cualquier espacio.',
            'Ramo12.png': 'Rosas blancas y flores durazno con follaje verde, un ramo elegante y natural para cualquier ocasión.',
            'Ramo13.png': 'Rosas blancas y follaje verde, un ramo sencillo y elegante que transmite paz y belleza natural.',
            'Ramo14.png': 'Rosas, lisianthus y asters en tonos pastel, un ramo alegre y elegante para felicitar con estilo.',
            'Ramo15.png': 'Rosas rojas y alstroemerias blancas, un ramo clásico y elegante para expresar amor sincero.',
            'ramo16.png': 'Rosas blancas y lilas con follaje fresco, un ramo elegante y sereno para ocasiones especiales.'
        };

        this.config = window.RAMOS_ELEGANTES_CONFIG || {
            ROUTES: {
                ramosElegantes: '../../assets/ramosElegantes/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return this.config.ROUTES.ramosElegantes || '../../assets/ramosElegantes/';
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
        if (window.ramosElegantesUtils) {
            return window.ramosElegantesUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        return `Ramo Elegante ${number}`;
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
window.RamosElegantesImageManager = RamosElegantesImageManager;