![Test Coverage-shield-badge-1](https://img.shields.io/badge/Test%20Coverage-96.67%25-brightgreen.svg)

# Lit element seed

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
* __Unit & E2e tests__
  * Include test coverage for unit tests
  * Karma & Jasmine for unit tests. Jest & Puppeteer for e2e tests.

### Not supported

* Hot module reloading with the dev server
* Component lazy loading
  * Maybe an option: https://github.com/PolymerLabs/split-element
  * https://github.com/PolymerLabs/start-lit-element
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

4. Change the package name in the _package.json_ file.

# App & Framework integrations

#### Install the package

```bash
npm install <package-name> --save
```

#### Importing the components

_Change the lit-element-seed name to your package name._

```typescript
// import all components
import 'lit-element-seed';

// import individual components
import 'lit-element-seed/components/status-alert';
```

### Angular Integration

1. Include the __CUSTOM_ELEMENTS_SCHEMA__ into your AppModule
2. Import your components as mentioned above.

#### Access your components via ViewChild

```typescript
import { StatusAlertComponent } from 'lit-element-seed';

@ViewChild('statusAlert', { static: false })
statusAlert: ElementRef<StatusAlertComponent>;

this.statusAlert.nativeElement.footerMessage = 'Changed message!!!';
```

### Vue

_Todo_

### React

_Todo_

### Javascript: Using the UMD build

> View the [alert.html](src/pages/alert.html) for an example

```html
<!-- If you need to support older browsers like IE11 -->
<script src="webcomponentsjs/custom-elements-es5-adapter.js"></script>
<script src="webcomponentsjs/webcomponents-loader.js"></script>

<!-- Include the umd file in your html file -->
<script src="lit-element-seed.umd.js"></script>
```

# Development

> __Important:__ All code should be placed in _/src/components/_, expect for declaration files and html pages used for development.

> All the scripts files to run the builds, unit tests and e2e tests can be found in the /scripts directory.

### __``npm run dev``__

Run this command when developing your components. It will start a dev server at http://localhost:1350/ and watch for file changes.

#### Recommended dev setup

* [Visual Studio Code](https://code.visualstudio.com/) - great coding editor.
  * [lit-html plugin](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) - great plugin to work with lit-html

## Unit tests / e2e

> Checkout these __[helpful tips](spec/README.md)__ on writing unit & e2e tests.

### ``npm run test``

Run unit tests.

* _Parameters:_
  * __-w__ _(optional)_ - Watch for file changes
  * __-b__ _(optional)_ - Run in a browser, _[Default=headless chrome]_
* _Examples:_
  * ``npm run test``
  * ``npm run test -- -w``
  * ``npm run test -- -w -b``

### ``npm run e2e``

Run end 2 end tests.

* __IMPORTANT:__ Dev server must be running, via the command: __``npm run dev``__
* _Parameters:_
  * __-h__ _(optional)_ - Headless _[Default=false]_
  * __-s__ _(optional)_ - Slow Mo. Slow down the pupeteer e2e tests by the specified amount of milliseconds.
* _Examples:_
  * ``npm run e2e``
  * ``npm run e2e -- -h``
  * ``npm run e2e -- -s 300``

> __Unit tests__ are done via [Karma](https://karma-runner.github.io/latest/index.html) & [Jasmine](https://jasmine.github.io/). We cant use Jest for unit tests as Jest runs in Node using jsdom, this setup does not support web components. To unit test web components, we have to do it in a real browser, that is why Karma & Jasmine was choosen.

> __E2e tests__ are done via [Jest](https://jestjs.io/) & [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer). Assertion library used for Puppeteer e2e testing is [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/packages/expect-puppeteer/README.md)

## Distribution builds

> The script files to run the builds can be found in the /scripts/build directory. This includes the rollupjs configs.

### ``npm run build -- -v <version>``

Creates a distribution build.

* _Parameters:_
  * __-v__ (Optional) - Sets the semver. Either __patch__, __minor__ or __major__. Increases the version number in the package.json file.



# Known issues & Important notes

### font-face can not be set in the shadow root

``@font-face`` can not be set in the __shadow-root__, you have to set that style in the head of the page. The status-alert component is doing this. Refer to this component for an example of how to accomplish this.

Check: https://robdodson.me/at-font-face-doesnt-work-in-shadow-dom/

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

### error TS1086: An accessor cannot be declared in an ambient context.

In this repo we use typescript version 3.4.5, the reason for this is to avoid the _accessor cannot be declared_ error. Typescript 3.7.x has the ability to add get accessors into ambient files, however, if you are using something like Angular 8 to consume your web component, you will get this error.

# Links:

* [Web component fundamentals](https://developers.google.com/web/fundamentals/web-components/)
* https://open-wc.org/

# Todo:

* [x] Add in e2e tests
  * [x] Add some e2e tests and helpful tips on writing tests
  * [x] Add ability to use headless chrome as parameter (npm run e2e -- -headless)
  * [x] Add ability to set slowmo as a parameter (npm run e2e -- -slowmo 300)
* [x] Add in unit tests
  * [x] Need to use rollup to compile the ts into js, as we are importing custom files like scss
  * [x] Setup watch for unit tests
  * [x] Add ability to use headless chrome
* [ ] Improve build and dev process
  * [x] Possibly improve the way the components get consumed by other apps
  * [x] Increase version number when building
  * [x] Add build process to readme docs
  * [x] Clean up build files. Add readme docs in scripts folder with detailed documentation on the scripts
  * [ ] Add umd min build that does not include third party deps like lit-element
* [x] Add tslint
* [ ] Add example of how to override shadow dom styles, like this: https://github.com/Polymer/lit-element/issues/845

# License

MIT
