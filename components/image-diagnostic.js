/**
 * Diagnóstico de Imágenes - Herramienta para detectar problemas de carga
 */

class ImageDiagnostic {
    constructor() {
        this.diagnostics = {
            totalImages: 0,
            loadedImages: 0,
            failedImages: 0,
            pendingImages: 0,
            issues: []
        };
    }

    /**
     * Ejecuta diagnóstico completo
     */
    async runDiagnostic() {
        console.log('🔍 Iniciando diagnóstico de imágenes...');
        
        // 1. Verificar estructura de carpetas
        await this.checkFolderStructure();
        
        // 2. Verificar configuración de rutas
        this.checkRouteConfiguration();
        
        // 3. Verificar imágenes en DOM
        this.checkDOMImages();
        
        // 4. Probar carga de muestra de imágenes
        await this.testSampleImages();
        
        // 5. Verificar lazy loading
        this.checkLazyLoading();
        
        this.generateReport();
        return this.diagnostics;
    }

    /**
     * Verifica la configuración de rutas
     */
    checkRouteConfiguration() {
        console.log('📁 Verificando configuración de rutas...');
        
        // Verificar config global
        if (!window.RAMOS_CLASICOS_CONFIG) {
            this.diagnostics.issues.push('❌ Configuración RAMOS_CLASICOS_CONFIG no encontrada');
            return;
        }
        
        const config = window.RAMOS_CLASICOS_CONFIG.ROUTES;
        console.log('✅ Configuración encontrada:', config);
        
        // Verificar ImageManager
        if (!window.RamosClasicosImageManager) {
            this.diagnostics.issues.push('❌ RamosClasicosImageManager no disponible');
            return;
        }
        
        const imageManager = new window.RamosClasicosImageManager();
        const testCategories = ['ramo-estilizado', 'ramo-girasoles', 'ramo-mix', 'ramo-rosas', 'ramo-tulipanes'];
        
        testCategories.forEach(category => {
            const path = imageManager.getCategoryPath(category);
            console.log(`📂 ${category}: ${path}`);
        });
    }

    /**
     * Verifica imágenes en el DOM
     */
    checkDOMImages() {
        console.log('🖼️ Verificando imágenes en DOM...');
        
        const allImages = document.querySelectorAll('img');
        const lazyImages = document.querySelectorAll('img[data-src]');
        const loadedImages = document.querySelectorAll('img[src]:not([data-src])');
        
        this.diagnostics.totalImages = allImages.length;
        this.diagnostics.loadedImages = loadedImages.length;
        this.diagnostics.pendingImages = lazyImages.length;
        
        console.log(`📊 Total imágenes: ${allImages.length}`);
        console.log(`✅ Cargadas: ${loadedImages.length}`);
        console.log(`⏳ Pendientes (lazy): ${lazyImages.length}`);
        
        // Verificar problemas comunes
        lazyImages.forEach((img, index) => {
            const dataSrc = img.getAttribute('data-src');
            if (!dataSrc) {
                this.diagnostics.issues.push(`❌ Imagen ${index + 1}: data-src vacío`);
            } else if (dataSrc.includes('undefined')) {
                this.diagnostics.issues.push(`❌ Imagen ${index + 1}: ruta contiene 'undefined' - ${dataSrc}`);
            } else if (!dataSrc.startsWith('../../assets/')) {
                this.diagnostics.issues.push(`⚠️ Imagen ${index + 1}: ruta inusual - ${dataSrc}`);
            }
        });
    }

    /**
     * Prueba carga de imágenes de muestra
     */
    async testSampleImages() {
        console.log('🧪 Probando carga de imágenes de muestra...');
        
        const imageManager = new window.RamosClasicosImageManager();
        const sampleProducts = imageManager.generateCategoryProducts('ramo-estilizado').slice(0, 3);
        
        for (const product of sampleProducts) {
            try {
                const result = await this.testImageLoad(product.image);
                if (result.success) {
                    console.log(`✅ ${product.name}: ${product.image}`);
                } else {
                    console.log(`❌ ${product.name}: ${product.image} - ${result.error}`);
                    this.diagnostics.failedImages++;
                    this.diagnostics.issues.push(`❌ No se pudo cargar: ${product.image}`);
                }
            } catch (error) {
                console.error(`🚫 Error al probar ${product.image}:`, error);
                this.diagnostics.failedImages++;
                this.diagnostics.issues.push(`🚫 Error de red: ${product.image}`);
            }
        }
    }

