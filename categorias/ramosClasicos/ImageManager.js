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
            'ramo-estilizado1.png': 'Ramo estilizado elegante con flores selectas y diseño contemporáneo moderno.',
            'ramo-estilizado2.png': 'Diseño floral estilizado que combina tradición y modernidad en perfecta armonía.',
            'ramo-estilizado3.png': 'Ramo de flores estilizado con presentación sofisticada y elementos únicos.',
            'ramo-estilizado4.png': 'Combinación floral estilizada con técnicas avanzadas de arreglo floral.',
            'ramo-estilizado5.png': 'Ramo refinado con flores de temporada y diseño estilizado contemporáneo.',
            'ramo-estilizado6.png': 'Diseño estilizado premium con flores importadas y presentación exclusiva.',
            'ramo-estilizado7.png': 'Ramo estilizado de lujo con combinaciones florales únicas y elegantes.',
            'ramo-estilizado8.png': 'Diseño floral estilizado que destaca por su originalidad y belleza.',
            'ramo-estilizado9.png': 'Ramo contemporáneo con estilo único y flores de la más alta calidad.',
            'ramo-estilizado10.png': 'Combinación estilizada equilibrada para ocasiones especiales y memorables.',
            'ramo-estilizado11.png': 'Ramo premium con técnicas estilizadas y flores selectas de temporada.',
            'ramo-estilizado12.png': 'Diseño perfecto que representa la elegancia estilizada en su máxima expresión.',
            'ramo-estilizado13.png': 'Ramo estilizado final con presentación espectacular y diseño único.',
            
            // Ramo Girasoles
            'ramo-girasoles1.png': 'Ramo vibrante de girasoles frescos que irradia alegría y vitalidad positiva.',
            'ramo-girasoles2.png': 'Diseño floral con girasoles que aporta calidez y luminosidad al ambiente.',
            'ramo-girasoles3.png': 'Ramo de girasoles con presentación tradicional y flores de campo frescas.',
            'ramo-girasoles4.png': 'Combinación única de girasoles que simboliza felicidad y energia positiva.',
            
            // Ramo Mix
            'ramo-mix1png.png': 'Ramo mixto colorido con variedad de flores que crean una armonía perfecta.',
            'ramo-mix2.png': 'Diseño floral mixto con combinaciones únicas de colores y texturas naturales.',
            'ramo-mix3.png': 'Ramo de flores mixtas con equilibrio perfecto entre diferentes especies florales.',
            'ramo-mix4.png': 'Combinación mixta elegante que destaca por su diversidad y belleza natural.',
            'ramo-mix5.png': 'Ramo mixto de temporada con flores selectas y presentación espectacular.',
            'ramo-mix6.png': 'Diseño floral mixto premium con flores importadas y locales en armonía.',
            'ramo-mix7.png': 'Ramo de flores mixtas con combinaciones exóticas y presentación única.',
            'ramo-mix8.png': 'Diseño mixto sofisticado que combina colores vibrantes y suaves tonalidades.',
            'ramo-mix9.png': 'Ramo mixto contemporáneo con variedad de flores y estilo moderno.',
            'ramo-mix10.png': 'Combinación mixta final que representa la diversidad floral en su esplendor.',
            
            // Ramo Rosas
            'ramo-rosas1.png': 'Ramo clásico de rosas rojas que expresa pasión y romance verdadero.',
            'ramo-rosas2.png': 'Diseño elegante de rosas que simboliza amor eterno y belleza atemporal.',
            'ramo-rosas3.png': 'Ramo de rosas refinado con presentación tradicional y flores premium.',
            'ramo-rosas4.png': 'Combinación romántica de rosas selectas para momentos inolvidables.',
            'ramo-rosas5.png': 'Ramo de rosas de lujo con flores de invernadero y cuidado especial.',
            'ramo-rosas6.png': 'Diseño clásico de rosas que nunca pasa de moda y siempre enamora.',
            'ramo-rosas7.png': 'Ramo de rosas premium con técnicas tradicionales de arreglo floral.',
            'ramo-rosas8.png': 'Diseño romántico perfecto que corona cualquier declaración de amor.',
            'ramo-rosas9.png': 'Ramo de rosas selectas con presentación espectacular y fragancia intensa.',
            'ramo-rosas11.png': 'Combinación final de rosas que representa la perfección del amor verdadero.',
            
            // Ramo Tulipanes
            'ramo-tulipanes1.png': 'Ramo delicado de tulipanes frescos que aporta elegancia y sofisticación.',
            'ramo-tulipanes2.png': 'Diseño floral con tulipanes que simboliza renovación y nuevos comienzos.',
            'ramo-tulipanes3.png': 'Ramo de tulipanes con colores vibrantes y presentación primaveral.',
            'ramo-tulipanes4.png': 'Combinación única de tulipanes que destaca por su frescura natural.',
            'ramo-tulipanes5.png': 'Ramo de tulipanes de temporada con flores importadas de alta calidad.',
            'ramo-tulipanes6.png': 'Diseño elegante con tulipanes que aporta color y vitalidad al hogar.',
            'ramo-tulipanes7.png': 'Ramo premium de tulipanes con técnicas especiales de conservación.',
            'ramo-tulipanes8.png': 'Diseño sofisticado que combina tulipanes en armonía perfecta.',
            'ramo-tulipanes9.png': 'Ramo final de tulipanes que representa la belleza de la primavera eterna.'
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