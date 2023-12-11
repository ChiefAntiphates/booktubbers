import categories from '../data/voting-categories.json';
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import GlobalContext from "../context/global-context";
import "../css/App.css"
import { Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import ejs from '../data/ejs_config';
import ACTIONS from '../context/actions';

export default function Vote() {
    const { state, dispatch } = useContext(GlobalContext);
    const [voted, setVoted] = useState(state.voted)

    return (
    <div>{ state.completed_votes.length == categories.length ?
        !voted ?
        <Button onClick={() => {
            console.log(state.completed_votes)
            emailjs.send(ejs.service_id, ejs.template_id, {from_name: state.user, message: JSON.stringify(state.completed_votes)}, ejs.public_key)
                .then((result) => {
                    console.log(result.text);
                    dispatch({ type: ACTIONS.SENT_VOTES })
                    setVoted(true)
                }, (error) => {
                    console.log(error.text);
                    alert(`Something went wrong, please contact Harry and show him this error: ${error.text}`)
                });
        }}>Submit Votes</Button>
        :
        <p>Thank you for voting</p>
    :
        <>
        <h1>Voting Categories:</h1>
        <div style={{backgroundColor:'white', borderRadius:'4px'}}>
        {categories.filter(category => !(state.completed_votes.map(vote => vote.categoryId).includes(category.id))).map(category => {
            return(
                <p key={category.id} className='categoryName' ><Link to={`${category.id}`}>{category.name}</Link></p>
            )
        })}
        </div>
        </>
        }
    </div>
    );
}