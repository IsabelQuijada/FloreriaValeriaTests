/**
 * Event Manager - Sistema centralizado de manejo de eventos
 * Previene memory leaks y simplifica event handling
 */
class EventManager {
    constructor() {
        this.listeners = new Map();
        this.delegatedListeners = new Map();
        this.debounceTimers = new Map();
        this.throttleLastExecution = new Map();
        
        // Auto cleanup on page unload
        this.addEventListener(window, 'beforeunload', () => {
            this.cleanup();
        });
    }
    
    /**
     * Añade event listener con tracking automático
     * @param {Element|string} elementOrSelector - Elemento o selector
     * @param {string} eventType - Tipo de evento
     * @param {Function} handler - Function handler
     * @param {Object} options - Opciones adicionales
     */
    addEventListener(elementOrSelector, eventType, handler, options = {}) {
        const element = this.getElement(elementOrSelector);
        if (!element) {
            console.warn(`Element not found: ${elementOrSelector}`);
            return null;
        }
        
        // Aplicar decorators si se especifican
        let finalHandler = handler;
        if (options.debounce) {
            finalHandler = this.debounce(handler, options.debounce, `${element.id || 'element'}-${eventType}`);
        }
        if (options.throttle) {
            finalHandler = this.throttle(handler, options.throttle, `${element.id || 'element'}-${eventType}`);
        }
        if (options.once) {
            const originalHandler = finalHandler;
            finalHandler = (event) => {
                originalHandler(event);
                this.removeEventListener(element, eventType, finalHandler);
            };
        }
        
        element.addEventListener(eventType, finalHandler, options.native);
        
        // Track para cleanup
        const listenerId = this.generateListenerId();
        this.listeners.set(listenerId, {
            element,
            eventType,
            handler: finalHandler,
            originalHandler: handler
        });
        
        return listenerId;
    }
    
    /**
     * Event delegation - útil para elementos dinámicos
     * @param {Element|string} containerOrSelector - Contenedor
     * @param {string} childSelector - Selector de elementos hijo
     * @param {string} eventType - Tipo de evento
     * @param {Function} handler - Handler
     */
    addDelegatedEventListener(containerOrSelector, childSelector, eventType, handler) {
        const container = this.getElement(containerOrSelector);
        if (!container) {
            console.warn(`Container not found: ${containerOrSelector}`);
            return null;
        }
        
        const delegatedHandler = (event) => {
            const target = event.target.closest(childSelector);
            if (target && container.contains(target)) {
                handler.call(target, event);
            }
        };
        
        container.addEventListener(eventType, delegatedHandler);
        
        const listenerId = this.generateListenerId();
        this.delegatedListeners.set(listenerId, {
            container,
            eventType,
            handler: delegatedHandler,
            originalHandler: handler,
            childSelector
        });
        
        return listenerId;
    }
    
    /**
     * Remueve event listener
     * @param {string} listenerId - ID del listener
     */
    removeEventListener(listenerId) {
        if (this.listeners.has(listenerId)) {
            const { element, eventType, handler } = this.listeners.get(listenerId);
            element.removeEventListener(eventType, handler);
            this.listeners.delete(listenerId);
            return true;
        }
        
        if (this.delegatedListeners.has(listenerId)) {
            const { container, eventType, handler } = this.delegatedListeners.get(listenerId);
            container.removeEventListener(eventType, handler);
            this.delegatedListeners.delete(listenerId);
            return true;
        }
        
        return false;
    }
    
    /**
     * Debounce decorator
     * @private
     */
    debounce(func, wait, key) {
        return (...args) => {
            clearTimeout(this.debounceTimers.get(key));
            this.debounceTimers.set(key, setTimeout(() => {
                func.apply(this, args);
            }, wait));
        };
    }
    
    /**
     * Throttle decorator
     * @private  
     */
    throttle(func, limit, key) {
        return (...args) => {
            const lastExecution = this.throttleLastExecution.get(key) || 0;
            const now = Date.now();
            
            if (now - lastExecution >= limit) {
                this.throttleLastExecution.set(key, now);
                func.apply(this, args);
            }
        };
    }
    
