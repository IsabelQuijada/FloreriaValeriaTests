// ===== IMAGE MANAGER PARA QUINCEAÑERA =====

class QuinceaneraImageManager {
    constructor() {
        // Base de datos de imágenes organizadas por categorías
        this.imageDatabase = {
            'ramos-quinceañera': [
                'ramo-quinceanera1.png','ramo-quinceanera2.png','ramo-quincenera4.png','ramo-quincenera5.png','ramo-quincenera6.png','ramo-quincenera7.png','ramo-quincenera8.png','ramo-quincenera9.png','ramo-quincenera10.png','ramo-quincenera11.png'
            ],
            'centros-de-mesa': [
                'ArregloFloral1.png','arregloFloral2.png','centroDeMesa1.jpeg','centroDeMesa2.png','centroDeMesa3.png'
            ],
            'templo-quinceañera': [
                'templo1.jpeg','templo3.jpeg','templo4.jpeg','templo5.jpeg','templo6.jpeg','templo8.jpeg','templo9.jpeg','templo11.jpeg','templo12.jpeg','templo13.jpeg','templo16.jpeg','templo17.jpeg','templo18.jpeg','templo22.jpeg','templo24.jpeg','templo25.jpeg','templo27.jpeg','templo28.jpeg','templo29.jpeg','templo30.jpeg'
            ]
        };

        // Descripciones por categoría
        this.categoryDescriptions = {
            'ramos-quinceañera': 'Ramos espectaculares diseñados especialmente para quinceañeras, con flores frescas y diseños únicos para tu día especial.',
            'centros-de-mesa': 'Centros de mesa elegantes y sofisticados que harán brillar tu celebración de quinceañera.',
            'templo-quinceañera': 'Arreglos florales para templo, perfectos para la ceremonia religiosa de tu quinceañera.'
        };

        // Descripciones específicas por imagen
        this.imageDescriptions = {
            // Ramos Estilizados
            'ramo-estilizado1.png': 'Ramo estilizado elegante con flores mixtas y diseño sofisticado.',
            'ramo-estilizado2.png': 'Ramo estilizado con tonos suaves y detalles delicados.',
            'ramo-estilizado3.png': 'Ramo estilizado moderno con flores de temporada.',
            'ramo-estilizado4.png': 'Ramo estilizado clásico con combinación de colores vibrantes.',
            'ramo-estilizado5.png': 'Ramo estilizado con flores blancas y acentos verdes.',
            'ramo-estilizado6.png': 'Ramo estilizado romántico con rosas y follaje.',
            'ramo-estilizado7.png': 'Ramo estilizado con diseño único y flores frescas.',
            'ramo-estilizado8.png': 'Ramo estilizado elegante para ocasiones especiales.',
            'ramo-estilizado9.png': 'Ramo estilizado con flores coloridas y textura especial.',
            'ramo-estilizado10.png': 'Ramo estilizado con combinación de flores y follaje.',
            'ramo-estilizado11.png': 'Ramo estilizado sofisticado con tonos pasteles.',
            'ramo-estilizado12.png': 'Ramo estilizado con flores de gran tamaño.',
            'ramo-estilizado13.png': 'Ramo estilizado único con diseño contemporáneo.',
            // Ramos de Girasoles
            'ramo-girasoles1.png': 'Ramo alegre de girasoles que irradia energía y positividad.',
            'ramo-girasoles2.png': 'Ramo vibrante de girasoles con follaje verde fresco.',
            'ramo-girasoles3.png': 'Ramo de girasoles con combinación de flores complementarias.',
            'ramo-girasoles4.png': 'Ramo de girasoles grandes con diseño natural y espontáneo.',
            // Ramos Mixtos
            'ramo-mix1png.png': 'Ramo mixto con variedad de flores coloridas y frescas.',
            'ramo-mix2.png': 'Ramo mixto elegante con combinación armoniosa de colores.',
            'ramo-mix3.png': 'Ramo mixto con flores de temporada y follaje natural.',
            'ramo-mix4.png': 'Ramo mixto vibrante con tonos llamativos.',
            'ramo-mix5.png': 'Ramo mixto delicado con flores suaves y románticas.',
            'ramo-mix6.png': 'Ramo mixto moderno con diseño contemporáneo.',
            'ramo-mix7.png': 'Ramo mixto con flores variadas y texturas interesantes.',
            'ramo-mix8.png': 'Ramo mixto elegante con combinación clásica.',
            'ramo-mix9.png': 'Ramo mixto colorido con flores de diferentes tamaños.',
            'ramo-mix10.png': 'Ramo mixto especial con flores selectas y diseño único.',
            // Ramos de Rosas
            'ramo-rosas1.png': 'Ramo clásico de rosas rojas, símbolo de amor eterno.',
            'ramo-rosas2.png': 'Ramo elegante de rosas blancas para ocasiones especiales.',
            'ramo-rosas3.png': 'Ramo romántico de rosas rosadas con follaje delicado.',
            'ramo-rosas4.png': 'Ramo de rosas mixtas con combinación de colores.',
            'ramo-rosas5.png': 'Ramo sofisticado de rosas con diseño moderno.',
            'ramo-rosas6.png': 'Ramo de rosas con tonos suaves y textura especial.',
            'ramo-rosas7.png': 'Ramo clásico de rosas con follaje verde fresco.',
            'ramo-rosas8.png': 'Ramo de rosas grandes con diseño elegante.',
            'ramo-rosas9.png': 'Ramo romántico de rosas con detalles delicados.',
            'ramo-rosas11.png': 'Ramo especial de rosas con combinación única.',
            // Ramos de Tulipanes
            'ramo-tulipanes1.png': 'Ramo fresco de tulipanes que anuncia la primavera.',
            'ramo-tulipanes2.png': 'Ramo elegante de tulipanes con tonos suaves.',
            'ramo-tulipanes3.png': 'Ramo colorido de tulipanes mixtos.',
            'ramo-tulipanes4.png': 'Ramo delicado de tulipanes blancos.',
            'ramo-tulipanes5.png': 'Ramo vibrante de tulipanes rojos.',
            'ramo-tulipanes6.png': 'Ramo romántico de tulipanes rosados.',
            'ramo-tulipanes7.png': 'Ramo moderno de tulipanes con follaje.',
            'ramo-tulipanes8.png': 'Ramo especial de tulipanes de colores variados.',
            'ramo-tulipanes9.png': 'Ramo sofisticado de tulipanes con diseño único.'
        };

        this.config = window.QUINCEANERA_CONFIG || {
            ROUTES: {
                quinceanera: '../../assets/quinceanera-optimizada/'
            }
        };
    }

