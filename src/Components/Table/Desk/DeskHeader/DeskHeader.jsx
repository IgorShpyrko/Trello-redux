import React from 'react';
import { connect } from 'react-redux';

import './DeskHeader.css';
import findParent from '../../../../utils/findParent';

class DeskHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpenedHeaderInput: false,
      value: ''
    }
  }

  handleOnInputKeyDown = (e) => {
    if(e.keyCode === 27){
      this.handleCloseEditModeHeader()
    } 
    if(e.keyCode === 13){
      let desk = findParent(e.target, 'desk');
      this.handleApplyNewHeaderValue(desk)
    }
  }

  handleClickSaveBtn = (e) => {
    let desk = findParent(e.target, 'desk');
    this.handleApplyNewHeaderValue(desk)
  }

  handleChangeInputValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleBlurFromHeaderInput = (e) => {
    if(e.relatedTarget !== null){
      if(e.relatedTarget.className === 'save-header') {
        return
      }
    }
    this.handleCloseEditModeHeader()
  }

  handleOpenEditModeHeader = (e) => {
    this.setState({
      value: e.target.innerText,
      isOpenedHeaderInput: true
    })
  }

  handleCloseEditModeHeader = () => {
    this.setState({
      isOpenedHeaderInput: false,
      value: ''
    })
  }

  handleApplyNewHeaderValue = (desk) => {
    
    this.props.dispatch({
      type: 'CHANGE_CONTENT_HEADER',
      newValue: this.state.value,
      desk: desk
    });
    this.handleCloseEditModeHeader()
  }

  render() {

    let header = +this.props.name.length < 10 ?
      this.props.name :
      `${this.props.name.substr(0, 10)}...`;

    return (
      <React.Fragment>
        {
          this.state.isOpenedHeaderInput ? 
          null :
          <h3  
            className='desk-header'
            onClick={this.handleOpenEditModeHeader}>
              {header}
          </h3>
        }
        {this.state.isOpenedHeaderInput ? 
        <div>
          <input 
          className='header-change-input'
          autoFocus
          type="text"
          onChange={this.handleChangeInputValue}
          onBlur={this.handleBlurFromHeaderInput}
          onKeyDown={this.handleOnInputKeyDown}/>
          <br />
          <button className='save-header' onClick={this.handleClickSaveBtn}>Save</button>
        </div>:
        null}
      </React.Fragment>

    )
  }
}


function mapStateToProps(state) {
  return {
    desks: state.desks
  }
}

export default connect(mapStateToProps)(DeskHeader)