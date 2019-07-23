# Shopify + React (Portals)

## Requirements

- [Motfimate Toolbox](https://motifmate.com/)
- Node 10.x+

## Directory structure

```
theme/
react-src/
gulpfile.babel.js
package.json
```

## Install

1. If you already have a git repository with your theme pull it to your local machine, if not then create an empty repository with a _theme_ directory.
2. Add the Shopify store to Motifmate Toolbox, select which theme you're targeting,
3. In the _"..."_ menu within Motfimate Toolbox, select _folder_, then _connect_, then select the `theme` directory in your repository.
4. If you don't have your theme files yet, use Motfimate to download them.
5. Place the files from this repo to the root of your directory.
6. In Motifmate Toolbox with your store and theme selected, toggle the "Watch Files & Upload" and "Browsersync" options _on_. Then right click on the localhost URL that appears next to browsersync (starts with 127.0.0.1) and click "Copy Link".
7. Open the gulpfile.babel.js and replace the value of `vhost` with the link you copied.
8. At the bottom of your _theme.liquid_ file add the following code:

```
	{% comment %} TODO: Change this to `react-app.bundle.min.js` before going live {% endcomment %}
	<div id="react-root"></div>
	<script src="{{ 'react-app.bundle.js' | asset_url }}" async="async"></script>
```

9. Run `yarn start`

## Usage

`yarn start`

Starts the dev server to compile your react app and upload any theme or asset files to shopify.

`yarn build`

Generates minified version of your react bundle to use with your production site.