    /**
     * Obtiene la ruta base para una categoría específica
     */
    getCategoryPath(category) {
        return '../../assets/quinceanera-optimizada/';
    }

    /**
     * Genera productos para una categoría específica
     */
    generateCategoryProducts(category) {
        const images = this.imageDatabase[category] || [];
        const basePath = this.getCategoryPath(category);
        // Mapear nombres de categoría a nombres de carpeta
        const folderMap = {
            'ramos-quinceañera': 'ramos',
            'centros-de-mesa': 'centroDeMesa',
            'templo-quinceañera': 'templo'
        };
        const categoryFolder = folderMap[category] || category;

        return images.map((filename, index) => ({
            id: `${category}-${index + 1}`,
            name: this.generateProductName(filename, category),
            category: category,
            description: this.imageDescriptions[filename] || this.categoryDescriptions[category] || 'Hermoso ramo floral diseñado especialmente para quinceañeras, elaborado con flores frescas y de alta calidad.',
            image: `${basePath}${categoryFolder}/${filename}`,
            altText: `${this.generateProductName(filename, category)} - Florería Valeria`
        }));
    }

    /**
     * Genera un nombre descriptivo para el producto
     */
    generateProductName(filename, category) {
        // Usar utilidad si está disponible
        if (window.quinceaneraUtils) {
            return window.quinceaneraUtils.formatProductName(filename, category);
        }

        // Fallback simple
        const match = filename.match(/(\d+)/);
        const number = match ? match[1] : '1';
        switch (category) {
            case 'ramos-quinceañera':
                return `Ramo de Quinceañera ${number}`;
            case 'centros-de-mesa':
                return `Centro de Mesa ${number}`;
            case 'templo-quinceañera': {
                // Usar el nombre real del archivo, sin extensión, capitalizado y con espacios
                let base = filename.replace(/\.[^/.]+$/, '');
                base = base.replace(/[-_]/g, ' ');
                base = base.replace(/\b\w/g, c => c.toUpperCase());
                return base;
            }
            default:
                return `Arreglo para Quinceañera ${number}`;
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
window.QuinceaneraImageManager = QuinceaneraImageManager;