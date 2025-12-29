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
            'Ramo1.png': 'Ramo elegante con flores premium y diseño sofisticado que destaca por su elegancia natural y composición armoniosa.',
            'Ramo2.png': 'Arreglo elegante con selección cuidadosa de flores que combina texturas y colores para crear una experiencia visual única.',
            'Ramo3.png': 'Ramo refinado con técnicas artesanales avanzadas que resalta la belleza individual de cada flor seleccionada.',
            'Ramo4.png': 'Diseño elegante que incorpora elementos naturales exclusivos para una presentación sofisticada y distinguida.',
            'Ramo5.png': 'Ramo exclusivo con flores de temporada selectas y arreglo profesional que transmite lujo y elegancia.',
            'Ramo6.png': 'Creación elegante que combina tradición y modernidad en una expresión perfecta del arte floral contemporáneo.',
            'Ramo7.png': 'Arreglo sofisticado con atención meticulosa al detalle y composición que supera las expectativas más exigentes.',
            'Ramo8.png': 'Ramo elegante con diseño asimétrico contemporáneo que crea movimiento y dinamismo visual sofisticado.',
            'Ramo9.png': 'Diseño refinado que utiliza la armonía cromática para crear una experiencia sensorial completa y memorable.',
            'Ramo10.png': 'Ramo elegante con flores importadas y presentación impecable que refleja calidad superior en cada detalle.',
            'Ramo11.png': 'Arreglo exclusivo con técnicas de conservación avanzadas para máxima durabilidad y frescura prolongada.',
            'Ramo12.png': 'Ramo sofisticado que combina diferentes especies florales en una sinfonía de elegancia y distinción natural.',
            'Ramo13.png': 'Diseño elegante con enfoque minimalista que destaca la pureza y perfección de cada elemento floral.',
            'Ramo14.png': 'Arreglo refinado con packaging premium y presentación ceremonial para experiencias inolvidables únicas.',
            'Ramo15.png': 'Ramo elegante que representa la culminación del arte floral sofisticado con flores excepcionales selectas.',
            'ramo16.png': 'Creación elegante final con diseño exclusivo que combina tradición artesanal con innovación contemporánea.'
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