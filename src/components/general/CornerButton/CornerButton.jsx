import React from 'react';
import connectComponent from 'redux/helpers/helpers.js';
import PropTypes from 'prop-types';
// semantic-ui
import {
  Button,
  Icon
} from 'semantic-ui-react';

/**
 * A fixed position hamburger button to control redux state (Bool) client.navOpen
 * @function CornerButton
 * @memberof components
 * @prop {bool} hidden - If button should be hidden
 * @prop {func} onClick - Button click function
 * @prop {String} distanceX - CSS allowable value for x distance from position corner
 * @prop {String} distanceY - CSS allowable value for y distance from position corner
 * @prop {String} icon - Icon for the button
 * @prop {String} position - Position of button as string: "tl", "tr", "br", "bl" for topLeft, topRight, bottomRight, BottomLeft respectively
 * @example
 * <CornerButton pos="tl" distance="2rem"/>
 */
function CornerButton(props) {

  let style = {
    position: "fixed",
    zIndex: 2,
  }

  const [tl,tr,bl,br] = ( () => {
    return [{
      top: props.distanceY,
      left: props.distanceX,
    },{
      top: props.distanceY,
      right: props.distanceX,
    },{
      bottom: props.distanceY,
      left: props.distanceX,
    },{
      bottom: props.distanceY,
      right: props.distanceX,
    }]
  })()

  if (props.pos) {
    switch(props.pos) {
      case "tr": Object.assign(style, tr); break;
      case "bl": Object.assign(style, bl); break;
      case "br": Object.assign(style, br); break;
      default  : Object.assign(style, tl); break;
    }
  }

  if (props.hidden) {
    Object.assign(style, {display: 'none'});
  }


  return  (
    <Button style={style} icon active={false} onClick={props.onClick} >
      <Icon name={props.icon} />
    </Button>
  )

}

CornerButton.propTypes = {
  distanceX: PropTypes.string,
  distanceY: PropTypes.string,
  pos: PropTypes.string,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
}

CornerButton.defaultProps = {
  distanceX: "1rem",
  distanceY: "1rem",
  pos: "tl",
}

export default connectComponent(CornerButton);