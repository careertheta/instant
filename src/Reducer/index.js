import { combineReducers } from 'redux'

const initialState = ""
const initialKey = ""
const empty = []


const catReducer  = (state=initialState, action) =>{
    if(action.type === "addcategory"){
        return action.payload
    }
    return state
}

// const proReducer  = (state=initialState, action) =>{
//   if(action.type == "addproduct"){
//       return action.payload
//   }
//   return state
// }

// const cartItems = (state = initialState, action) =>{
//     switch (action.type) {
//       case 'ADD_TO_CART':
        
//         return [...state, action.payload]

//       case 'REMOVE_FROM_CART':
//         return state.filter(cartItem => cartItem.id  !== action.payload.id)

        
//       case 'EMPTY_CART':
//             return empty
//     }
//     return state
// }


const reducer = combineReducers({
  categories:catReducer
})

export default reducer