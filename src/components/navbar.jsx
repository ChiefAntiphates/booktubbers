import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";
import '../css/nav.css'
import { capitalise } from "../utils/common";

export default function Header() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    return (
        <nav>
            <p><Link to='/vote'>Vote</Link></p>
            {state.user == null ? <p><Link to='/verify'>Verify yourself as a Tubber</Link></p> : <p>Welcome, Brother {capitalise(state.user)}</p>}
            <p><Link to='/library'>Library</Link></p>
        </nav>
    );
}