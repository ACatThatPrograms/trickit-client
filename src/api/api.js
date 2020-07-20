import * as account from './accountApi.js';
const axios = require('axios');

export async function get(endpoint) {
  try {
    let res = axios.get(endpoint);
    return formatResponse(res)
  }
  catch (ex) {
    return { "error": "SEVER_RESPONSE_ERROR", "errMsg": "Error connecting to server! Please try again later." }
  }
}

export async function post(endpoint, data) {
  try {
    let res = await axios.post(endpoint, data)
    return formatResponse(res)
  }
  catch (ex) {
    return { "error": "SEVER_RESPONSE_ERROR", "errMsg": "Error connecting to server! Please try again later." }
  }
}

/** Formats response data from api to easily readable JS Object
 * @param  {axios response} res - Axios post or get response
 * @returns {object} - Data formatted to high level readability {data: res.data, error: bool, success: bool}
 */
function formatResponse(res) {
  if (res.data.error) {
    return { "data": false, "error": res.data.error, "success": false }
  }
  else {
    return { "data": res.data, "error": false, "success": true }
  }
}

///////////////////
// API Functions // -- Group all api functions for export
///////////////////
export default {
  account: {
    getAccount: account.getAccount,
    login: account.login,
    logout: account.logout,
    register: account.register,
    update: account.update,
  }
}
