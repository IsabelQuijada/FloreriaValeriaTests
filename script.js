/**
 * Main Script - Florería Valeria Website
 * Maneja la inicialización de componentes y funcionalidades globales
 */

// ============================================
// DATOS DE PRODUCTOS FAVORITAS (RAMOS ELEGANTES Y CLÁSICOS)
// ============================================

/**
 * Genera productos aleatorios de ambas categorías para mostrar en favoritas
 * @param {number} count - Número de productos a generar
 * @returns {Array} Array de productos mezclados de ambas categorías
 */
function generateRandomMixedProducts(count = 10) {
    // Productos de ramos elegantes
    const ramosElegantesImages = [
        'Ramo1.png', 'Ramo2.png', 'Ramo3.png', 'Ramo4.png', 'Ramo6.png', 'Ramo7.png', 
        'Ramo8.png', 'Ramo9.png', 'Ramo11.png', 'Ramo12.png', 'Ramo13.png', 'Ramo15.png'
    ];
    
    const elegantesDescriptions = {
        'Ramo1.png': 'Ramo premium elegante con flores selectas, perfectamente combinadas para crear una expresión de distinción y sofisticación.',
        'Ramo2.png': 'Arreglo floral exclusivo que combina belleza y elegancia en cada detalle, ideal para ocasiones especiales.',
        'Ramo3.png': 'Ramo distinguido con flores de la más alta calidad, diseñado para transmitir sentimientos profundos con estilo.',
        'Ramo4.png': 'Composición floral premium que refleja buen gusto y refinamiento en cada elemento seleccionado.',
        'Ramo6.png': 'Ramo elegante que combina colores y texturas únicas, creando una pieza artística de flores exclusivas.',
        'Ramo7.png': 'Arreglo floral sofisticado con flores premium, perfecto para expresar amor y admiración con distinción.',
        'Ramo8.png': 'Ramo de diseño exclusivo que captura la esencia de la elegancia floral en su máxima expresión.',
        'Ramo9.png': 'Composición premium con flores cuidadosamente seleccionadas para crear un impacto visual memorable.',
        'Ramo11.png': 'Ramo elegante que combina tradición y modernidad en un diseño floral único y distinguido.',
        'Ramo12.png': 'Arreglo exclusivo con flores de temporada premium, ideal para celebrar momentos inolvidables.',
        'Ramo13.png': 'Ramo sofisticado que transmite elegancia y refinamiento a través de cada flor cuidadosamente elegida.',
        'Ramo15.png': 'Composición floral de lujo que representa la máxima expresión del arte floral contemporáneo.'
    };

    // Productos de ramos clásicos
    const ramosClasicosProducts = [
        // Ramos Estilizados
        { filename: 'ramo-estilizado1.png', category: 'ramo-estilizado', name: 'Ramo Estilizado 1', description: 'Ramo estilizado con técnicas de arte floral contemporáneo que resalta la belleza natural mediante formas geométricas.' },
        { filename: 'ramo-estilizado2.png', category: 'ramo-estilizado', name: 'Ramo Estilizado 2', description: 'Diseño artístico que combina flores de diferentes texturas creando un efecto visual impactante y sofisticado.' },
        { filename: 'ramo-estilizado3.png', category: 'ramo-estilizado', name: 'Ramo Estilizado 3', description: 'Ramo con estilo moderno que incorpora elementos arquitectónicos en su composición floral única.' },
        { filename: 'ramo-estilizado4.png', category: 'ramo-estilizado', name: 'Ramo Estilizado 4', description: 'Creación estilizada que juega con alturas y volúmenes para lograr un equilibrio perfecto y elegante.' },
        { filename: 'ramo-estilizado5.png', category: 'ramo-estilizado', name: 'Ramo Estilizado 5', description: 'Ramo artístico con enfoque minimalista que destaca la pureza y simplicidad de cada flor seleccionada.' },
        
        // Ramos de Girasoles
        { filename: 'ramo-girasoles1.png', category: 'ramo-girasoles', name: 'Ramo de Girasoles 1', description: 'Ramo vibrante de girasoles frescos que irradia alegría y energía positiva en cada pétalo dorado.' },
        { filename: 'ramo-girasoles2.png', category: 'ramo-girasoles', name: 'Ramo de Girasoles 2', description: 'Composición solar de girasoles que transmite calidez, optimismo y la belleza radiante del verano.' },
        { filename: 'ramo-girasoles3.png', category: 'ramo-girasoles', name: 'Ramo de Girasoles 3', description: 'Ramo de girasoles con diseño natural que captura la esencia luminosa de estos símbolos de felicidad.' },
        
        // Ramos Mixtos
        { filename: 'ramo-mix1png.png', category: 'ramo-mix', name: 'Ramo Mixto 1', description: 'Ramo mixto que combina diferentes especies florales creando una sinfonía de colores y texturas naturales.' },
        { filename: 'ramo-mix2.png', category: 'ramo-mix', name: 'Ramo Mixto 2', description: 'Composición diversa que une flores complementarias para lograr un equilibrio perfecto de formas y tonos.' },
        { filename: 'ramo-mix3.png', category: 'ramo-mix', name: 'Ramo Mixto 3', description: 'Ramo mixto con selección cuidadosa de flores que se complementan en aroma, color y significado simbólico.' },
        
        // Ramos de Rosas
        { filename: 'ramo-rosas1.png', category: 'ramo-rosas', name: 'Ramo de Rosas 1', description: 'Ramo clásico de rosas elegantes que encarna la sofisticación y el romance en su forma más pura y tradicional.' },
        { filename: 'ramo-rosas2.png', category: 'ramo-rosas', name: 'Ramo de Rosas 2', description: 'Composición de rosas que combina diferentes tonalidades para crear un gradiente natural de belleza atemporal.' },
        { filename: 'ramo-rosas3.png', category: 'ramo-rosas', name: 'Ramo de Rosas 3', description: 'Ramo de rosas con arreglo tradicional que honra la historia y el simbolismo de la reina de las flores.' },
        
        // Ramos de Tulipanes
        { filename: 'ramo-tulipanes1.png', category: 'ramo-tulipanes', name: 'Ramo de Tulipanes 1', description: 'Ramo delicado de tulipanes que trae la frescura primaveral y la promesa de nuevos comienzos.' },
        { filename: 'ramo-tulipanes2.png', category: 'ramo-tulipanes', name: 'Ramo de Tulipanes 2', description: 'Composición de tulipanes que captura la elegancia sutil y la gracia natural de estas flores primaverales.' }
    ];
    
    // Generar productos de ramos elegantes
    const elegantesProducts = ramosElegantesImages.map((filename, index) => {
        const ramoNumber = filename.match(/Ramo(\d+)/)?.[1] || (index + 1);
        return {
            id: `ramo-elegante-${ramoNumber}`,
            name: `Ramo Premium ${ramoNumber}`,
            description: elegantesDescriptions[filename] || 'Ramo floral elegante para ocasiones especiales.',
            image: `${window.FLORERIA_CONFIG?.ASSETS?.RAMOS_ELEGANTES || './assets/ramosElegantes/'}${filename}`,
            category: 'ramos-elegantes',
            price: '',
            link: window.FLORERIA_CONFIG?.PAGES?.CATEGORIAS?.RAMOS_ELEGANTES || './categorias/ramosElegantes/'
        };
    });

    // Generar productos de ramos clásicos
    const clasicosProducts = ramosClasicosProducts.map((product, index) => {
        const categoryPath = {
            'ramo-estilizado': './assets/ramosClasicos/ramoEstilizado/',
            'ramo-girasoles': './assets/ramosClasicos/ramoGirasoles/',
            'ramo-mix': './assets/ramosClasicos/ramoMix/',
            'ramo-rosas': './assets/ramosClasicos/ramoRosas/',
            'ramo-tulipanes': './assets/ramosClasicos/ramoTulipanes/'
        };

        return {
            id: `ramo-clasico-${product.category}-${index + 1}`,
            name: product.name,
            description: product.description,
            image: `${categoryPath[product.category]}${product.filename}`,
            category: 'ramos-clasicos',
                price: '',
            link: './categorias/ramosClasicos/'
        };
    });

    // Combinar todos los productos
    const allProducts = [...elegantesProducts, ...clasicosProducts];
    
    // Mezclar el array para obtener orden aleatorio
    const shuffledProducts = [...allProducts].sort(() => Math.random() - 0.5);
    
    // Tomar solo la cantidad solicitada
    return shuffledProducts.slice(0, count);
}

