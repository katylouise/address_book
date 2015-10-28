# Address Book

Simple address book application built using Angular and tested with Karma and Protractor.  A user can view, add, edit and delete contacts.

# Getting Started

```
npm install
bower install
http-server
```
Go to localhost:8080/index.html

# Running tests

To run karma tests:

```
npm test
```

To run protractor tests:

```
http-server
```

```
webdriver-manager start
```

```
protractor test/e2e/conf.js
```

I am still working on the testing of the app.  I have been having difficulties with testing all the http requests in karma.  Additionally, with protractor, I have been having issues with protractor being unable to find certain elements on the page.  This might be to do with using ng-show and hide?  I need to investigate this further.