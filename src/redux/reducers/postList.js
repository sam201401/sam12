import { 
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE
  } from '../actions'

  const initialState = {
   
    collectionPost: [],
    
  }

  export default(state = initialState, action={}) => {
    switch(action.type) {
    
    
      case FETCH_LIST:
        return {
            ...state,
            isLoading: true,
        }
        case FETCH_LIST_SUCCESS:
      const { results } = action.payload.data;
     
      return {
        ...state,
        collectionPost: results,
        isLoading: false,
      };
      case FETCH_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
      // Return default state if you didn't match any case
      default:
        return state
    }
  }