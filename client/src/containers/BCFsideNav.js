import React, { Component } from 'react';
import {connect} from 'react-redux';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';


class BCFsideNav extends Component {

  componentWillReceiveProps(newProps){
    console.log("BCFsideNav componentWillReceiveProps\n", newProps);

    if(newProps === null){
      return;
    } else {
      console.log(newProps);
    };
  };

  render(){

//specify the base color/background of the parent container if needed
    return (
        <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
            <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
                <Nav id='dashboard'>
                    <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio}/></NavIcon>
                    <NavText> Dashboard </NavText>
                </Nav>
                <Nav id='sales'>
                    <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                    <NavText> Sales </NavText>
                </Nav>
            </SideNav>
        </div>
    );
  };
};

function mapStateToProps(state){
  return{
    projections: state.projections
  };
};

export default connect(mapStateToProps)(BCFsideNav);
