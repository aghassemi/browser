// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var namespaceService = require('../../../../services/namespace/service');

var log = require('../../../../lib/log')(
  'components:browse:tree-view:expand');

module.exports = expand;

/*
 * Expand the treenode the a given name including loading children.
 */
function expand(state, name) {
  state.expandedMap.put(name, true);
  return loadChildren(state, name);
}

/*
 * Loads children for a given name.
 * Sets a loading indicator on the child until the 'end' signal is received.
 */
function loadChildren(state, name) {
  // if we have already have the children, just return
  var existingChildren = state.childrenMap.get(name);
  if(existingChildren) {
    return Promise.resolve(existingChildren);
  } else {
    state.isLoadingMap.put(name, true);
  }

  return namespaceService.getChildren(name)
    .then(function childrenReceived(items) {
      //TODO(aghassemi) prefix name due to invalid key names like delete
      state.childrenMap.put(name, items);

      items.events.once('end', function() {
        state.isLoadingMap.delete(name);
      });
      return items;
    }).catch(function(err) {
      //TODO(aghassemi) Go to error page
      log.error(err);
      return Promise.reject(err);
    });
}
