import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";

export default function Library() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    
    return (
    <div style={{backgroundColor: 'grey'}}>
        
    </div>
    );
}