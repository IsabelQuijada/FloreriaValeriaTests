#!/bin/bash

# Script de Optimización Automática de Imágenes para Florería Valeria
# Genera múltiples versiones optimizadas para diferentes dispositivos

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
ASSETS_DIR="./assets"
OPTIMIZED_DIR="optimized"
QUALITY_MOBILE=70
QUALITY_TABLET=75
QUALITY_DESKTOP=85

# Tamaños por breakpoint
SMALL_SIZE="400x400"
MEDIUM_SIZE="600x600"
LARGE_SIZE="800x800"
XLARGE_SIZE="1200x1200"

# Verificar dependencias
check_dependencies() {
    echo -e "${BLUE}🔍 Verificando dependencias...${NC}"
    
    if ! command -v magick &> /dev/null; then
        echo -e "${RED}❌ ImageMagick no está instalado${NC}"
        echo -e "${YELLOW}💡 Instalar con: brew install imagemagick${NC}"
        exit 1
    fi
    
    if ! command -v cwebp &> /dev/null; then
        echo -e "${YELLOW}⚠️ WebP tools no encontradas, instalando...${NC}"
        brew install webp || {
            echo -e "${RED}❌ Error instalando WebP tools${NC}"
            exit 1
        }
    fi
    
    echo -e "${GREEN}✅ Todas las dependencias están disponibles${NC}"
}

# Crear directorio optimizado
create_optimized_dir() {
    local source_dir="$1"
    local opt_dir="${source_dir}/${OPTIMIZED_DIR}"
    
    if [ ! -d "$opt_dir" ]; then
        mkdir -p "$opt_dir"
        echo -e "${GREEN}📁 Creado: $opt_dir${NC}"
    fi
}

# Optimizar una imagen individual
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    
    echo -e "${BLUE}🔄 Procesando: $filename${NC}"
    
    # Generar versiones JPG
    magick "$input_file" -strip -quality $QUALITY_MOBILE -resize "${SMALL_SIZE}>" "${output_dir}/${name_without_ext}_small_q${QUALITY_MOBILE}.jpg" 2>/dev/null || echo "⚠️ Error con small JPG"
    magick "$input_file" -strip -quality $QUALITY_TABLET -resize "${MEDIUM_SIZE}>" "${output_dir}/${name_without_ext}_medium_q${QUALITY_TABLET}.jpg" 2>/dev/null || echo "⚠️ Error con medium JPG"
    magick "$input_file" -strip -quality $QUALITY_DESKTOP -resize "${LARGE_SIZE}>" "${output_dir}/${name_without_ext}_large_q${QUALITY_DESKTOP}.jpg" 2>/dev/null || echo "⚠️ Error con large JPG"
    
    # Generar versiones WebP
    cwebp -q $QUALITY_MOBILE "$input_file" -resize $SMALL_SIZE -o "${output_dir}/${name_without_ext}_small_q${QUALITY_MOBILE}.webp" 2>/dev/null || echo "⚠️ Error con small WebP"
    cwebp -q $QUALITY_TABLET "$input_file" -resize $MEDIUM_SIZE -o "${output_dir}/${name_without_ext}_medium_q${QUALITY_TABLET}.webp" 2>/dev/null || echo "⚠️ Error con medium WebP"
    cwebp -q $QUALITY_DESKTOP "$input_file" -resize $LARGE_SIZE -o "${output_dir}/${name_without_ext}_large_q${QUALITY_DESKTOP}.webp" 2>/dev/null || echo "⚠️ Error con large WebP"
}

# Procesar carpeta
process_folder() {
    local folder="$1"
    local processed=0
    local errors=0
    
    echo -e "${YELLOW}📂 Procesando carpeta: $folder${NC}"
    
    # Crear directorio optimizado
    create_optimized_dir "$folder"
    local opt_dir="${folder}/${OPTIMIZED_DIR}"
    
    # Procesar archivos
    for file in "$folder"/*.png "$folder"/*.jpg "$folder"/*.jpeg "$folder"/*.PNG "$folder"/*.JPG "$folder"/*.JPEG; do
        [ -f "$file" ] || continue
        
        if optimize_image "$file" "$opt_dir"; then
            ((processed++))
        else
            ((errors++))
        fi
    done
    
    echo -e "${GREEN}✅ Carpeta $folder completada: $processed procesadas, $errors errores${NC}"
}

# Función principal
main() {
    echo -e "${GREEN}🌸 Iniciando optimización de imágenes - Florería Valeria${NC}"
    echo -e "${BLUE}📊 Configuración:${NC}"
    echo -e "  • Mobile: ${SMALL_SIZE} @ ${QUALITY_MOBILE}%"
    echo -e "  • Tablet: ${MEDIUM_SIZE} @ ${QUALITY_TABLET}%"
    echo -e "  • Desktop: ${LARGE_SIZE} @ ${QUALITY_DESKTOP}%"
    echo ""
    
    # Verificar dependencias
    check_dependencies
    
    # Verificar si existe el directorio assets
    if [ ! -d "$ASSETS_DIR" ]; then
        echo -e "${RED}❌ Directorio $ASSETS_DIR no encontrado${NC}"
        exit 1
    fi
    
    # Obtener estadísticas iniciales
    initial_size=$(du -sh "$ASSETS_DIR" | cut -f1)
    initial_count=$(find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l | xargs)
    
    echo -e "${BLUE}📈 Estado inicial: $initial_count imágenes, $initial_size${NC}"
    echo ""
    
    # Procesar cada subcarpeta
    local total_folders=0
    for subfolder in "$ASSETS_DIR"/*; do
        if [ -d "$subfolder" ] && [ ! "$(basename "$subfolder")" = "$OPTIMIZED_DIR" ]; then
            process_folder "$subfolder"
            ((total_folders++))
        fi
    done
    
    # Estadísticas finales
    echo ""
    echo -e "${GREEN}🎉 ¡Optimización completada!${NC}"
    echo -e "${BLUE}📊 Resumen:${NC}"
    echo -e "  • Carpetas procesadas: $total_folders"
    echo -e "  • Imágenes originales: $initial_count"
    
    # Contar nuevas imágenes optimizadas
    optimized_count=$(find "$ASSETS_DIR" -path "*/optimized/*" -name "*.jpg" -o -path "*/optimized/*" -name "*.webp" | wc -l | xargs)
    echo -e "  • Imágenes optimizadas generadas: $optimized_count"
    
    # Tamaño final
    final_size=$(du -sh "$ASSETS_DIR" | cut -f1)
    echo -e "  • Tamaño después de optimización: $final_size"
    
    echo ""
    echo -e "${YELLOW}💡 Próximos pasos:${NC}"
    echo -e "  1. Integrar ResponsiveImageLoader.js en tu sitio"
    echo -e "  2. Configurar el servidor para servir archivos WebP"
    echo -e "  3. Verificar que las imágenes se cargan correctamente"
    echo ""
    echo -e "${GREEN}✨ ¡Listo para mejorar la velocidad de tu sitio!${NC}"
}

# Ejecutar si es llamado directamente
if [ "${BASH_SOURCE[0]}" -ef "$0" ]; then
    main "$@"
fi