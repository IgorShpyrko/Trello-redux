import uuidv4 from 'uuid';

const initialState = JSON.parse(localStorage.getItem('desks')) || [
      {
        id: uuidv4(),
        name: 'first',
        content: [
          'first content',
          'second content'
        ]
      },
      {
        id: uuidv4(),
        name: 'second',
        content: [
          'second content'
        ]
      },
      {
        id: uuidv4(),
        name: 'third',
        content: [
          'third content'
        ]
      },
      {
        id: uuidv4(),
        name: 'forth',
        content: [
          'forth content'
        ]
      }
    ]

export default function desks(state = initialState, action) {
  
  switch(action.type){

    case 'ADD_DESK':
      let newState = [ ...state, action.newDesk ];
      localStorage.setItem('desks', JSON.stringify(newState));
      return newState;

    case 'DELETE_DESK': 
      newState = state.filter(item => { return item.id !== action.deskIndex });
      localStorage.setItem('desks', JSON.stringify(newState));
      return newState;

    case 'ADD_DESK_CONTENT':
      newState = state.map(item => {
        if(item.id !== action.deskId){
          return item
        } else if(action.value === ''){
          return item 
        } else {
          item.content.push( action.value )
          return item
        }
      });
      localStorage.setItem('desks', JSON.stringify(newState));
      return newState
  
    case 'DELETE_DESK_CONTENT':
    
      newState = state.map(item => {
        if(item.id !== action.deskId){
          
          return item
        } else {
          
          item.content = item.content.slice(0, action.index).concat(item.content.slice(+action.index + 1));
          return item
        }
      });
      localStorage.setItem('desks', JSON.stringify(newState));
      return newState;

    case 'CHANGE_CONTENT_ITEM':
      if(action.payload.innerText ===''){
        return state
      }
      
      newState = state.map(item => {
        // searching desk to change
        if(item.id !== action.payload.content){
          return item
        }
        else return (
          Object.assign(
            {},
            {
              ...item,
              // searching for content to change
              content: item.content.map(
              (elem, index) => {
                if(index !== action.payload.index){
                  return elem
                }
                return action.payload.innerText
              }
            )
          }
          )
        )
      });
      localStorage.setItem('desks', JSON.stringify(newState));
      return newState

      case 'CHANGE_CONTENT_HEADER':
        if((action.newValue === ' ') || (action.newValue === '')){
          return state
        }

        newState = state.map(
          item => {
            if(item.id !== action.desk.id){
              return item
            }
            return {
              ...item,
              name: action.newValue
            }
          }
        )
        localStorage.setItem('desks', JSON.stringify(newState));
        return newState

    default:
      return state;
  }
}