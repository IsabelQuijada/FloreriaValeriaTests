/**
 * Performance Monitor - Monitorea el rendimiento de carga de imágenes
 * 
 * Funcionalidades:
 * - Mide tiempo de carga de imágenes
 * - Detecta imágenes lentas o con errores
 * - Genera reportes de optimización
 * - Alertas en tiempo real
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            imageLoadTimes: [],
            failedImages: [],
            totalImages: 0,
            loadedImages: 0,
            averageLoadTime: 0,
            slowestImage: null,
            fastestImage: null
        };
        
        this.thresholds = {
            slowImageThreshold: 2000, // 2 segundos
            verySlowThreshold: 5000,  // 5 segundos
            errorThreshold: 3         // 3 errores antes de alertar
        };
        
        this.init();
    }
    
    init() {
        this.setupImageObserver();
        this.setupPerformanceAPI();
        this.startMonitoring();
        
        console.log('📊 Performance Monitor iniciado');
    }
    
    /**
     * Observa la carga de imágenes
     */
    setupImageObserver() {
        // Observer para nuevas imágenes
        const imageObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const images = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
                        images.forEach(img => this.observeImage(img));
                    }
                });
            });
        });
        
        imageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Observar imágenes existentes
        document.querySelectorAll('img').forEach(img => this.observeImage(img));
    }
    
    /**
     * Observa una imagen individual
     */
    observeImage(img) {
        const startTime = performance.now();
        const imageUrl = img.src || img.getAttribute('data-src');
        
        if (!imageUrl || img.dataset.monitored) return;
        
        img.dataset.monitored = 'true';
        this.metrics.totalImages++;
        
        const onLoad = () => {
            const loadTime = performance.now() - startTime;
            this.recordImageLoad(imageUrl, loadTime, true);
            cleanup();
        };
        
        const onError = () => {
            const loadTime = performance.now() - startTime;
            this.recordImageLoad(imageUrl, loadTime, false);
            cleanup();
        };
        
        const cleanup = () => {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
        
        // Timeout después de 10 segundos
        setTimeout(() => {
            if (!img.complete) {
                onError();
            }
        }, 10000);
    }
    
    /**
     * Registra el resultado de carga de una imagen
     */
    recordImageLoad(url, loadTime, success) {
        const record = {
            url,
            loadTime,
            success,
            timestamp: Date.now(),
            size: this.getImageSize(url)
        };
        
        if (success) {
            this.metrics.loadedImages++;
            this.metrics.imageLoadTimes.push(loadTime);
            
            // Actualizar imagen más lenta/rápida
            if (!this.metrics.slowestImage || loadTime > this.metrics.slowestImage.loadTime) {
                this.metrics.slowestImage = record;
            }
            
            if (!this.metrics.fastestImage || loadTime < this.metrics.fastestImage.loadTime) {
                this.metrics.fastestImage = record;
            }
            
            // Alertar si la imagen es lenta
            if (loadTime > this.thresholds.slowImageThreshold) {
                this.alertSlowImage(record);
            }
            
        } else {
            this.metrics.failedImages.push(record);
            
            // Alertar errores frecuentes
            if (this.metrics.failedImages.length >= this.thresholds.errorThreshold) {
                this.alertImageErrors();
            }
        }
        
        this.updateMetrics();
        this.logProgress();
    }
    
    /**
     * Actualiza métricas calculadas
     */
    updateMetrics() {
        const times = this.metrics.imageLoadTimes;
        if (times.length > 0) {
            this.metrics.averageLoadTime = times.reduce((a, b) => a + b) / times.length;
        }
    }
    
    /**
     * Obtiene el tamaño estimado de una imagen
     */
    getImageSize(url) {
        // Estimación básica basada en la URL
        if (url.includes('small')) return 'small';
        if (url.includes('medium')) return 'medium';
        if (url.includes('large')) return 'large';
        return 'unknown';
    }
    
    /**
     * Alerta sobre imagen lenta
     */
    alertSlowImage(record) {
        console.warn(`🐌 Imagen lenta detectada: ${record.url}`, {
            loadTime: `${record.loadTime.toFixed(0)}ms`,
            threshold: `${this.thresholds.slowImageThreshold}ms`,
            size: record.size
        });
        
        // Sugerir optimizaciones
        if (record.loadTime > this.thresholds.verySlowThreshold) {
            console.error(`🚨 Imagen muy lenta: ${record.url} (${record.loadTime.toFixed(0)}ms)`);
        }
    }
    
    /**
     * Alerta sobre errores frecuentes de imágenes
     */
    alertImageErrors() {
        console.error('🚨 Múltiples errores de carga de imágenes detectados:', {
            errorsCount: this.metrics.failedImages.length,
            recentErrors: this.metrics.failedImages.slice(-3).map(e => e.url)
        });
    }
    
    /**
     * Muestra progreso de carga
     */
    logProgress() {
        const progress = ((this.metrics.loadedImages + this.metrics.failedImages.length) / this.metrics.totalImages * 100).toFixed(1);
        
        if (this.metrics.totalImages > 0 && (this.metrics.loadedImages + this.metrics.failedImages.length) % 10 === 0) {
            console.log(`📈 Progreso de carga: ${progress}% (${this.metrics.loadedImages}/${this.metrics.totalImages} exitosas)`);
        }
    }
    
    /**
     * Configura Performance API para métricas adicionales
     */
    setupPerformanceAPI() {
        // Observar recursos de imagen
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.initiatorType === 'img' || entry.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
                        this.recordResourceTiming(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
    }
    
    /**
     * Registra timing de recursos
     */
    recordResourceTiming(entry) {
        console.log(`📊 Recurso de imagen cargado: ${entry.name}`, {
            loadTime: `${entry.duration.toFixed(0)}ms`,
            transferSize: `${(entry.transferSize / 1024).toFixed(1)}KB`,
            decodedBodySize: `${(entry.decodedBodySize / 1024).toFixed(1)}KB`
        });
    }
    
    /**
     * Inicia monitoreo continuo
     */
    startMonitoring() {
        // Reporte cada 30 segundos
        setInterval(() => {
            this.generateReport();
        }, 30000);
        
        // Reporte final cuando la página termine de cargar
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.generateFinalReport();
            }, 2000);
        });
    }
    
    /**
     * Genera reporte periódico
     */
    generateReport() {
        if (this.metrics.totalImages === 0) return;
        
        console.log('📊 Reporte de Rendimiento de Imágenes:', {
            totalImages: this.metrics.totalImages,
            loadedImages: this.metrics.loadedImages,
            failedImages: this.metrics.failedImages.length,
            averageLoadTime: `${this.metrics.averageLoadTime.toFixed(0)}ms`,
            slowestImage: this.metrics.slowestImage ? {
                url: this.metrics.slowestImage.url.split('/').pop(),
                time: `${this.metrics.slowestImage.loadTime.toFixed(0)}ms`
            } : 'N/A'
        });
    }
    
    /**
     * Genera reporte final
     */
    generateFinalReport() {
        const report = {
            summary: {
                totalImages: this.metrics.totalImages,
                successRate: `${((this.metrics.loadedImages / this.metrics.totalImages) * 100).toFixed(1)}%`,
                averageLoadTime: `${this.metrics.averageLoadTime.toFixed(0)}ms`,
                totalLoadTime: `${this.metrics.imageLoadTimes.reduce((a, b) => a + b, 0).toFixed(0)}ms`
            },
            performance: {
                fastest: this.metrics.fastestImage ? {
                    url: this.metrics.fastestImage.url.split('/').pop(),
                    time: `${this.metrics.fastestImage.loadTime.toFixed(0)}ms`
                } : 'N/A',
                slowest: this.metrics.slowestImage ? {
                    url: this.metrics.slowestImage.url.split('/').pop(),
                    time: `${this.metrics.slowestImage.loadTime.toFixed(0)}ms`
                } : 'N/A'
            },
            issues: {
                failedImages: this.metrics.failedImages.length,
                slowImages: this.metrics.imageLoadTimes.filter(t => t > this.thresholds.slowImageThreshold).length
            }
        };
        
        console.log('🎯 Reporte Final de Rendimiento:', report);
        
        // Mostrar recomendaciones
        this.showRecommendations(report);
        
        return report;
    }
    
    /**
     * Muestra recomendaciones de optimización
     */
    showRecommendations(report) {
        const recommendations = [];
        
        if (parseFloat(report.summary.successRate) < 95) {
            recommendations.push('🔧 Revisar imágenes con errores de carga');
        }
        
        if (parseFloat(report.summary.averageLoadTime) > 1000) {
            recommendations.push('⚡ Considerar imágenes más pequeñas o mejor compresión');
        }
        
        if (report.issues.slowImages > 0) {
            recommendations.push('🎯 Optimizar imágenes lentas específicamente');
        }
        
        if (recommendations.length > 0) {
            console.log('💡 Recomendaciones de Optimización:', recommendations);
        } else {
            console.log('✨ ¡Excelente rendimiento de imágenes!');
        }
    }
    
    /**
     * API pública para obtener métricas
     */
    getMetrics() {
        return { ...this.metrics };
    }
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
});

// Exportar para uso en desarrollo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}