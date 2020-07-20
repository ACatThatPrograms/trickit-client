// Used to collect and export all thunk types
import * as account from './accountThunks.js';

export default {
  account: {
    login: account.login,
    logout: account.logout,
    register: account.register,
    update: account.update,
  }
}