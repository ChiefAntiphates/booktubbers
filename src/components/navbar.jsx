import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";
import '../css/nav.css'

export default function Header() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    const capitalise = word => word.charAt(0).toUpperCase() + word.slice(1)
    console.log(state.user == null)
    return (
        <nav>
            <p><Link to='/vote'>Vote</Link></p>
            {state.user == null ? <p><Link to='/verify'>Verify yourself as a Tubber</Link></p> : <p>Welcome, Brother {capitalise(state.user)}</p>}
            <p>Library</p>
        </nav>
    );
}