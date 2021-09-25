# ArcGIS API for JavaScript Webpack template

This template is my starting point for any project that uses
* the [ArcGIS API for JavaScript](developers.arcgis.com/javascript/),
* Esri's [Calcite Web](https://esri.github.io/calcite-web/),
* [Webpack](https://webpack.js.org/)
* and is deployed with [GitHub Pages](https://pages.github.com/)

## Running locally

```sh
npm install
npm run start
```

## Deploy using gh-pages

First time, prepare `gh-pages` branch in `./dist` folder:
```sh
git checkout main
git worktree add dist gh-pages
```

```sh
npm run build
cd dist
git add .
git commit -am '🎉'
git push -u origin gh-pages
```
