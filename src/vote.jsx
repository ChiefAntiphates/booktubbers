import votingData from './data.json';
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "./context/global-context";

export default function Vote() {
    const categories = votingData['voting-categories'];
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    
    return (
    <div style={{backgroundColor: 'grey'}}>
        <h1>vote!</h1>
        <p>hello</p>
        <div>
        {categories.filter(category => !(state.completed_votes.includes(category.id))).map(category => {
            return(
                <p key={category.id}><Link to={`${category.id}`}>{category.name}</Link></p>
            )
        })}
        </div>
    </div>
    );
}