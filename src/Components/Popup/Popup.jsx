import React from 'react';
import { connect } from 'react-redux';
import './Popup.css';

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      isOpenedPopup: false,
      index: -1,
      inputValue: ''
    }
  }

  handleChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleOpenEditMode = (e, index) => {
    
    this.setState({
      value: e.target.innerText,
      isOpenedPopup: true,
      index: index
    })
  }

  handleEditContent = (e) => {
    
    this.props.dispatch({
      type: 'CHANGE_CONTENT_ITEM',
      payload: {
        content: this.props.index,
        innerText: this.state.inputValue,
        index: this.state.index
      }
    })
    this.setState({
      value: '',
      index: -1,
      inputValue: ''
    })
    
  }

  handleClosePopup = (e) => {
    if(e.keyCode === 27 || e.keyCode === 13) {
        this.closePopup()
    }
    document.body.removeEventListener('keydown', this.handleClosePopup)
  }

  closePopup = () => {
    this.setState({
      ...this.state,
      isOpenedPopup: false
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
                      {(this.state.isOpenedPopup && index === this.state.index) ?
                         <div>
                           <input 
                              type='text' 
                              value={this.state.inputValue}
                              onChange={this.handleChangeInputValue}/>
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
