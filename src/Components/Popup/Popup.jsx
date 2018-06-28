import React from 'react';
import { connect } from 'react-redux';
import './Popup.css';

class Popup extends React.Component{

  handleClosePopup = (e) => {
    if(e.keyCode === 27 || e.keyCode === 13) {
      // if(!this.props.configName && !this.props.configContent){
        this.closePopup()
      // }
    }
    document.body.removeEventListener('keydown', this.handleClosePopup)
  }

  closePopup = () => {
    this.props.dispatch({
      type: 'CLOSE_POPUP',
      index: null
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
            {desk[0].content.map(item => <div key={item}>{item}</div> )}
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
