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
            'cumpleanos1.png': 'Centro de mesa con girasoles radiantes y rosas en tonos suaves, creando un contraste alegre y elegante ideal para celebraciones llenas de luz y color.',
            'cumpleanos2.png': 'Arreglo floral exuberante con rosas en tonos blanco, rosa, lila y coral, acompañado de follaje y flores de acento para un centro de mesa elegante y colorido.',
            'cumpleanos3.png': 'Imponente arreglo de rosas rojas acompañado de follaje verde, ideal para expresar amor y celebrar ocasiones especiales con elegancia.',
            'cumpleanos4.png': 'Arreglo vistoso con girasoles, rosas rojas, gerberas naranjas, aves del paraíso y lirios, ideal para dar un toque alegre y sofisticado a cualquier celebración.',
            'cumpleanos5.png': 'Arreglo abundante con lirios, gerberas, rosas y flores variadas en tonos blanco, rosa, naranja y fucsia, ideal para llenar de alegría y color cualquier celebración.',
            'cumpleanos6.png': 'Centro de mesa con girasol, rosas rosas y flores moradas, acompañado de follaje verde, ideal para dar un toque vibrante y fresco a cualquier celebración.',
            
            // Decoraciones especiales
            'cumpleanos7png.png': 'Arreglo delicado con gerberas y rosas en tonos rosa, acompañado de flores lilas y follaje, perfecto para dar un toque romántico y elegante a cualquier evento.',
            'cumpleanos8.png': 'Arreglo espectacular con lirios, rosas rojas, gerberas y flores en tonos naranja, amarillo y rosa, acompañado de follaje, ideal para celebraciones llenas de color y alegría.',
            'cumpleanos9.png': 'Arreglo exuberante con girasoles, rosas, lirios, gerberas, aves del paraíso y follaje exótico, ideal para llenar de color y alegría cualquier celebración.',
            'cumpleanos10.png': 'Arreglo vistoso con girasoles, rosas rojas y rosas, aves del paraíso y lirios, ideal para dar un toque alegre y elegante a cualquier celebración.',
            'cumpleanos11.png': 'Arreglo elegante con gerberas, claveles, alstroemerias y flores en tonos suaves y lilas, ideal para dar un toque delicado y sofisticado a cualquier ocasión.',
            'cumpleanos12.png': 'Arreglo elegante de rosas en tonos rosa, acompañado de follaje verde, ideal para expresar cariño y sofisticación en cualquier ocasión especial.',
            
            // Centros de mesa para cumpleaños
            'cumpleanos13.png': 'Arreglo con lirios amarillos, gerberas, girasol y claveles en tonos vivos, ideal para dar alegría y color a cualquier celebración.',
            'cumpleanos14.png': 'Arreglo de mesa con rosas rojas y follaje verde, ideal para dar un toque elegante y clásico a cualquier celebración.',
            'cumpleanos15.png': 'Arreglo con rosas blancas y rosas, follaje verde y lazo decorativo, ideal para dar un toque delicado y elegante a cualquier celebración.',
            'cumpleanos16.png': 'Arreglo de mesa con lirios blancos y rosas, rosas rojas, rosas blancas y rosas rosas, ideal para dar un toque elegante y fresco a cualquier celebración.',
            'cumpleanos17.png': 'Centro de mesa con gerberas amarillas, rosas lilas y blancas, crisantemos y mariposas decorativas, ideal para dar un toque alegre y original a cualquier celebración.',
            'cumpleanos18.png': 'Arreglo en forma de abanico con rosas rojas, rosas rosas, girasoles y gerberas amarillas, ideal para impresionar y llenar de color cualquier celebración.'
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