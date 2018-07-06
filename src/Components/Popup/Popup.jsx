import React from 'react';
import { connect } from 'react-redux';
import './Popup.css';

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      isOpenedContentPopup: false,
      index: -1,
      inputValue: ''
    }
  }

  handleContentInputBlur = (e) => {
    if(e.relatedTarget == null) {
      this.handleCloseInputPopup();
      return
    }
    if(e.relatedTarget.localName === 'button'){
      return
    } else {
      this.handleCloseInputPopup();
    }
  }

  handleContentInputKeyDown = (e) => {
    
    if(e.keyCode === 27){
      this.handleCloseInputPopup();
    }
    if(e.keyCode === 13){
      this.handleEditContent(e)
    }
  }

  handleCloseInputPopup = () => {
    this.setState({
      value: '',
      index: -1,
      inputValue: '',
      isOpenedContentPopup: false
    })
  }

  handleChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleOpenEditMode = (e, index) => {

    if(e.target.localName === 'button'){
      return
    }
    let innerText = e.target.innerText

    this.setState((prevState, props)=>{
      return {
        value: innerText,
        isOpenedContentPopup: !prevState.isOpenedContentPopup,
        index: index
      }
      
    })
    
    // this.setState({
    //   value: e.target.innerText,
    //   isOpenedContentPopup: true,
    //   index: index
    // })
  }

  handleEditContent = (e) => {
    
    this.props.dispatch({
      type: 'CHANGE_CONTENT_ITEM',
      payload: {
        content: this.props.index,
        innerText: this.state.inputValue,
        index: this.state.index
      }
    });
    this.handleCloseInputPopup();
  }

  handleClosePopup = (e) => {
    if(e.target.localName !== 'body'){
      return
    }
    if(e.keyCode === 27 || e.keyCode === 13) {
        this.closePopup()
    }
    document.body.removeEventListener('keydown', this.handleClosePopup)
  }

  closePopup = () => {
    this.setState({
      ...this.state,
      isOpenedContentPopup: false
    })
    this.props.dispatch({
      type: 'CLOSE_POPUP'
    })
  }

  render() {
    if(!this.props.isOpenPopup){
      return null
    }
    const desk = this.props.desks.filter(item => item.id === this.props.index)

    document.body.addEventListener('keydown', this.handleClosePopup)

    return(
      <div className='popup-wrapper' 
        onClick={(e) =>  {e.target.className === 'popup-wrapper' && this.closePopup()}}>
        <div className="popup">
          <div className="close-icon" onClick={this.closePopup}>&#9747;</div>
          <div><h4>{desk[0]['name']}</h4></div>
          <div className="popup-content">
            {desk[0].content.map(
              (item, index) => {
                return (
                  <div 
                    key={index}
                    onClick={(e) => this.handleOpenEditMode(e, index)}>
                      {item}
                      {(this.state.isOpenedContentPopup && index === this.state.index) ?
                         <div>
                           <input 
                              autoFocus
                              type='text' 
                              value={this.state.inputValue}
                              onChange={this.handleChangeInputValue}
                              onKeyDown={this.handleContentInputKeyDown}
                              onBlur={this.handleContentInputBlur}/>
                            <button onClick={this.handleEditContent}>Save</button>
                          </div>
                          : null
                    }
                  </div> 
                )
              }
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  return {
    desks: state.desks,
    isOpenPopup: state.showPopup.isOpenPopup,
    index: state.showPopup.index
  }
}

export default connect(mapStateToProps)(Popup);
