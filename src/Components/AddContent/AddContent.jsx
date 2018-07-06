import React from 'react';
import { connect } from 'react-redux';

import findParent from '../../utils/findParent';

class AddContent extends React.Component{
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

  handleAddContent = (e) => {

   if(!this.state.value){
    this.handleCloseAddDialog(e);
    return
   }
    
    let elem = findParent(e.target, 'desk')
    this.props.dispatch({
      type: 'ADD_DESK_CONTENT',
      deskId: elem.id,
      value: this.state.value
    });
    this.handleCloseAddDialog(e)
  }

  render() {
    return(
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
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    desks: state.desks
  }
}

export default connect(mapStateToProps)(AddContent);

