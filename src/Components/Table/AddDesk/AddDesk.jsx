import React from 'react';
import './AddDesk.css';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';

function AddDesk(props) {
  
  const handleSubmit = (e) => {
    e.preventDefault();

    let newContent = e.target[1].value ? [e.target[1].value] : ['default content'];

    const newDesk = {
      id: uuidv4(),
      name: e.target[0].value || 'default value',
      content: newContent
    };

    props.dispatch({
      type: 'ADD_DESK',
      newDesk: newDesk,
    });

    e.target[0].value = '';
    e.target[1].value = '';
  }

  return(
    <div className="add-desk">
      <form action='submit' onSubmit={handleSubmit} className='form'>
        <h1 className='form-header'>Add New Desk</h1>
        <div className="form-item">
          <input type="text" name="newDeskName"/>
          <label htmlFor="newDeskName">Name</label>
        </div>
        <div className="form-item">
          <input type="text" name="newDeskContent"/>
          <label htmlFor="newDeskContent">Content</label>
        </div>
        <button type="submit">Add new Desk</button>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  
  return {
    desks: state.desks
  }
}

export default connect(mapStateToProps)(AddDesk);