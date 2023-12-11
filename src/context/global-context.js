import { createContext } from "react"
import Cookies from 'js-cookie'

const user = Cookies.get("user")
const completed_votes = Cookies.get("completed_votes")
const voted = Cookies.get("voted")

export const initialState = {
    user: user ? user : null,
    completed_votes: completed_votes ? JSON.parse(completed_votes) : [],
    voted: voted == "true" ? true : false
}

const GlobalContext = createContext({
    state: initialState,
    dispatch: () => null,
})

export default GlobalContext