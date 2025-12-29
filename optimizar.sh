#!/bin/zsh
# Script de acceso rápido para ejecutar la optimización de imágenes
# Autor: Floreria Valeria
# Fecha: 2025-12-26

# Colores para output
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Ejecutando optimización desde imageOptimizer/${NC}"
echo "================================================="

# Cambiar al directorio del optimizador y ejecutar
cd "$(dirname "$0")/imageOptimizer" && ./flujo_optimizacion.sh "$@"