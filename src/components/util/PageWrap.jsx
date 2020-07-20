import React from 'react';
import connectComponent from 'redux/helpers/helpers.js';

/**
 * Appends page-wrap class to children components with a surrounding wrapper that closes
 * navigation onClick(). Primarily used in App.js for Page Routes.
 * @memberof components.util
 * @example
 * <PageWrap>{...children}</PageWrap>
 */
function PageWrap(props) {
  return (
    <div className={"page-wrap"} onClick={toggleNav}>
      {props.children}
    </div>
  )

  // Only dispatch navToggle(false) if nav is open
  function toggleNav() {
    if(props.state.client.navOpen) {
      props.dispatches.client.toggleNav(false)
    }
  }

}

export default connectComponent(PageWrap)
export const pageWrap = PageWrap;