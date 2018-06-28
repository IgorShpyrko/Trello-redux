const initialState = {
    isOpenPopup: false,
    index: null
}

export default function showPopup(state = initialState, action) {
  
  switch(action.type){
    case 'CLOSE_POPUP': 
      return {
        isOpenPopup: false,
        index: null
      };
    case 'OPEN_POPUP':
      return {
        isOpenPopup: true,
        index: action.index['id']
      };  
    default:
      return state
  }
}
