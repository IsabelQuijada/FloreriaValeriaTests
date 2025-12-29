/**
 * Sistema de Analytics para Florería Valeria
 * 
 * Rastrea interacciones de usuarios, conversiones y métricas importantes
 * sin dependender de servicios externos por defecto.
 */

class FloreriaAnalytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = [];
        this.userInteractions = [];
        
        this.init();
    }

    init() {
        // Registrar vista de página inicial
        this.trackPageView();
        
        // Configurar event listeners para interacciones
        this.setupEventListeners();
        
        // Configurar envío periódico de datos
        this.setupPeriodicReporting();
        
        // Configurar listener para cuando el usuario sale de la página
        this.setupBeforeUnload();
    }

    /**
     * Genera un ID único de sesión
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Registra una vista de página
     */
    trackPageView(pagePath = window.location.pathname) {
        const pageView = {
            timestamp: Date.now(),
            page: pagePath,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            sessionId: this.sessionId,
            viewportSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        this.pageViews.push(pageView);
        this.trackEvent('page_view', pageView);
        
        Logger?.info('Page view tracked', pageView);
    }

    /**
     * Rastrea eventos personalizados
     */
    trackEvent(eventName, properties = {}) {
        const event = {
            timestamp: Date.now(),
            sessionId: this.sessionId,
            event: eventName,
            properties: {
                page: window.location.pathname,
                ...properties
            }
        };

        this.events.push(event);
        
        // Enviar inmediatamente eventos importantes
        if (this.isCriticalEvent(eventName)) {
            this.sendEvent(event);
        }
    }

    /**
     * Rastrea interacciones con productos
     */
    trackProductInteraction(action, productData) {
        this.trackEvent('product_interaction', {
            action, // 'view', 'quick_view', 'contact', 'share'
            productId: productData.id,
            productName: productData.name,
            productCategory: productData.category,
            timestamp: Date.now()
        });
    }

    /**
     * Rastrea interacciones con WhatsApp
     */
    trackWhatsAppClick(context, productInfo = null) {
        this.trackEvent('whatsapp_click', {
            context, // 'hero', 'product', 'contact_page', etc.
            productInfo,
            timestamp: Date.now()
        });
    }

    /**
     * Rastrea navegación entre páginas/categorías
     */
    trackNavigation(from, to, method = 'click') {
        this.trackEvent('navigation', {
            from,
            to,
            method, // 'click', 'keyboard', 'swipe'
            timestamp: Date.now()
        });
    }

    /**
     * Rastrea performance de carga de imágenes
     */
    trackImageLoad(imageSrc, loadTime, wasLazy = false) {
        this.trackEvent('image_load', {
            src: imageSrc,
            loadTime,
            wasLazy,
            timestamp: Date.now()
        });
    }

    /**
     * Rastrea errores del usuario (404, imágenes no encontradas, etc.)
     */
    trackError(errorType, errorDetails) {
        this.trackEvent('user_error', {
            errorType,
            errorDetails,
            timestamp: Date.now()
        });
    }

    /**
     * Rastrea tiempo de permanencia en secciones
     */
    trackSectionTime(sectionName, timeSpent) {
        this.trackEvent('section_time', {
            section: sectionName,
            timeSpent,
            timestamp: Date.now()
        });
    }

    /**
     * Configura listeners para interacciones automáticas
     */
    setupEventListeners() {
        // Clicks en productos
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-product-id');
                if (productId) {
                    this.trackProductInteraction('click', { id: productId });
                }
            }

            // Clicks en enlaces de WhatsApp
            if (e.target.closest('[href*="wa.me"]')) {
                const link = e.target.closest('[href*="wa.me"]');
                this.trackWhatsAppClick('link_click', {
                    href: link.href,
                    text: link.textContent.trim()
                });
            }

            // Clicks en navegación
            if (e.target.closest('nav a')) {
                const link = e.target.closest('nav a');
                this.trackNavigation(window.location.pathname, link.href, 'nav_click');
            }
        });

        // Scroll tracking para engagement
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                );
                
                if (scrollPercent >= 25 && !this.hasTrackedScroll25) {
                    this.trackEvent('scroll_depth', { percent: 25 });
                    this.hasTrackedScroll25 = true;
                } else if (scrollPercent >= 50 && !this.hasTrackedScroll50) {
                    this.trackEvent('scroll_depth', { percent: 50 });
                    this.hasTrackedScroll50 = true;
                } else if (scrollPercent >= 75 && !this.hasTrackedScroll75) {
                    this.trackEvent('scroll_depth', { percent: 75 });
                    this.hasTrackedScroll75 = true;
                } else if (scrollPercent >= 100 && !this.hasTrackedScroll100) {
                    this.trackEvent('scroll_depth', { percent: 100 });
                    this.hasTrackedScroll100 = true;
                }
            }, 250);
        });

        // Tracking de tiempo en página
        this.setupTimeTracking();
    }

    /**
     * Configura tracking de tiempo en diferentes secciones
     */
    setupTimeTracking() {
        const sections = document.querySelectorAll('section[id], .section');
        const sectionTimes = new Map();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id || entry.target.className;
                
                if (entry.isIntersecting) {
                    sectionTimes.set(sectionId, Date.now());
                } else {
                    const startTime = sectionTimes.get(sectionId);
                    if (startTime) {
                        const timeSpent = Date.now() - startTime;
                        if (timeSpent > 1000) { // Solo trackear si estuvo más de 1 segundo
                            this.trackSectionTime(sectionId, timeSpent);
                        }
                        sectionTimes.delete(sectionId);
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    /**
     * Determina si un evento es crítico y debe enviarse inmediatamente
     */
    isCriticalEvent(eventName) {
        const criticalEvents = [
            'whatsapp_click',
            'product_contact',
            'form_submit',
            'error',
            'conversion'
        ];
        return criticalEvents.includes(eventName);
    }

    /**
     * Configura envío periódico de eventos
     */
    setupPeriodicReporting() {
        // Enviar eventos cada 30 segundos
        setInterval(() => {
            if (this.events.length > 0) {
                this.sendBatchEvents();
            }
        }, 30000);
    }

    /**
     * Configura listener para cuando el usuario sale
     */
    setupBeforeUnload() {
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.startTime;
            this.trackEvent('session_end', {
                duration: sessionDuration,
                pageViews: this.pageViews.length,
                totalEvents: this.events.length
            });

            // Intentar enviar datos pendientes
            this.sendBatchEvents(true);
        });
    }

    /**
     * Envía un evento individual
     */
    async sendEvent(event, isUrgent = false) {
        if (this.isOffline()) return;

        try {
            // Aquí se implementaría el envío a un servicio de analytics
            // Google Analytics, Adobe Analytics, o endpoint propio
            
            // Ejemplo con Google Analytics 4 (comentado):
            // if (window.gtag) {
            //     gtag('event', event.event, event.properties);
            // }
            
            // Ejemplo con endpoint propio (comentado):
            // const response = await fetch('/api/analytics', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(event)
            // });

            Logger?.debug('Event sent', event);
        } catch (error) {
            Logger?.error('Failed to send analytics event', { event, error });
        }
    }

    /**
     * Envía múltiples eventos en lote
     */
    async sendBatchEvents(isUrgent = false) {
        if (this.events.length === 0 || this.isOffline()) return;

        const eventsToSend = [...this.events];
        this.events = []; // Limpiar la cola

        try {
            // Enviar lote de eventos
            // const response = await fetch('/api/analytics/batch', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         sessionId: this.sessionId,
            //         events: eventsToSend
            //     })
            // });

            Logger?.debug('Batch events sent', { count: eventsToSend.length });
        } catch (error) {
            Logger?.error('Failed to send batch analytics events', { 
                count: eventsToSend.length, 
                error 
            });
            
            // En caso de error, volver a agregar eventos a la cola
            this.events.unshift(...eventsToSend);
        }
    }

    /**
     * Verifica si el usuario está offline
     */
    isOffline() {
        return !navigator.onLine;
    }

    /**
     * Obtiene estadísticas de la sesión actual
     */
    getSessionStats() {
        return {
            sessionId: this.sessionId,
            duration: Date.now() - this.startTime,
            pageViews: this.pageViews.length,
            events: this.events.length,
            startTime: new Date(this.startTime).toISOString()
        };
    }

    /**
     * Exporta datos para debugging
     */
    exportData() {
        return {
            sessionId: this.sessionId,
            pageViews: this.pageViews,
            events: this.events,
            stats: this.getSessionStats()
        };
    }
}

// Hacer disponible globalmente
window.FloreriaAnalytics = FloreriaAnalytics;

// Auto-inicializar
let analyticsInstance = null;
document.addEventListener('DOMContentLoaded', () => {
    analyticsInstance = new FloreriaAnalytics();
    window.analytics = analyticsInstance;
    
    Logger?.info('Analytics initialized', analyticsInstance.getSessionStats());
});

// Exponer métodos de conveniencia globalmente
window.trackEvent = (eventName, properties) => {
    if (analyticsInstance) {
        analyticsInstance.trackEvent(eventName, properties);
    }
};

window.trackProduct = (action, productData) => {
    if (analyticsInstance) {
        analyticsInstance.trackProductInteraction(action, productData);
    }
};