    /**
     * Prueba si una imagen se puede cargar
     */
    testImageLoad(src) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                resolve({ success: false, error: 'Timeout' });
            }, 5000);

            img.onload = () => {
                clearTimeout(timeout);
                resolve({ success: true });
            };

            img.onerror = () => {
                clearTimeout(timeout);
                resolve({ success: false, error: '404 o error de carga' });
            };

            img.src = src;
        });
    }

    /**
     * Verifica el lazy loading
     */
    checkLazyLoading() {
        console.log('⚡ Verificando lazy loading...');
        
        if (!window.LazyLoader) {
            this.diagnostics.issues.push('❌ LazyLoader no disponible');
            return;
        }
        
        if ('IntersectionObserver' in window) {
            console.log('✅ IntersectionObserver disponible');
        } else {
            console.log('⚠️ IntersectionObserver no disponible, usando fallback');
        }
        
        const lazyImages = document.querySelectorAll('.lazy-load');
        console.log(`⚡ Imágenes con lazy-load: ${lazyImages.length}`);
        
        const loadingImages = document.querySelectorAll('.lazy-loading');
        console.log(`🔄 Imágenes cargando: ${loadingImages.length}`);
        
        const loadedImages = document.querySelectorAll('.lazy-loaded');
        console.log(`✅ Imágenes lazy cargadas: ${loadedImages.length}`);
    }

    /**
     * Genera reporte final
     */
    generateReport() {
        console.log('\n📋 REPORTE DE DIAGNÓSTICO');
        console.log('=' .repeat(50));
        
        if (this.diagnostics.issues.length === 0) {
            console.log('🎉 ¡No se encontraron problemas!');
        } else {
            console.log('⚠️ PROBLEMAS ENCONTRADOS:');
            this.diagnostics.issues.forEach((issue, index) => {
                console.log(`${index + 1}. ${issue}`);
            });
        }
        
        console.log('\n📊 ESTADÍSTICAS:');
        console.log(`Total imágenes: ${this.diagnostics.totalImages}`);
        console.log(`Cargadas: ${this.diagnostics.loadedImages}`);
        console.log(`Pendientes: ${this.diagnostics.pendingImages}`);
        console.log(`Fallidas: ${this.diagnostics.failedImages}`);
        
        console.log('\n🔧 RECOMENDACIONES:');
        this.generateRecommendations();
    }

    /**
     * Genera recomendaciones basadas en problemas encontrados
     */
    generateRecommendations() {
        const issues = this.diagnostics.issues;
        
        if (issues.some(i => i.includes('data-src vacío'))) {
            console.log('• Verificar generación de URLs en ImageManager');
        }
        
        if (issues.some(i => i.includes('undefined'))) {
            console.log('• Revisar configuración de rutas en config.js');
        }
        
        if (issues.some(i => i.includes('404'))) {
            console.log('• Verificar que las imágenes existen en la estructura de carpetas');
        }
        
        if (issues.some(i => i.includes('LazyLoader'))) {
            console.log('• Asegurar que LazyLoader.js esté cargado correctamente');
        }
        
        if (this.diagnostics.failedImages > 0) {
            console.log('• Considerar usar formato WebP para mejor performance');
            console.log('• Agregar imágenes de fallback para casos de error');
        }
    }

    /**
     * Fuerza la carga de todas las imágenes lazy (para testing)
     */
    forceLoadAllImages() {
        console.log('🚀 Forzando carga de todas las imágenes...');
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src && !img.classList.contains('lazy-loaded')) {
                img.src = src;
                img.classList.add('lazy-loaded');
                img.classList.remove('lazy-load');
            }
        });
        
        console.log(`✅ Se forzó la carga de ${lazyImages.length} imágenes`);
    }
}

// Función helper para usar en consola
window.diagnosticImages = async () => {
    const diagnostic = new ImageDiagnostic();
    return await diagnostic.runDiagnostic();
};

window.forceLoadImages = () => {
    const diagnostic = new ImageDiagnostic();
    diagnostic.forceLoadAllImages();
};

console.log('🔧 Herramientas de diagnóstico cargadas:');
console.log('• diagnosticImages() - Ejecutar diagnóstico completo');
console.log('• forceLoadImages() - Forzar carga de todas las imágenes');