# How to build the icon font

* Use the [icomoon app](https://icomoon.io/app/#/select) to generate your font files
  * You can import the _./icomoon/selection.json_ file in the app to reload the currently selected icons.
* Download the generated files and add them to the directory _/src/components/{component-name}/assets/icomoon_ folder
* Now you will have to update the _./icon-font/icon-classes.scss_ file. Basically copy all the css from the file _./icomoon/style.css_ (expect the @font-face code).
