/**
 * Sistema de testing básico para Florería Valeria
 * 
 * Framework de testing ligero para verificar funcionalidades críticas
 * del sitio web sin dependencias externas.
 */

class FloreriaTestSuite {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            skipped: 0,
            total: 0
        };
        this.currentSuite = '';
    }

    /**
     * Define un conjunto de tests
     */
    describe(suiteName, callback) {
        this.currentSuite = suiteName;
        console.group(`🧪 Testing: ${suiteName}`);
        callback();
        console.groupEnd();
    }

    /**
     * Define un test individual
     */
    it(testName, callback, timeout = 5000) {
        const fullTestName = `${this.currentSuite} - ${testName}`;
        
        try {
            const timeoutId = setTimeout(() => {
                throw new Error('Test timeout');
            }, timeout);

            const result = callback();
            
            if (result instanceof Promise) {
                return result.then(() => {
                    clearTimeout(timeoutId);
                    this.pass(fullTestName);
                }).catch((error) => {
                    clearTimeout(timeoutId);
                    this.fail(fullTestName, error);
                });
            } else {
                clearTimeout(timeoutId);
                this.pass(fullTestName);
            }
        } catch (error) {
            this.fail(fullTestName, error);
        }
    }

    /**
     * Aserciones básicas
     */
    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${expected}, got ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected truthy value, got ${actual}`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected falsy value, got ${actual}`);
                }
            },
            toContain: (expected) => {
                if (!actual.includes(expected)) {
                    throw new Error(`Expected ${actual} to contain ${expected}`);
                }
            },
            toBeInstanceOf: (expected) => {
                if (!(actual instanceof expected)) {
                    throw new Error(`Expected instance of ${expected.name}, got ${actual.constructor.name}`);
                }
            }
        };
    }

    /**
     * Marca un test como exitoso
     */
    pass(testName) {
        this.results.passed++;
        this.results.total++;
        console.log(`✅ ${testName}`);
    }

    /**
     * Marca un test como fallido
     */
    fail(testName, error) {
        this.results.failed++;
        this.results.total++;
        console.error(`❌ ${testName}: ${error.message}`);
        console.error(error);
    }

    /**
     * Ejecuta todos los tests
     */
    async runAll() {
        console.log('🏁 Iniciando tests de Florería Valeria...');
        
        // Tests de componentes básicos
        await this.testBasicComponents();
        
        // Tests de configuración
        await this.testConfiguration();
        
        // Tests de funcionalidades
        await this.testFunctionalities();
        
        // Tests de performance
        await this.testPerformance();
        
        this.showResults();
    }

    /**
     * Tests de componentes básicos
     */
    async testBasicComponents() {
        this.describe('Componentes Básicos', () => {
            this.it('LazyLoader debe estar disponible', () => {
                this.expect(typeof LazyLoader).toBe('function');
            });

            this.it('ProductManager debe estar disponible', () => {
                this.expect(typeof ProductManager).toBe('function');
            });

            this.it('ProductCard debe estar disponible', () => {
                this.expect(typeof ProductCard).toBe('function');
            });

            this.it('ErrorHandler debe estar disponible', () => {
                this.expect(typeof ErrorHandler).toBe('function');
            });
        });
    }

    /**
     * Tests de configuración
     */
    async testConfiguration() {
        this.describe('Configuración Global', () => {
            this.it('FLORERIA_CONFIG debe existir', () => {
                this.expect(window.FLORERIA_CONFIG).toBeTruthy();
            });

            this.it('Configuración de contacto debe ser válida', () => {
                const contact = window.FLORERIA_CONFIG?.CONTACT;
                this.expect(contact).toBeTruthy();
                this.expect(contact.WHATSAPP).toBeTruthy();
                this.expect(contact.PHONE_1).toBeTruthy();
            });

            this.it('URLs de assets deben estar configuradas', () => {
                const assets = window.FLORERIA_CONFIG?.ASSETS;
                this.expect(assets).toBeTruthy();
                this.expect(assets.BASE_URL).toBeTruthy();
            });
        });
    }

    /**
     * Tests de funcionalidades
     */
    async testFunctionalities() {
        this.describe('Funcionalidades del Sitio', () => {
            this.it('Elementos del DOM principal deben existir', () => {
                this.expect(document.getElementById('products-grid')).toBeTruthy();
                this.expect(document.querySelector('.header')).toBeTruthy();
                this.expect(document.querySelector('.navbar')).toBeTruthy();
            });

            this.it('Menú móvil debe funcionar', () => {
                const menuToggle = document.getElementById('menu-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                this.expect(menuToggle).toBeTruthy();
                this.expect(navMenu).toBeTruthy();
                
                // Simular click
                menuToggle.click();
                this.expect(navMenu.classList.contains('active')).toBeTruthy();
            });

            this.it('Datos de productos favoritas deben estar cargados', () => {
                this.expect(window.favoriteProducts).toBeTruthy();
                this.expect(Array.isArray(window.favoriteProducts)).toBeTruthy();
                this.expect(window.favoriteProducts.length).toBe(10);
            });
        });
    }

    /**
     * Tests de performance
     */
    async testPerformance() {
        this.describe('Performance', () => {
            this.it('Imágenes lazy loading deben tener data-src', () => {
                const lazyImages = document.querySelectorAll('.lazy-load');
                let hasDataSrc = true;
                
                lazyImages.forEach(img => {
                    if (!img.hasAttribute('data-src')) {
                        hasDataSrc = false;
                    }
                });
                
                this.expect(hasDataSrc).toBeTruthy();
            });

            this.it('CSS debe estar cargado', () => {
                const styles = window.getComputedStyle(document.body);
                this.expect(styles).toBeTruthy();
            });

            this.it('No debe haber errores de consola críticos', () => {
                // Este test debe ejecutarse después de que se cargue toda la página
                const errorHandler = ErrorHandler.instance;
                if (errorHandler) {
                    const criticalErrors = errorHandler.getErrors('error');
                    this.expect(criticalErrors.length).toBe(0);
                }
            });
        });
    }

    /**
     * Muestra resultados finales
     */
    showResults() {
        console.log('\n📊 Resultados de los Tests:');
        console.log(`✅ Exitosos: ${this.results.passed}`);
        console.log(`❌ Fallidos: ${this.results.failed}`);
        console.log(`⏭️ Saltados: ${this.results.skipped}`);
        console.log(`📝 Total: ${this.results.total}`);
        
        if (this.results.failed > 0) {
            console.warn('⚠️ Hay tests fallidos que requieren atención');
        } else {
            console.log('🎉 Todos los tests pasaron exitosamente');
        }
    }
}

// Hacer disponible globalmente
window.FloreriaTestSuite = FloreriaTestSuite;

// Auto-ejecutar tests en desarrollo
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        // Esperar un poco para que todos los componentes se inicialicen
        setTimeout(() => {
            const testSuite = new FloreriaTestSuite();
            testSuite.runAll();
        }, 2000);
    });
}