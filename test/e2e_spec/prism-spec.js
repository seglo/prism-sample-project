var http = require('http');

describe('prism sample project', function() {
  afterEach(function(done) {
    httpPost('/_prism/override/e2e/clear').then(function(res) {
      done();
    });
  });

  it('should populate name column of grid', function() {
    browser.get('http://localhost:9001/#/');

    var names = element.all(by.css('#usersGrid .col0 span'));

    expect(names.count()).toBe(3);

    // getText() returns a promise.  jasmine automatically resolves it in matchers
    expect(names.get(0).getText()).toEqual('john');
    expect(names.get(1).getText()).toEqual('genevieve');
    expect(names.get(2).getText()).toEqual('zach');
  });

  describe('retrieving authors grid', function() {

    it('should return 5 authors successfully', function() {
      browser.get('http://localhost:9001/#/');

      var names = element.all(by.css('#authorsGrid .col0 span'));

      expect(names.count()).toBe(5);
    });

    it('should show unauthorized user error message', function(done) {
      var override = JSON.stringify({
        "mock": {
          "requestUrl": "/api/authors",
          "contentType": "text/plain",
          "statusCode": 401,
          "data": "Unauthorized user."
        }
      });

      httpPost('/_prism/override/e2e/create', override)
      .then(function (res) {
        browser.get('http://localhost:9001/#/');
        return element.all(by.css('#authorsGridErrors div'));
      })
      .then(function (divs) {
        var errorMsg = divs[1];
        expect(errorMsg.isDisplayed(), true);
        expect(errorMsg.getText()).toBe('Unauthorized user.');

        // element() doesn't return a promise.. how come?  using element.all instead
        return element.all(by.css('#authorsGrid'));
      })
      .then(function(authorsGrid) {
        expect(authorsGrid[0].isDisplayed(), false);

        done();
      });
    });

    it('should show unauthorized user error message', function(done) {
      var override = JSON.stringify({
        "mock": {
          "requestUrl": "/api/authors",
          "contentType": "text/plain",
          "statusCode": 500,
          "data": "Unknown server error."
        }
      });

      httpPost('/_prism/override/e2e/create', override)
      .then(function (res) {
        browser.get('http://localhost:9001/#/');
        return element.all(by.css('#authorsGridErrors div'));
      })
      .then(function (divs) {
        var errorMsg = divs[1];
        expect(errorMsg.isDisplayed(), true);
        expect(errorMsg.getText()).toBe('Unknown server error.');

        // element() doesn't return a promise.. how come?  using element.all instead
        return element.all(by.css('#authorsGrid'));
      })
      .then(function(authorsGrid) {
        expect(authorsGrid[0].isDisplayed(), false);

        done();
      });
    });
  });
});

// why did i set request options agent: false ?

// by default all http requests are keep-alive so the underlying request socket
// isn't released immediately.  since we're making a lot of repetitive http
// requests to the same host:port:path we hit the default global agent socket
// pool connection limit of 5 pretty fast (require('http').globalAgent.maxSockets).
// turning off the agent lets us create new requests without this limitation.

// http://nodejs.org/api/http.html#http_class_http_agent

// similar problem on SO:
// http://stackoverflow.com/questions/15909884/sockets-dont-appear-to-be-closing-when-using-node-js-http-get

function httpPost(path, body) {
  var deferred = protractor.promise.defer();
  var options = {
    host: 'localhost',
    path: path,
    port: 9001,
    method: 'POST',
    agent: false
  };
  var cb = function(res) {
    deferred.fulfill(res);
  };
  var req;

  if (body) {
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    };
    req = http.request(options, cb);
    req.write(body);
  } else {
    req = http.request(options, cb);
  }
  req.end();
  return deferred.promise;
}