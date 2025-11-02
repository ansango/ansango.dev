#!/bin/bash

# test-obsidian-export.sh
# Script para probar la conversión de Obsidian Export en local

set -e  # Salir si hay errores

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Test de Obsidian Export ===${NC}\n"

# Variables de configuración
CONTENT_DIR="src/content"
ASSETS_DIR="public/assets"  # Ubicación actual de assets
OBSIDIAN_VERSION="v22.11.0"
OBSIDIAN_BINARY="obsidian-export_Linux-x86_64.bin"

# Directorios de trabajo
WORK_DIR="obsidian_test"
INPUT_DIR="${WORK_DIR}/input"
OUTPUT_DIR="${WORK_DIR}/output"

# Limpiar directorios de prueba anteriores
if [ -d "$WORK_DIR" ]; then
    echo -e "${YELLOW}⚠️  Limpiando pruebas anteriores...${NC}"
    rm -rf "$WORK_DIR"
fi

# Crear estructura de directorios
echo -e "${GREEN}📁 Creando estructura de directorios...${NC}"
mkdir -p "$INPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copiar contenido al directorio de input
echo -e "${GREEN}📝 Copiando contenido para prueba...${NC}"
if [ -d "$CONTENT_DIR" ]; then
    cp -r "$CONTENT_DIR" "$INPUT_DIR/"
    echo -e "   ✓ Copiado: $CONTENT_DIR"
else
    echo -e "${RED}❌ Error: No existe $CONTENT_DIR${NC}"
    exit 1
fi

