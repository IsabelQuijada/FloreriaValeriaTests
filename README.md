# 🌸 Florería Valeria - Sitio Web

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/floreriavaleria/website)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Lighthouse](https://img.shields.io/badge/lighthouse-98%2F100-green.svg)](https://developers.google.com/web/tools/lighthouse/)

> Sitio web moderno y optimizado para Florería Valeria - Flores frescas para cada ocasión especial en Guadalajara, Jalisco.

## 🚀 Características

- **🎨 Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **⚡ Performance Optimizada**: Lazy loading, imágenes optimizadas, código minificado
- **�️ Optimización de Imágenes**: WebP/AVIF con fallback, múltiples tamaños, CDN
- **�🛠️ Componentes Modulares**: Arquitectura basada en componentes reutilizables
- **📱 PWA Ready**: Funciona offline y se puede instalar como app
- **🔍 SEO Optimizado**: Meta tags, structured data, sitemap
- **📊 Analytics Integrado**: Sistema de tracking personalizado
- **🚦 Error Handling**: Manejo robusto de errores y logging
- **🧪 Testing Suite**: Framework de testing personalizado
- **🔧 Configuración Centralizada**: Sistema de configuración global

## 📁 Estructura del Proyecto

```
floreria-valeria-website/
├── assets/                          # Recursos multimedia
│   ├── landingPage/                 # Imágenes de la página principal
│   ├── ramosElegantes/              # Galería ramos elegantes
│   ├── ramosClasicos/               # Galería ramos clásicos
│   ├── bodasDeEnsueno/              # Galería bodas
│   ├── celebracionesEspeciales/     # Galería celebraciones
│   ├── cumpleanos/                  # Galería cumpleaños
│   ├── eventosReligiosos/           # Galería eventos religiosos
│   └── galeriaFuneraria/            # Galería funeraria
├── categorias/                      # Páginas de categorías
│   ├── bodasDeEnsueno/
│   ├── celebracionesEspeciales/
│   ├── cumpleanos/
│   ├── eventosReligiosos/
│   ├── galeriaFuneraria/
│   ├── ramosClasicos/
│   └── ramosElegantes/
├── components/                      # Componentes reutilizables
│   ├── LazyLoader.js               # Sistema de lazy loading
│   ├── ProductManager.js           # Gestor de productos
│   └── ProductCard/                # Tarjeta de producto
│       ├── ProductCard.js
│       └── ProductCard.css
├── config/                         # Configuraciones
│   └── global-config.js           # Configuración global
├── utils/                          # Utilidades
│   ├── error-handler.js           # Manejo de errores
│   ├── analytics.js               # Sistema de analytics
│   ├── test-suite.js              # Framework de testing
│   ├── image-optimizer.js         # Optimización de imágenes
│   ├── image-worker.js            # Worker de procesamiento
│   └── lazy-loader-enhanced.js    # LazyLoader mejorado
├── scripts/                        # Scripts de build
│   ├── optimize-images.js         # Optimizador de imágenes (Node.js)
│   └── optimize-images.mjs        # Optimizador avanzado (ES modules)
├── contacto/                       # Página de contacto
├── nosotros/                       # Página nosotros
├── index.html                      # Página principal
├── script.js                       # Script principal
├── styles.css                      # Estilos principales
├── package.json                    # Dependencias del proyecto
├── .eslintrc.json                 # Configuración ESLint
├── .prettierrc.json               # Configuración Prettier
└── README.md                      # Esta documentación
```

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js 16+ 
- NPM o Yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/floreriavaleria/website.git
cd website

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con live reload

# Build y Optimización
npm run build        # Construye la versión optimizada
npm run optimize-images      # Optimiza imágenes con Sharp
npm run optimize-images-advanced  # Versión avanzada con AVIF
npm run minify-css   # Minifica CSS
npm run minify-js    # Minifica JavaScript

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier

# Testing
npm test            # Ejecuta tests personalizados
npm run test-images # Prueba optimización de imágenes
```

## 📸 Optimización de Imágenes

El sistema incluye optimización avanzada de imágenes con:
- **WebP/AVIF** con fallback automático a JPEG/PNG
- **Múltiples tamaños** responsivos (thumbnail, small, medium, large, xlarge)
- **CDN configurable** (Cloudinary, ImageKit, custom)
- **Lazy loading mejorado** con detección de formato
- **Service Worker** para cache inteligente

📖 **Ver documentación completa**: [IMAGE_OPTIMIZATION_README.md](IMAGE_OPTIMIZATION_README.md)

### Uso Rápido
```javascript
// Optimizar imagen existente
const optimized = optimizeImage('./assets/ramo.jpg', { size: 'medium' });

// Crear elemento picture responsivo
const picture = createOptimizedPicture('./assets/ramo.jpg', {
    sizes: ['small', 'medium', 'large']
});
```

## 🏗️ Arquitectura

### Componentes Principales

#### ProductManager
```javascript
// Maneja la renderización y gestión de productos
const productManager = new ProductManager({
    containerId: 'products-grid',
    products: favoriteProducts,
    globalActions: {
        onQuickView: handleQuickView,
        onContact: handleContactProduct
    }
});
```

#### LazyLoader  
```javascript
// Sistema de lazy loading optimizado
const lazyLoader = new LazyLoader({
    rootMargin: '50px',
    threshold: 0.1,
    fadeDuration: 300
});
```

#### ProductCard
```javascript
// Tarjetas de producto reutilizables
const card = new ProductCard({
    id: 'product-1',
    name: 'Ramo Elegante',
    image: './assets/ramo.jpg',
    onQuickView: handleQuickView
});
```

### Sistema de Configuración

```javascript
// Configuración centralizada en window.FLORERIA_CONFIG
window.FLORERIA_CONFIG = {
    CONTACT: {
        WHATSAPP: '523335558928',
        PHONE_1: '3751197812'
    },
    ASSETS: {
        BASE_URL: './assets/',
        RAMOS_ELEGANTES: './assets/ramosElegantes/'
    }
};
```

### Sistema de Optimización de Imágenes
```javascript
// Optimización automática con múltiples formatos
const optimizedUrl = optimizeImage('./assets/ramo.jpg', {
    size: 'medium',
    format: 'webp',
    quality: 85
});

// Picture element responsivo con fallbacks
const pictureElement = createOptimizedPicture('./assets/ramo.jpg', {
    alt: 'Ramo elegante',
    sizes: ['small', 'medium', 'large'],
    lazy: true
});
```

### Error Handling

```javascript
// Sistema robusto de manejo de errores
Logger.error('Error message', { context: 'additional info' });
Logger.warn('Warning message');
Logger.info('Info message');
```

### Analytics

```javascript
// Tracking de eventos personalizados
trackEvent('product_view', { productId: 'ramo-1' });
trackProduct('contact', { name: 'Ramo Elegante' });
```

## 📱 PWA (Progressive Web App)

El sitio está preparado para funcionar como PWA:

- **Service Worker**: Cache inteligente de recursos
- **Web App Manifest**: Permite instalación en dispositivos
- **Offline Support**: Funcionalidad básica sin conexión
- **Push Notifications**: Ready para notificaciones

## 🎨 Personalización

### Colores y Temas

Modificar variables CSS en `styles.css`:

```css
:root {
    --primary-color: #a02a8e;
    --secondary-color: #f8f9fa;
    --accent-color: #28a745;
    --text-color: #333;
}
```

### Configuración de Contacto

Actualizar en `config/global-config.js`:

```javascript
CONTACT: {
    PHONE_1: 'tu-telefono-1',
    PHONE_2: 'tu-telefono-2', 
    WHATSAPP: 'tu-numero-whatsapp',
    EMAIL: 'tu-email@dominio.com'
}
```

## 🚀 Optimización y Performance

### Imágenes
- **Formato WebP**: Mejor compresión
- **Lazy Loading**: Carga bajo demanda
- **Responsive Images**: Tamaños adaptativos

### JavaScript
- **Code Splitting**: Carga modular
- **Tree Shaking**: Elimina código no usado  
- **Compression**: Minificación y compresión

### CSS
- **Critical CSS**: Inline de estilos críticos
- **CSS Modules**: Estilos scoped por componente
- **Autoprefixer**: Compatibilidad cross-browser

## 🔍 SEO

### Meta Tags Optimizados
```html
<title>Florería Valeria - Flores Frescas para Cada Ocasión</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
```

### Structured Data
- **Schema.org**: Markup de florería local
- **Open Graph**: Compartir en redes sociales
- **Twitter Cards**: Previews optimizadas

### Sitemap y Robots.txt
- Sitemap XML automático
- Robots.txt optimizado para SEO

## 📊 Analytics y Métricas

### Eventos Trackeados
- **Page Views**: Vistas de página
- **Product Interactions**: Interacciones con productos  
- **WhatsApp Clicks**: Clicks en WhatsApp
- **Conversion Events**: Eventos de conversión
- **Performance Metrics**: Métricas de rendimiento

### Dashboards
- Google Analytics 4 compatible
- Métricas personalizadas
- Informes de conversión

## 🧪 Testing

### Framework Personalizado
```javascript
// Tests automáticos integrados
describe('Componentes Básicos', () => {
    it('LazyLoader debe estar disponible', () => {
        expect(typeof LazyLoader).toBe('function');
    });
});
```

### Testing Manual
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive**: Mobile, tablet, desktop
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Lighthouse scores 90+

## 🚢 Despliegue

### Build de Producción

```bash
npm run build
```

### Hosting Recomendado
- **Netlify**: Deploy automático desde Git
- **Vercel**: Optimización automática
- **GitHub Pages**: Deploy gratuito
- **Hosting Tradicional**: Apache/Nginx

### Variables de Entorno
```bash
# .env
ANALYTICS_ID=tu-analytics-id
CONTACT_EMAIL=tu-email
WHATSAPP_NUMBER=tu-numero
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código

- **ESLint**: Linting automático
- **Prettier**: Formateo consistente
- **JSDoc**: Documentación de funciones
- **Semantic Commits**: Commits semánticos

## 📝 Changelog

### v1.0.0 (2024-12-26)
- ✨ Lanzamiento inicial
- 🎨 Diseño responsivo completo
- ⚡ Sistema de lazy loading
- 📱 Funcionalidad PWA básica
- 🔧 Sistema de configuración global
- 🧪 Framework de testing integrado

## 📞 Soporte

- **Email**: soporte@floreriavaleria.com
- **WhatsApp**: [33 3555 8928](https://wa.me/523335558928)
- **Issues**: [GitHub Issues](https://github.com/floreriavaleria/website/issues)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Hecho con 💖 para Florería Valeria**

*Transformando momentos especiales en recuerdos únicos a través de flores frescas y arreglos florales excepcionales.*