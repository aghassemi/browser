// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

var mercury = require('mercury');
var insertCss = require('insert-css');

var Browse = require('../browse/index');
var Help = require('../help/index');
var ErrorPage = require('../error/index');

var css = require('./index.css');

var h = mercury.h;

module.exports = create;
module.exports.render = render;
module.exports.renderHeader = renderHeader;

/*
 * MainContent part of the layout
 */
function create() {}

function renderHeader(state, events) {
  var pageKey = state.navigation.pageKey;
  switch (pageKey) {
    case 'browse':
      return Browse.renderHeader(
        state.browse,
        events.browse,
        events.navigation
      );
    default:
      return null;
  }
}

function render(state, events) {
  insertCss(css);
  return [
    h('div.main-container', renderContent(state, events))
  ];
}

function renderContent(state, events) {
  var pageKey = state.navigation.pageKey;
  switch (pageKey) {
    case 'browse':
      return Browse.render(state.browse, events.browse, events.navigation);
    case 'help':
      return Help.render(state.help, events.help);
    case 'error':
      return ErrorPage.render(state.error);
    default:
      // We shouldn't get here with proper route handlers, so it's an error(bug)
      throw new Error('Could not find page ' + pageKey);
  }
}