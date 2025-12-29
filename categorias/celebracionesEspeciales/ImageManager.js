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
            'canasta1.png': 'Canasta artesanal con rosas frescas en tonos rojo, rosa y crema, acompañadas de follaje de eucalipto. Un arreglo vibrante y romántico, ideal para sorprender en cualquier celebración especial.',
            'canasta2.png': 'Canasta tradicional repleta de rosas rojas frescas, acompañadas de follaje verde. Un detalle elegante y apasionado, ideal para expresar amor y admiración.',
            'canasta3.png': 'Canasta floral con gerberas, rosas, claveles y follaje de eucalipto. Un arreglo alegre y delicado, ideal para regalar en cumpleaños, aniversarios o cualquier ocasión especial.',
            'canasta4.png': 'Canasta colorida con lirios, gerberas, rosas y follaje fresco. Un arreglo vistoso y alegre, perfecto para regalar y llenar de vida cualquier espacio.',
            'canasta5.png': 'Canasta delicada con gerberas, rosas, margaritas y follaje de eucalipto. Un arreglo en tonos suaves, perfecto para transmitir ternura y alegría en cualquier ocasión.',
            'canasta6.png': 'Canasta de rosas amarillas frescas, acompañadas de follaje y detalles de siempreviva. Un arreglo radiante y alegre, ideal para regalar y llenar de luz cualquier ambiente.',
            'canasta7.png': 'Canasta alegre con gerberas, margaritas, crisantemos y follaje fresco. Un arreglo lleno de color y vida, ideal para celebrar cualquier ocasión especial.',
            'canasta8.png': 'Canasta elegante con rosas rojas, follaje de eucalipto y detalles de siempreviva. Un arreglo clásico y distinguido, ideal para ocasiones especiales.',
            'canasta9.png': 'Canasta delicada con gerberas rosas, margaritas blancas, follaje de eucalipto y detalles de nube. Un arreglo tierno y fresco, ideal para regalar en cualquier ocasión especial.',
            'canasta10.png': 'Canasta artesanal con gerberas rosas, margaritas blancas, rosas y follaje de eucalipto. Un arreglo armonioso y fresco, ideal para regalar en cumpleaños, aniversarios o para alegrar cualquier espacio.',
            'canasta11.png': 'Canasta floral con gerberas rosas, margaritas blancas, follaje de eucalipto y detalles de nube. Un arreglo elegante y fresco, ideal para regalar y alegrar cualquier ocasión.',
            'canasta12.png': 'Canasta artesanal típica de Jalisco, adornada con gerberas multicolores, claveles rosados, margaritas blancas, alstroemerias amarillas y follaje fresco. Un arreglo alegre y tradicional que transmite la calidez y el colorido de las celebraciones mexicanas, perfecto para regalar en fiestas y ocasiones especiales.',
            
            // Centros de mesa festivos
            'centro-mesa1.png': 'Centro de mesa elegante con lirios rosados, rosas crema, gerberas fucsia, claveles y alstroemerias, acompañado de follaje fresco y nube. Un arreglo vistoso y armonioso, ideal para dar un toque especial y alegre a cualquier celebración.',
            'centro-mesa2.png': 'Centro de mesa compuesto por rosas blancas y rosas, gerberas amarillas, margaritas rosadas, solidago y follaje fresco. Un arreglo alegre y colorido, ideal para sorprender y dar un toque especial a cualquier celebración.',
            'centro-mesa3.png': 'Centro de mesa con gerberas rosas, rosas pastel, lisianthus morado, margaritas lilas, alstroemerias, boca de dragón, follaje y detalles de palma seca. Un arreglo colorido y elegante, ideal para realzar cualquier evento especial.',
            'centro-mesa4.png': 'Centro de mesa con lirios anaranjados, rosas durazno, margaritas naranjas, follaje de eucalipto y detalles de nube. Un arreglo vibrante y elegante, ideal para destacar en cualquier evento especial.',
            'centro-mesa5.png': 'Centro de mesa tradicional con cempasúchil, celosía roja, zinnias amarillas y follaje verde. Un arreglo vibrante y lleno de color, ideal para celebraciones especiales y altares.',
            'centro-mesa6.png': 'Centro de mesa con lirios naranjas, margaritas anaranjadas, mini rosas y follaje de eucalipto. Un arreglo vibrante y elegante, ideal para dar un toque especial a cualquier celebración.',
            'centro-mesa7.png': 'Centro de mesa redondo con rosas blancas y moradas, follaje variado y detalles de nube. Un arreglo elegante y fresco, ideal para celebraciones y eventos especiales.',
            'centro-mesa8.png': 'Centro de mesa alargado con lirios blancos, rosas blancas y moradas, statice, campanas de Irlanda, nube y follaje variado. Un arreglo elegante y fresco, ideal para eventos formales y celebraciones especiales.',
            'centro-mesa9.png': 'Centro de mesa con rosas rosas, margaritas blancas, follaje verde y velas decorativas en bases de cristal. Un arreglo romántico y elegante, ideal para eventos especiales y celebraciones nocturnas.',
            'centro-mesa10.png': 'Centro de mesa tradicional con cempasúchil, margaritas moradas, nube y follaje verde. Un arreglo colorido y alegre, ideal para celebraciones y altares.',
            'centro-mesa11.png': 'Centro de mesa con lirios blancos y amarillos, gerberas rojas y naranjas, margaritas azules y blancas, y follaje variado. Un arreglo alegre y colorido, ideal para celebraciones especiales y eventos llenos de vida.',
            'centro-mesa12.png': 'Centro de mesa con crisantemos blancos y lilas, pompones amarillos y follaje verde. Un arreglo fresco y luminoso, ideal para dar un toque especial y alegre a cualquier celebración.',
            
            // Detalles en forma de corazón
            'detalle-forma-corazon.png': 'Arreglo en forma de corazón con lirios rosas, rosas, gerberas, alstroemerias amarillas y follaje tropical. Un diseño vibrante y romántico, ideal para expresar sentimientos especiales en cualquier ocasión.',
            'detalle-forma-corazon1.png': 'Arreglo en forma de corazón elaborado con gerberas rosas y coral, margaritas blancas y amarillas, claveles bicolores y follaje fresco. Un diseño alegre y romántico que transmite ternura y cariño en cada flor.',
            'detalle-forma-corazon2.png': 'Canasta de rosas rojas frescas acompañada de follaje verde, decorada con chocolates y dulces variados. Un detalle especial que combina la elegancia de las flores con el sabor dulce para sorprender en cualquier ocasión.',
            'detalle-forma-corazon3.png': 'Caja en forma de corazón con chocolates, acompañada de un arreglo de rosas rojas, un girasol central y follaje decorativo. Un regalo que une la dulzura y la frescura de las flores para sorprender a alguien especial.',
            'detalle-forma-corazon4.png': 'Ramo en forma de corazón con rosas rojas, follaje verde y detalles de nube, decorado en el centro con chocolates. Un obsequio elegante que combina la frescura de las flores con un toque dulce para ocasiones especiales.',
            'detalle-forma-corazon5.png': 'Canasta en forma de corazón con abundantes rosas rojas, una rosa blanca central, follaje verde y un lirio amarillo como acento. Un arreglo impactante y elegante, ideal para expresar sentimientos profundos.',
            'detalle-forma-corazon6.png': 'Arreglo en forma de corazón elaborado con rosas en tonos rosa, fucsia y rojo, acompañado de follaje verde. Un diseño elegante y colorido que expresa amor y alegría en cada flor.',
            'detalle-forma-corazon7.png': 'Arreglo en forma de corazón elaborado con rosas en tonos rosa, fucsia y rojo, acompañado de follaje verde. Un diseño elegante y colorido que expresa amor y alegría en cada flor.',
            'detalle-forma-corazon8.png': 'Arreglo en forma de corazón con rosas rojas frescas y follaje de eucalipto, presentado en una base de madera. Un diseño clásico y elegante que transmite amor y admiración.',
            'detalle-forma-corazon9.png': 'Caja en forma de corazón con rosas rojas frescas, chocolates y un perfume de regalo. Un detalle sofisticado que combina flores, dulzura y un toque especial para sorprender.',
            'detalle-forma-corazon10.png': 'Doble corazón floral elaborado con gerberas amarillas y rojas, acentos de margaritas y follaje verde. Un arreglo vistoso y alegre, ideal para celebrar el amor y la unión.',
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