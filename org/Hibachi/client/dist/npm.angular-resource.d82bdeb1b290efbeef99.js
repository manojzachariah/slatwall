(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.angular-resource"],{

/***/ "G17k":
/*!***************************************************************************************************************!*\
  !*** /home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/angular-resource/angular-resource.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/**\n * @license AngularJS v1.5.5\n * (c) 2010-2016 Google, Inc. http://angularjs.org\n * License: MIT\n */\n(function(window, angular) {'use strict';\n\nvar $resourceMinErr = angular.$$minErr('$resource');\n\n// Helper functions and regex to lookup a dotted path on an object\n// stopping at undefined/null.  The path must be composed of ASCII\n// identifiers (just like $parse)\nvar MEMBER_NAME_REGEX = /^(\\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;\n\nfunction isValidDottedPath(path) {\n  return (path != null && path !== '' && path !== 'hasOwnProperty' &&\n      MEMBER_NAME_REGEX.test('.' + path));\n}\n\nfunction lookupDottedPath(obj, path) {\n  if (!isValidDottedPath(path)) {\n    throw $resourceMinErr('badmember', 'Dotted member path \"@{0}\" is invalid.', path);\n  }\n  var keys = path.split('.');\n  for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj); i++) {\n    var key = keys[i];\n    obj = (obj !== null) ? obj[key] : undefined;\n  }\n  return obj;\n}\n\n/**\n * Create a shallow copy of an object and clear other fields from the destination\n */\nfunction shallowClearAndCopy(src, dst) {\n  dst = dst || {};\n\n  angular.forEach(dst, function(value, key) {\n    delete dst[key];\n  });\n\n  for (var key in src) {\n    if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {\n      dst[key] = src[key];\n    }\n  }\n\n  return dst;\n}\n\n/**\n * @ngdoc module\n * @name ngResource\n * @description\n *\n * # ngResource\n *\n * The `ngResource` module provides interaction support with RESTful services\n * via the $resource service.\n *\n *\n * <div doc-module-components=\"ngResource\"></div>\n *\n * See {@link ngResource.$resource `$resource`} for usage.\n */\n\n/**\n * @ngdoc service\n * @name $resource\n * @requires $http\n * @requires ng.$log\n * @requires $q\n * @requires ng.$timeout\n *\n * @description\n * A factory which creates a resource object that lets you interact with\n * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.\n *\n * The returned resource object has action methods which provide high-level behaviors without\n * the need to interact with the low level {@link ng.$http $http} service.\n *\n * Requires the {@link ngResource `ngResource`} module to be installed.\n *\n * By default, trailing slashes will be stripped from the calculated URLs,\n * which can pose problems with server backends that do not expect that\n * behavior.  This can be disabled by configuring the `$resourceProvider` like\n * this:\n *\n * ```js\n     app.config(['$resourceProvider', function($resourceProvider) {\n       // Don't strip trailing slashes from calculated URLs\n       $resourceProvider.defaults.stripTrailingSlashes = false;\n     }]);\n * ```\n *\n * @param {string} url A parameterized URL template with parameters prefixed by `:` as in\n *   `/user/:username`. If you are using a URL with a port number (e.g.\n *   `http://example.com:8080/api`), it will be respected.\n *\n *   If you are using a url with a suffix, just add the suffix, like this:\n *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`\n *   or even `$resource('http://example.com/resource/:resource_id.:format')`\n *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be\n *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you\n *   can escape it with `/\\.`.\n *\n * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in\n *   `actions` methods. If a parameter value is a function, it will be executed every time\n *   when a param value needs to be obtained for a request (unless the param was overridden).\n *\n *   Each key value in the parameter object is first bound to url template if present and then any\n *   excess keys are appended to the url search query after the `?`.\n *\n *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in\n *   URL `/path/greet?salutation=Hello`.\n *\n *   If the parameter value is prefixed with `@` then the value for that parameter will be extracted\n *   from the corresponding property on the `data` object (provided when calling an action method).\n *   For example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of\n *   `someParam` will be `data.someProp`.\n *\n * @param {Object.<Object>=} actions Hash with declaration of custom actions that should extend\n *   the default set of resource actions. The declaration should be created in the format of {@link\n *   ng.$http#usage $http.config}:\n *\n *       {action1: {method:?, params:?, isArray:?, headers:?, ...},\n *        action2: {method:?, params:?, isArray:?, headers:?, ...},\n *        ...}\n *\n *   Where:\n *\n *   - **`action`** – {string} – The name of action. This name becomes the name of the method on\n *     your resource object.\n *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,\n *     `DELETE`, `JSONP`, etc).\n *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of\n *     the parameter value is a function, it will be executed every time when a param value needs to\n *     be obtained for a request (unless the param was overridden).\n *   - **`url`** – {string} – action specific `url` override. The url templating is supported just\n *     like for the resource-level urls.\n *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,\n *     see `returns` section.\n *   - **`transformRequest`** –\n *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –\n *     transform function or an array of such functions. The transform function takes the http\n *     request body and headers and returns its transformed (typically serialized) version.\n *     By default, transformRequest will contain one function that checks if the request data is\n *     an object and serializes to using `angular.toJson`. To prevent this behavior, set\n *     `transformRequest` to an empty array: `transformRequest: []`\n *   - **`transformResponse`** –\n *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –\n *     transform function or an array of such functions. The transform function takes the http\n *     response body and headers and returns its transformed (typically deserialized) version.\n *     By default, transformResponse will contain one function that checks if the response looks\n *     like a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior,\n *     set `transformResponse` to an empty array: `transformResponse: []`\n *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the\n *     GET request, otherwise if a cache instance built with\n *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for\n *     caching.\n *   - **`timeout`** – `{number}` – timeout in milliseconds.<br />\n *     **Note:** In contrast to {@link ng.$http#usage $http.config}, {@link ng.$q promises} are\n *     **not** supported in $resource, because the same value would be used for multiple requests.\n *     If you are looking for a way to cancel requests, you should use the `cancellable` option.\n *   - **`cancellable`** – `{boolean}` – if set to true, the request made by a \"non-instance\" call\n *     will be cancelled (if not already completed) by calling `$cancelRequest()` on the call's\n *     return value. Calling `$cancelRequest()` for a non-cancellable or an already\n *     completed/cancelled request will have no effect.<br />\n *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the\n *     XHR object. See\n *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)\n *     for more information.\n *   - **`responseType`** - `{string}` - see\n *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).\n *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -\n *     `response` and `responseError`. Both `response` and `responseError` interceptors get called\n *     with `http response` object. See {@link ng.$http $http interceptors}.\n *\n * @param {Object} options Hash with custom settings that should extend the\n *   default `$resourceProvider` behavior.  The supported options are:\n *\n *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing\n *   slashes from any calculated URL will be stripped. (Defaults to true.)\n *   - **`cancellable`** – {boolean} – If true, the request made by a \"non-instance\" call will be\n *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return value.\n *   This can be overwritten per action. (Defaults to false.)\n *\n * @returns {Object} A resource \"class\" object with methods for the default set of resource actions\n *   optionally extended with custom `actions`. The default set contains these actions:\n *   ```js\n *   { 'get':    {method:'GET'},\n *     'save':   {method:'POST'},\n *     'query':  {method:'GET', isArray:true},\n *     'remove': {method:'DELETE'},\n *     'delete': {method:'DELETE'} };\n *   ```\n *\n *   Calling these methods invoke an {@link ng.$http} with the specified http method,\n *   destination and parameters. When the data is returned from the server then the object is an\n *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it\n *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,\n *   read, update, delete) on server-side data like this:\n *   ```js\n *   var User = $resource('/user/:userId', {userId:'@id'});\n *   var user = User.get({userId:123}, function() {\n *     user.abc = true;\n *     user.$save();\n *   });\n *   ```\n *\n *   It is important to realize that invoking a $resource object method immediately returns an\n *   empty reference (object or array depending on `isArray`). Once the data is returned from the\n *   server the existing reference is populated with the actual data. This is a useful trick since\n *   usually the resource is assigned to a model which is then rendered by the view. Having an empty\n *   object results in no rendering, once the data arrives from the server then the object is\n *   populated with the data and the view automatically re-renders itself showing the new data. This\n *   means that in most cases one never has to write a callback function for the action methods.\n *\n *   The action methods on the class object or instance object can be invoked with the following\n *   parameters:\n *\n *   - HTTP GET \"class\" actions: `Resource.action([parameters], [success], [error])`\n *   - non-GET \"class\" actions: `Resource.action([parameters], postData, [success], [error])`\n *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`\n *\n *\n *   Success callback is called with (value, responseHeaders) arguments, where the value is\n *   the populated resource instance or collection object. The error callback is called\n *   with (httpResponse) argument.\n *\n *   Class actions return empty instance (with additional properties below).\n *   Instance actions return promise of the action.\n *\n *   The Resource instances and collections have these additional properties:\n *\n *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this\n *     instance or collection.\n *\n *     On success, the promise is resolved with the same resource instance or collection object,\n *     updated with data from server. This makes it easy to use in\n *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view\n *     rendering until the resource(s) are loaded.\n *\n *     On failure, the promise is rejected with the {@link ng.$http http response} object, without\n *     the `resource` property.\n *\n *     If an interceptor object was provided, the promise will instead be resolved with the value\n *     returned by the interceptor.\n *\n *   - `$resolved`: `true` after first server interaction is completed (either with success or\n *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in\n *      data-binding.\n *\n *   The Resource instances and collections have these additional methods:\n *\n *   - `$cancelRequest`: If there is a cancellable, pending request related to the instance or\n *      collection, calling this method will abort the request.\n *\n * @example\n *\n * # Credit card resource\n *\n * ```js\n     // Define CreditCard class\n     var CreditCard = $resource('/user/:userId/card/:cardId',\n      {userId:123, cardId:'@id'}, {\n       charge: {method:'POST', params:{charge:true}}\n      });\n\n     // We can retrieve a collection from the server\n     var cards = CreditCard.query(function() {\n       // GET: /user/123/card\n       // server returns: [ {id:456, number:'1234', name:'Smith'} ];\n\n       var card = cards[0];\n       // each item is an instance of CreditCard\n       expect(card instanceof CreditCard).toEqual(true);\n       card.name = \"J. Smith\";\n       // non GET methods are mapped onto the instances\n       card.$save();\n       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}\n       // server returns: {id:456, number:'1234', name: 'J. Smith'};\n\n       // our custom method is mapped as well.\n       card.$charge({amount:9.99});\n       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}\n     });\n\n     // we can create an instance as well\n     var newCard = new CreditCard({number:'0123'});\n     newCard.name = \"Mike Smith\";\n     newCard.$save();\n     // POST: /user/123/card {number:'0123', name:'Mike Smith'}\n     // server returns: {id:789, number:'0123', name: 'Mike Smith'};\n     expect(newCard.id).toEqual(789);\n * ```\n *\n * The object returned from this function execution is a resource \"class\" which has \"static\" method\n * for each action in the definition.\n *\n * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and\n * `headers`.\n *\n * @example\n *\n * # User resource\n *\n * When the data is returned from the server then the object is an instance of the resource type and\n * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD\n * operations (create, read, update, delete) on server-side data.\n\n   ```js\n     var User = $resource('/user/:userId', {userId:'@id'});\n     User.get({userId:123}, function(user) {\n       user.abc = true;\n       user.$save();\n     });\n   ```\n *\n * It's worth noting that the success callback for `get`, `query` and other methods gets passed\n * in the response that came from the server as well as $http header getter function, so one\n * could rewrite the above example and get access to http headers as:\n *\n   ```js\n     var User = $resource('/user/:userId', {userId:'@id'});\n     User.get({userId:123}, function(user, getResponseHeaders){\n       user.abc = true;\n       user.$save(function(user, putResponseHeaders) {\n         //user => saved user object\n         //putResponseHeaders => $http header getter\n       });\n     });\n   ```\n *\n * You can also access the raw `$http` promise via the `$promise` property on the object returned\n *\n   ```\n     var User = $resource('/user/:userId', {userId:'@id'});\n     User.get({userId:123})\n         .$promise.then(function(user) {\n           $scope.user = user;\n         });\n   ```\n *\n * @example\n *\n * # Creating a custom 'PUT' request\n *\n * In this example we create a custom method on our resource to make a PUT request\n * ```js\n *    var app = angular.module('app', ['ngResource', 'ngRoute']);\n *\n *    // Some APIs expect a PUT request in the format URL/object/ID\n *    // Here we are creating an 'update' method\n *    app.factory('Notes', ['$resource', function($resource) {\n *    return $resource('/notes/:id', null,\n *        {\n *            'update': { method:'PUT' }\n *        });\n *    }]);\n *\n *    // In our controller we get the ID from the URL using ngRoute and $routeParams\n *    // We pass in $routeParams and our Notes factory along with $scope\n *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',\n                                      function($scope, $routeParams, Notes) {\n *    // First get a note object from the factory\n *    var note = Notes.get({ id:$routeParams.id });\n *    $id = note.id;\n *\n *    // Now call update passing in the ID first then the object you are updating\n *    Notes.update({ id:$id }, note);\n *\n *    // This will PUT /notes/ID with the note object in the request payload\n *    }]);\n * ```\n *\n * @example\n *\n * # Cancelling requests\n *\n * If an action's configuration specifies that it is cancellable, you can cancel the request related\n * to an instance or collection (as long as it is a result of a \"non-instance\" call):\n *\n   ```js\n     // ...defining the `Hotel` resource...\n     var Hotel = $resource('/api/hotel/:id', {id: '@id'}, {\n       // Let's make the `query()` method cancellable\n       query: {method: 'get', isArray: true, cancellable: true}\n     });\n\n     // ...somewhere in the PlanVacationController...\n     ...\n     this.onDestinationChanged = function onDestinationChanged(destination) {\n       // We don't care about any pending request for hotels\n       // in a different destination any more\n       this.availableHotels.$cancelRequest();\n\n       // Let's query for hotels in '<destination>'\n       // (calls: /api/hotel?location=<destination>)\n       this.availableHotels = Hotel.query({location: destination});\n     };\n   ```\n *\n */\nangular.module('ngResource', ['ng']).\n  provider('$resource', function() {\n    var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\\/\\/[^\\/]*/;\n    var provider = this;\n\n    this.defaults = {\n      // Strip slashes by default\n      stripTrailingSlashes: true,\n\n      // Default actions configuration\n      actions: {\n        'get': {method: 'GET'},\n        'save': {method: 'POST'},\n        'query': {method: 'GET', isArray: true},\n        'remove': {method: 'DELETE'},\n        'delete': {method: 'DELETE'}\n      }\n    };\n\n    this.$get = ['$http', '$log', '$q', '$timeout', function($http, $log, $q, $timeout) {\n\n      var noop = angular.noop,\n        forEach = angular.forEach,\n        extend = angular.extend,\n        copy = angular.copy,\n        isFunction = angular.isFunction;\n\n      /**\n       * We need our custom method because encodeURIComponent is too aggressive and doesn't follow\n       * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set\n       * (pchar) allowed in path segments:\n       *    segment       = *pchar\n       *    pchar         = unreserved / pct-encoded / sub-delims / \":\" / \"@\"\n       *    pct-encoded   = \"%\" HEXDIG HEXDIG\n       *    unreserved    = ALPHA / DIGIT / \"-\" / \".\" / \"_\" / \"~\"\n       *    sub-delims    = \"!\" / \"$\" / \"&\" / \"'\" / \"(\" / \")\"\n       *                     / \"*\" / \"+\" / \",\" / \";\" / \"=\"\n       */\n      function encodeUriSegment(val) {\n        return encodeUriQuery(val, true).\n          replace(/%26/gi, '&').\n          replace(/%3D/gi, '=').\n          replace(/%2B/gi, '+');\n      }\n\n\n      /**\n       * This method is intended for encoding *key* or *value* parts of query component. We need a\n       * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't\n       * have to be encoded per http://tools.ietf.org/html/rfc3986:\n       *    query       = *( pchar / \"/\" / \"?\" )\n       *    pchar         = unreserved / pct-encoded / sub-delims / \":\" / \"@\"\n       *    unreserved    = ALPHA / DIGIT / \"-\" / \".\" / \"_\" / \"~\"\n       *    pct-encoded   = \"%\" HEXDIG HEXDIG\n       *    sub-delims    = \"!\" / \"$\" / \"&\" / \"'\" / \"(\" / \")\"\n       *                     / \"*\" / \"+\" / \",\" / \";\" / \"=\"\n       */\n      function encodeUriQuery(val, pctEncodeSpaces) {\n        return encodeURIComponent(val).\n          replace(/%40/gi, '@').\n          replace(/%3A/gi, ':').\n          replace(/%24/g, '$').\n          replace(/%2C/gi, ',').\n          replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));\n      }\n\n      function Route(template, defaults) {\n        this.template = template;\n        this.defaults = extend({}, provider.defaults, defaults);\n        this.urlParams = {};\n      }\n\n      Route.prototype = {\n        setUrlParams: function(config, params, actionUrl) {\n          var self = this,\n            url = actionUrl || self.template,\n            val,\n            encodedVal,\n            protocolAndDomain = '';\n\n          var urlParams = self.urlParams = {};\n          forEach(url.split(/\\W/), function(param) {\n            if (param === 'hasOwnProperty') {\n              throw $resourceMinErr('badname', \"hasOwnProperty is not a valid parameter name.\");\n            }\n            if (!(new RegExp(\"^\\\\d+$\").test(param)) && param &&\n              (new RegExp(\"(^|[^\\\\\\\\]):\" + param + \"(\\\\W|$)\").test(url))) {\n              urlParams[param] = {\n                isQueryParamValue: (new RegExp(\"\\\\?.*=:\" + param + \"(?:\\\\W|$)\")).test(url)\n              };\n            }\n          });\n          url = url.replace(/\\\\:/g, ':');\n          url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function(match) {\n            protocolAndDomain = match;\n            return '';\n          });\n\n          params = params || {};\n          forEach(self.urlParams, function(paramInfo, urlParam) {\n            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];\n            if (angular.isDefined(val) && val !== null) {\n              if (paramInfo.isQueryParamValue) {\n                encodedVal = encodeUriQuery(val, true);\n              } else {\n                encodedVal = encodeUriSegment(val);\n              }\n              url = url.replace(new RegExp(\":\" + urlParam + \"(\\\\W|$)\", \"g\"), function(match, p1) {\n                return encodedVal + p1;\n              });\n            } else {\n              url = url.replace(new RegExp(\"(\\/?):\" + urlParam + \"(\\\\W|$)\", \"g\"), function(match,\n                  leadingSlashes, tail) {\n                if (tail.charAt(0) == '/') {\n                  return tail;\n                } else {\n                  return leadingSlashes + tail;\n                }\n              });\n            }\n          });\n\n          // strip trailing slashes and set the url (unless this behavior is specifically disabled)\n          if (self.defaults.stripTrailingSlashes) {\n            url = url.replace(/\\/+$/, '') || '/';\n          }\n\n          // then replace collapse `/.` if found in the last URL path segment before the query\n          // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`\n          url = url.replace(/\\/\\.(?=\\w+($|\\?))/, '.');\n          // replace escaped `/\\.` with `/.`\n          config.url = protocolAndDomain + url.replace(/\\/\\\\\\./, '/.');\n\n\n          // set params - delegate param encoding to $http\n          forEach(params, function(value, key) {\n            if (!self.urlParams[key]) {\n              config.params = config.params || {};\n              config.params[key] = value;\n            }\n          });\n        }\n      };\n\n\n      function resourceFactory(url, paramDefaults, actions, options) {\n        var route = new Route(url, options);\n\n        actions = extend({}, provider.defaults.actions, actions);\n\n        function extractParams(data, actionParams) {\n          var ids = {};\n          actionParams = extend({}, paramDefaults, actionParams);\n          forEach(actionParams, function(value, key) {\n            if (isFunction(value)) { value = value(); }\n            ids[key] = value && value.charAt && value.charAt(0) == '@' ?\n              lookupDottedPath(data, value.substr(1)) : value;\n          });\n          return ids;\n        }\n\n        function defaultResponseInterceptor(response) {\n          return response.resource;\n        }\n\n        function Resource(value) {\n          shallowClearAndCopy(value || {}, this);\n        }\n\n        Resource.prototype.toJSON = function() {\n          var data = extend({}, this);\n          delete data.$promise;\n          delete data.$resolved;\n          return data;\n        };\n\n        forEach(actions, function(action, name) {\n          var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);\n          var numericTimeout = action.timeout;\n          var cancellable = angular.isDefined(action.cancellable) ? action.cancellable :\n              (options && angular.isDefined(options.cancellable)) ? options.cancellable :\n              provider.defaults.cancellable;\n\n          if (numericTimeout && !angular.isNumber(numericTimeout)) {\n            $log.debug('ngResource:\\n' +\n                       '  Only numeric values are allowed as `timeout`.\\n' +\n                       '  Promises are not supported in $resource, because the same value would ' +\n                       'be used for multiple requests. If you are looking for a way to cancel ' +\n                       'requests, you should use the `cancellable` option.');\n            delete action.timeout;\n            numericTimeout = null;\n          }\n\n          Resource[name] = function(a1, a2, a3, a4) {\n            var params = {}, data, success, error;\n\n            /* jshint -W086 */ /* (purposefully fall through case statements) */\n            switch (arguments.length) {\n              case 4:\n                error = a4;\n                success = a3;\n              //fallthrough\n              case 3:\n              case 2:\n                if (isFunction(a2)) {\n                  if (isFunction(a1)) {\n                    success = a1;\n                    error = a2;\n                    break;\n                  }\n\n                  success = a2;\n                  error = a3;\n                  //fallthrough\n                } else {\n                  params = a1;\n                  data = a2;\n                  success = a3;\n                  break;\n                }\n              case 1:\n                if (isFunction(a1)) success = a1;\n                else if (hasBody) data = a1;\n                else params = a1;\n                break;\n              case 0: break;\n              default:\n                throw $resourceMinErr('badargs',\n                  \"Expected up to 4 arguments [params, data, success, error], got {0} arguments\",\n                  arguments.length);\n            }\n            /* jshint +W086 */ /* (purposefully fall through case statements) */\n\n            var isInstanceCall = this instanceof Resource;\n            var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));\n            var httpConfig = {};\n            var responseInterceptor = action.interceptor && action.interceptor.response ||\n              defaultResponseInterceptor;\n            var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||\n              undefined;\n            var timeoutDeferred;\n            var numericTimeoutPromise;\n\n            forEach(action, function(value, key) {\n              switch (key) {\n                default:\n                  httpConfig[key] = copy(value);\n                  break;\n                case 'params':\n                case 'isArray':\n                case 'interceptor':\n                case 'cancellable':\n                  break;\n              }\n            });\n\n            if (!isInstanceCall && cancellable) {\n              timeoutDeferred = $q.defer();\n              httpConfig.timeout = timeoutDeferred.promise;\n\n              if (numericTimeout) {\n                numericTimeoutPromise = $timeout(timeoutDeferred.resolve, numericTimeout);\n              }\n            }\n\n            if (hasBody) httpConfig.data = data;\n            route.setUrlParams(httpConfig,\n              extend({}, extractParams(data, action.params || {}), params),\n              action.url);\n\n            var promise = $http(httpConfig).then(function(response) {\n              var data = response.data;\n\n              if (data) {\n                // Need to convert action.isArray to boolean in case it is undefined\n                // jshint -W018\n                if (angular.isArray(data) !== (!!action.isArray)) {\n                  throw $resourceMinErr('badcfg',\n                      'Error in resource configuration for action `{0}`. Expected response to ' +\n                      'contain an {1} but got an {2} (Request: {3} {4})', name, action.isArray ? 'array' : 'object',\n                    angular.isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);\n                }\n                // jshint +W018\n                if (action.isArray) {\n                  value.length = 0;\n                  forEach(data, function(item) {\n                    if (typeof item === \"object\") {\n                      value.push(new Resource(item));\n                    } else {\n                      // Valid JSON values may be string literals, and these should not be converted\n                      // into objects. These items will not have access to the Resource prototype\n                      // methods, but unfortunately there\n                      value.push(item);\n                    }\n                  });\n                } else {\n                  var promise = value.$promise;     // Save the promise\n                  shallowClearAndCopy(data, value);\n                  value.$promise = promise;         // Restore the promise\n                }\n              }\n              response.resource = value;\n\n              return response;\n            }, function(response) {\n              (error || noop)(response);\n              return $q.reject(response);\n            });\n\n            promise['finally'](function() {\n              value.$resolved = true;\n              if (!isInstanceCall && cancellable) {\n                value.$cancelRequest = angular.noop;\n                $timeout.cancel(numericTimeoutPromise);\n                timeoutDeferred = numericTimeoutPromise = httpConfig.timeout = null;\n              }\n            });\n\n            promise = promise.then(\n              function(response) {\n                var value = responseInterceptor(response);\n                (success || noop)(value, response.headers);\n                return value;\n              },\n              responseErrorInterceptor);\n\n            if (!isInstanceCall) {\n              // we are creating instance / collection\n              // - set the initial promise\n              // - return the instance / collection\n              value.$promise = promise;\n              value.$resolved = false;\n              if (cancellable) value.$cancelRequest = timeoutDeferred.resolve;\n\n              return value;\n            }\n\n            // instance call\n            return promise;\n          };\n\n\n          Resource.prototype['$' + name] = function(params, success, error) {\n            if (isFunction(params)) {\n              error = success; success = params; params = {};\n            }\n            var result = Resource[name].call(this, params, this, success, error);\n            return result.$promise || result;\n          };\n        });\n\n        Resource.bind = function(additionalParamDefaults) {\n          return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);\n        };\n\n        return Resource;\n      }\n\n      return resourceFactory;\n    }];\n  });\n\n\n})(window, window.angular);\n\n\n//# sourceURL=webpack:////home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/angular-resource/angular-resource.js?");

/***/ }),

/***/ "Q5sB":
/*!****************************************************************************************************!*\
  !*** /home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/angular-resource/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./angular-resource */ \"G17k\");\nmodule.exports = 'ngResource';\n\n\n//# sourceURL=webpack:////home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/angular-resource/index.js?");

/***/ })

}]);