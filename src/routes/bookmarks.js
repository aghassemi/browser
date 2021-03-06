// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

module.exports = function(routes) {
  routes.addRoute('/bookmarks', handleBookmarksRoute);
};

module.exports.createUrl = function() {
    return '#/bookmarks';
};

function handleBookmarksRoute(state, events, params) {

  // Set the page to browse
  state.navigation.pageKey.set('browse');
  state.viewport.title.set('Browse');

  // Trigger browse components browseNamespace event
  events.browse.browseNamespace({
    'namespace': state.browse.namespace(),
    'subPage': 'bookmarks',
    'viewType': state.browse.views.viewType()
  });
}