    /**
     * Obtiene elemento del DOM
     * @private
     */
    getElement(elementOrSelector) {
        if (typeof elementOrSelector === 'string') {
            return elementOrSelector.startsWith('#') 
                ? document.getElementById(elementOrSelector.slice(1))
                : document.querySelector(elementOrSelector);
        }
        return elementOrSelector;
    }
    
    /**
     * Genera ID único para listener
     * @private
     */
    generateListenerId() {
        return `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Limpia todos los event listeners
     */
    cleanup() {
        // Remove regular listeners
        this.listeners.forEach(({ element, eventType, handler }) => {
            element.removeEventListener(eventType, handler);
        });
        this.listeners.clear();
        
        // Remove delegated listeners
        this.delegatedListeners.forEach(({ container, eventType, handler }) => {
            container.removeEventListener(eventType, handler);
        });
        this.delegatedListeners.clear();
        
        // Clear timers
        this.debounceTimers.forEach(timerId => clearTimeout(timerId));
        this.debounceTimers.clear();
        
        this.throttleLastExecution.clear();
    }
    
    /**
     * Obtiene estadísticas de listeners activos
     */
    getStats() {
        return {
            regularListeners: this.listeners.size,
            delegatedListeners: this.delegatedListeners.size,
            debounceTimers: this.debounceTimers.size,
            totalListeners: this.listeners.size + this.delegatedListeners.size
        };
    }
}

/**
 * Utility functions para eventos comunes
 */
class EventUtils {
    /**
     * Configura toggle para menú móvil
     */
    static setupMobileMenuToggle(toggleSelector = '#menu-toggle', menuSelector = '#nav-menu') {
        return window.eventManager.addEventListener(toggleSelector, 'click', (e) => {
            const menu = document.querySelector(menuSelector);
            const toggle = e.target;
            
            if (menu && toggle) {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            }
        });
    }
    
    /**
     * Configura scroll to top
     */
    static setupScrollToTop(buttonSelector = '#scroll-to-top') {
        const scrollListener = window.eventManager.addEventListener(
            window, 'scroll', 
            () => {
                const button = document.querySelector(buttonSelector);
                if (button) {
                    button.classList.toggle('visible', window.pageYOffset > 300);
                }
            },
            { throttle: 100 }
        );
        
        const clickListener = window.eventManager.addEventListener(
            buttonSelector, 'click',
            () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        );
        
        return { scrollListener, clickListener };
    }
    
    /**
     * Configura modal con navegación por teclado
     */
    static setupModal(modalSelector, closeSelector, prevSelector, nextSelector, handlers) {
        const modalElement = document.querySelector(modalSelector);
        if (!modalElement) return null;
        
        const listeners = [];
        
        // Close modal
        if (closeSelector && handlers.onClose) {
            listeners.push(
                window.eventManager.addEventListener(closeSelector, 'click', handlers.onClose)
            );
        }
        
        // Navigation
        if (prevSelector && handlers.onPrev) {
            listeners.push(
                window.eventManager.addEventListener(prevSelector, 'click', handlers.onPrev)
            );
        }
        
        if (nextSelector && handlers.onNext) {
            listeners.push(
                window.eventManager.addEventListener(nextSelector, 'click', handlers.onNext)
            );
        }
        
        // Click outside to close
        if (handlers.onClose) {
            listeners.push(
                window.eventManager.addEventListener(modalElement, 'click', (e) => {
                    if (e.target === modalElement) {
                        handlers.onClose(e);
                    }
                })
            );
        }
        
        // Keyboard navigation
        listeners.push(
            window.eventManager.addEventListener(document, 'keydown', (e) => {
                if (!modalElement.classList.contains('active')) return;
                
                switch (e.key) {
                    case 'Escape':
                        handlers.onClose && handlers.onClose(e);
                        break;
                    case 'ArrowLeft':
                        handlers.onPrev && handlers.onPrev(e);
                        break;
                    case 'ArrowRight':
                        handlers.onNext && handlers.onNext(e);
                        break;
                }
            })
        );
        
        return listeners;
    }
}

// Instancia global
if (typeof window !== 'undefined') {
    window.eventManager = new EventManager();
    window.EventManager = EventManager;
    window.EventUtils = EventUtils;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventManager, EventUtils };
}