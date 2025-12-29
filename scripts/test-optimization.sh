#!/bin/bash

# Script de Prueba de Optimización para una carpeta específica
# Para probar el sistema antes del despliegue completo

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
QUALITY_MOBILE=70
QUALITY_TABLET=75
QUALITY_DESKTOP=85

# Tamaños por breakpoint
SMALL_SIZE="400x400"
MEDIUM_SIZE="600x600"
LARGE_SIZE="800x800"

# Función para optimizar una imagen
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    
    echo -e "${BLUE}🔄 Procesando: $filename${NC}"
    
    # Crear versiones JPG
    echo "  📐 Generando versiones JPG..."
    magick "$input_file" -strip -quality $QUALITY_MOBILE -resize "${SMALL_SIZE}>" "${output_dir}/${name_without_ext}_small_q${QUALITY_MOBILE}.jpg" 2>/dev/null || echo "⚠️ Error con small JPG"
    magick "$input_file" -strip -quality $QUALITY_TABLET -resize "${MEDIUM_SIZE}>" "${output_dir}/${name_without_ext}_medium_q${QUALITY_TABLET}.jpg" 2>/dev/null || echo "⚠️ Error con medium JPG"
    magick "$input_file" -strip -quality $QUALITY_DESKTOP -resize "${LARGE_SIZE}>" "${output_dir}/${name_without_ext}_large_q${QUALITY_DESKTOP}.jpg" 2>/dev/null || echo "⚠️ Error con large JPG"
    
    # Crear versiones WebP
    echo "  🌐 Generando versiones WebP..."
    cwebp -q $QUALITY_MOBILE "$input_file" -resize ${SMALL_SIZE/x/ } -o "${output_dir}/${name_without_ext}_small_q${QUALITY_MOBILE}.webp" 2>/dev/null || echo "⚠️ Error con small WebP"
    cwebp -q $QUALITY_TABLET "$input_file" -resize ${MEDIUM_SIZE/x/ } -o "${output_dir}/${name_without_ext}_medium_q${QUALITY_TABLET}.webp" 2>/dev/null || echo "⚠️ Error con medium WebP"
    cwebp -q $QUALITY_DESKTOP "$input_file" -resize ${LARGE_SIZE/x/ } -o "${output_dir}/${name_without_ext}_large_q${QUALITY_DESKTOP}.webp" 2>/dev/null || echo "⚠️ Error con large WebP"
    
    echo -e "${GREEN}  ✅ Completado: $filename${NC}"
}

# Función principal
main() {
    local target_folder="$1"
    
    if [ -z "$target_folder" ]; then
        echo -e "${RED}❌ Uso: $0 <carpeta_dentro_de_assets>${NC}"
        echo -e "${YELLOW}💡 Ejemplo: $0 landingPage${NC}"
        exit 1
    fi
    
    local full_path="./assets/$target_folder"
    
    if [ ! -d "$full_path" ]; then
        echo -e "${RED}❌ La carpeta '$full_path' no existe${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}🌸 Prueba de Optimización - Carpeta: $target_folder${NC}"
    
    # Crear directorio optimizado
    local opt_dir="${full_path}/optimized"
    mkdir -p "$opt_dir"
    echo -e "${GREEN}📁 Creado: $opt_dir${NC}"
    
    # Contar archivos
    local file_count=$(find "$full_path" -maxdepth 1 -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l | xargs)
    echo -e "${BLUE}📊 Encontrados $file_count archivos de imagen${NC}"
    
    if [ "$file_count" -eq 0 ]; then
        echo -e "${YELLOW}⚠️ No hay imágenes para procesar${NC}"
        exit 0
    fi
    
    # Procesar archivos
    local processed=0
    for file in "$full_path"/*.png "$full_path"/*.jpg "$full_path"/*.jpeg "$full_path"/*.PNG "$full_path"/*.JPG "$full_path"/*.JPEG; do
        [ -f "$file" ] || continue
        
        optimize_image "$file" "$opt_dir"
        ((processed++))
    done
    
    # Estadísticas
    local optimized_count=$(find "$opt_dir" -name "*.jpg" -o -name "*.webp" | wc -l | xargs)
    local original_size=$(du -sh "$full_path" | cut -f1)
    
    echo ""
    echo -e "${GREEN}🎉 ¡Prueba completada!${NC}"
    echo -e "${BLUE}📊 Resumen:${NC}"
    echo -e "  • Carpeta: $target_folder"
    echo -e "  • Imágenes originales: $processed"
    echo -e "  • Versiones optimizadas generadas: $optimized_count"
    echo -e "  • Tamaño original de la carpeta: $original_size"
    echo ""
    echo -e "${YELLOW}💡 Para ver las imágenes optimizadas:${NC}"
    echo -e "  ls -la \"$opt_dir\""
    echo ""
    echo -e "${GREEN}✨ Si todo funciona bien, ejecuta el script completo!${NC}"
}

# Ejecutar
main "$@"