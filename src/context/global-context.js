import { createContext } from "react"
import Cookies from 'js-cookie'

const user = Cookies.get("user")
const completed_votes = Cookies.get("completed_votes")

export const initialState = {
    user: user ? user : null,
    completed_votes: completed_votes ? completed_votes : []
}

const GlobalContext = createContext({
    state: initialState,
    dispatch: () => null,
})

export default GlobalContext