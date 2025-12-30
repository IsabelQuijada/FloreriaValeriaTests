// ===== IMAGE MANAGER PARA GALERÍA FUNERARIA =====

class GaleriaFunerariaImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'coronas': [
                'Corona1.png','Corona2.png','Corona3.png','Corona4.png','Corona5.png','Corona6.png','Corona7.png','Corona8.png','Corona9.png','Corona10.png','Corona11.png','Corona12.png','Corona13.png','Corona14.png','Corona15.png','Corona16.png','Corona17.png','Corona18.png','Corona19.png','Corona20.png','Corona21.png','Corona22.png','Corona23.png','Corona24.png','Corona25.png','Corona26.png','Corona27.png','Corona28.png','Corona29.png'
            ],
            'cruces': [
                'Cruz1.png','Cruz2.png','Cruz3.png','Cruz4.png','Cruz5.png','Cruz6.png','Cruz7.png','Cruz8.png'
            ],
            'cubre-caja': [
                'CubreCaja1.png','CubreCaja2.png','CubreCaja3.png','CubreCaja4.png','CubreCaja5.png','CubreCaja6.png'
            ],
            'pie-caja-altar': [
                'PieDeCajaAltar1.png','PieDeCajaAltar2.png','PieDeCajaAltar3.png','PieDeCajaAltar4.png','PieDeCajaAltar5.png','PieDeCajaAltar6.png','PieDeCajaAltar7.png','PieDeCajaAltar8.png','PieDeCajaAltar9.png','PieDeCajaAltar10.png','PieDeCajaAltar11.png','PieDeCajaAltar12.png','PieDeCajaAltar13.png','PieDeCajaAltar14.png'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'coronas': 'Coronas funerarias elegantes y solemnes para honrar la memoria de tus seres queridos.',
            'cruces': 'Cruces florales para expresar respeto y condolencias en ceremonias fúnebres.',
            'cubre-caja': 'Cubre caja con flores frescas y delicadas para despedidas significativas.',
            'pie-caja-altar': 'Arreglos para pie de caja o altar, diseñados para acompañar en momentos de despedida.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Coronas
            'Corona1.png': 'Corona blanca de lirios, margaritas y crisantemos. Pura y serena.',
            'Corona2.png': 'Corona de lirios y rosas blancas. Elegante y tranquila.',
            'Corona3.png': 'Corona con lirios y margaritas rosadas. Sutil y llena de paz.',
            'Corona4.png': 'Corona de crisantemos y lirios blancos. Sobria y elegante.',
            'Corona5.png': 'Corona de margaritas blancas y crisantemos rojos. Contraste especial.',
            'Corona6.png': 'Corona de rosas y margaritas blancas. Fresca y luminosa.',
            'Corona7.png': 'Corona de rosas y crisantemos con detalles secos. Natural y elegante.',
            'Corona8.png': 'Corona de lirios y margaritas en tonos crema. Respeto y calma.',
            'Corona9.png': 'Corona con girasoles y rosas. Vibrante y llena de vida.',
            'Corona10.png': 'Corona de lirios y rosas rojas. Amor y respeto.',
            'Corona11.png': 'Corona de crisantemos y gerberas rosas. Delicada y armoniosa.',
            'Corona12.png': 'Corona de lirios y rosas blancas. Suave y fresca.',
            'Corona13.png': 'Corona de crisantemos y rosas rosas. Delicada y serena.',
            'Corona14.png': 'Corona de lirios y helecho. Fresca y natural.',
            'Corona15.png': 'Corona de rosas y lirios con flores rosas. Elegante y cariñosa.',
            'Corona16.png': 'Corona grande de lirios y margaritas. Elegante y serena.',
            'Corona17.png': 'Corona grande de lirios y rosas blancas. Serenidad y elegancia.',
            'Corona18.png': 'Corona de lirios y margaritas. Homenaje sereno y hermoso.',
            'Corona19.png': 'Corona de lirios y crisantemos. Sencilla y hermosa.',
            'Corona20.png': 'Corona de rosas blancas y detalles secos. Sencilla y natural.',
            'Corona21.png': 'Corona de lirios y gerberas rosas. Llena de color y vida.',
            'Corona22.png': 'Corona de lirios y rosas. Delicada y luminosa.',
            'Corona23.png': 'Corona de lirios y gerberas. Fresca y armoniosa.',
            'Corona24.png': 'Corona de lirios y crisantemos. Pura y elegante.',
            'Corona25.png': 'Corona de lirios y gerberas. Colorida y cariñosa.',
            'Corona26.png': 'Corona de lirios y gerberas. Alegre y llena de vida.',
            'Corona27.png': 'Corona de lirios y rosas. Elegante y colorida.',
            'Corona28.png': 'Corona de lirios amarillos y rosas blancas. Alegre y elegante.',
            // Cruces
            'Cruz1.png': 'Cruz floral elaborada con lirios blancos, rosas blancas, crisantemos y follaje verde, acentuada con hojas de monstera y flores de snapdragon, creando un arreglo solemne y elegante.',
            'Cruz2.png': 'Cruz de crisantemos blancos, lirios, rosas y follaje, elegante y serena.',
            'Cruz3.png': 'Cruz con crisantemos, rosas, follaje y acentos lilas. Colorida y elegante.',
            'Cruz4.png': 'Cruz de crisantemos, lirios, tulipanes y follaje, fresca y luminosa.',
            'Cruz5.png': 'Cruz de crisantemos, lirios, tulipanes y follaje, blanca y delicada.',
            'Cruz6.png': 'Cruz grande de crisantemos y rosas. Pura, elegante y llena de luz.',
            'Cruz7.png': 'Cruz con gerberas, rosas, crisantemos y follaje en tonos pastel.',
            'Cruz8.png': 'Cruz de crisantemos, rosas blancas y follaje gris, elegante y serena.',
            // Cubre Caja
            'CubreCaja1.png': 'Arreglo con gerberas blancas, crisantemos anaranjados, margaritas blancas y follaje de eucalipto y monstera. Un arreglo vibrante y elegante que combina tonos cálidos y frescos para una despedida significativa.',
            'CubreCaja2.png': 'Arreglo con lirios blancos, gerberas, alstroemerias y follaje fresco. Un arreglo sereno y luminoso.',
            'CubreCaja3.png': 'Arreglo con rosas blancas, gerberas, crisantemos y follaje verde. Un arreglo fresco y delicado.',
            'CubreCaja4.png': 'Arreglo con lirios, rosas blancas, gerberas y follaje verde. Elegancia y pureza en cada flor.',
            'CubreCaja5.png': 'Arreglo con lirios, gerberas rosas, crisantemos, nube y follaje de eucalipto. Un arreglo alegre y delicado.',
            'CubreCaja6.png': 'Arreglocon gerberas amarillas, lirios, crisantemos blancos y follaje. Un toque alegre y fresco.',
            // Pie Caja Altar
            'PieDeCajaAltar1.png': 'Arreglo elaborado con rosas blancas y lilas, lisianthus, margaritas moradas, flores de encaje y follaje verde. Un diseño elegante y armonioso que combina tonos suaves y frescos para transmitir serenidad y cariño en momentos de despedida.',
            'PieDeCajaAltar2.png': 'Arreglo con lirios y rosas rosas con margaritas. Delicado y lleno de luz.',
            'PieDeCajaAltar3.png': 'Arreglo con margaritas blancas, lirios y follaje fresco. Sencillez y pureza en cada flor.',
            'PieDeCajaAltar4.png': 'Arreglo con lirios, rosas blancas, crisantemos amarillos y nube. Elegancia y luz en cada detalle.',
            'PieDeCajaAltar5.png': 'Arreglo con rosas blancas, crisantemos y claveles. Sereno y armonioso.',
            'PieDeCajaAltar6.png': 'Arreglo con lirios y rosas blancas con crisantemos. Elegante y sereno.',
            'PieDeCajaAltar7.png': 'Arreglo con rosas blancas y gerberas con nube. Elegante y puro.',
            'PieDeCajaAltar8.png': 'Arreglo de altar con lirios, gerberas y rosas blancas, alstroemerias y follaje verde. Elegancia y luz en cada detalle.',
            'PieDeCajaAltar9.png': 'Pie de caja con lirios, gerberas, crisantemos y follaje de eucalipto. Blanco puro y elegancia natural.',
            'PieDeCajaAltar10.png': 'Arreglo de altar con lirios, gerberas y rosas blancas, follaje verde y eucalipto. Sencillez y elegancia natural.',
            'PieDeCajaAltar11.png': 'Pie de caja con rosas blancas, gerberas, crisantemos, nube y follaje verde. Elegancia sencilla y pura.',
            'PieDeCajaAltar12.png': 'Arreglo de altar con lirios blancos, crisantemos y follaje de eucalipto. Puro, fresco y elegante.',
            'PieDeCajaAltar13.png': 'Pie de caja con lirios y margaritas blancas. Elegancia pura y serena.',
            'PieDeCajaAltar14.png': 'Arreglo fresco con flores blancas y verdes. Sencillo, elegante y lleno de luz.'
        };

        this.config = window.GALERIA_FUNERARIA_CONFIG || {
            ROUTES: {
                galeriaFuneraria: '../../assets/galeriaFuneraria/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return '../../assets/galeriaFuneraria/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);
        const categoryFolder = category === 'pie-caja-altar' ? 'pieCajaAltar' : 
                              category === 'cubre-caja' ? 'cubreCaja' : category;

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Arreglo floral funerario de alta calidad con flores selectas y diseño solemne.',
            image: `${basePath}${categoryFolder}/${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.galeriaFunerariaUtils) {
            return window.galeriaFunerariaUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        switch (category) {
            case 'coronas':
                return `Corona ${number}`;
            case 'cruces':
                return `Cruz ${number}`;
            case 'cubre-caja':
                return `Cubre Caja ${number}`;
            case 'pie-caja-altar':
                return `Pie Caja/Altar ${number}`;
            default:
                return `Arreglo Funerario ${number}`;
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
window.GaleriaFunerariaImageManager = GaleriaFunerariaImageManager;