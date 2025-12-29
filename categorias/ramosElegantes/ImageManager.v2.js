/**
 * RamosElegantesImageManager v2 - Refactorizado
 * Usa BaseImageManager para eliminar duplicación
 */
class RamosElegantesImageManagerV2 extends BaseImageManager {
    constructor() {
        super({
            name: 'Ramos Elegantes',
            baseRoute: 'ramosElegantes',
            link: './categorias/ramosElegantes/',
            defaultDescription: 'Ramo elegante para ocasiones especiales.',
            categoryDisplayNames: {
                'ramos-elegantes': 'Ramo Premium'
            }
        });
    }
    
    init() {
        this.imageDatabase = {
            'ramos-elegantes': [
                'Ramo1.png', 'Ramo2.png', 'Ramo3.png', 'Ramo4.png', 'Ramo6.png', 
                'Ramo7.png', 'Ramo8.png', 'Ramo9.png', 'Ramo11.png', 'Ramo12.png', 
                'Ramo13.png', 'Ramo15.png'
            ]
        };
        
        this.descriptions = {
            'Ramo1.png': 'Ramo premium elegante con flores selectas, perfectamente combinadas para crear una expresión de distinción y sofisticación.',
            'Ramo2.png': 'Arreglo floral exclusivo que combina belleza y elegancia en cada detalle, ideal para ocasiones especiales.',
            'Ramo3.png': 'Ramo distinguido con flores de la más alta calidad, diseñado para transmitir sentimientos profundos con estilo.',
            'Ramo4.png': 'Composición floral premium que refleja buen gusto y refinamiento en cada elemento seleccionado.',
            'Ramo6.png': 'Ramo elegante que combina colores y texturas únicas, creando una pieza artística de flores exclusivas.',
            'Ramo7.png': 'Arreglo floral sofisticado con flores premium, perfecto para expresar amor y admiración con distinción.',
            'Ramo8.png': 'Ramo de diseño exclusivo que captura la esencia de la elegancia floral en su máxima expresión.',
            'Ramo9.png': 'Composición premium con flores cuidadosamente seleccionadas para crear un impacto visual memorable.',
            'Ramo11.png': 'Ramo elegante que combina tradición y modernidad en un diseño floral único y distinguido.',
            'Ramo12.png': 'Arreglo exclusivo con flores de temporada premium, ideal para celebrar momentos inolvidables.',
            'Ramo13.png': 'Ramo sofisticado que transmite elegancia y refinamiento a través de cada flor cuidadosamente elegida.',
            'Ramo15.png': 'Composición floral de lujo que representa la máxima expresión del arte floral contemporáneo.'
        };
    }
    
    getConfig() {
        return window.RAMOS_ELEGANTES_CONFIG || {
            ROUTES: { ramosElegantes: '../../assets/ramosElegantes/' }
        };
    }
}

// Registro condicional para migración progresiva
if (window.ENABLE_V2_MANAGERS) {
    window.RamosElegantesImageManager = RamosElegantesImageManagerV2;
    // Migration complete - logging removed for production
}
