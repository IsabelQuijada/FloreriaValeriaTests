/**
 * Sistema de manejo de errores y logging para Florería Valeria
 */

class ErrorHandler {
    static instance = null;

    constructor() {
        if (ErrorHandler.instance) {
            return ErrorHandler.instance;
        }
        
        this.errors = [];
        this.isProduction = location.hostname !== 'localhost' && 
                            location.hostname !== '127.0.0.1';
        
        this.init();
        ErrorHandler.instance = this;
    }

    init() {
        // Capturar errores globales de JavaScript
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error?.stack
            });
        });

        // Capturar errores de Promises no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
        });

        // Capturar errores de recursos
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.logError('Resource Error', {
                    tagName: event.target.tagName,
                    source: event.target.src || event.target.href,
                    message: 'Failed to load resource'
                });
            }
        }, true);
    }

    logError(type, details, severity = 'error') {
        const errorEntry = {
            timestamp: new Date().toISOString(),
            type,
            details,
            severity,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.errors.push(errorEntry);

        // En desarrollo, mostrar en consola
        if (!this.isProduction) {
            console.group(`🚨 ${type} [${severity.toUpperCase()}]`);
            console.error('Details:', details);
            console.info('Timestamp:', errorEntry.timestamp);
            console.info('URL:', errorEntry.url);
            console.groupEnd();
        }

        // Enviar a servicio de logging en producción
        if (this.isProduction && severity === 'error') {
            this.sendToLoggingService(errorEntry);
        }
    }

    logWarning(message, details = {}) {
        this.logError('Warning', { message, ...details }, 'warning');
    }

    logInfo(message, details = {}) {
        this.logError('Info', { message, ...details }, 'info');
    }

    async sendToLoggingService(errorEntry) {
        try {
            // Aquí se implementaría el envío a un servicio de logging
            // Por ejemplo, LogRocket, Sentry, o un endpoint propio
            
            // Ejemplo con fetch (comentado hasta tener endpoint):
            // await fetch('/api/log-error', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(errorEntry)
            // });
            
            console.log('Error logged to service:', errorEntry);
        } catch (loggingError) {
            console.error('Failed to log error to service:', loggingError);
        }
    }

    getErrors(severity = null) {
        if (severity) {
            return this.errors.filter(error => error.severity === severity);
        }
        return [...this.errors];
    }

    clearErrors() {
        this.errors = [];
    }

    // Método para reportar errores personalizados desde la aplicación
    static reportError(message, context = {}, severity = 'error') {
        const handler = new ErrorHandler();
        handler.logError('Application Error', { message, context }, severity);
    }

    // Método para reportar performance issues
    static reportPerformance(metric, value, context = {}) {
        const handler = new ErrorHandler();
        handler.logInfo('Performance Metric', { metric, value, context });
    }
}

// Logger utilitario
class Logger {
    static error(message, details = {}) {
        ErrorHandler.reportError(message, details, 'error');
    }

    static warn(message, details = {}) {
        ErrorHandler.reportError(message, details, 'warning');
    }

    static info(message, details = {}) {
        ErrorHandler.reportError(message, details, 'info');
    }

    static debug(message, details = {}) {
        if (!ErrorHandler.instance?.isProduction) {
            console.debug(`🔍 ${message}`, details);
        }
    }

    static performance(metric, value, context = {}) {
        ErrorHandler.reportPerformance(metric, value, context);
    }
}

// Monitoreo de performance
class PerformanceMonitor {
    static instance = null;

    constructor() {
        if (PerformanceMonitor.instance) {
            return PerformanceMonitor.instance;
        }
        
        this.metrics = {};
        this.init();
        PerformanceMonitor.instance = this;
    }

    init() {
        // Monitorear Web Vitals si está disponible
        this.observeWebVitals();
        
        // Monitorear carga de recursos
        this.observeResourceTiming();
        
        // Monitorear tiempo de carga de imágenes lazy
        this.observeLazyImageLoading();
    }

    observeWebVitals() {
        // First Contentful Paint
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    Logger.performance('FCP', entry.startTime);
                }
            }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            Logger.performance('LCP', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }

    observeResourceTiming() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.duration > 1000) { // Recursos que tardan más de 1s
                    Logger.warn('Slow Resource', {
                        resource: entry.name,
                        duration: entry.duration,
                        size: entry.transferSize
                    });
                }
            }
        }).observe({ entryTypes: ['resource'] });
    }

    observeLazyImageLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const loadStart = performance.now();
                        const img = entry.target;
                        
                        img.addEventListener('load', () => {
                            const loadEnd = performance.now();
                            Logger.performance('Lazy Image Load', loadEnd - loadStart, {
                                src: img.src,
                                alt: img.alt
                            });
                        }, { once: true });
                    }
                });
            });

            // Observar todas las imágenes lazy
            document.querySelectorAll('img[loading="lazy"], img.lazy-load').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    startTimer(name) {
        this.metrics[name] = performance.now();
    }

    endTimer(name) {
        if (this.metrics[name]) {
            const duration = performance.now() - this.metrics[name];
            Logger.performance(name, duration);
            delete this.metrics[name];
            return duration;
        }
        return null;
    }
}

// Inicializar sistemas
window.ErrorHandler = ErrorHandler;
window.Logger = Logger;
window.PerformanceMonitor = PerformanceMonitor;

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    new ErrorHandler();
    new PerformanceMonitor();
    
    Logger.info('Error handling and performance monitoring initialized');
});