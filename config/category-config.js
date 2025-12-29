/**
 * Configuración global consolidada para todas las categorías
 * Elimina la duplicación de archivos config.js individuales
 */

window.FLORERIA_GLOBAL_CONFIG = {
    // Rutas base para assets
    ASSETS_BASE_PATH: '../../assets/',
    
    // Configuración por categoría
    CATEGORIES: {
        ramosElegantes: {
            assetPath: 'ramosElegantes/',
            name: 'Ramos Elegantes'
        },
        ramosClasicos: {
            assetPath: 'ramosClasicos/',
            name: 'Ramos Clásicos',
            subcategories: {
                'ramo-estilizado': 'ramoEstilizado/',
                'ramo-girasoles': 'ramoGirasoles/',
                'ramo-mix': 'ramoMix/',
                'ramo-rosas': 'ramoRosas/',
                'ramo-tulipanes': 'ramoTulipanes/'
            }
        },
        bodasDeEnsueno: {
            assetPath: 'bodasDeEnsueno/',
            name: 'Bodas de Ensueño',
            subcategories: {
                'ramos-novia': 'ramosNovia/',
                'arreglos-centros': 'arreglosCentrosDeMesa/',
                'templo': 'templo/'
            }
        },
        celebracionesEspeciales: {
            assetPath: 'celebracionesEspeciales/',
            name: 'Celebraciones Especiales',
            subcategories: {
                'canastas-flores': 'canastasFlores/',
                'centros-mesa-festivos': 'centrosDeMesaFestivos/',
                'detalles-corazon': 'detallesEnFormaDeCorazon/'
            }
        },
        quinceanera: {
            assetPath: 'quinceanera-optimizada/',
            name: 'Quinceañera',
            subcategories: {
                'ramo-estilizado': 'ramoEstilizado/',
                'ramo-girasoles': 'ramoGirasoles/',
                'ramo-mix': 'ramoMix/',
                'ramo-rosas': 'ramoRosas/',
                'ramo-tulipanes': 'ramoTulipanes/'
            }
        },
        eventosReligiosos: {
            assetPath: 'eventosReligiosos/',
            name: 'Eventos Religiosos',
            subcategories: {
                'arreglo-templo': 'arregloDeTemplo/',
                'bautizo': 'bautizo/',
                'hermita': 'hermita/'
            }
        },
        galeriaFuneraria: {
            assetPath: 'galeriaFuneraria/',
            name: 'Galería Funeraria',
            subcategories: {
                'coronas': 'coronas/',
                'cruces': 'cruces/',
                'cubre-caja': 'cubreCaja/',
                'pie-caja-altar': 'pieCajaAltar/'
            }
        },
        cumpleanos: {
            assetPath: 'cumpleanos/',
            name: 'Cumpleaños'
        }
    },
    
    /**
     * Obtiene la ruta completa para una categoría
     */
    getAssetPath: function(category, subcategory = null) {
        const categoryConfig = this.CATEGORIES[category];
        if (!categoryConfig) return null;
        
        let path = this.ASSETS_BASE_PATH + categoryConfig.assetPath;
        
        if (subcategory && categoryConfig.subcategories) {
            path += categoryConfig.subcategories[subcategory] || '';
        }
        
        return path;
    },
    
    /**
     * Obtiene el nombre de una categoría
     */
    getCategoryName: function(category) {
        return this.CATEGORIES[category]?.name || category;
    }
};

// Compatibilidad con configuraciones existentes
window.RAMOS_ELEGANTES_CONFIG = {
    ROUTES: {
        ramosElegantes: window.FLORERIA_GLOBAL_CONFIG.getAssetPath('ramosElegantes')
    }
};

// Configuraciones adicionales para mantener compatibilidad
Object.keys(window.FLORERIA_GLOBAL_CONFIG.CATEGORIES).forEach(category => {
    const configName = category.toUpperCase() + '_CONFIG';
    window[configName] = {
        ROUTES: {
            [category]: window.FLORERIA_GLOBAL_CONFIG.getAssetPath(category)
        }
    };
});