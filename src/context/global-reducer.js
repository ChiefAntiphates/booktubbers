import ACTIONS from './actions';
import Cookies from 'js-cookie'

const GlobalReducer = (state, action) => {
    //console.log(state)
    switch(action.type) {
        case ACTIONS.CHANGE_USER:
            Cookies.set("user", action.payload.user, {SameSite:'Lax'})
            return{...state, user: action.payload.user}
        case ACTIONS.UPDATE_VOTED:
            Cookies.set("completed_votes", [action.payload.categoryId].concat(state.completed_votes), {SameSite:'Lax'})
            return{...state, completed_votes: [action.payload.categoryId].concat(state.completed_votes)}
        default:
            return state
    }
}

export default GlobalReducer