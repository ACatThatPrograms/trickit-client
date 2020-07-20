import { connect } from 'react-redux';
/* Helper for connect() */

/* Available Actions(dispatches) */
import {
  updateLoaders,
  toggleNav,
  thunks,
} from '../actions/actions.js';

// Map all redux state types to props
export const _mapAllStatesToProps = state => {
  return {
    state: {
      account: state.account,
      client: state.client,
      loaders: state.loaders,
    }
  }
}

// Map redux actions (Dispatches) to props
export const _mapAllDispatchesToProps = (dispatch) => {
  return {
    dispatches: {
      account: {
        update: async (data) => await dispatch(thunks.account.update(data)),
        login: async (unameOrEmail, pwd) => await dispatch(thunks.account.login(unameOrEmail, pwd)),
        logout: () => dispatch(thunks.account.logout())
      },
      client: {
        toggleNav: (bool) => dispatch(toggleNav(bool)),
      },
      loaders: {
        update: (loadersStatePayload) => dispatch(updateLoaders(loadersStatePayload)),
      }
    }
  }
}

/** Return a React Component as a redux connected component with state and dispatches mapped to component.props
 * @param {React.Component} component - Component to connect to redux store
 */
export default function connectComponent(component) {
  return connect(_mapAllStatesToProps, _mapAllDispatchesToProps)(component)
}
