import React from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';

import './Desk.css';
import AddContent from '../../AddContent/AddContent';
import DeskHeader from "./DeskHeader/DeskHeader";

class Desk extends React.Component{

  handleOpenAddDialog = (e) => {
    this.props.dispatch({
      type: 'OPEN_NEW_DESK_CONTENT_DIALOG',
      id: e.target.parentNode.id
    })    
  }

  handleClickDeleteContent = (e) => {

    this.props.dispatch({
      type: 'DELETE_DESK_CONTENT',
      deskId: e.target.parentNode.parentNode.parentNode.id,
      index: e.currentTarget.parentNode.getAttribute('index')
    })
  }

  handleOpenPopup = (e) => {
    e.stopPropagation();

    if(e.target.localName === 'button') return;
    if(e.target.localName === 'input') return;
    if(e.target.className === 'desk-header') return;

    let index = e.currentTarget;
    let desk = this.props;

    this.props.dispatch({
      type: 'OPEN_POPUP',
      index: index,
      desk: desk
    })
  }

  handleClickDeleteDesk =(e) => {
    this.props.dispatch({
      type: 'DELETE_DESK',
      deskIndex: this.props.id,
    });
  }

  render() {

    let openAddPopup = this.props.openAddContentPopup.addContent === true &&(this.props.id === this.props.openAddContentPopup.id)
      
    return(
      <React.Fragment>
        <div className='desk' onClick={this.handleOpenPopup} id={this.props.id}>
        <button className='del-button' onClick={this.handleClickDeleteDesk}>Delete Desk</button>
          <DeskHeader name={this.props.name} />
          <div className='desk-content'>
            {this.props.content.map((item, index) => {
              
              let key = uuidv4()
              return (
                    <div className='content-item' key={key} id={key} index={index}>
                      {item.length < 10 ? item : `${item.substr(0, 9)}...`}
                      <button 
                      onClick={this.handleClickDeleteContent}
                      onKeyDown={()=> {}}>del</button>
                    </div>
                )
              })}
          </div>
          {
            openAddPopup === true ? 
            <AddContent /> :
            null
          }
          {
            openAddPopup === true ?
            null : 
            <button onClick={this.handleOpenAddDialog}>Add new task</button>
          }
        </div>
      </React.Fragment>
    )
  }
}
function mapStateToProps(state) {
  
  return {
    desks: state.desks,
    openAddContentPopup: state.openAddContentPopup
  }
}

export default connect(mapStateToProps)(Desk);