# Copiar assets desde public/assets si existe
if [ -d "$ASSETS_DIR" ]; then
    mkdir -p "$INPUT_DIR/assets"
    cp -r "$ASSETS_DIR"/* "$INPUT_DIR/assets/"
    echo -e "   ✓ Copiado: $ASSETS_DIR → $INPUT_DIR/assets"
else
    echo -e "${YELLOW}⚠️  Advertencia: No existe $ASSETS_DIR${NC}"
fi

# Descargar obsidian-export si no existe
if [ ! -f "$OBSIDIAN_BINARY" ]; then
    echo -e "\n${GREEN}📥 Descargando obsidian-export ${OBSIDIAN_VERSION}...${NC}"
    wget -q --show-progress "https://github.com/zoni/obsidian-export/releases/download/${OBSIDIAN_VERSION}/${OBSIDIAN_BINARY}"
    chmod +x "$OBSIDIAN_BINARY"
    echo -e "   ✓ Descargado y ejecutable"
else
    echo -e "\n${GREEN}✓ obsidian-export ya existe${NC}"
fi

# Ejecutar la conversión
echo -e "\n${GREEN}🔄 Ejecutando conversión de Obsidian...${NC}"
echo -e "${YELLOW}Comando: ./${OBSIDIAN_BINARY} ${INPUT_DIR} ${OUTPUT_DIR}${NC}\n"

if ./"$OBSIDIAN_BINARY" "$INPUT_DIR" "$OUTPUT_DIR"; then
    echo -e "\n${GREEN}✅ Conversión completada con éxito!${NC}\n"
else
    echo -e "\n${RED}❌ Error en la conversión${NC}\n"
    exit 1
fi

# Mostrar resultados
echo -e "${GREEN}📊 Resultados de la conversión:${NC}\n"

echo -e "${YELLOW}=== Estructura ORIGINAL ===${NC}"
if command -v tree &> /dev/null; then
    tree -L 3 "$INPUT_DIR"
else
    find "$INPUT_DIR" -type f | head -20
fi

echo -e "\n${YELLOW}=== Estructura CONVERTIDA ===${NC}"
if command -v tree &> /dev/null; then
    tree -L 3 "$OUTPUT_DIR"
else
    find "$OUTPUT_DIR" -type f | head -20
fi

# Verificar ubicación de assets
echo -e "\n${GREEN}📁 Verificación de assets:${NC}"
if [ -d "$OUTPUT_DIR/assets" ]; then
    echo -e "${GREEN}✓ Carpeta assets encontrada en: ${YELLOW}$OUTPUT_DIR/assets${NC}"
    ASSETS_COUNT=$(find "$OUTPUT_DIR/assets" -type f | wc -l)
    echo -e "  Archivos en assets: $ASSETS_COUNT"
    echo -e "\n${GREEN}Archivos en assets:${NC}"
    ls -lh "$OUTPUT_DIR/assets" | head -10
else
    echo -e "${YELLOW}⚠️  No se encontró carpeta assets en el output${NC}"
    echo -e "${YELLOW}   Esto puede ser normal si no hay imágenes referenciadas${NC}"
fi

# Comparar un archivo de ejemplo
echo -e "\n${GREEN}📄 Comparación de archivos (ejemplo):${NC}\n"

EXAMPLE_FILE=$(find "$INPUT_DIR/content" -name "*.md" -type f | head -1)
if [ -n "$EXAMPLE_FILE" ]; then
    RELATIVE_PATH=${EXAMPLE_FILE#$INPUT_DIR/}
    CONVERTED_FILE="$OUTPUT_DIR/$RELATIVE_PATH"
    
    echo -e "${YELLOW}Archivo original: $EXAMPLE_FILE${NC}"
    echo -e "Primeras 15 líneas:"
    head -15 "$EXAMPLE_FILE"
    
    if [ -f "$CONVERTED_FILE" ]; then
        echo -e "\n${YELLOW}Archivo convertido: $CONVERTED_FILE${NC}"
        echo -e "Primeras 15 líneas:"
        head -15 "$CONVERTED_FILE"
    else
        echo -e "${RED}⚠️  No se encontró el archivo convertido${NC}"
    fi
fi

# Estadísticas
echo -e "\n${GREEN}📈 Estadísticas:${NC}"
ORIGINAL_COUNT=$(find "$INPUT_DIR" -name "*.md" -type f | wc -l)
CONVERTED_COUNT=$(find "$OUTPUT_DIR" -name "*.md" -type f | wc -l)
echo -e "   Archivos .md originales: $ORIGINAL_COUNT"
echo -e "   Archivos .md convertidos: $CONVERTED_COUNT"

# Simular el reemplazo que haría la pipeline
echo -e "\n${GREEN}🔄 Simulando reemplazo de la pipeline:${NC}"
echo -e "${YELLOW}Esto es lo que haría la GitHub Action:${NC}"
echo -e "   1. rm -rf src/content"
echo -e "   2. rm -rf src/assets"
echo -e "   3. cp -r ${OUTPUT_DIR}/content ./src/"
echo -e "   4. cp -r ${OUTPUT_DIR}/assets ./src/ (si existe)"

# Instrucciones finales
echo -e "\n${GREEN}🎯 Próximos pasos:${NC}"
echo -e "   1. Revisa los archivos en: ${YELLOW}${OUTPUT_DIR}${NC}"
echo -e "   2. Verifica que assets esté en: ${YELLOW}${OUTPUT_DIR}/assets${NC}"
echo -e "   3. Compara con los originales en: ${YELLOW}${INPUT_DIR}${NC}"
echo -e "   4. Si todo está bien, la pipeline lo aplicará automáticamente"
echo -e "\n${YELLOW}💡 Comandos útiles:${NC}"
echo -e "   - Ver assets: ${YELLOW}ls -la ${OUTPUT_DIR}/assets 2>/dev/null || echo 'No hay assets'${NC}"
echo -e "   - Ver diferencias: ${YELLOW}diff -r ${INPUT_DIR}/content ${OUTPUT_DIR}/content${NC}"
echo -e "   - Limpiar prueba: ${YELLOW}rm -rf ${WORK_DIR}${NC}"
echo -e "   - Limpiar binary: ${YELLOW}rm ${OBSIDIAN_BINARY}${NC}"

echo -e "\n${GREEN}✨ Test completado!${NC}\n"