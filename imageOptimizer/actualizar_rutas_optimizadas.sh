#!/bin/zsh
# Script para actualizar rutas en config.js para usar imágenes optimizadas
# Autor: Floreria Valeria
# Fecha: 2025-12-26

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 ACTUALIZADOR DE RUTAS - FLORERÍA VALERIA${NC}"
echo -e "=============================================="

# Lista de categorías
categorias=(
    "bodasDeEnsueno"
    "celebracionesEspeciales"
    "cumpleanos" 
    "eventosReligiosos"
    "galeriaFuneraria"
    "ramosClasicos"
    "ramosElegantes"
)

# Función para actualizar config de una categoría
actualizar_config() {
    local categoria="$1"
    local config_file="../FloreriaValeriaWebsite/categorias/$categoria/config.js"
    
    if [[ ! -f "$config_file" ]]; then
        echo -e "${RED}❌ Config no encontrado: $config_file${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}📝 Actualizando: $config_file${NC}"
    
    # Crear backup
    cp "$config_file" "$config_file.backup"
    
    # Actualizar rutas para usar versiones optimizadas
    case "$categoria" in
        "ramosClasicos")
            sed -i '' "s|../../assets/ramosClasicos/|../../assets/ramosClasicos-optimizada/|g" "$config_file"
            ;;
        "ramosElegantes")
            sed -i '' "s|../../assets/ramosElegantes/|../../assets/ramosElegantes-optimizada/|g" "$config_file"
            ;;
        "bodasDeEnsueno")
            sed -i '' "s|../../assets/bodasDeEnsueno/|../../assets/bodasDeEnsueno-optimizada/|g" "$config_file"
            ;;
        "celebracionesEspeciales")
            sed -i '' "s|../../assets/celebracionesEspeciales/|../../assets/celebracionesEspeciales-optimizada/|g" "$config_file"
            ;;
        "cumpleanos")
            sed -i '' "s|../../assets/cumpleanos/|../../assets/cumpleanos-optimizada/|g" "$config_file"
            ;;
        "eventosReligiosos")
            sed -i '' "s|../../assets/eventosReligiosos/|../../assets/eventosReligiosos-optimizada/|g" "$config_file"
            ;;
        "galeriaFuneraria")
            sed -i '' "s|../../assets/galeriaFuneraria/|../../assets/galeriaFuneraria-optimizada/|g" "$config_file"
            ;;
    esac
    
    echo -e "  ${GREEN}✅ Rutas actualizadas${NC}"
    echo -e "  📁 Backup guardado: $config_file.backup"
}

# Función para revertir cambios
revertir_cambios() {
    echo -e "\n${YELLOW}🔄 ¿Quieres revertir los cambios? (y/N):${NC}"
    read respuesta
    
    if [[ "$respuesta" =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}🔄 Revirtiendo cambios...${NC}"
        
        for categoria in "${categorias[@]}"; do
            local config_file="categorias/$categoria/config.js"
            local backup_file="$config_file.backup"
            
            if [[ -f "$backup_file" ]]; then
                mv "$backup_file" "$config_file"
                echo -e "  ${GREEN}✅ Revertido: $categoria${NC}"
            fi
        done
        
        echo -e "${GREEN}✅ Cambios revertidos${NC}"
    else
        echo -e "${BLUE}📁 Los backups se mantienen en *.backup${NC}"
    fi
}

# Función principal
main() {
    if [[ "$1" == "--revert" ]]; then
        revertir_cambios
        exit 0
    fi
    
    echo -e "\n${BLUE}📋 Actualizando rutas en config.js de cada categoría...${NC}"
    
    # Actualizar cada categoría
    for categoria in "${categorias[@]}"; do
        actualizar_config "$categoria"
    done
    
    echo -e "\n${GREEN}🎉 ¡RUTAS ACTUALIZADAS!${NC}"
    echo -e "=============================================="
    echo -e "${YELLOW}📝 CAMBIOS REALIZADOS:${NC}"
    echo -e "• Las rutas ahora apuntan a carpetas *-optimizada"
    echo -e "• Se crearon backups de todos los config.js"
    echo -e "• Tu web ahora usará las imágenes optimizadas"
    echo -e "\n${BLUE}💡 COMANDOS ÚTILES:${NC}"
    echo -e "• Para revertir: ./actualizar_rutas_optimizadas.sh --revert"
    echo -e "• Para limpiar backups: rm categorias/*/config.js.backup"
    echo -e "\n${YELLOW}⚠️  IMPORTANTE:${NC} Prueba tu web para asegurarte que todo funciona correctamente"
    
    revertir_cambios
}

# Ejecutar script principal
main "$@"