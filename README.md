# Lit element seed - (WORK IN PROGRESS)

Seed app to build lit element web components.

## Todo:

* Improve build and dev
** Look at adding cache option to rollup
** Add banner
* Make the index.html be watched for changes. Also the build.js would be good.
* Lazy load components??
** Look at rollups code splitting, dynamic imports
* Intergrate unit & e2e tests
  * What frameworks to use??
* Create a umd & umd.min file


# Features

* Typescript support
* Scss for styling
* Base64 encode font icons into the distributed file
* Components distributed as es6 modules
  * A single es5 umd bundle file is also built
* IE11 support
  * webcomponentsjs polyfills are required. _(refer to the ./index.html for a reference)_
* Extra decorators to reduce repeated code & keep code clean
* Dev server for easy development
  * Ability to use npm link while developing your components. Useful when you want to see your changes in realtime in another application.
* (TODO) Unit & e2e tests

# Framework integrations

_Todo_

# Development

_More documentation required..._

## Getting started

```
git clone https://github.com/nathan-andosen/lit-element-seed.git my-component-name

cd my-component-name

git remote rm origin
```

``npm run dev`` - Run this command when developing your components. It will start a dev server and watch for file changes.

### Visual studio code setup

* Install the lit-html plugin

## Distribution builds

_Todo_

# Important notes

``@font-face`` can not be set in the __shadow-root__, you have to set that style in the head of the page. The status-alert component is doing this. Refer to this component for an example of how to accomplish this.

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