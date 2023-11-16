import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import GlobalContext from "../context/global-context";
import ACTIONS from "../context/actions";
import { Form } from 'react-bootstrap';

const MEMBERS = [
    {name: "Harry", passkey: "utilitarianism"},
    {name: "Ollie", passkey: "oathbringerpt2"},
    {name: "Bethany", passkey: "theicemaiden"},
    {name: "Katie", passkey: "thebookthief"}
]

export default function Verify() {
    const navigateTo = useNavigate();
    const {state, dispatch} = useContext(GlobalContext);
    const [member, setMember] = useState(MEMBERS[0].name)
    const [passkey, setPasskey] =  useState("")

    if (state.user != null) {
        return(
            <div>
                <p>You are already verified.</p>
                <p><Link to={'/'}>Home</Link></p>
            </div>
        )
    }

    const verifyLogin = () => {
        let attempt = MEMBERS.find(m => m.name == member)
        if (attempt.passkey == passkey) {
            dispatch({ type: ACTIONS.CHANGE_USER, payload: {user: member.toLowerCase()}})
            navigateTo('/')
        } else {
            setPasskey("")
        }
    }


    return (
        <>
        <Form.Select value={member} onChange={e=>setMember(e.target.value)}>
        {MEMBERS.map((val) => {
            return <option key={val} value={val.name}>{val.name}</option>;
        })}
        </Form.Select>
        <input value={passkey} type="password" placeholder="Passphrase" onChange={e=>setPasskey(e.target.value)} onKeyDown={e=>{if(e.key=='Enter'){verifyLogin()}}}/>
        <button onClick={verifyLogin}>Verify</button>
        </>
    );
}