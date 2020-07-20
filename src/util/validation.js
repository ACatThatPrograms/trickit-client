import validator from 'validator';

/**
 * @param  {string} username - Username to run verification against for registration
 * @param  {string} email - Email to run verification against
 * @param  {string} password - Password to run verification against
 * @returns {object} - Data object possessing err if failure (with a msg) or true
 */
export function verifyRegistrationForm(username, email, password) {
  if ( username.length < 3 || username.length > 32 ) { return {"error" : "Username must be between 3-32 characters"}; }
  if ( !validator.isEmail(email) )                   { return {"error" : "Please enter a valid e-mail address."}; }
  if ( password.length < 8 || password.length > 64 ) { return {"error" : "Passwords must be between 8-64 characters."};}
  return true
}

/**
 * @param {string} username - Username to run verification against for login
 * @param {string} password - Password to run verification against for login
 * @returns {object} - Data object possessing err if failure (with a msg) or true
 */
export function verifyLoginForm(username, password) {
  if ( username.length < 3 || username.length > 32 ) { return {"error" : "Username/Email must be between 3-32 characters"};}
  if ( password.length < 8 || password.length > 64 ) { return {"error" : "Passwords must be between 8-64 characters."};}
  return true
}