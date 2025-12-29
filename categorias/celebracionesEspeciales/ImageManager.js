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
            'canasta1.png': 'Canasta artesanal con rosas en tonos cálidos y eucalipto. Vibrante y romántica, perfecta para celebrar.',
            'canasta2.png': 'Canasta de rosas rojas y follaje verde. Elegante y apasionada, ideal para expresar amor.',
            'canasta3.png': 'Canasta alegre con gerberas, rosas y claveles. Delicada y especial para cualquier ocasión.',
            'canasta4.png': 'Canasta colorida con lirios, gerberas y rosas. Llena de vida y alegría.',
            'canasta5.png': 'Canasta suave con gerberas, rosas y margaritas. Ternura y alegría en cada flor.',
            'canasta6.png': 'Canasta de rosas amarillas y siempreviva. Radiante y alegre, llena de luz.',
            'canasta7.png': 'Canasta con gerberas, margaritas y crisantemos. Colorida y llena de vida.',
            'canasta8.png': 'Canasta elegante de rosas rojas y eucalipto. Clásica y distinguida.',
            'canasta9.png': 'Canasta con gerberas rosas, margaritas y nube. Tierna y fresca para regalar.',
            'canasta10.png': 'Canasta de gerberas rosas, margaritas y rosas. Armoniosa y fresca para alegrar cualquier espacio.',
            'canasta11.png': 'Canasta de gerberas y margaritas blancas. Elegante y fresca para cualquier ocasión.',
            'canasta12.png': 'Canasta típica de Jalisco con flores multicolores. Tradicional y alegre para fiestas.',
            
            // Centros de mesa festivos
            'centro-mesa1.png': 'Centro de mesa con lirios, rosas y gerberas. Vistoso y armonioso para celebrar.',
            'centro-mesa2.png': 'Centro de mesa con rosas, gerberas y margaritas. Alegre y colorido.',
            'centro-mesa3.png': 'Centro de mesa con gerberas, rosas y lisianthus. Elegante y lleno de color.',
            'centro-mesa4.png': 'Centro de mesa con lirios y rosas en tonos cálidos. Vibrante y especial.',
            'centro-mesa5.png': 'Centro de mesa con cempasúchil y zinnias. Lleno de color para celebraciones.',
            'centro-mesa6.png': 'Centro de mesa con lirios naranjas y margaritas. Elegante y alegre.',
            'centro-mesa7.png': 'Centro de mesa redondo con rosas y nube. Elegante y fresco.',
            'centro-mesa8.png': 'Centro de mesa alargado con lirios y rosas. Fresco y elegante para eventos.',
            'centro-mesa9.png': 'Centro de mesa con rosas, margaritas y velas. Romántico y especial.',
            'centro-mesa10.png': 'Centro de mesa con cempasúchil y margaritas. Colorido y alegre.',
            'centro-mesa11.png': 'Centro de mesa con lirios, gerberas y margaritas. Alegre y lleno de vida.',
            'centro-mesa12.png': 'Centro de mesa con crisantemos y pompones. Fresco y luminoso.',
            
            // Detalles en forma de corazón
            'detalle-forma-corazon.png': 'Corazón con lirios, rosas y gerberas. Vibrante y romántico.',
            'detalle-forma-corazon1.png': 'Corazón de gerberas, margaritas y claveles. Alegre y tierno.',
            'detalle-forma-corazon2.png': 'Canasta de rosas rojas y chocolates. Elegante y dulce.',
            'detalle-forma-corazon3.png': 'Caja corazón con chocolates, rosas y girasol. Dulce y fresca.',
            'detalle-forma-corazon4.png': 'Ramo corazón de rosas y chocolates. Fresco y especial.',
            'detalle-forma-corazon5.png': 'Canasta corazón con rosas y lirio amarillo. Impactante y elegante.',
            'detalle-forma-corazon6.png': 'Corazón de rosas en tonos rosa y rojo. Elegante y alegre.',
            'detalle-forma-corazon7.png': 'Corazón de rosas en tonos rosa y rojo. Elegante y alegre.',
            'detalle-forma-corazon8.png': 'Corazón de rosas rojas y eucalipto en base de madera. Clásico y elegante.',
            'detalle-forma-corazon9.png': 'Caja corazón con rosas, chocolates y perfume. Sofisticada y especial.',
            'detalle-forma-corazon10.png': 'Doble corazón con gerberas y margaritas. Vistoso y alegre.',
            'detalle-forma-corazon11.png': 'Corazón floral con margaritas, gerberas y lirios. Sereno y elegante.'
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