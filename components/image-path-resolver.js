/**
 * Image Path Resolver - Resuelve rutas de imágenes para desarrollo y producción
 */

class ImagePathResolver {
    constructor() {
        this.isProduction = this.detectEnvironment();
        this.baseUrl = this.getBaseUrl();
    }

    /**
     * Detecta si estamos en producción o desarrollo
     */
    detectEnvironment() {
        // Verificar si estamos en localhost, file://, o un dominio de desarrollo
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        return !(
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '' ||
            protocol === 'file:' ||
            hostname.includes('localhost') ||
            hostname.includes('127.0.0.1')
        );
    }

    /**
     * Obtiene la URL base según el entorno
     */
    getBaseUrl() {
        if (this.isProduction) {
            // En producción, usar ruta absoluta desde el dominio
            return window.location.origin + '/assets/';
        } else {
            // En desarrollo, usar ruta relativa
            return '../../assets/';
        }
    }

    /**
     * Resuelve una ruta de imagen
     */
    resolveImagePath(category, filename) {
        // Mapeo de categorías a nombres de carpetas
        const categoryFolders = {
            'ramo-estilizado': 'ramosClasicos/ramoEstilizado/',
            'ramo-girasoles': 'ramosClasicos/ramoGirasoles/',
            'ramo-mix': 'ramosClasicos/ramoMix/',
            'ramo-rosas': 'ramosClasicos/ramoRosas/',
            'ramo-tulipanes': 'ramosClasicos/ramoTulipanes/',
            
            'ramo-elegante-moderno': 'ramosElegantes/ramoEleganteModerno/',
            'ramo-elegante-tradicional': 'ramosElegantes/ramoEleganteTradicional/',
            
            'arreglos-centros-de-mesa': 'bodasDeEnsueno/arreglosCentrosDeMesa/',
            'ramos-novia': 'bodasDeEnsueno/ramosNovia/',
            'templo': 'bodasDeEnsueno/templo/',
            
            'canastas-flores': 'celebracionesEspeciales/canastasFlores/',
            'centros-de-mesa-festivos': 'celebracionesEspeciales/centrosDeMesaFestivos/',
            'detalles-en-forma-de-corazon': 'celebracionesEspeciales/detallesEnFormaDeCorazon/',
            
            'cumpleanos-general': 'cumpleanos/',
            
            'arreglo-de-templo': 'eventosReligiosos/arregloDeTemplo/',
            'bautizo': 'eventosReligiosos/bautizo/',
            'hermita': 'eventosReligiosos/hermita/',
            
            'coronas': 'galeriaFuneraria/coronas/',
            'cruces': 'galeriaFuneraria/cruces/',
            'cubre-caja': 'galeriaFuneraria/cubreCaja/',
            'pie-caja-altar': 'galeriaFuneraria/pieCajaAltar/'
        };

        const folder = categoryFolders[category];
        if (!folder) {
            console.warn(`Categoría no encontrada: ${category}`);
            return this.baseUrl + 'placeholder.png'; // Imagen por defecto
        }

        return this.baseUrl + folder + filename;
    }

    /**
     * Intenta usar WebP si está disponible, fallback a PNG
     */
    resolveOptimizedImagePath(category, filename) {
        // Si el navegador soporta WebP, intentar usar esa versión
        if (this.supportsWebP()) {
            const webpFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            return this.resolveImagePath(category, webpFilename);
        }
        
        return this.resolveImagePath(category, filename);
    }

    /**
     * Detecta soporte para WebP
     */
    supportsWebP() {
        if (this._webpSupport !== undefined) {
            return this._webpSupport;
        }
        
        // Crear canvas para detectar soporte WebP
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        this._webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return this._webpSupport;
    }

    /**
     * Genera un placeholder SVG optimizado
     */
    generatePlaceholder(width = 400, height = 400, color = '#f0f0f0') {
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${color}'/%3E%3Cpath d='M${width/2-20} ${height/2-10} L${width/2+20} ${height/2-10} L${width/2+20} ${height/2+10} L${width/2-20} ${height/2+10} Z' fill='%23ddd'/%3E%3C/svg%3E`;
    }

    /**
     * Preload crítico de imágenes
     */
    preloadCriticalImages(imagePaths) {
        imagePaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = path;
            document.head.appendChild(link);
        });
    }
}

// Instancia global
window.ImagePathResolver = new ImagePathResolver();

// Helper functions globales
window.resolveImagePath = (category, filename) => {
    return window.ImagePathResolver.resolveImagePath(category, filename);
};

window.resolveOptimizedImagePath = (category, filename) => {
    return window.ImagePathResolver.resolveOptimizedImagePath(category, filename);
};

console.log(`🖼️ ImagePathResolver initialized - Environment: ${window.ImagePathResolver.isProduction ? 'Production' : 'Development'}`);
console.log(`📁 Base URL: ${window.ImagePathResolver.baseUrl}`);