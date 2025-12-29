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
            'Corona1.png': 'Corona funeraria clásica con flores blancas y follaje verde.',
            'Corona2.png': 'Corona elegante con rosas y lirios para homenajes solemnes.',
            'Corona3.png': 'Corona de flores mixtas para expresar condolencias.',
            'Corona4.png': 'Corona tradicional con detalles delicados.',
            'Corona5.png': 'Corona grande con flores frescas y tonos suaves.',
            'Corona6.png': 'Corona sencilla y elegante para despedidas.',
            'Corona7.png': 'Corona con flores blancas y acentos verdes.',
            'Corona8.png': 'Corona de flores variadas para honrar la memoria.',
            'Corona9.png': 'Corona solemne con diseño clásico.',
            'Corona10.png': 'Corona con lirios y follaje especial.',
            'Corona11.png': 'Corona de rosas blancas y detalles verdes.',
            'Corona12.png': 'Corona con flores de temporada.',
            'Corona13.png': 'Corona tradicional para ceremonias fúnebres.',
            'Corona14.png': 'Corona con flores mixtas y follaje.',
            'Corona15.png': 'Corona elegante con flores blancas.',
            'Corona16.png': 'Corona de gran tamaño para homenajes.',
            'Corona17.png': 'Corona con detalles florales delicados.',
            'Corona18.png': 'Corona de flores frescas y tonos claros.',
            'Corona19.png': 'Corona solemne con diseño especial.',
            'Corona20.png': 'Corona con lirios y rosas.',
            'Corona21.png': 'Corona tradicional con follaje verde.',
            'Corona22.png': 'Corona de flores mixtas y elegantes.',
            'Corona23.png': 'Corona con detalles blancos y verdes.',
            'Corona24.png': 'Corona de flores frescas y naturales.',
            'Corona25.png': 'Corona elegante para despedidas.',
            'Corona26.png': 'Corona con flores de temporada.',
            'Corona27.png': 'Corona tradicional y solemne.',
            'Corona28.png': 'Corona con lirios y detalles verdes.',
            'Corona29.png': 'Corona de gran tamaño y elegancia.',
            // Cruces
            'Cruz1.png': 'Cruz floral con lirios blancos.',
            'Cruz2.png': 'Cruz de flores mixtas para homenajes.',
            'Cruz3.png': 'Cruz tradicional con detalles delicados.',
            'Cruz4.png': 'Cruz con rosas y follaje.',
            'Cruz5.png': 'Cruz elegante con flores blancas.',
            'Cruz6.png': 'Cruz de gran tamaño para ceremonias.',
            'Cruz7.png': 'Cruz con flores frescas y tonos suaves.',
            'Cruz8.png': 'Cruz solemne con diseño especial.',
            // Cubre Caja
            'CubreCaja1.png': 'Cubre caja con flores blancas y verdes.',
            'CubreCaja2.png': 'Cubre caja elegante con lirios.',
            'CubreCaja3.png': 'Cubre caja tradicional con detalles florales.',
            'CubreCaja4.png': 'Cubre caja con flores mixtas.',
            'CubreCaja5.png': 'Cubre caja de gran tamaño.',
            'CubreCaja6.png': 'Cubre caja con rosas y follaje.',
            // Pie Caja Altar
            'PieDeCajaAltar1.png': 'Arreglo para pie de caja con flores blancas.',
            'PieDeCajaAltar2.png': 'Arreglo de altar con lirios y rosas.',
            'PieDeCajaAltar3.png': 'Pie de caja tradicional con detalles verdes.',
            'PieDeCajaAltar4.png': 'Arreglo de altar con flores frescas.',
            'PieDeCajaAltar5.png': 'Pie de caja elegante y solemne.',
            'PieDeCajaAltar6.png': 'Arreglo de altar con flores mixtas.',
            'PieDeCajaAltar7.png': 'Pie de caja con lirios y follaje.',
            'PieDeCajaAltar8.png': 'Arreglo de altar tradicional.',
            'PieDeCajaAltar9.png': 'Pie de caja con detalles blancos.',
            'PieDeCajaAltar10.png': 'Arreglo de altar con flores de temporada.',
            'PieDeCajaAltar11.png': 'Pie de caja elegante con rosas.',
            'PieDeCajaAltar12.png': 'Arreglo de altar con lirios.',
            'PieDeCajaAltar13.png': 'Pie de caja tradicional y solemne.',
            'PieDeCajaAltar14.png': 'Arreglo de altar con flores frescas y verdes.'
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