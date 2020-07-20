import React from 'react';
import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux'
import store from 'redux/store/store'

configure({ adapter: new Adapter() });

const wrapWithProvider = (content) => (<Provider store={store}>{content}</Provider>) 

global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.configure = configure;
global.wrapWithProvider = wrapWithProvider;