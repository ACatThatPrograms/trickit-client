import { combineReducers } from 'redux';

/* Import Action Types */
import {
  UPDATE_ACCOUNT,
  UPDATE_LOADERS,
  TOGGLE_NAV,
} from '../constants/constants.js';

// Initial Reducer State
export const initialState = {
  account: {
    loggedIn : false,
    username : "",
    email    : "",
    data     : {},
    shopName : "",
    shopUrl  : "",
  },
  client: {
    navOpen: false,
  },
  loaders: {
    account: false,
    settings: false,
    update: false,
  }
}

////////////////////////
/* Setup Root Reducer */
////////////////////////
export default combineReducers({
  account: accountReducer,
  client: clientReducer,
  loaders: loaderReducer,
})

////////////////////////
/*   Setup Reducers   */
////////////////////////
function accountReducer(state = initialState.account, action) {
  switch (action.type) {
      case UPDATE_ACCOUNT:
        return Object.assign( {}, state, {
          loggedIn : checkVar(action.payload.loggedIn , state.loggedIn),
          username : checkVar(action.payload.username , state.username),
          email    : checkVar(action.payload.email    , state.email),
          data     : checkVar(action.payload.data     , state.data),
          shopName : checkVar(action.payload.shopName , state.shopName),
          shopUrl  : checkVar(action.payload.shopUrl  , state.shopUrl),
        })

      default:
        return state
  }
}

function clientReducer(state = initialState.client, action) {
  switch (action.type) {
      case TOGGLE_NAV:
        return Object.assign( {}, state, {
          navOpen : typeof action === 'object' ? !state.navOpen : action.payload.navOpen, 
        })

      default:
        return state
  }
}

function loaderReducer(state = initialState.loaders, action) {
  switch (action.type) {
    case UPDATE_LOADERS:
      return Object.assign( {}, state, {
        account  : checkVar(action.payload.account  , state.account),
        settings : checkVar(action.payload.settings , state.settings),
        update   : checkVar(action.payload.update   , state.update),
      })
    case UPDATE_ACCOUNT:
      return Object.assign( {}, state, {
        account : false,
      })
    default:
      return state
  }
}

//////////////////////
// VAR Check Helper // -- Elliminate issues with checking bool changes
//////////////////////
/**
 * @param  {} updateTo - State to update to
 * @param  {} fallback - Fallback state if updateTo is undefined
 * @returns {} Returns update to if not undefines, else returns fallback data
 */
const checkVar = (updateTo, fallback) => {
  if (typeof updateTo !== 'undefined' ) { return updateTo; }
  else if ( typeof updateTo === 'undefined' ) { return fallback; }
  else {
    throw new Error("Redux Var-Checking Failure! Verify that preferred and fallback are being set as argument for checkVar()\nArguments:", updateTo, fallback)
  }
}
