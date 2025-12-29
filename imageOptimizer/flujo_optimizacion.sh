#!/bin/zsh
# Script maestro para optimizar imágenes y actualizar la web
# Autor: Floreria Valeria
# Fecha: 2025-12-26

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 FLUJO COMPLETO DE OPTIMIZACIÓN - FLORERÍA VALERIA${NC}"
echo -e "====================================================="

# Función para mostrar ayuda
mostrar_ayuda() {
    echo -e "${BLUE}📖 USO:${NC}"
    echo -e "  ./flujo_optimizacion.sh [OPCIÓN]"
    echo -e ""
    echo -e "${BLUE}📋 OPCIONES:${NC}"
    echo -e "  --optimizar    Solo optimizar imágenes (no actualizar rutas)"
    echo -e "  --actualizar   Solo actualizar rutas (asume que ya tienes imágenes optimizadas)"
    echo -e "  --revertir     Revertir rutas a imágenes originales"
    echo -e "  --help         Mostrar esta ayuda"
    echo -e ""
    echo -e "${BLUE}💡 SIN OPCIONES:${NC} Ejecuta el flujo completo (optimizar + actualizar)"
    exit 0
}

# Función para verificar archivos necesarios
verificar_scripts() {
    local scripts=("optimizar_imagenes.sh" "actualizar_rutas_optimizadas.sh")
    
    for script in "${scripts[@]}"; do
        if [[ ! -f "$script" ]]; then
            echo -e "${RED}❌ Script no encontrado: $script${NC}"
            exit 1
        fi
        
        if [[ ! -x "$script" ]]; then
            echo -e "${YELLOW}⚠️  Haciendo ejecutable: $script${NC}"
            chmod +x "$script"
        fi
    done
    
    echo -e "${GREEN}✅ Scripts verificados${NC}"
}

# Función para optimizar imágenes
optimizar_imagenes() {
    echo -e "\n${BLUE}🎨 PASO 1: OPTIMIZAR IMÁGENES${NC}"
    echo -e "=============================="
    
    if ./optimizar_imagenes.sh; then
        echo -e "${GREEN}✅ Optimización completada exitosamente${NC}"
        return 0
    else
        echo -e "${RED}❌ Error en la optimización${NC}"
        return 1
    fi
}

# Función para actualizar rutas
actualizar_rutas() {
    echo -e "\n${BLUE}🔧 PASO 2: ACTUALIZAR RUTAS${NC}"
    echo -e "============================"
    
    if ./actualizar_rutas_optimizadas.sh; then
        echo -e "${GREEN}✅ Rutas actualizadas exitosamente${NC}"
        return 0
    else
        echo -e "${RED}❌ Error al actualizar rutas${NC}"
        return 1
    fi
}

# Función para revertir cambios
revertir_cambios() {
    echo -e "\n${BLUE}🔄 REVERTIR CAMBIOS${NC}"
    echo -e "==================="
    
    ./actualizar_rutas_optimizadas.sh --revert
}

# Función para mostrar estadísticas
mostrar_estadisticas() {
    echo -e "\n${BLUE}📊 ESTADÍSTICAS${NC}"
    echo -e "================"
    
    local carpetas_optimizadas=($(find assets -name "*-optimizada" -type d 2>/dev/null))
    
    if [[ ${#carpetas_optimizadas[@]} -eq 0 ]]; then
        echo -e "${YELLOW}⚠️  No se encontraron carpetas optimizadas${NC}"
        return
    fi
    
    echo -e "${GREEN}📁 Carpetas optimizadas encontradas:${NC}"
    for carpeta in "${carpetas_optimizadas[@]}"; do
        local png_count=$(find "$carpeta" -name "*.png" | wc -l)
        local webp_count=$(find "$carpeta" -name "*.webp" | wc -l)
        local jpg_count=$(find "$carpeta" -name "*.jpg" -o -name "*.jpeg" | wc -l)
        
        echo -e "  📂 $carpeta"
        echo -e "     🖼️  PNG: $png_count | WebP: $webp_count | JPG: $jpg_count"
    done
}

# Función principal
main() {
    case "$1" in
        "--help"|"-h")
            mostrar_ayuda
            ;;
        "--optimizar")
            verificar_scripts
            optimizar_imagenes
            mostrar_estadisticas
            ;;
        "--actualizar")
            verificar_scripts
            actualizar_rutas
            ;;
        "--revertir")
            verificar_scripts
            revertir_cambios
            ;;
        "")
            # Flujo completo SOLO optimiza imágenes, NO actualiza rutas
            verificar_scripts
            if optimizar_imagenes; then
                echo -e "\n${GREEN}🎉 ¡OPTIMIZACIÓN COMPLETADA!${NC}"
                echo -e "============================="
                echo -e "${BLUE}✨ Tus imágenes están optimizadas en las carpetas *-optimizada${NC}"
                echo -e "${YELLOW}📝 Si quieres actualizar rutas, ejecuta manualmente: ./actualizar_rutas_optimizadas.sh${NC}"
                mostrar_estadisticas
            else
                echo -e "\n${RED}❌ Error en optimización${NC}"
                echo -e "${YELLOW}💡 Verifica que tengas ImageMagick y pngquant instalados${NC}"
            fi
            ;;
        *)
            echo -e "${RED}❌ Opción no reconocida: $1${NC}"
            echo -e "${YELLOW}💡 Usa --help para ver opciones disponibles${NC}"
            exit 1
            ;;
    esac
}

# Ejecutar script principal
main "$@"