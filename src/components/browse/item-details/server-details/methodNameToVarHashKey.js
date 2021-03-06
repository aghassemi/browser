// Copyright 2015 The Vanadium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
 * Mercury VarHash has an issue where reserved keywords like 'delete', 'put'
 * can not be used a hash keys :`(
 * https://github.com/nrw/observ-varhash/issues/2
 * Since signature methods names can be anything (specially something like
 * delete is very likely), we need to prefix them.
 */
module.exports = function methodNameToVarHashKey(methodName) {
  return 'method_' + methodName;
};