// Determinar cuántos productos mostrar según el dispositivo
function getFavoriteProductsCount() {
    if (window.innerWidth <= 768) {
        // Mobile
        return 6;
    } else {
        // Desktop/tablet
        return 8;
    }
}

let favoriteProducts = generateRandomMixedProducts(getFavoriteProductsCount());

// Si el usuario cambia el tamaño de la ventana, actualizar productos favoritos
window.addEventListener('resize', () => {
    const newCount = getFavoriteProductsCount();
    // Solo actualizar si el número cambia
    if (favoriteProducts.length !== newCount) {
        favoriteProducts = generateRandomMixedProducts(newCount);
        // Volver a renderizar productos
        if (typeof ProductManager !== 'undefined') {
            new ProductManager({
                containerId: 'products-grid',
                products: favoriteProducts,
                globalActions: {
                    onQuickView: handleQuickView,
                    onContact: handleContactProduct
                },
                options: {
                    enableLazyLoading: true,
                    animationDelay: 100
                }
            });
        } else {
            renderProductsManual(favoriteProducts);
        }
    }
});

// ============================================
// INICIALIZACIÓN DE COMPONENTES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeCarousel();
    initializeCategoriesCarousel();
    initializeEventListeners();
});

/**
 * Inicializa la sección de productos favoritas
 */
function initializeProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.warn('Products grid container not found');
        return;
    }

    // Crear ProductManager si está disponible
    if (typeof ProductManager !== 'undefined') {
        const productManager = new ProductManager({
            containerId: 'products-grid',
            products: favoriteProducts,
            globalActions: {
                onQuickView: handleQuickView,
                onContact: handleContactProduct
            },
            options: {
                enableLazyLoading: true,
                animationDelay: 100
            }
        });
    } else {
        // Fallback: Renderizar productos manualmente si ProductManager no está disponible
        renderProductsManual(favoriteProducts);
    }
}

/**
 * Renderizado manual de productos (fallback)
 */
function renderProductsManual(products) {
    const container = document.getElementById('products-grid');
    
    if (!container) return;

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id);
        card.style.animationDelay = `${index * 50}ms`;
        
        // Placeholder image optimizado
        const placeholderColor = '#f0f0f0';
        const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='${placeholderColor}'/%3E%3C/svg%3E`;
        
        card.innerHTML = `
            <div class="product-image-wrapper">
                <div class="product-category-tag">${product.category.toUpperCase()}</div>
                <img src="${placeholderSVG}" 
                     data-src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image lazy-load" 
                     loading="lazy">
                <div class="product-overlay"></div>
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <!-- El bot\u00f3n se agrega din\u00e1micamente -->
                </div>
            </div>
        `;
        
        // Agregar event listeners
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                handleQuickView(product);
            }
        });
        
        container.appendChild(card);
    });
    
    // Inicializar lazy loading si está disponible
    if (typeof LazyLoader !== 'undefined') {
        LazyLoader.init();
    }
}

/**
 * Inicializa la funcionalidad del carrusel
 */
function initializeCarousel() {
    const grid = document.getElementById('products-grid');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!grid || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found');
        return;
    }

    const scrollAmount = 340; // Ancho de tarjeta + gap

    prevBtn.addEventListener('click', () => {
        grid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        updateCarouselButtons();
    });

    nextBtn.addEventListener('click', () => {
        grid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updateCarouselButtons();
    });

    // Actualizar botones al cargar
    updateCarouselButtons();

    // Actualizar botones al hacer scroll
    grid.addEventListener('scroll', updateCarouselButtons);

    // Actualizar botones al redimensionar ventana
    window.addEventListener('resize', updateCarouselButtons);
}

/**
 * Actualiza el estado de los botones del carrusel
 */
function updateCarouselButtons() {
    const grid = document.getElementById('products-grid');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!grid || !prevBtn || !nextBtn) return;

    // Desactivar botón anterior si está al inicio
    const isAtStart = grid.scrollLeft === 0;
    prevBtn.disabled = isAtStart;
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';

    // Desactivar botón siguiente si está al final
    const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10;
    nextBtn.disabled = isAtEnd;
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
}

/**
 * Inicializa la funcionalidad del carrusel de categorías
 */
function initializeCategoriesCarousel() {
    const grid = document.getElementById('categories-grid');
    const prevBtn = document.getElementById('categories-carousel-prev');
    const nextBtn = document.getElementById('categories-carousel-next');

    if (!grid || !prevBtn || !nextBtn) {
        console.warn('Categories carousel elements not found');
        return;
    }

    // Calcular el ancho de desplazamiento basado en el ancho de las tarjetas
    const getScrollAmount = () => {
        const card = grid.querySelector('.category-card');
        if (!card) return 300; // fallback
        
        const cardStyle = getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const gap = parseInt(cardStyle.marginRight) || 20;
        
        // En mobile mostrar 1 card completa, en desktop 2-3 cards
        const isMobile = window.innerWidth <= 768;
        return isMobile ? cardWidth + gap : (cardWidth + gap) * 2;
    };

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollAmount = getScrollAmount();
        grid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(() => updateCategoriesCarouselButtons(), 100);
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollAmount = getScrollAmount();
        grid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(() => updateCategoriesCarouselButtons(), 100);
    });

    // Actualizar botones al cargar
    setTimeout(() => updateCategoriesCarouselButtons(), 100);

    // Actualizar botones al hacer scroll
    grid.addEventListener('scroll', () => {
        setTimeout(() => updateCategoriesCarouselButtons(), 50);
    });

    // Actualizar botones al redimensionar ventana
    window.addEventListener('resize', () => {
        setTimeout(() => updateCategoriesCarouselButtons(), 100);
    });
}

/**
 * Actualiza el estado de los botones del carrusel de categorías
 */
function updateCategoriesCarouselButtons() {
    const grid = document.getElementById('categories-grid');
    const prevBtn = document.getElementById('categories-carousel-prev');
    const nextBtn = document.getElementById('categories-carousel-next');

    if (!grid || !prevBtn || !nextBtn) return;

    // Desactivar botón anterior si está al inicio
    const isAtStart = grid.scrollLeft <= 5; // pequeño margen de error
    prevBtn.disabled = isAtStart;
    prevBtn.style.opacity = isAtStart ? '0.5' : '1';
    prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

    // Desactivar botón siguiente si está al final
    const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10;
    nextBtn.disabled = isAtEnd;
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
}

/**
 * Maneja la vista rápida de un producto
 */
function handleQuickView(config, element) {
    // Si es un ramo elegante, redirigir a la galería
    if (config.category === 'ramos-elegantes' && config.link) {
        window.location.href = config.link;
        return;
    }
    
    // Para otros productos, mostrar modal de vista rápida
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    // Guardar el producto actual para navegación
    window.currentQuickViewProduct = config;
    window.currentQuickViewIndex = favoriteProducts.findIndex(p => p.id === config.id);

    // Llenar datos del modal
    updateQuickViewContent(config);

    // Actualizar botones de navegación
    updateQuickViewNavigation();

    // Mostrar modal
    modal.classList.add('active');
    modal.style.display = 'flex';
}

/**
 * Actualiza el contenido del modal de vista rápida
 */
function updateQuickViewContent(config) {
    document.getElementById('quick-view-image').src = config.image;
    document.getElementById('quick-view-title').textContent = config.name;
    document.getElementById('quick-view-description').textContent = config.description;
    document.getElementById('quick-view-category').textContent = config.category?.toUpperCase() || 'PRODUCTO';
    
    if (config.price) {
        document.getElementById('quick-view-price').textContent = config.price;
    }
}

/**
 * Actualiza los botones de navegación del modal
 */
function updateQuickViewNavigation() {
    const prevBtn = document.getElementById('quick-view-prev');
    const nextBtn = document.getElementById('quick-view-next');
    
    if (!prevBtn || !nextBtn) return;

    const currentIndex = window.currentQuickViewIndex || 0;
    
    // Actualizar botón anterior
    prevBtn.disabled = currentIndex <= 0;
    prevBtn.style.opacity = currentIndex <= 0 ? '0.4' : '1';
    
    // Actualizar botón siguiente
    nextBtn.disabled = currentIndex >= favoriteProducts.length - 1;
    nextBtn.style.opacity = currentIndex >= favoriteProducts.length - 1 ? '0.4' : '1';
}

/**
 * Navega al producto anterior en vista rápida
 */
function navigateQuickViewPrev() {
    const currentIndex = window.currentQuickViewIndex || 0;
    if (currentIndex > 0) {
        const prevProduct = favoriteProducts[currentIndex - 1];
        window.currentQuickViewProduct = prevProduct;
        window.currentQuickViewIndex = currentIndex - 1;
        updateQuickViewContent(prevProduct);
        updateQuickViewNavigation();
    }
}

/**
 * Navega al producto siguiente en vista rápida
 */
function navigateQuickViewNext() {
    const currentIndex = window.currentQuickViewIndex || 0;
    if (currentIndex < favoriteProducts.length - 1) {
        const nextProduct = favoriteProducts[currentIndex + 1];
        window.currentQuickViewProduct = nextProduct;
        window.currentQuickViewIndex = currentIndex + 1;
        updateQuickViewContent(nextProduct);
        updateQuickViewNavigation();
    }
}

/**
 * Maneja contacto de producto
 */
function handleContactProduct(productId) {
    const product = favoriteProducts.find(p => p.id === productId);
    if (!product) return;
    
    let message;
    if (product.category === 'ramos-elegantes') {
        message = `Hola, me interesa el ${product.name} de la galería de ramos elegantes. ¿Podrían darme más información sobre disponibilidad y precio?`;
    } else {
        message = `Hola, me interesa: ${product.name}`;
    }
    
    const whatsappMessage = encodeURIComponent(message);
    window.open(`https://wa.me/523335558928?text=${whatsappMessage}`, '_blank');
}

