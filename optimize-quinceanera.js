#!/usr/bin/env node

/**
 * Optimize Images Script - Quinceañera Only
 * Optimizes only the quinceanera folder and creates quinceanera-optimizada
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

console.log('🌸 Optimizando imágenes de Quinceañera...\n');

const sourceDir = './assets/quinceanera';
const targetDir = './assets/quinceanera-optimizada';

// Verificar que la carpeta fuente existe
if (!fs.existsSync(sourceDir)) {
    console.error('❌ La carpeta assets/quinceanera no existe');
    process.exit(1);
}

// Crear carpeta de destino si no existe
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Creada carpeta:', targetDir);
}

// Función para procesar una imagen
async function processImage(inputPath, outputPath) {
    try {
        const stats = fs.statSync(inputPath);
        const inputSize = stats.size;

        // Optimizar PNG con sharp
        if (path.extname(inputPath).toLowerCase() === '.png') {
            await sharp(inputPath)
                .png({
                    quality: 90,
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    force: true
                })
                .toFile(outputPath);
        }
        // Optimizar JPG/JPEG
        else if (['.jpg', '.jpeg'].includes(path.extname(inputPath).toLowerCase())) {
            await sharp(inputPath)
                .jpeg({
                    quality: 85,
                    progressive: true,
                    force: true
                })
                .toFile(outputPath);
        }
        // Para otros formatos, simplemente copiar
        else {
            fs.copyFileSync(inputPath, outputPath);
        }

        // También crear versión WebP para mejor rendimiento
        const webpPath = outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        await sharp(inputPath)
            .webp({
                quality: 80,
                effort: 4
            })
            .toFile(webpPath);

        const outputStats = fs.statSync(outputPath);
        const outputSize = outputStats.size;
        const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

        console.log(`   ✅ ${path.basename(inputPath)} (${reduction}% reducción)`);
        
    } catch (error) {
        console.error(`   ❌ Error procesando ${inputPath}:`, error.message);
    }
}

// Función principal
async function optimizeQuinceaneraImages() {
    try {
        // Obtener todas las imágenes en la carpeta y subcarpetas
        const imagePattern = path.join(sourceDir, '**/*.{png,jpg,jpeg,PNG,JPG,JPEG}');
        const imagePaths = glob.sync(imagePattern);

        if (imagePaths.length === 0) {
            console.log('⚠️  No se encontraron imágenes para optimizar');
            return;
        }

        console.log(`🖼️  Encontradas ${imagePaths.length} imágenes para optimizar\n`);

        // Procesar cada imagen
        for (const imagePath of imagePaths) {
            // Calcular ruta de destino manteniendo estructura de carpetas
            const relativePath = path.relative(sourceDir, imagePath);
            const outputPath = path.join(targetDir, relativePath);
            
            // Crear directorio de destino si no existe
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
                console.log(`📁 Creada subcarpeta: ${path.relative('.', outputDir)}`);
            }

            await processImage(imagePath, outputPath);
        }

        console.log('\n🎉 Optimización completada!');
        console.log(`📁 Imágenes optimizadas guardadas en: ${targetDir}`);
        
        // Mostrar estructura final
        console.log('\n📋 Estructura creada:');
        const finalPattern = path.join(targetDir, '**/*');
        const finalPaths = glob.sync(finalPattern);
        finalPaths.forEach(filePath => {
            if (fs.statSync(filePath).isFile()) {
                console.log(`   📄 ${path.relative('.', filePath)}`);
            }
        });

    } catch (error) {
        console.error('❌ Error general:', error.message);
        process.exit(1);
    }
}

// Ejecutar optimización
optimizeQuinceaneraImages();