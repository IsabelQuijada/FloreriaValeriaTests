/**
 * Utilidad de logging inteligente
 * Permite habilitar/deshabilitar logs fácilmente para producción
 */

window.FloreriaLogger = {
    // Configuración de logging (cambiar a false para producción)
    enabled: true,
    
    // Niveles de log
    levels: {
        DEBUG: 0,
        INFO: 1, 
        WARN: 2,
        ERROR: 3
    },
    
    currentLevel: 1, // INFO por defecto
    
    /**
     * Log de debug (solo en desarrollo)
     */
    debug: function(message, ...args) {
        if (this.enabled && this.currentLevel <= this.levels.DEBUG) {
            console.log(`🐛 [DEBUG]`, message, ...args);
        }
    },
    
    /**
     * Log de información
     */
    info: function(message, ...args) {
        if (this.enabled && this.currentLevel <= this.levels.INFO) {
            console.log(`ℹ️ [INFO]`, message, ...args);
        }
    },
    
    /**
     * Log de advertencia
     */
    warn: function(message, ...args) {
        if (this.enabled && this.currentLevel <= this.levels.WARN) {
            console.warn(`⚠️ [WARN]`, message, ...args);
        }
    },
    
    /**
     * Log de error (siempre activo)
     */
    error: function(message, ...args) {
        console.error(`❌ [ERROR]`, message, ...args);
    },
    
    /**
     * Deshabilitar todos los logs (para producción)
     */
    disable: function() {
        this.enabled = false;
    },
    
    /**
     * Habilitar logs (para desarrollo)
     */
    enable: function() {
        this.enabled = true;
    },
    
    /**
     * Configurar nivel de logging
     */
    setLevel: function(level) {
        this.currentLevel = this.levels[level.toUpperCase()] || this.levels.INFO;
    }
};

// Alias corto para facilitar el uso
window.log = window.FloreriaLogger;

// Auto-deshabilitar en producción (detectando dominio)
if (window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1' && 
    !window.location.hostname.includes('192.168')) {
    window.FloreriaLogger.disable();
}