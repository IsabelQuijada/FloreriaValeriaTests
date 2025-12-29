#!/bin/zsh
# Script avanzado para optimizar imágenes PNG/JPG y generar WebP para todas las categorías
# Autor: Floreria Valeria
# Fecha: 2025-12-26

# Explicación:
# Este script procesa todas las imágenes en las carpetas de assets.
# Genera versiones optimizadas en PNG/JPG y WebP manteniendo la estructura de carpetas.
# Las imágenes originales NO se sobrescriben.

# Configuración
BASE_ASSETS="../assets"
SUFIJO_OPTIMIZADA="-optimizada"
MAX_WIDTH=1200
PNG_QUALITY="65-80"
JPG_QUALITY=85
WEBP_QUALITY=80

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar dependencias
verificar_dependencias() {
    echo -e "${BLUE}🔧 Verificando dependencias...${NC}"
    
    if ! command -v magick &> /dev/null; then
        echo -e "${RED}❌ ImageMagick (magick) no está instalado.${NC}"
        echo "Instala con: brew install imagemagick"
        exit 1
    fi
    
    if ! command -v pngquant &> /dev/null; then
        echo -e "${RED}❌ pngquant no está instalado.${NC}"
        echo "Instala con: brew install pngquant"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Dependencias verificadas${NC}"
}

# Función para optimizar una imagen
optimizar_imagen() {
    local archivo="$1"
    local carpeta_destino="$2"
    local nombre_base=$(basename "$archivo" | sed 's/\.[^.]*$//')
    local extension="${archivo##*.}"
    local extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
    
    # Crear carpeta destino si no existe
    mkdir -p "$carpeta_destino"
    
    # Archivos temporales
    local temp_img="$carpeta_destino/temp_$nombre_base.$extension"
    local png_final="$carpeta_destino/$nombre_base.png"
    local jpg_final="$carpeta_destino/$nombre_base.jpg"
    local webp_final="$carpeta_destino/$nombre_base.webp"
    
    echo -e "${YELLOW}📸 Procesando: $(basename "$archivo")${NC}"
    
    # Paso 1: Redimensionar y limpiar metadatos
    if [[ "$extension_lower" == "png" ]]; then
        # Para PNG: mantener transparencia
        magick "$archivo" -resize ${MAX_WIDTH}x -strip PNG32:"$temp_img"
        
        # Optimizar PNG con pngquant
        if pngquant --quality=$PNG_QUALITY --output "$png_final" --force "$temp_img" 2>/dev/null; then
            echo -e "  ${GREEN}✅ PNG optimizado${NC}"
        else
            # Si pngquant falla, usar la imagen temporal como backup
            cp "$temp_img" "$png_final"
            echo -e "  ${YELLOW}⚠️  PNG optimizado (fallback)${NC}"
        fi
    else
        # Para JPG: optimizar calidad
        magick "$archivo" -resize ${MAX_WIDTH}x -strip -quality $JPG_QUALITY "$jpg_final"
        echo -e "  ${GREEN}✅ JPG optimizado${NC}"
    fi
    
    # Paso 2: Generar WebP (más eficiente para web)
    magick "$archivo" -resize ${MAX_WIDTH}x -strip -quality $WEBP_QUALITY "$webp_final"
    echo -e "  ${GREEN}✅ WebP generado${NC}"
    
    # Limpiar archivos temporales
    [[ -f "$temp_img" ]] && rm "$temp_img"
    
    # Mostrar estadísticas de tamaño
    local size_original=$(du -h "$archivo" | cut -f1)
    local size_webp=$(du -h "$webp_final" | cut -f1)
    echo -e "  📊 Original: $size_original → WebP: $size_webp"
}

# Función principal
procesar_categoria() {
    local categoria="$1"
    local origen="$BASE_ASSETS/$categoria"
    local destino="$BASE_ASSETS/$categoria$SUFIJO_OPTIMIZADA"
    
    if [[ ! -d "$origen" ]]; then
        echo -e "${RED}❌ Carpeta no encontrada: $origen${NC}"
        return 1
    fi
    
    echo -e "\n${BLUE}🚀 Procesando categoría: $categoria${NC}"
    echo -e "   📁 Origen: $origen"
    echo -e "   📁 Destino: $destino"
    
    # Contar archivos para mostrar progreso
    local total_archivos=$(find "$origen" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | wc -l)
    local contador=0
    
    if [[ $total_archivos -eq 0 ]]; then
        echo -e "${YELLOW}⚠️  No se encontraron imágenes en $categoria${NC}"
        return 0
    fi
    
    echo -e "   🔢 Total de imágenes: $total_archivos"
    
    # Procesar cada imagen
    find "$origen" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | while read -r archivo; do
        contador=$((contador + 1))
        
        # Obtener ruta relativa para mantener estructura
        ruta_relativa="${archivo#$origen/}"
        carpeta_destino="$destino/$(dirname "$ruta_relativa")"
        
        echo -e "\n${BLUE}[$contador/$total_archivos]${NC}"
        optimizar_imagen "$archivo" "$carpeta_destino"
    done
    
    echo -e "${GREEN}✅ Categoría $categoria completada${NC}"
}

# Script principal
main() {
    echo -e "${BLUE}🎨 OPTIMIZADOR DE IMÁGENES - FLORERÍA VALERIA${NC}"
    echo -e "================================================"
    
    # Verificar dependencias
    verificar_dependencias
    
    # Lista de categorías a procesar (excluyendo landingPage por ser diferente)
    local categorias=(
        "bodasDeEnsueno"
        "celebracionesEspeciales" 
        "cumpleanos"
        "eventosReligiosos"
        "galeriaFuneraria"
        "quinceanera"
        "ramosClasicos"
        "ramosElegantes"
    )
    
    echo -e "\n${BLUE}📋 Categorías a procesar:${NC}"
    for categoria in "${categorias[@]}"; do
        echo -e "   • $categoria"
    done
    
    # Procesar cada categoría
    for categoria in "${categorias[@]}"; do
        procesar_categoria "$categoria"
    done
    
    echo -e "\n${GREEN}🎉 ¡OPTIMIZACIÓN COMPLETADA!${NC}"
    echo -e "================================================"
    echo -e "${YELLOW}📝 PRÓXIMOS PASOS:${NC}"
    echo -e "1. Verifica las carpetas *-optimizada en assets/"
    echo -e "2. Actualiza las rutas en tu código para usar las imágenes optimizadas"
    echo -e "3. Considera usar las versiones WebP para mejor rendimiento"
    echo -e "\n${BLUE}💡 CONSEJO:${NC} Las imágenes WebP son ~30% más pequeñas que PNG/JPG"
}

# Ejecutar script principal
main "$@"