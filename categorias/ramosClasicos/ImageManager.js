// ===== IMAGE MANAGER PARA RAMOS CLÁSICOS =====

class RamosClasicosImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'ramo-estilizado': [
                'ramo-estilizado1.png',
                'ramo-estilizado2.png',
                'ramo-estilizado3.png',
                'ramo-estilizado4.png',
                'ramo-estilizado5.png',
                'ramo-estilizado6.png',
                'ramo-estilizado7.png',
                'ramo-estilizado8.png',
                'ramo-estilizado9.png',
                'ramo-estilizado10.png',
                'ramo-estilizado11.png',
                'ramo-estilizado12.png',
                'ramo-estilizado13.png'
            ],
            'ramo-girasoles': [
                'ramo-girasoles1.png',
                'ramo-girasoles2.png',
                'ramo-girasoles3.png',
                'ramo-girasoles4.png'
            ],
            'ramo-mix': [
                'ramo-mix1png.png',
                'ramo-mix2.png',
                'ramo-mix3.png',
                'ramo-mix4.png',
                'ramo-mix5.png',
                'ramo-mix6.png',
                'ramo-mix7.png',
                'ramo-mix8.png',
                'ramo-mix9.png',
                'ramo-mix10.png'
            ],
            'ramo-rosas': [
                'ramo-rosas1.png',
                'ramo-rosas2.png',
                'ramo-rosas3.png',
                'ramo-rosas4.png',
                'ramo-rosas5.png',
                'ramo-rosas6.png',
                'ramo-rosas7.png',
                'ramo-rosas8.png',
                'ramo-rosas9.png',
                'ramo-rosas11.png'
            ],
            'ramo-tulipanes': [
                'ramo-tulipanes1.png',
                'ramo-tulipanes2.png',
                'ramo-tulipanes3.png',
                'ramo-tulipanes4.png',
                'ramo-tulipanes5.png',
                'ramo-tulipanes6.png',
                'ramo-tulipanes7.png',
                'ramo-tulipanes8.png',
                'ramo-tulipanes9.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'ramo-estilizado': 'Ramos clásicos estilizados con diseños contemporáneos y flores selectas de la más alta calidad.',
            'ramo-girasoles': 'Ramos vibrantes de girasoles que irradian alegría y vitalidad, perfectos para momentos especiales.',
            'ramo-mix': 'Combinaciones únicas de flores mixtas que crean arreglos equilibrados y llenos de color.',
            'ramo-rosas': 'Ramos clásicos de rosas que expresan elegancia y romance en su forma más pura.',
            'ramo-tulipanes': 'Ramos delicados de tulipanes que aportan frescura y sofisticación a cualquier ocasión.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Ramo Estilizado
            'ramo-estilizado1.png': 'Ramo elegante con girasoles, rosas y flores blancas, envuelto en tonos suaves. Simplemente hermoso.',
            'ramo-estilizado2.png': 'Ramo con lirios rosados, gerbera y flores blancas, envuelto en rosa suave. Delicado y fresco.',
            'ramo-estilizado3.png': 'Ramo de rosas rojas y eucalipto, envuelto en rojo intenso. Clásico y cautivador.',
            'ramo-estilizado4.png': 'Rosas blancas y Ferrero, con gypsophila y azul claro. Dulce, elegante y especial.',
            'ramo-estilizado5.png': 'Rosas y gerberas blancas, margaritas y eucalipto, envuelto en azul. Fresco y elegante.',
            'ramo-estilizado6.png': 'Lirios rosados, gerberas y margaritas, con tonos pastel. Alegre, colorido y elegante.',
            'ramo-estilizado7.png': 'Rosas rosas y blancas, envueltas en rosa. Romántico, delicado y hermoso.',
            'ramo-estilizado8.png': 'Rosas blancas y rosas con follaje fresco, elegante y natural.',
            'ramo-estilizado9.png': 'Girasoles, rosas y hortensias en tonos vivos, alegre y sofisticado.',
            'ramo-estilizado10.png': 'Rosas y lisianthus en tonos rosados, delicado y romántico.',
            'ramo-estilizado11.png': 'Rosas, lirios y claveles en rosa y blanco, fresco y encantador.',
            'ramo-estilizado12.png': 'Rosas rojas y rosas con eucalipto, vibrante y sofisticado.',
            'ramo-estilizado13.png': 'Tulipanes, lisianthus y alstroemerias en rosa y crema, suave y elegante.',
            
            // Ramo Girasoles
            'ramo-girasoles1.png': 'Ramo vibrante de girasoles frescos que irradia alegría y vitalidad positiva.',
            'ramo-girasoles2.png': 'Diseño floral con girasoles que aporta calidez y luminosidad al ambiente.',
            'ramo-girasoles3.png': 'Ramo de girasoles con presentación tradicional y flores de campo frescas.',
            'ramo-girasoles4.png': 'Combinación única de girasoles que simboliza felicidad y energia positiva.',
            
            // Ramo Mix
            'ramo-mix1png.png': 'Rosas rojas y rosas con follaje verde, elegante y natural.',
            'ramo-mix2.png': 'Rosas rojas y rosas con detalles de mariposas, sofisticado y encantador.',
            'ramo-mix3.png': 'Girasoles, rosas y lisianthus en tonos suaves. Fresco y luminoso.',
            'ramo-mix4.png': 'Rosas rojas y follaje verde, clásico y vibrante.',
            'ramo-mix5.png': 'Gerberas y rosas en tonos rosas y crema, alegre y delicado.',
            'ramo-mix6.png': 'Gerberas, rosas y margaritas en tonos rosas, dulce y alegre.',
            'ramo-mix7.png': 'Gerberas, rosas y crisantemos en tonos rosas, alegre y femenino.',
            'ramo-mix8.png': 'Rosas amarillas y blancas, alegre y radiante.',
            'ramo-mix9.png': 'Gerberas, rosas y margaritas en amarillo y blanco, luminoso y fresco.',
            'ramo-mix10.png': 'Rosas rojas con corona y mariposas doradas, romántico y especial.',
            
            // Ramo Rosas
            'ramo-rosas1.png': 'Rosas rojas y blancas con alstroemerias, elegante y lleno de armonía.',
            'ramo-rosas2.png': 'Rosas lilas y rosas con tulipanes amarillos y alstroemerias, alegre y sofisticado.',
            'ramo-rosas3.png': 'Rosas rojas con follaje y gypsophila, clásico y encantador.',
            'ramo-rosas4.png': 'Rosas blancas y rosas con toques lilas, delicado y hermoso.',
            'ramo-rosas5.png': 'Rosas rojas y alstroemerias, elegante y vibrante.',
            'ramo-rosas6.png': 'Rosas rojas, rosas y blancas con alstroemerias, alegre y delicado.',
            'ramo-rosas7.png': 'Rosas rojas y blancas con alstroemerias, elegante y armonioso.',
            'ramo-rosas8.png': 'Rosas rojas y alstroemerias rosas, intenso y elegante.',
            'ramo-rosas9.png': 'Rosas rojas con follaje y gypsophila, clásico y fresco.',
            'ramo-rosas11.png': 'Rosas blancas y fucsias con follaje, alegre y moderno.',
            
            // Ramo Tulipanes
            'ramo-tulipanes1.png': 'Ramo blanco con lisianthus, follaje y toques de berries. Sencillo, fresco y elegante.',
            'ramo-tulipanes2.png': 'Tulipanes naranjas, margaritas y flores rosas. Colorido, alegre y sofisticado.',
            'ramo-tulipanes3.png': 'Tulipanes blancos, lisianthus blanco, follaje y berries en ramo fresco y luminoso.',
            'ramo-tulipanes4.png': 'Tulipanes rosas con follaje y flores delicadas. Romántico, fresco y femenino.',
            'ramo-tulipanes5.png': 'Tulipanes fucsia, rosas y gerberas en tonos pastel. Dulce, alegre y delicado.',
            'ramo-tulipanes6.png': 'Tulipanes tosas y rosas lilas con follaje. Fino, moderno y lleno de estilo.',
            'ramo-tulipanes7.png': 'Tulipanes rosados y margaritas lilas en envoltura romántica. Suave, tierno y encantador.',
            'ramo-tulipanes8.png': 'Tulipanes lila y blancos con toques verdes. Suave, fresco y delicado.',
            'ramo-tulipanes9.png': 'Tulipanes rosas y rojos con berries. Vibrante, elegante y lleno de vida.'
        };

        this.config = window.RAMOS_CLASICOS_CONFIG || {
            ROUTES: {
                ramosClasicos: '../../assets/ramosClasicos/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return this.config.ROUTES.ramosClasicos || '../../assets/ramosClasicos/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);
        const categoryFolder = this.getCategoryFolderName(category);

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Ramo clásico de alta calidad con flores selectas y diseño elegante.',
            image: `${basePath}${categoryFolder}/${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Obtiene el nombre de la carpeta para cada categoría
     */
    getCategoryFolderName(category) {
        const folderMapping = {
            'ramo-estilizado': 'ramoEstilizado',
            'ramo-girasoles': 'ramoGirasoles', 
            'ramo-mix': 'ramoMix',
            'ramo-rosas': 'ramoRosas',
            'ramo-tulipanes': 'ramoTulipanes'
        };
        return folderMapping[category] || category;
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.ramosClasicosUtils) {
            return window.ramosClasicosUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        
        switch (category) {
            case 'ramo-estilizado':
                return `Ramo Estilizado ${number}`;
            case 'ramo-girasoles':
                return `Ramo de Girasoles ${number}`;
            case 'ramo-mix':
                return `Ramo Mixto ${number}`;
            case 'ramo-rosas':
                return `Ramo de Rosas ${number}`;
            case 'ramo-tulipanes':
                return `Ramo de Tulipanes ${number}`;
            default:
                return `Ramo Clásico ${number}`;
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
window.EventosReligiososImageManager = EventosReligiososImageManager;