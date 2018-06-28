import React from 'react';
import { connect } from 'react-redux';
import Desk from './Desk/Desk';
import AddDesk from './AddDesk/AddDesk'
import './Table.css';


class Table extends React.Component{
 
  render() {
    
    return(
      <div className='table'>
        <AddDesk />
        <div className="desks">
          {this.props.desks.map((item) => (
            <Desk 
            id={ item.id }
            key={ item.id }
            name={ item.name } 
            content={ item.content }/>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    desks: state.desks,
  }
}

export default connect(mapStateToProps)(Table)