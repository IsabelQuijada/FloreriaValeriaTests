/**
 * Configuración para servir imágenes via jsDelivr CDN gratuito
 * 
 * Ventajas:
 * - Totalmente gratuito
 * - CDN global rápido
 * - Solo requiere repositorio GitHub público
 * 
 * Pasos:
 * 1. Subir tu proyecto a un repositorio GitHub público
 * 2. Reemplazar YOUR_GITHUB_USERNAME y YOUR_REPO_NAME
 * 3. Las imágenes se servirán automáticamente via CDN
 */

// Configuración para jsDelivr
window.FLORERIA_CONFIG.IMAGES.CDN = {
    enabled: true,
    provider: 'jsdelivr',
    baseUrl: 'https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME@main',
    
    // Beneficios automáticos de jsDelivr:
    // - Compresión gzip automática
    // - Cache headers optimizados
    // - CDN global con 100+ ubicaciones
    // - Sin límites de ancho de banda
};

/**
 * Función helper para generar URLs de jsDelivr
 */
window.FLORERIA_UTILS.getJsDelivrURL = function(imagePath) {
    const config = window.FLORERIA_CONFIG.IMAGES.CDN;
    
    if (!config.enabled || config.provider !== 'jsdelivr') {
        return imagePath; // Fallback
    }
    
    // Limpiar path
    const cleanPath = imagePath.replace(/^\.\//, '');
    
    return `${config.baseUrl}/${cleanPath}`;
};

// Instrucciones adicionales:
/*
1. Crear repositorio en GitHub:
   - Ve a github.com y crea un nuevo repositorio público
   - Súbelo con: git push origin main

2. Configurar URLs:
   - Reemplaza YOUR_GITHUB_USERNAME con tu usuario GitHub
   - Reemplaza YOUR_REPO_NAME con el nombre de tu repositorio

3. Usar en el código:
   - Las URLs se generarán automáticamente
   - Ejemplo: https://cdn.jsdelivr.net/gh/usuario/floreria@main/assets/ramosElegantes/Ramo1.png

4. Ventajas adicionales:
   - Actualizaciones automáticas cuando hagas git push
   - Versionado automático (@main, @v1.0, etc.)
   - Estadísticas gratuitas de uso
*/