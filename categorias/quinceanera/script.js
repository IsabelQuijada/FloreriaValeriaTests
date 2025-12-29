// ===== QUINCEAÑERA CON COMPONENTES REUTILIZABLES =====

// Inicializar gestor de imágenes
const quinceaneraImageManager = new QuinceaneraImageManager();

// Generar productos para todas las categorías
const quinceaneraProducts = quinceaneraImageManager.getAllProducts();

// Mapeo de categorías para mostrar nombres amigables
const categoryNames = {
    'ramo-estilizado': 'Ramos Estilizados',
    'ramo-girasoles': 'Ramos de Girasoles',
    'ramo-mix': 'Ramos Mixtos',
    'ramo-rosas': 'Ramos de Rosas',
    'ramo-tulipanes': 'Ramos de Tulipanes'
};

class QuinceaneraGallery {
    constructor() {
        this.productManager = null;
        this.currentFilter = 'all';
        this.modal = document.getElementById('quick-view-modal');
        this.currentProductIndex = 0;
        this.currentProducts = [];

        // Hacer la instancia accesible globalmente para el ProductManager
        window.quinceaneraGallery = this;

        this.init();
    }

    init() {
        // Inicializar comportamientos específicos de quinceañera
        if (window.quinceaneraUtils) {
            window.quinceaneraUtils.initializeQuinceaneraBehaviors();
        }
        
        this.setupProductManager();
        this.setupModal();
        this.setupScrollToTop();
        this.setupFilters();
    }

    setupProductManager() {
        // Mostrar loading state
        this.showLoading();
        
        // Crear ProductManager usando el método específico para quinceañera
        this.productManager = ProductManager.createQuinceaneraGallery('gallery-grid', quinceaneraProducts);
        // Configurar la instancia actual de productos
        this.currentProducts = quinceaneraProducts;
        
        // Esperar un momento para que se rendericen las cards y luego ocultar loading
        setTimeout(() => {
            this.hideLoading();
        }, 500);
    }

