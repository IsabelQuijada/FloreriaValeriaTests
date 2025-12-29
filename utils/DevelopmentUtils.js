/**
 * DevelopmentUtils - Utilidades solo para desarrollo
 * 
 * Este archivo solo se carga en entorno de desarrollo
 * y contiene herramientas de testing y debugging.
 */

class DevelopmentUtils {
    constructor() {
        this.isDevelopment = this.detectDevelopment();
        
        if (this.isDevelopment) {
            this.init();
        }
    }
    
    /**
     * Detecta si estamos en entorno de desarrollo
     */
    detectDevelopment() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        return (
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '' ||
            protocol === 'file:' ||
            hostname.includes('localhost') ||
            window.location.search.includes('debug=true')
        );
    }
    
    /**
     * Inicialización de utilidades de desarrollo
     */
    init() {
        console.log('🛠️ DevelopmentUtils cargado');
        
        // Añadir shortcuts de teclado para desarrollo
        this.addKeyboardShortcuts();
        
        // Añadir indicador visual de desarrollo
        this.addDevelopmentIndicator();
        
        // Exponer utilidades globales
        this.exposeGlobalUtils();
    }
    
    /**
     * Añade shortcuts de teclado para desarrollo
     */
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Shift + D = Debug info
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.showDebugInfo();
            }
            
            // Ctrl + Shift + L = Image loader stats
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.showImageStats();
            }
            
            // Ctrl + Shift + R = Reload images
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.reloadImages();
            }
        });
    }
    
    /**
     * Añade indicador visual de desarrollo
     */
    addDevelopmentIndicator() {
        const indicator = document.createElement('div');
        indicator.innerHTML = '🛠️ DEV';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            z-index: 10000;
            opacity: 0.7;
            cursor: pointer;
        `;
        
        indicator.onclick = () => this.showDebugInfo();
        document.body.appendChild(indicator);
    }
    
    /**
     * Muestra información de debug
     */
    showDebugInfo() {
        const info = {
            'URL': window.location.href,
            'Viewport': `${window.innerWidth}x${window.innerHeight}`,
            'User Agent': navigator.userAgent,
            'Productos cargados': window.favoriteProducts?.length || 0,
            'Configuración': !!window.FLORERIA_CONFIG,
            'Image Loader': !!window.optimizedImageLoader,
            'Mobile Enhancer': !!window.simpleMobileEnhancer
        };
        
        console.table(info);
        alert('Debug info enviada a console. Presiona F12 para ver.');
    }
    
    /**
     * Muestra estadísticas de imágenes
     */
    showImageStats() {
        if (window.optimizedImageLoader) {
            const stats = window.optimizedImageLoader.getStats();
            console.table(stats);
            alert(`Imágenes: ${stats.loaded}/${stats.total} cargadas`);
        } else {
            alert('Image loader no disponible');
        }
    }
    
    /**
     * Recarga todas las imágenes
     */
    reloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.src;
            img.src = '';
            img.src = src + '?t=' + Date.now();
        });
        console.log(`🔄 ${images.length} imágenes recargadas`);
    }
    
    /**
     * Expone utilidades globales para debugging
     */
    exposeGlobalUtils() {
        window.DEV = {
            showDebugInfo: () => this.showDebugInfo(),
            showImageStats: () => this.showImageStats(),
            reloadImages: () => this.reloadImages(),
            
            // Test de componentes
            testComponents: () => {
                const results = {
                    config: !!window.FLORERIA_CONFIG,
                    imageLoader: !!window.optimizedImageLoader,
                    mobileEnhancer: !!window.simpleMobileEnhancer,
                    imageUtils: !!window.ImageUtils,
                    products: !!window.favoriteProducts
                };
                console.table(results);
                return results;
            }
        };
        
        console.log('🔍 Utilidades de desarrollo disponibles en window.DEV');
    }
}

// Solo inicializar en desarrollo
if (typeof window !== 'undefined') {
    window.developmentUtils = new DevelopmentUtils();
}