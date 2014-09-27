# prism-sample-project

> A sample project to demonstrate the use of the [grunt-connect-prism](http://github.com/seglo/grunt-connect-prism) and [connect-prism](http://github.com/seglo/connect-prism) core plugin for gulp.

## Getting started

This plugin requires Grunt `~0.4.1` or Gulp `~3.8.2` to already be installed

Once Grunt or gulp is installed you must also install all the project NPM dependencies by using the following command at the root of the project.

```shell
npm install
```

## Overview

The [connect-prism](http://github.com/seglo/connect-prism) core library and [grunt-connect-prism](http://github.com/seglo/grunt-connect-prism) plugin allows you to record, mock, and proxy HTTP calls.  This is a simple angular application with an express.js server backend that demonstrates their use.  

## Demonstrations

There are 3 ways to launch the application.

### Proxy mode

Launch the website, backend server, and setup prism to proxy to the backend by default.

```shell
grunt serve
gulp serve
``` 
or

```shell
grunt serve:proxy
gulp serve:proxy
````

### Record mode

Launch the website.  Create or overwrite mocks in the `./mocks/serve/` directory.  I've committed the mocks with this project, but to see record in action delete them or inspect the last modified dates on the files in the mocks directory to see that they have indeed been changed!

```shell
grunt serve:record
gulp serve:record
```

### Mock mode

Launch the website.  Mock all requests with serialized responses from the `./mocks/serve/` directory

```shell
grunt serve:mock
gulp serve:mock
```

## End to end (e2e) testing demonstration

> NOTE: I've only implemented a solution for e2e testing with the Grunt toolchain.  Feel free to submit a PR for a solution in gulp.

In order to demonstrate the end to end testing component of this project a few prequisites are required.  You must install protractor and the selenium server.  
For more details see the appendix in protractor's README on how to [setup and install the standalone selenium server for use with protractor](https://github.com/angular/protractor#appendix-a-setting-up-a-standalone-selenium-server).  Once installed run the server with the following.

```shell
webdriver-manager start
```

You can run the e2e test suite with the same 3 modes you ran the project in.  Ultimately, the purpose of this demonstration is to show how you can easily record the calls your application makes and then run your e2e test suite as a "client side e2e" test suite and mock out the server.  In many projects the server and all of its dependencies can incur a significant latency during test runs.  Using [grunt-connect-prism](http://github.com/seglo/grunt-connect-prism) can dramatically decrease the time it takes to run your tests.

### Mock mode

Run e2e test suite and read mocks from `./mocks/e2e/`.

```shell
grunt e2e
```
or
```shell
grunt e2e:mock
```

### Record mode

Run e2e test suite and record mocks to `./mocks/e2e/`.

```shell
grunt e2e:record
```

### Proxy mode

Run e2e test suite and proxy all HTTP requests to a real backend.

```shell
grunt e2e:proxy
```

## Changelog

* 0.0.7 Update to prism 0.7.3
* 0.0.6 Update to grunt-connect-prism 0.4.1
* 0.0.5 Update to grunt-connect-prism 0.4.0
* 0.0.4 Update to grunt-connect-prism 0.3.0
* 0.0.3 Support gulp implementation.  Added core connect-prism lib.
* 0.0.2 Update to grunt-connect-prism 0.2.2
* 0.0.1 Initial release