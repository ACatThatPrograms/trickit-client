/* Collection of all redux actions */
// If you are looking for an action that is async check ./thunks/*
import {
  UPDATE_ACCOUNT,
  UPDATE_LOADERS,
  TOGGLE_NAV,
} from '../constants/constants.js';

import thunkActions from './thunks/thunks.js';

/** Please see accountReducer for complete payload parameters
 * @param  {} payload - properties to inject to account state
 */
export const updateAccount = ( payload ) => {
  return { type: UPDATE_ACCOUNT, payload }
}

/** Please see loaderReducer for complete payload parameters
 * @param  {} payload - properties to inject to loader state
 */
export const updateLoaders = ( payload ) => {
  return { type: UPDATE_LOADERS, payload }
}

/** Toggle Nav open or close, or force with bool
 * @param  {bool} bool - properties to inject to loader state
 */
export const toggleNav = ( bool ) => {
  return { type: TOGGLE_NAV, bool }
}

///////////////////
/* Thunk Exports // -- Collect all thunks for export
/////////////////*/
export const thunks = {
  account: {
    login: thunkActions.account.login,
    logout: thunkActions.account.logout,
    register: thunkActions.account.register,
    update: thunkActions.account.update
  }
}