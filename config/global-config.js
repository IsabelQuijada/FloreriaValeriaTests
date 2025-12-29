/**
 * Configuración global del sitio de Florería Valeria
 * 
 * Este archivo centraliza todas las configuraciones y constantes
 * utilizadas a lo largo del sitio web.
 */

window.FLORERIA_CONFIG = {
    // Información de contacto
    CONTACT: {
        PHONE_1: '3751197812',
        PHONE_2: '3322023270',
        WHATSAPP: '523335558928',
        EMAIL: 'info@floreriavaleria.com',
        ADDRESS: 'Guadalajara, Jalisco, México'
    },

    // URLs base para assets
    ASSETS: {
        BASE_URL: './assets/',
        LANDING_PAGE: './assets/landingPage/',
        RAMOS_ELEGANTES: './assets/ramosElegantes/',
        RAMOS_CLASICOS: './assets/ramosClasicos/',
        BODAS_DE_ENSUENO: './assets/bodasDeEnsueno/',
        CELEBRACIONES_ESPECIALES: './assets/celebracionesEspeciales/',
        CUMPLEANOS: './assets/cumpleanos/',
        EVENTOS_RELIGIOSOS: './assets/eventosReligiosos/',
        GALERIA_FUNERARIA: './assets/galeriaFuneraria/'
    },

    // Configuración de componentes
    COMPONENTS: {
        LAZY_LOADING: {
            ROOT_MARGIN: '50px',
            THRESHOLD: 0.1,
            FADE_DURATION: 300
        },
        PRODUCT_MANAGER: {
            ANIMATION_DELAY: 100,
            GRID_GAP: 20,
            CARD_MIN_WIDTH: 300,
            CARD_MAX_WIDTH: 400
        },
        CAROUSEL: {
            SCROLL_AMOUNT: 340,
            ANIMATION_DURATION: 300
        }
    },

    // Configuración optimizada de imágenes
    IMAGES: {
        LAZY_LOADING: {
            enabled: true,
            rootMargin: '50px',
            threshold: 0.1
        },
        QUALITY: 85,
        PLACEHOLDER_COLOR: '#f0f0f0',
        PRELOAD_CRITICAL: true,
        CRITICAL_IMAGES: 3
    },

    // URLs de páginas
    PAGES: {
        HOME: './',
        NOSOTROS: './nosotros/nosotros.html',
        CONTACTO: './contacto/',
        CATEGORIAS: {
            RAMOS_ELEGANTES: './categorias/ramosElegantes/',
            RAMOS_CLASICOS: './categorias/ramosClasicos/',
            BODAS_DE_ENSUENO: './categorias/bodasDeEnsueno/',
            CELEBRACIONES_ESPECIALES: './categorias/celebracionesEspeciales/',
            CUMPLEANOS: './categorias/cumpleanos/',
            EVENTOS_RELIGIOSOS: './categorias/eventosReligiosos/',
            GALERIA_FUNERARIA: './categorias/galeriaFuneraria/'
        }
    },

    // Mensajes de WhatsApp predeterminados
    WHATSAPP_MESSAGES: {
        GENERAL: 'Hola, me interesan sus flores y servicios florales',
        CONTACT_REQUEST: 'Hola, me gustaría obtener más información sobre sus servicios',
        QUOTE_REQUEST: 'Hola, me gustaría solicitar una cotización para'
    },

    // Configuración SEO
    SEO: {
        SITE_NAME: 'Florería Valeria',
        DESCRIPTION: 'Flores frescas y arreglos florales únicos para cada ocasión especial en Guadalajara',
        KEYWORDS: 'florería, flores, arreglos florales, ramos, bodas, guadalajara, flores frescas',
        OG_IMAGE: './assets/landingPage/og-image.jpg'
    },

    // Configuración de animaciones
    ANIMATIONS: {
        FADE_IN_DURATION: 300,
        SLIDE_DURATION: 400,
        BOUNCE_DURATION: 600,
        STAGGER_DELAY: 100
    },

    // Breakpoints responsivos
    BREAKPOINTS: {
        MOBILE: 480,
        TABLET: 768,
        DESKTOP: 1024,
        LARGE_DESKTOP: 1440
    }
};

// Utilidad simplificada para generar mensajes de WhatsApp
window.FLORERIA_UTILS = {
    generateWhatsAppURL: (message, phone = window.FLORERIA_CONFIG.CONTACT.WHATSAPP) => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phone}?text=${encodedMessage}`;
    },

    generateProductWhatsAppMessage: (productName, category) => {
        return `Hola, me interesa el ${productName} de la categoría ${category}. ¿Podrían darme más información sobre disponibilidad y precio?`;
    },

    isMobile: () => window.innerWidth <= window.FLORERIA_CONFIG.BREAKPOINTS.MOBILE,
    isTablet: () => window.innerWidth <= window.FLORERIA_CONFIG.BREAKPOINTS.TABLET,
    isDesktop: () => window.innerWidth > window.FLORERIA_CONFIG.BREAKPOINTS.TABLET
};

// Inicialización de utilidades globales
document.addEventListener('DOMContentLoaded', () => {
    console.log('Florería Valeria - Configuración cargada:', window.FLORERIA_CONFIG);
});