# Lit element seed

_Work in progress - Not ready for use_

Seed app to build lit element web components.

__Useful links:__

* https://developers.google.com/web/fundamentals/web-components/

# Key Features

* __Typescript & Scss__
* __Inline font icons:__ Base64 encode font icons into the distributed file
* __ES6 distribution:__ Components distributed as es6 modules
  * A single es5 umd bundle is also built
* __IE11 support__
  * requires webcomponentsjs polyfills. _(refer to the ./src/index.html for a reference)_
* __Useful decorators:__ Extra decorators to reduce repeated code & keep code clean
* __Dev server:__ for easy development
  * Ability to use npm link while developing your components. Useful when you want to see your changes in realtime in another application.
* (IN PROGRESS) Unit & e2e tests

## Not supported

* Hot module reloading with the dev server
* Component lazy loading
  * Maybe an option: https://github.com/PolymerLabs/split-element
* Using slots when shadow dom is disabled _(see known issues below for more detail)_

# Getting started

Clone the repository:

```
git clone https://github.com/nathan-andosen/lit-element-seed.git my-component-name
```

Remove the git origin:

```
cd my-component-name
git remote rm origin
```

# Development

_More documentation required..._


``npm run dev`` - Run this command when developing your components. It will start a dev server at http://localhost:1350/ and watch for file changes.

### Visual studio code setup

* Install the lit-html plugin

## Distribution builds

``npm run build -- -v <version>`` - Creates a distribution build.

__-v__ - _(Optional)_ Either __patch__, __minor__ or __major__. Increases the version number in the package.json file.

# Framework integrations

_Todo_

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

# Troubleshooting

### listen EADDRINUSE: address already in use :::35729

This means the node process was not terminated, follow the steps below to fix it.

* First, find the PID, type the command ``lsof -i tcp:35729``
* Then type ``kill -9 <pid>``

# Todo:

* Intergrate unit & e2e tests
  * Improve unit test script
* Improve build and dev
  * Increase version number when building

# License

MIT