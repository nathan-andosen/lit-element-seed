# Lit element seed - (WORK IN PROGRESS)

Seed app to build lit element web components.

## Todo:

* Create dev-server for development
  * (DONE) How will we test in IE11
  * (DONE) Needs to have source maps, for dev only??
* Intergrate unit & e2e tests
  * What frameworks to use??
* Create a umd & umd.min file
* Create an event decorator and listen decorator
  * https://github.com/kenchris/lit-element
  * https://github.com/mzeiher/ce-decorators#readme

# Features

* Typescript support
* Scss for styling
* Base64 encode font icons into the distributed file
* Components distributed as es6 modules
  * A single es5 umd bundle file is also built
* IE11 support
  * webcomponentsjs polyfills are required. _(refer to the ./index.html for a reference)_
* (TODO) Unit & e2e tests
* (TODO) Extra decorators to reduce repeated code & keep code clean
* (TODO) Dev server for easy development
  * Ability to use npm link while developing on your components. Useful when you want to see your changes in realtime in another application.

# Framework integrations

_Todo_

# Development

_Todo_

### Visual studio code setup

* Install the lit-html plugin

# Important notes

* ``@font-face`` can not be set in the __shadow-root__, you have to set that style in the head of the page. The status-alert component is doing this. Refer to this component for an example of how to accomplish this.
* Slots not supported if you do not use shadow dom. This is a known limitation of lit-elements / web components.

# Troubleshooting

### listen EADDRINUSE: address already in use :::35729

This means the node process was not terminated, follow the steps below to fix it.

* First, find the PID, type the command ``lsof -i tcp:35729``
* Then type ``kill -9 <pid>``