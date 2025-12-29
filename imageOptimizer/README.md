# 🎨 Image Optimizer - Florería Valeria

Esta carpeta contiene todos los scripts para optimizar las imágenes del sitio web de Florería Valeria.

## 📁 Archivos incluidos

- **`optimizar_imagenes.sh`** - Script principal que optimiza todas las imágenes
- **`flujo_optimizacion.sh`** - Script maestro que coordina todo el proceso
- **`actualizar_rutas_optimizadas.sh`** - Script para actualizar rutas a imágenes optimizadas

## 🚀 Cómo usar

### Desde el directorio del proyecto:
```bash
# Optimizar todas las imágenes (recomendado)
./optimizar.sh

# Ver opciones disponibles
./optimizar.sh --help
```

### Directamente desde esta carpeta:
```bash
cd imageOptimizer

# Flujo completo de optimización
./flujo_optimizacion.sh

# Solo optimizar imágenes
./flujo_optimizacion.sh --optimizar

# Solo actualizar rutas
./flujo_optimizacion.sh --actualizar

# Revertir cambios
./flujo_optimizacion.sh --revertir
```

## ✨ Lo que hace

1. **Optimiza imágenes PNG/JPG** - Reduce el tamaño manteniendo la calidad
2. **Genera versiones WebP** - Formato moderno más eficiente
3. **Mantiene estructura de carpetas** - Organización intacta
4. **Crea carpetas *-optimizada** - Sin sobreescribir originales

## 📊 Beneficios

- **Velocidad**: Imágenes 30-60% más pequeñas
- **SEO**: Mejor puntuación en PageSpeed Insights
- **Experiencia**: Carga más rápida en móviles
- **Automático**: Una sola ejecución procesa todo

## ⚙️ Requisitos

- ImageMagick (`brew install imagemagick`)
- pngquant (`brew install pngquant`)

## 📝 Notas

- Las imágenes originales **NO se modifican**
- Se crean backups automáticos de configuraciones
- Todos los cambios son **reversibles**