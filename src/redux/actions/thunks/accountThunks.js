import api from 'api/api.js';
import { updateAccount, updateLoaders, toggleNav } from '../actions.js'; 
import util from 'util/index.js';
import {initialState} from 'redux/reducers/reducers';

/** Posts login request to API and sets updated user state if successful
 * @param  {string} usernameOrEmail - Username or email to perform login attempt with
 * @param  {string} password - Password to perform login attempt with
 * @param  {function} - Function to handle error response ( Generally a passed state update to display user error )
 */
export const login = (username, pwd) => {
  return async function(dispatch) {
    dispatch(updateLoaders({'account': true}));
    if (username !== "check" && pwd !== "check") {
      let validation = util.validation.verifyLoginForm(username, pwd);
      if (validation.error) {
        dispatch(updateLoaders({'account': false}));
        return util.data.buildError(validation.error);
      }
    }
    let res = await api.account.login(username, pwd);
    if (res.error) {
      dispatch(updateLoaders({'account': false}));
      return util.data.buildError(res.error);
    }
    let accountData = {
      loggedIn : true,
      ...res.data
    }
    dispatch(updateAccount(accountData))
    return true
  } 
}

export const register = (registerDetails) => {
  return async function(dispatch) {
    dispatch(updateLoaders({'account': true}));
    let validation = util.validation.verifyRegistrationForm(registerDetails);
    if (validation.error) {
      return util.data.buildError(validation.error);
    }
    let res = await api.account.login(registerDetails);
    if (res.error) {
      return util.data.buildError(validation.error);
    }

    dispatch(updateLoaders({'account': false}));
  }
}


export const logout = () => {
  return async function(dispatch) {
    dispatch(updateLoaders({'account': true}));
    let res = await api.account.logout();
    if (res.error) {
      return util.data.buildError(res.error);
    }
    dispatch(toggleNav(false))
    dispatch(updateAccount({...initialState.account}))  
  }
}


export const update = (data) => {
  return async function(dispatch) {
    dispatch(updateLoaders({'account': true}));
    let res = await api.account.update(data);
    if (res.error) {
      dispatch(updateLoaders({'account': false}));
      return util.data.buildError(res.error);
    }
    let accountData = {
      loggedIn : true,
      ...res.data
    }
    dispatch(updateAccount(accountData))
    return true;
  }
}