    setupFilters() {
        // Configurar filtros de categoría
        const filterContainer = document.querySelector('.filter-buttons');
        if (filterContainer) {
            const filters = [
                { category: 'all', label: 'Toda la Colección' },
                { category: 'ramo-estilizado', label: 'Ramos Estilizados' },
                { category: 'ramo-girasoles', label: 'Ramos de Girasoles' },
                { category: 'ramo-mix', label: 'Ramos Mixtos' },
                { category: 'ramo-rosas', label: 'Ramos de Rosas' },
                { category: 'ramo-tulipanes', label: 'Ramos de Tulipanes' }
            ];

            filters.forEach(filter => {
                const button = document.createElement('button');
                button.classList.add('filter-btn');
                button.setAttribute('data-category', filter.category);
                button.textContent = filter.label;
                
                if (filter.category === 'all') {
                    button.classList.add('active');
                }

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.applyFilter(filter.category);
                });

                filterContainer.appendChild(button);
            });
        }
    }

    applyFilter(category) {
        this.currentFilter = category;
        
        // Actualizar botones activos
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });

        // Filtrar productos
        let filteredProducts;
        if (category === 'all') {
            filteredProducts = quinceaneraProducts;
        } else {
            filteredProducts = quinceaneraProducts.filter(product => product.category === category);
        }

        this.currentProducts = filteredProducts;

        // Usar el método filterByCategory del ProductManager
        this.productManager.filterByCategory(category);
        // Actualizar contador de productos si existe
        this.updateProductCounter(filteredProducts.length);
    }

    updateProductCounter(count) {
        const counter = document.querySelector('.product-counter');
        if (counter) {
            const categoryText = this.currentFilter === 'all' ? 'productos' : categoryNames[this.currentFilter] || 'productos';
            counter.textContent = `${count} ${categoryText.toLowerCase()}`;
        }
    }

    setupModal() {
        if (!this.modal) return;

        const modalClose = document.getElementById('quick-view-close');
        const modalOverlay = this.modal;
        const modalPrev = document.getElementById('quick-view-prev');
        const modalNext = document.getElementById('quick-view-next');
        const modalContent = modalOverlay.querySelector('.quick-view-content');

        // Cerrar modal con botón
        modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar modal clickeando fuera
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
            // Navegación con flechas del teclado
            if (this.modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    this.showPreviousProduct();
                } else if (e.key === 'ArrowRight') {
                    this.showNextProduct();
                }
            }
        });

        // Navegación con botones
        modalPrev.addEventListener('click', () => {
            this.showPreviousProduct();
        });

        modalNext.addEventListener('click', () => {
            this.showNextProduct();
        });

        // Contacto por WhatsApp desde el modal
        const modalContact = document.getElementById('quick-view-contact');
        if (modalContact) {
            modalContact.addEventListener('click', () => {
                this.contactWhatsApp();
            });
        }

        // Implementar swipe gestures para mobile
        this.setupSwipeGestures(modalContent);
    }

    setupSwipeGestures(element) {
        let startX = 0;
        let startY = 0;
        let deltaX = 0;
        let deltaY = 0;
        let isScrolling = false;
        let isSwiping = false;

        // Eventos táctiles
        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
            isSwiping = false;
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            deltaX = e.touches[0].clientX - startX;
            deltaY = e.touches[0].clientY - startY;

            // Detectar dirección del gesto
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                // Scroll vertical - permitir comportamiento normal
                isScrolling = true;
                isSwiping = false;
            } else if (Math.abs(deltaX) > 30 && !isScrolling) {
                // Swipe horizontal
                isSwiping = true;
                e.preventDefault(); // Prevenir scroll durante swipe
            }
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            if (!isSwiping) return;

            // Umbral mínimo para considerar swipe
            if (Math.abs(deltaX) > 100) {
                if (deltaX > 0) {
                    // Swipe derecha - producto anterior
                    this.showPreviousProduct();
                } else {
                    // Swipe izquierda - siguiente producto
                    this.showNextProduct();
                }
            }

            // Reset
            startX = 0;
            startY = 0;
            deltaX = 0;
            deltaY = 0;
            isScrolling = false;
            isSwiping = false;
        }, { passive: true });
    }

    openModal(config) {
        const product = this.currentProducts.find(p => p.id === config.id) || 
                       quinceaneraProducts.find(p => p.id === config.id);
        if (!product) return;
        this.currentProductIndex = this.currentProducts.indexOf(product);
        if (this.currentProductIndex === -1) {
            this.currentProducts = quinceaneraProducts;
            this.currentProductIndex = quinceaneraProducts.indexOf(product);
        }

        this.showCurrentProduct();
        document.body.classList.add('modal-open');
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    showCurrentProduct() {
        if (this.currentProductIndex < 0 || this.currentProductIndex >= this.currentProducts.length) {
            return;
        }

        const product = this.currentProducts[this.currentProductIndex];
        
        // Actualizar imagen
        const modalImg = document.getElementById('quick-view-image');
        if (modalImg) {
            modalImg.src = product.image;
            modalImg.alt = product.name;
        }

        // Actualizar título
        const modalTitle = document.getElementById('quick-view-title');
        if (modalTitle) {
            modalTitle.textContent = product.name;
        }

        // Actualizar descripción
        const modalDescription = document.getElementById('quick-view-description');
        if (modalDescription) {
            modalDescription.textContent = product.description;
        }

        // Set category display
        const modalCategory = document.getElementById('quick-view-category');
        if (modalCategory) {
            const categoryDisplay = categoryNames[product.category] || product.category.toUpperCase();
            modalCategory.textContent = categoryDisplay;
        }

        // Actualizar navegación
        this.updateModalNavigation();
    }

    showPreviousProduct() {
        if (this.currentProducts.length === 0) return;
        
        this.currentProductIndex = (this.currentProductIndex - 1 + this.currentProducts.length) % this.currentProducts.length;
        this.showCurrentProduct();
    }

    showNextProduct() {
        if (this.currentProducts.length === 0) return;
        
        this.currentProductIndex = (this.currentProductIndex + 1) % this.currentProducts.length;
        this.showCurrentProduct();
    }

    updateModalNavigation() {
        const prevBtn = document.getElementById('quick-view-prev');
        const nextBtn = document.getElementById('quick-view-next');
        const hasMultipleProducts = this.currentProducts.length > 1;

        if (prevBtn) {
            prevBtn.style.display = hasMultipleProducts ? 'flex' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.style.display = hasMultipleProducts ? 'flex' : 'none';
        }
    }

    contactWhatsApp() {
        const currentProduct = this.currentProducts[this.currentProductIndex];
        if (!currentProduct) return;

        let message;
        if (window.quinceaneraUtils) {
            message = window.quinceaneraUtils.generateWhatsAppMessage(currentProduct.name, currentProduct.category);
        } else {
            message = `Hola, me interesa el ${currentProduct.name} para quinceañera. ¿Podrían darme más información sobre disponibilidad y precio?`;
        }
        const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    contactFromCard(productId) {
        const product = quinceaneraProducts.find(p => p.id === productId);
        if (!product) return;

        let message;
        if (window.quinceaneraUtils) {
            message = window.quinceaneraUtils.generateWhatsAppMessage(product.name, product.category);
        } else {
            message = `Hola, me interesa el ${product.name} para quinceañera. ¿Podrían darme más información sobre disponibilidad y precio?`;
        }
        const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    showLoading() {
        const loadingState = document.getElementById('loading-state');
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (loadingState) loadingState.style.display = 'flex';
        if (galleryGrid) galleryGrid.style.display = 'none';
    }

    hideLoading() {
        const loadingState = document.getElementById('loading-state');
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (loadingState) loadingState.style.display = 'none';
        if (galleryGrid) galleryGrid.style.display = 'grid';
        
        // Mostrar total de productos
        this.updateProductCounter(quinceaneraProducts.length);
    }

    setupScrollToTop() {
        // Funcionalidad de scroll to top disponible si es necesaria en el futuro
        // Por ahora no implementada para mantener el código limpio
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.quinceaneraGallery = new QuinceaneraGallery();
    // Toggle del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Cerrar menú al hacer click en un link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});
// Hacer accesible globalmente para debugging
window.QuinceaneraGallery = QuinceaneraGallery;