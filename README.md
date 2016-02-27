# Click To Jump[Chrome Extension]

## Install

* Install Gulp CLI `npm i gulp-cli -g`.
* Install NPM Dependencies `npm i --save`.
* Install Bower `npm i bower -g`.
* Install Bower Dependencies `bower i --save`.

## Intro

This package use to create an Chrome Extension.
Extract current page url parameter, then create new tab with them.

* Source code in `src` folder.
* **CRX**, **ZIP** file and `update.xml` will be build in `dist` folder.
* **CRX** file for local test or enterprise deployment.
* **ZIP** file for publish to dashboard.
* **update.xml** use for enterprise deploy update.

## Build CRX file

* Run the `gulp pack` command.

## Cautions

* You need to test the crx file before release to dashboard.
* Never change the `private.pem` file.
* Dont package the `private.pem` in extensions.
* Before you release, remember to update version.
* Modify the gulp task `pack` to change `codebase` value direct to your git, like `https://raw.githubusercontent.com/{yourname}/elf/master/dist/elf.crx`

## Useful

* [Node.js API](https://nodejs.org/api/)
* [NPM](https://www.npmjs.com/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)
* [Dashboard](https://chrome.google.com/webstore/developer/dashboard)
* [Extensions](https://chrome.google.com/webstore/category/extensions)
* [Develop Extensions](https://developer.chrome.com/extensions)
* [Distribute Extensions](https://developer.chrome.com/extensions/hosting)

## Contributors
* sunyf1@ifeng.com