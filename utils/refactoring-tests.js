/**
 * Refactoring Validation Tests
 * Verifica que la refactorización no rompa funcionalidad
 */

class RefactoringTests {
    constructor() {
        this.results = [];
    }
    
    async runAll() {
        console.log('🧪 Running refactoring validation tests...');
        
        await this.testBaseClasses();
        await this.testEventManager();
        await this.testImageManagers();
        await this.testGalleries();
        
        this.reportResults();
    }
    
    async testBaseClasses() {
        console.log('  Testing base classes...');
        
        try {
            // Test BaseImageManager
            if (typeof BaseImageManager !== 'undefined') {
                this.pass('BaseImageManager', 'Class available');
            } else {
                this.fail('BaseImageManager', 'Class not available');
            }
            
            // Test BaseGallery
            if (typeof BaseGallery !== 'undefined') {
                this.pass('BaseGallery', 'Class available');
            } else {
                this.fail('BaseGallery', 'Class not available');
            }
            
            // Test EventManager
            if (window.eventManager && typeof window.eventManager.addEventListener === 'function') {
                this.pass('EventManager', 'Instance available and functional');
            } else {
                this.fail('EventManager', 'Instance not available or non-functional');
            }
            
        } catch (error) {
            this.fail('BaseClasses', error.message);
        }
    }
    
    async testEventManager() {
        console.log('  Testing EventManager...');
        
        try {
            // Test event registration
            const testElement = document.createElement('div');
            document.body.appendChild(testElement);
            
            let eventFired = false;
            const listenerId = window.eventManager.addEventListener(testElement, 'click', () => {
                eventFired = true;
            });
            
            // Trigger event
            testElement.click();
            
            if (eventFired) {
                this.pass('EventManager', 'Event handling works');
            } else {
                this.fail('EventManager', 'Event not fired');
            }
            
            // Cleanup
            window.eventManager.removeEventListener(listenerId);
            document.body.removeChild(testElement);
            
        } catch (error) {
            this.fail('EventManager', error.message);
        }
    }
    
    async testImageManagers() {
        console.log('  Testing ImageManager compatibility...');
        
        const categories = ['ramosElegantes', 'ramosClasicos', 'quinceanera'];
        
        for (const category of categories) {
            try {
                const managerName = category.charAt(0).toUpperCase() + category.slice(1) + 'ImageManager';
                const Manager = window[managerName];
                
                if (Manager) {
                    const manager = new Manager();
                    
                    if (typeof manager.getAllProducts === 'function') {
                        const products = manager.getAllProducts();
                        if (Array.isArray(products) && products.length > 0) {
                            this.pass(managerName, `Generated ${products.length} products`);
                        } else {
                            this.fail(managerName, 'No products generated');
                        }
                    } else {
                        this.fail(managerName, 'getAllProducts method missing');
                    }
                } else {
                    this.fail(managerName, 'Manager class not found');
                }
            } catch (error) {
                this.fail(category, error.message);
            }
        }
    }
    
    async testGalleries() {
        console.log('  Testing Gallery functionality...');
        
        // Test gallery instances exist
        const galleries = ['ramosElegantesGallery', 'ramosClasicosGallery', 'quinceaneraGallery'];
        
        for (const galleryName of galleries) {
            if (window[galleryName]) {
                this.pass(galleryName, 'Instance exists');
            } else {
                this.fail(galleryName, 'Instance not found');
            }
        }
    }
    
    pass(component, message) {
        this.results.push({ status: 'PASS', component, message });
        console.log(`    ✅ ${component}: ${message}`);
    }
    
    fail(component, message) {
        this.results.push({ status: 'FAIL', component, message });
        console.log(`    ❌ ${component}: ${message}`);
    }
    
    reportResults() {
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        
        console.log('');
        console.log('📊 Test Results:');
        console.log(`  ✅ Passed: ${passed}`);
        console.log(`  ❌ Failed: ${failed}`);
        console.log(`  📊 Total: ${this.results.length}`);
        
        if (failed === 0) {
            console.log('');
            console.log('🎉 All tests passed! Refactoring is ready for deployment.');
        } else {
            console.log('');
            console.log('⚠️  Some tests failed. Review implementation before deployment.');
        }
        
        return failed === 0;
    }
}

// Auto-run tests when available
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.search.includes('test=refactoring')) {
        setTimeout(() => {
            const tests = new RefactoringTests();
            tests.runAll();
        }, 2000);
    }
});

window.RefactoringTests = RefactoringTests;
