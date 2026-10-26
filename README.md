# BuscaPalabras

Aplicación web que cuenta y resalta todas las coincidencias literales de una palabra o carácter dentro de un texto. La búsqueda no distingue entre mayúsculas y minúsculas.

## Requisitos

- Node.js 22.15 o posterior
- npm

## Desarrollo

```bash
npm install
npm start
```

El servidor de desarrollo se inicia en `http://localhost:3000`.

## Compilación

```bash
npm run build
```

Los archivos listos para publicar se generan en `dist/`.

## Estructura

```text
.
├── babel.config.json
├── package.json
├── src/
│   ├── index.html
│   ├── index.js
│   └── styles.css
└── webpack.config.js
```

Webpack empaqueta la interfaz y Babel transpila JavaScript para navegadores actuales. Las coincidencias se insertan en el DOM como nodos de texto y elementos `<mark>`, evitando interpretar el texto ingresado como HTML.
