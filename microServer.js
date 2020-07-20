const bodyParser = require('body-parser')
const express = require('express');
const server = express();
const session = require('express-session');
const initData = require('./initData');
const { campaigns } = require('./initData');

const artificialLoadTimes = 650;

server.use(session({
  secret: 'mytotallynotsecuresessionsecretbutmaybeitis_dogeIsBestDoge',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
server.use(bodyParser.urlencoded({ extended: false , limit: "50mb"}))
server.use(bodyParser.json({limit: "50mb"}))

server.get('/', rootGet);
server.post('/login', login);
server.post('/logout', logout);
server.post('/register', register);
server.post('/update', update);

server.listen(5000, () => console.log("Server listening on port 5000"))

////////////////////////
/* Endpoint Functions */
////////////////////////
async function rootGet(req, res) {
  await wait();
  return res.send("microServer.js API")
}

async function register(req, res) {
  await wait();
  if (!req.body.username || !req.body.password || !req.body.email) { return res.send(buildError("Invalid Request")) }
  let exists = usernameEmailNotAvailable(req.body.username, req.body.email);
  if (exists === "username") { return res.send(buildError("Username already taken.")) }
  if (exists === "email") { return res.send(buildError("Email already taken.")) }

  addAccount({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  })

  return res.send(buildRes("Account Created"))

}

async function login(req, res) {
  await wait();
  
  if (!req.body.username || !req.body.password) { return res.send(buildError("Invalid Request")) }

  if (req.session.loggedIn) {
    let account = getAccountByUsername(req.session.username);
    let accountData = { loggedIn: true, ...account.getDetails() }
    return res.send(buildRes(accountData))
  }

  let account = getAccountByUsername(req.body.username);
  if (!account) { return res.send(buildError("Incorrect username or password.")) }
  let pass = checkPasswordOfAccount(req.body.password, account);
  if (!pass) { return res.send(buildError("Invalid username or password.")) }

  req.session.loggedIn = true;
  req.session.username = account.username;

  let accountData = { loggedIn: true, ...account.getDetails() }
  return res.send(buildRes(accountData))
}


async function logout(req, res) {
  if (req.session) {
    req.session.destroy();
    return res.send(buildRes("Logged out"))
  } else {
    return res.send(buildError("Unauthorized request"))
  }
}

async function update(req, res) {
  await wait();

  if (!req.session || !req.session.loggedIn ) { return res.send(buildError("Unauthorized request"))}
  if (!req.body.data || !req.body.type ) { return res.send(buildError("Invalid Request")) }
  
  if (req.body.type === "settings") {
    if (!req.body.data.shopUrl || !req.body.data.shopName ) { return res.send(buildError("Invalid Request")) }
    let account = getAccountByUsername(req.session.username)
    account.updateAccount(req.body.data)
    return res.send(buildRes({...account.getDetails()}))
  }

  if (req.body.type === "campaigns") {
    if (!req.body.data ) { return res.send(buildError("Invalid Request")) }
    let account = getAccountByUsername(req.session.username)
    account.updateCampaign(req.body.data)
    return res.send(buildRes({...account.getDetails()}))
  }

  return res.send(buildError("Invalid Request"))

}

////////////////////////
/*    Account Class   */
////////////////////////

class Account {

  constructor(details) {
    this.data = {...initData};
    this.email = details.email;
    this.password = details.password;
    this.shopName = `${details.username}'s SHOP_NAME`;
    this.shopUrl = `${details.username}'s SHOP_URL`;
    this.username = details.username;
  }

  getDetails() {
    return buildAccountData(this)
  }

  updateAccount(data) {
    this.data = data.data || this.data;
    this.email = data.email || this.email;
    this.password = data.password || this.password;
    this.shopName = data.shopName || this.shopName;
    this.shopUrl = data.shopUrl || this.shopUrl;
    this.username = data.username || this.username;
  }

  updateCampaign(campaignData) {
    let segments = this.data.segments
    let campaigns = campaignData
    this.data = {
      campaigns: campaigns,
      segments: segments
    }
  }

}

function buildAccountData(account) {
  return {
    data: account.data,
    email: account.email,
    password: account.password,
    shopName: account.shopName,
    shopUrl: account.shopUrl,
    username: account.username,
  }
}

////////////////////////
/*    Test Account    */
////////////////////////

const testAccountData = {
  email: "testing@testing.com",
  password: "testing!",
  username: "testing",
}

const testAccount = new Account(testAccountData)

////////////////////////
/* Account Management */
////////////////////////

let accounts = [testAccount]

function getAccountByUsername(username) {
  for (let account of accounts) {
    if (account.username === username) { return account }
  }
  return false;
}

function checkPasswordOfAccount(password, account) {
  if (password === account.password) { return true }
  return false
}

function usernameEmailNotAvailable(username, email) {
  for (let account of accounts) {
    if (account.username === username) {
      return "username";
    }
    if (account.email === email) {
      return "email"
    }
  }
  return false
}

function addAccount(accountDetails) {
  accounts.push(new Account(accountDetails))
}

////////////////////////
/* Response Building  */
////////////////////////

function buildError(msg) {
  return { error: msg }
}

function buildRes(data) {
  return { error: false, success: true, ...data }
}

////////////////////////
/*       Misc         */
////////////////////////
async function wait() {
  return new Promise ( async (res) => setTimeout( () => res('done'), artificialLoadTimes ? artificialLoadTimes : 0))
}