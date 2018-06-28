const initialState = {
    addContent: false,
    id: ''
};

export default function openAddContentPopup(state = initialState, action) {
  
    switch(action.type){
  
        case 'OPEN_NEW_DESK_CONTENT_DIALOG':
        let newState = {
            addContent: true,
            id: action.id
        }
        
        return newState

        case 'CLOSE_NEW_DESK_CONTENT_DIALOG':
        newState = {
            addContent: false,
            id: ''
        }
        return newState

        default: 
        return state
    }
}