/**
 * Inicializa event listeners globales
 */
function initializeEventListeners() {
    // Cerrar modal de vista rápida
    const closeBtn = document.getElementById('quick-view-close');
    const modal = document.getElementById('quick-view-modal');
    const overlay = document.querySelector('.quick-view-overlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal?.classList.remove('active');
            modal && (modal.style.display = 'none');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            modal?.classList.remove('active');
            modal && (modal.style.display = 'none');
        });
    }

    // Navegación del modal de vista rápida
    const quickViewPrev = document.getElementById('quick-view-prev');
    const quickViewNext = document.getElementById('quick-view-next');
    const quickViewContact = document.getElementById('quick-view-contact');

    if (quickViewPrev) {
        quickViewPrev.addEventListener('click', navigateQuickViewPrev);
    }

    if (quickViewNext) {
        quickViewNext.addEventListener('click', navigateQuickViewNext);
    }

    // Botón de contacto en modal de vista rápida
    if (quickViewContact) {
        quickViewContact.addEventListener('click', () => {
            const currentProduct = window.currentQuickViewProduct;
            if (currentProduct) {
                handleContactProduct(currentProduct.id);
            }
        });
    }

    // Navegación con teclado en modal
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('quick-view-modal');
        if (!modal || !modal.classList.contains('active')) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigateQuickViewPrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateQuickViewNext();
                break;
            case 'Escape':
                e.preventDefault();
                modal.classList.remove('active');
                modal.style.display = 'none';
                break;
        }
    });

    // Botones del hero
    const heroPrimaryBtn = document.querySelector('.hero-buttons .btn-primary');
    const heroSecondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

    if (heroPrimaryBtn) {
        heroPrimaryBtn.addEventListener('click', () => {
            document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (heroSecondaryBtn) {
        heroSecondaryBtn.addEventListener('click', () => {
            window.open('https://wa.me/523335558928?text=Hola,%20me%20interesan%20sus%20flores', '_blank');
        });
    }

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
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

// Inicializar lazy loading si está disponible
if (typeof LazyLoader !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        LazyLoader.init();
    });
}
