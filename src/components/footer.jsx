import React, { useContext } from "react";
import GlobalContext from "../context/global-context";

export default function Footer() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    
    return (
    <div style={{backgroundColor: 'yellow'}}>
        <p>booksbooksbooksbooksbooks</p>
    </div>
    );
}