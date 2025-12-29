// ===== IMAGE MANAGER PARA CELEBRACIONES ESPECIALES =====

class CelebracionesEspecialesImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'canastas-florales': [
                'canasta1.png',
                'canasta2.png',
                'canasta3.png',
                'canasta4.png',
                'canasta5.png',
                'canasta6.png',
                'canasta7.png',
                'canasta8.png',
                'canasta9.png',
                'canasta10.png',
                'canasta11.png',
                'canasta12.png'
            ],
            'centros-de-mesa-festivos': [
                'centro-mesa1.png',
                'centro-mesa2.png',
                'centro-mesa3.png',
                'centro-mesa4.png',
                'centro-mesa5.png',
                'centro-mesa6.png',
                'centro-mesa7.png',
                'centro-mesa8.png',
                'centro-mesa9.png',
                'centro-mesa10.png',
                'centro-mesa11.png',
                'centro-mesa12.png'
            ],
            'detalles-en-forma-de-corazon': [
                'detalle-forma-corazon.png',
                'detalle-forma-corazon1.png',
                'detalle-forma-corazon2.png',
                'detalle-forma-corazon3.png',
                'detalle-forma-corazon4.png',
                'detalle-forma-corazon5.png',
                'detalle-forma-corazon6.png',
                'detalle-forma-corazon7.png',
                'detalle-forma-corazon8.png',
                'detalle-forma-corazon9.png',
                'detalle-forma-corazon10.png',
                'detalle-forma-corazon11.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'canastas-florales': 'Canastas florales elegantes perfectas para regalar en cualquier ocasión especial, llenas de color y vida.',
            'centros-de-mesa-festivos': 'Centros de mesa festivos que transforman cualquier celebración en un evento memorable y lleno de alegría.',
            'detalles-en-forma-de-corazon': 'Arreglos románticos en forma de corazón que expresan amor y cariño en cada detalle floral.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Canastas florales
            'canasta1.png': 'Canasta floral elegante con flores frescas y coloridas, perfecta para regalar en ocasiones especiales.',
            'canasta2.png': 'Canasta de flores variadas con diseño sofisticado que transmite alegría y celebración.',
            'canasta3.png': 'Canasta floral única con arreglo artesanal y flores selectas para momentos especiales.',
            'canasta4.png': 'Canasta de flores premium con diseño exclusivo y presentación impecable para celebrar.',
            'canasta5.png': 'Canasta floral refinada con flores de temporada y técnicas florales avanzadas.',
            'canasta6.png': 'Canasta elegante con flores importadas y diseño contemporáneo para ocasiones únicas.',
            'canasta7.png': 'Canasta floral sofisticada que combina tradición y modernidad en cada detalle.',
            'canasta8.png': 'Canasta de flores de lujo con presentación ceremonial y calidad excepcional.',
            'canasta9.png': 'Canasta floral exclusiva con flores exóticas y diseño personalizado.',
            'canasta10.png': 'Canasta artesanal con flores selectas y arreglo equilibrado para celebraciones especiales.',
            'canasta11.png': 'Canasta floral premium con técnicas avanzadas y flores de la más alta calidad.',
            'canasta12.png': 'Canasta de flores perfecta con diseño final que representa la elegancia en su máxima expresión.',
            
            // Centros de mesa festivos
            'centro-mesa1.png': 'Centro de mesa festivo que crea una atmósfera alegre y colorida para tus celebraciones.',
            'centro-mesa2.png': 'Arreglo de mesa elegante con flores vibrantes que añade vida a cualquier evento especial.',
            'centro-mesa3.png': 'Centro de mesa único con diseño contemporáneo perfecto para fiestas y celebraciones.',
            'centro-mesa4.png': 'Arreglo festivo con flores de temporada que transforma tu mesa en el centro de atención.',
            'centro-mesa5.png': 'Centro de mesa sofisticado que combina colores y texturas para crear impacto visual.',
            'centro-mesa6.png': 'Arreglo de mesa premium con flores importadas y presentación de lujo para eventos especiales.',
            'centro-mesa7.png': 'Centro de mesa artesanal con técnicas florales avanzadas y diseño equilibrado.',
            'centro-mesa8.png': 'Arreglo elegante que aporta armonía y belleza natural a tu espacio de celebración.',
            'centro-mesa9.png': 'Centro de mesa exclusivo con flores exóticas que crean una experiencia visual única.',
            'centro-mesa10.png': 'Arreglo refinado con presentación ceremonial que refleja estilo y elegancia.',
            'centro-mesa11.png': 'Centro de mesa perfecto con diseño innovador que destaca en cualquier celebración.',
            'centro-mesa12.png': 'Arreglo festivo final que corona la decoración de tu evento especial.',
            
            // Detalles en forma de corazón
            'detalle-forma-corazon.png': 'Arreglo romántico en forma de corazón que expresa amor y cariño en cada pétalo.',
            'detalle-forma-corazon1.png': 'Detalle floral en forma de corazón perfecto para demostrar afecto en ocasiones especiales.',
            'detalle-forma-corazon2.png': 'Arreglo romántico con diseño de corazón que simboliza amor verdadero y duradero.',
            'detalle-forma-corazon3.png': 'Detalle floral único en forma de corazón con flores selectas y presentación elegante.',
            'detalle-forma-corazon4.png': 'Arreglo de corazón sofisticado con flores premium y técnicas florales artesanales.',
            'detalle-forma-corazon5.png': 'Detalle romántico exclusivo que combina tradición y modernidad en su diseño.',
            'detalle-forma-corazon6.png': 'Arreglo en forma de corazón con flores importadas y calidad excepcional.',
            'detalle-forma-corazon7.png': 'Detalle floral artesanal que representa el amor en su forma más pura y bella.',
            'detalle-forma-corazon8.png': 'Arreglo romántico refinado con presentación ceremonial y flores exóticas.',
            'detalle-forma-corazon9.png': 'Detalle en forma de corazón perfecto con diseño equilibrado y armonioso.',
            'detalle-forma-corazon10.png': 'Arreglo romántico de lujo que transmite emociones profundas y sentimientos sinceros.',
            'detalle-forma-corazon11.png': 'Detalle floral final en forma de corazón que representa la perfección del amor.'
        };

        this.config = window.CELEBRACIONES_ESPECIALES_CONFIG || {
            ROUTES: {
                celebracionesEspeciales: '../../assets/celebracionesEspeciales/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        const folderMap = {
            'canastas-florales': '../../assets/celebracionesEspeciales/canastasFlores/',
            'centros-de-mesa-festivos': '../../assets/celebracionesEspeciales/centrosDeMesaFestivos/',
            'detalles-en-forma-de-corazon': '../../assets/celebracionesEspeciales/detallesEnFormaDeCorazon/'
        };
        return folderMap[category] || '../../assets/celebracionesEspeciales/';
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
        if (window.celebracionesEspecialesUtils) {
            return window.celebracionesEspecialesUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'canastas-florales':
                return `Canasta Floral ${number}`;
            case 'centros-de-mesa-festivos':
                return `Centro de Mesa Festivo ${number}`;
            case 'detalles-en-forma-de-corazon':
                return `Detalle Corazón ${number}`;
            default:
                return `Arreglo Especial ${number}`;
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
window.CelebracionesEspecialesImageManager = CelebracionesEspecialesImageManager;