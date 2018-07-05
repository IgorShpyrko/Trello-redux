const initialState = {
    isOpenPopup: false,
    desk: null,
    index: null
}

export default function showPopup(state = initialState, action) {
  
  switch(action.type){
    case 'CLOSE_POPUP': 
      return {
        isOpenPopup: false,
        desk: null,
        index: null
      };
    case 'OPEN_POPUP':
      return {
        isOpenPopup: true,
        desk: action.desk,
        index: action.index['id']
      };  
    default:
      return state
  }
}
