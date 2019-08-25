![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-96.67%25-brightgreen.svg)

# Lit element seed

:heavy_exclamation_mark: _Work in progress - Not ready for use_

Seed app to build lit element web components.

# Key Features

* __Web components__ built using [LitElement](https://lit-element.polymer-project.org/)
* __Typescript & Scss__
* __Inline font icons:__ Base64 encode font icons into the distributed file
* __ES6 distribution:__ Components distributed as es6 modules
  * A single es5 umd bundle is also built
  * Builds & bundles are done using [rollupjs](https://rollupjs.org/guide/en/)
* __IE11 support__
  * requires webcomponentsjs polyfills. _(refer to the [./src/index.html](src/index.html) for a reference)_
* __Useful decorators:__ Extra decorators to reduce repeated code & keep code clean
* __Dev server:__ for easy development
  * Ability to use npm link while developing your components. Useful when you want to see your changes in realtime in another application.
* __Unit & e2e tests__

### Not supported

* Hot module reloading with the dev server
* Component lazy loading
  * Maybe an option: https://github.com/PolymerLabs/split-element
* Using slots when shadow dom is disabled _(see known issues below for more detail)_

# Getting started

1. Clone the repository:

```
git clone https://github.com/nathan-andosen/lit-element-seed.git my-component-name
```

2. Remove the git origin:

```
cd my-component-name
git remote rm origin
```

3. Install dependencies:

```
npm install
```

# Framework integrations

_Todo_

# Development

_More documentation required..._


__``npm run dev``__ - Run this command when developing your components. It will start a dev server at http://localhost:1350/ and watch for file changes.

### Recommended dev setup

* [Visual Studio Code](https://code.visualstudio.com/) - great coding editor.
  * [lit-html plugin](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) - great plugin to work with lit-html

## Unit tests / e2e

> Checkout this __[helpful guide](spec/README.md)__ on writing unit & e2e tests.

__``npm run test``__ - Run unit tests.

* _Parameters:_
  * __-w__ _(optional)_ - Watch for file changes
  * __-b__ _(optional)_ - Run in a browser, default is headless chrome.
* _Examples:_
  * ``npm run test -- -w``
  * ``npm run test -- -w -b``

__``npm run e2e``__ - Run the end 2 end tests. (__IMPORTANT:__ You must have the dev server running, via the command: __``npm run dev``__)

> __Unit tests__ are done via [Karma](https://karma-runner.github.io/latest/index.html) & [Jasmine](https://jasmine.github.io/). We cant use Jest for unit tests as Jest runs in Node using jsdom, this setup does not support web components. To unit test web components, we have to do it in a real browser, that is why Karma & Jasmine was choosen.

> __E2e tests__ are done via [Jest](https://jestjs.io/) & [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer). Assertion library used for Puppeteer e2e testing is [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/packages/expect-puppeteer/README.md)

## Distribution builds

__``npm run build -- -v <version>``__ - Creates a distribution build.

* _Parameters:_
  * __-v__ (Optional) - Sets the semver. Either __patch__, __minor__ or __major__. Increases the version number in the package.json file.



# Known issues & Important notes

### font-face can not be set in the shadow root

``@font-face`` can not be set in the __shadow-root__, you have to set that style in the head of the page. The status-alert component is doing this. Refer to this component for an example of how to accomplish this.

### slots not supported if you do not use shadow dom

Slots not supported if you do not use shadow dom. The official specs state that light dom does not support slots, either does lit-element (https://github.com/Polymer/lit-element/issues/553)

Disable shadow root by adding this code to your component:

```javascript
@customElement('status-alert')
export class StatusAlertComponent extends LitElement {
  // Disable shadow dom. Not recommended.
  createRenderRoot() {
    return this;
  }
}
```

### IE11, global styles leak in to your custom elememt

In IE11, if you have a global style set, for example: ``p { font-style: italic; }`` it will leak into your custom element and style any p tags inside. I dont think there is any current solution for this, issue reported: [stackoverflow](https://stackoverflow.com/questions/57505188/lit-element-in-ie11-css-style-outside-custom-element-affects-style-inside), [github](https://github.com/Polymer/lit-element/issues/777).

### Source maps not generating for ES6 module build

Should be available once this [issue](https://github.com/rollup/rollup/issues/2847) is fixed.

For now, we use [rollup-plugin-rename-extensions](https://github.com/GiG/rollup-plugin-rename-extensions) to rename ts to js as we are using the _preserveModules_ config option in rollup, and this does not currently allow use to change file extensions.

# Links:

* [Web component fundamentals](https://developers.google.com/web/fundamentals/web-components/)

# Todo:

* [ ] Add in e2e tests
  * [ ] Add ability to use headless chrome
* [x] Add in unit tests
  * [x] Need to use rollup to compile the ts into js, as we are importing custom files like scss
  * [x] Setup watch for unit tests
  * [x] Add ability to use headless chrome
* [ ] Improve build and dev process
  * [ ] Increase version number when building
  * [ ] Add build process to readme docs
  * [ ] Possibly improve the way the components get consumed by other apps
* [ ] Add tslint

# License

MIT