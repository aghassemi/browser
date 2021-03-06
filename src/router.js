// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var Routes = require('routes');
var registerRoutes = require('./routes/register-routes');

module.exports = router;

/*
 * Implements a hash(#) router.
 *
 * Using # instead of regular routes to eliminate any configuration dependency
 * on the server. Otherwise servers need to be configured to return index
 * instead of 404. Although that's reasonable, for simplicity of deployment,
 * hash-based routing is picked.
 */
function router(state, events) {

  // Create and register routes
  var routes = new Routes();
  registerRoutes(routes);

  // Match the path to a route and trigger the route handler for it
  var handleRouteChange = function(data) {
    var path = normalizePath(data.path);
    var route = routes.match(path);
    if (!route) {
      //TODO(aghassemi) Needs to be 404 error when we have support for 404
      return;
    }
    if (!data.skipHistoryPush) {
      window.history.pushState(null, null, '#' + path);
    }
    route.fn.call(null, state, events, route.params);
  };

  // Triggers a navigate event using the current location as the path
  var navigateToCurrentLocation = function() {
    events.navigation.navigate({
      path: window.location.hash,
      skipHistoryPush: true
    });
  };

  // Route and push to history when navigation event fires
  events.navigation.navigate(handleRouteChange);

  // Fire navigation event when hash changes
  window.addEventListener('hashchange', navigateToCurrentLocation);

  // Kick off the routing by navigating to current Url
  navigateToCurrentLocation();
}

function normalizePath(path) {
  // Remove #
  if (path.indexOf('#') === 0) {
    path = path.substr(1);
  }

  // Empty means root
  if (path === '') {
    path = '/';
  }
  return path;
}