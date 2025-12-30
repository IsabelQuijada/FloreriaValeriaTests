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
            'Corona1.png': 'Corona funeraria elaborada con lirios, margaritas, crisantemos y follaje verde, destacando la pureza y serenidad de las flores blancas en un diseño armonioso y elegante.',
            'Corona2.png': 'Corona funeraria compuesta por lirios, rosas blancas, margaritas, crisantemos y follaje verde, creando un arreglo elegante y sereno que transmite paz y respeto.',
            'Corona3.png': 'Corona con lirios, margaritas y alstroemerias rosadas. Sutil, elegante y llena de paz.',
            'Corona4.png': 'Corona funeraria con base de crisantemos blancos y detalles de lirios, rosas blancas y margaritas, acentuada con follaje verde para un toque elegante y sobrio.',
            'Corona5.png': 'Corona funeraria con margaritas blancas y crisantemos rojos, acompañada de follaje verde, formando un diseño impactante y lleno de contraste para homenajes especiales.',
            'Corona6.png': 'Corona funeraria con rosas blancas, margaritas, flores verdes y follaje, creando un arreglo fresco y luminoso que transmite serenidad y respeto.',
            'Corona7.png': 'Corona funeraria con rosas blancas, crisantemos, margaritas y detalles de semillas secas, acompañada de follaje verde, logrando un arreglo elegante y natural.',
            'Corona8.png': 'Corona funeraria con lirios, crisantemos, margaritas y follaje verde, en tonos blancos y cremas, ideal para expresar respeto y acompañar en momentos de despedida.',
            'Corona9.png': 'Corona funeraria con girasoles, rosas rojas y blancas, follaje verde y detalles de flores de nube, creando un arreglo vibrante y lleno de vida para homenajes especiales.',
            'Corona10.png': 'Corona funeraria con lirios blancos, rosas rojas, crisantemos y follaje verde, acentuada con flores de nube azul, ideal para expresar amor y respeto en una despedida.',
            'Corona11.png': 'Corona funeraria con crisantemos blancos, gerberas rosas, rosas blancas, follaje verde y detalles de nube, creando un arreglo delicado y armonioso para expresar condolencias.',
            'Corona12.png': 'Corona funeraria con lirios, rosas blancas, margaritas, crisantemos y follaje verde, en tonos suaves y frescos, ideal para transmitir paz y acompañar en momentos de despedida.',
            'Corona13.png': 'Corona funeraria con crisantemos blancos, rosas rosas, lirios y follaje verde, en un diseño delicado y armonioso para expresar condolencias y acompañar en momentos de despedida.',
            'Corona14.png': 'Corona funeraria con lirios, crisantemos, margaritas y follaje de helecho, en tonos blancos y verdes, logrando un diseño fresco y natural para homenajes solemnes.',
            'Corona15.png': 'Corona funeraria con rosas blancas, lirios, alstroemerias y flores rosas, acompañada de follaje verde, en un diseño elegante y delicado para expresar cariño y respeto.',
            'Corona16.png': 'Corona funeraria de gran tamaño elaborada con lirios blancos, crisantemos cremosos, margaritas blancas, flores de nube y follaje verde, creando un arreglo elegante y sereno para expresar condolencias.',
            'Corona17.png': 'Corona funeraria de gran tamaño elaborada con lirios blancos, rosas blancas, margaritas, crisantemos, flores de nube y follaje verde, creando un arreglo elegante y sereno para expresar condolencias.',
            'Corona18.png': 'Corona elegante con lirios, rosas blancas, margaritas, crisantemos, nube y follaje verde. Un homenaje sereno y hermoso.',
            'Corona19.png': 'Corona con lirios, margaritas, crisantemos, nube y follaje verde. Un detalle sencillo y hermoso.',
            'Corona20.png': 'Corona con rosas blancas, crisantemos, follaje verde y detalles secos. Elegancia natural y sencilla.',
            'Corona21.png': 'Corona con lirios, rosas blancas, gerberas rosas, margaritas y follaje verde. Un tributo lleno de color y vida.',
            'Corona22.png': 'Corona con lirios, rosas, crisantemos y follaje verde. Un arreglo delicado y luminoso.',
            'Corona23.png': 'Corona con lirios, gerberas, crisantemos y follaje verde. Un diseño fresco y armonioso.',
            'Corona24.png': 'Corona con lirios, crisantemos y follaje verde. Un arreglo puro y elegante.',
            'Corona25.png': 'Corona con lirios, gerberas, crisantemos y follaje verde. Un adiós lleno de color y cariño.',
            'Corona26.png': 'Corona con lirios, gerberas, crisantemos y follaje verde. Un arreglo alegre y lleno de vida.',
            'Corona27.png': 'Corona con lirios, rosas, crisantemos y follaje verde. Un tributo elegante y lleno de color.',
            'Corona28.png': 'Corona con lirios amarillos, rosas blancas, nube y follaje verde. Un arreglo alegre y elegante.'
            // Cruces
            'Cruz1.png': 'Cruz floral elaborada con lirios blancos, rosas blancas, crisantemos y follaje verde, acentuada con hojas de monstera y flores de snapdragon, creando un arreglo solemne y elegante.',
            'Cruz2.png': 'Cruz de crisantemos blancos, lirios, rosas y follaje, elegante y serena.',
            'Cruz3.png': 'Cruz con crisantemos, rosas, follaje y acentos lilas. Colorida y elegante.',
            'Cruz4.png': 'Cruz de crisantemos, lirios, tulipanes y follaje, fresca y luminosa.',
            'Cruz5.png': 'Cruz de crisantemos, lirios, tulipanes y follaje, blanca y delicada.',
            'Cruz6.png': 'Cruz de gran tamaño para ceremonias.',
            'Cruz7.png': 'Cruz con gerberas, rosas, crisantemos y follaje en tonos pastel.',
            'Cruz8.png': 'Cruz de crisantemos, rosas blancas y follaje gris, elegante y serena.',
            // Cubre Caja
            'CubreCaja1.png': 'Cubre caja con gerberas blancas, crisantemos anaranjados, margaritas blancas y follaje de eucalipto y monstera. Un arreglo vibrante y elegante que combina tonos cálidos y frescos para una despedida significativa.',
            'CubreCaja2.png': 'Cubre caja con lirios blancos, gerberas, alstroemerias y follaje fresco. Un arreglo sereno y luminoso.',
            'CubreCaja3.png': 'Cubre caja con rosas blancas, gerberas, crisantemos y follaje verde. Un arreglo fresco y delicado.',
            'CubreCaja4.png': 'Cubre caja con lirios, rosas blancas, gerberas y follaje verde. Elegancia y pureza en cada flor.',
            'CubreCaja5.png': 'Cubre caja con lirios, gerberas rosas, crisantemos, nube y follaje de eucalipto. Un arreglo alegre y delicado.',
            'CubreCaja6.png': 'Cubre caja con gerberas amarillas, lirios, crisantemos blancos y follaje. Un toque alegre y fresco.',
            // Pie Caja Altar
            'PieDeCajaAltar1.png': 'Arreglo elaborado con rosas blancas y lilas, lisianthus, margaritas moradas, flores de encaje y follaje verde. Un diseño elegante y armonioso que combina tonos suaves y frescos para transmitir serenidad y cariño en momentos de despedida.',
            'PieDeCajaAltar2.png': 'Arreglo con lirios blancos, rosas rosas, margaritas y follaje verde. Un diseño delicado y lleno de luz.',
            'PieDeCajaAltar3.png': 'Arreglo con margaritas blancas, lirios y follaje fresco. Sencillez y pureza en cada flor.',
            'PieDeCajaAltar4.png': 'Arreglo con lirios, rosas blancas, crisantemos amarillos y nube. Elegancia y luz en cada detalle.',
            'PieDeCajaAltar5.png': 'Arreglo para pie de caja elaborado con rosas blancas, crisantemos, claveles y flores de dragón en tonos blancos y rosas, acompañado de follaje de eucalipto y hojas verdes. Un diseño elegante y armonioso que transmite serenidad y cariño en momentos de despedida.',
            'PieDeCajaAltar6.png': 'Arreglo de altar elaborado con lirios blancos, rosas blancas, crisantemos, alstroemerias y follaje verde con eucalipto. Un diseño elegante y sereno que transmite paz y respeto en momentos de despedida.',
            'PieDeCajaAltar7.png': 'Pie de caja con rosas blancas, gerberas, nube y follaje de eucalipto. Elegancia y pureza en cada flor.',
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