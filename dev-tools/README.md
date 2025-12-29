# 🛠️ Dev Tools - Florería Valeria

Esta carpeta contiene herramientas de desarrollo que no son necesarias para el funcionamiento del sitio web, pero son útiles durante el desarrollo.

## 📁 Contenido

- **`.eslintrc.json`** - Configuración de ESLint para linting de código JavaScript
- **`.prettierrc.json`** - Configuración de Prettier para formateo automático de código

## 🔧 Uso

### ESLint (Análisis de código)
```bash
# Analizar todos los archivos JS
npx eslint *.js components/**/*.js categorias/**/*.js utils/**/*.js

# Arreglar problemas automáticamente
npx eslint --fix *.js components/**/*.js
```

### Prettier (Formateo de código)
```bash
# Formatear todos los archivos
npx prettier --write *.js *.css components/ categorias/ utils/

# Solo verificar formato
npx prettier --check *.js *.css
```

## 📝 Notas

- Estas herramientas son **opcionales** para el funcionamiento del sitio
- Útiles para mantener calidad y consistencia del código
- Se pueden ejecutar desde el directorio raíz del proyecto
- No afectan el rendimiento del sitio web en producción