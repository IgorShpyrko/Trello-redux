import React from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';

import './Desk.css';

function findTargetParentByClassName(elem, searchClassName) {
  if(elem.className !== searchClassName){
    elem = elem.parentNode
    return findTargetParentByClassName(elem, searchClassName)
  }
  
  if(elem.className === searchClassName){
    return elem
  } 
}

class Desk extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleInputKeyDown = (e) => {
    // console.log(e.keyCode);

    if(e.keyCode === 27){
      this.handleCloseAddDialog(e)
    }
    if(e.keyCode === 13){
      this.handleAddContent(e)
    }
    
  }

  handleChangeInputValue = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleAddContent = (e) => {
    let elem = findTargetParentByClassName(e.target, 'desk')
    this.props.dispatch({
      type: 'ADD_DESK_CONTENT',
      deskId: elem.id,
      value: this.state.value
    });
    this.handleCloseAddDialog(e)
  }

  handleCloseAddDialog = (e) => {
    if(e.relatedTarget && e.relatedTarget.className === 'save-btn'){
      return null
    }
    this.setState({
      value: ''
    });
    this.props.dispatch({
      type: 'CLOSE_NEW_DESK_CONTENT_DIALOG'
    })    
  }

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

    let desk = e.currentTarget;

    this.props.dispatch({
      type: 'OPEN_POPUP',
      index: desk
    })
  }

  handleClickDeleteDesk =(e) => {
    this.props.dispatch({
      type: 'DELETE_DESK',
      deskIndex: this.props.id,
    });
  }

  render() {
    
    let header = +this.props.name.length < 10 ?
      this.props.name :
      `${this.props.name.substr(0, 10)}...`;

      let openAddPopup = this.props.openAddContentPopup.addContent === true && (this.props.id === this.props.openAddContentPopup.id)
      
    return(
      <React.Fragment>
        <div className='desk' onClick={this.handleOpenPopup} id={this.props.id}>
        <button className='del-button' onClick={this.handleClickDeleteDesk}>Delete Desk</button>
          <h3>{header}</h3>
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
            <div>
            <div>
              <input 
              autoFocus 
              type="text" 
              onBlur={this.handleCloseAddDialog}
              onChange={this.handleChangeInputValue}
              onKeyDown={this.handleInputKeyDown}/>
            </div>
            <button className='save-btn' onClick ={this.handleAddContent}>Save</button> 
            </div> :
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