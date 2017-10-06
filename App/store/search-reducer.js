
const defaultState = {
  searchList:[],
  loaded:false,
  term:"",
  title:"", 
  description:""  
}
  
  export default (state=defaultState, action={}) => {
    switch (action.type) {
      case 'SET_SEARCH_LIST': {
        return {
          ...state,
          searchList: action.list,
          loaded:true
        }
      }
    
      case 'SET_SEARCH_TITLE': {
        return {
          ...state,
          title: action.title,
        }
      }
    
      case 'SET_SEARCH_DESCRIPTION': {
        return {
          ...state,
          description: action.description,
        }
      }
    
      case 'SET_SEARCH_TERM': {
            return {
              ...state,
              term: action.term
            }
          }
        
        default:
        return state;
    }
  }
  
  