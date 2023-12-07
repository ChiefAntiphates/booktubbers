import categories from '../data/voting-categories.json';
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";
import "../css/App.css"
export default function Vote() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    return (
        // <p>VOTING TO OPEN SOON!</p>
    
    <div>
        <h1>Voting Categories:</h1>
        <div style={{backgroundColor:'white', borderRadius:'4px'}}>
        {categories.filter(category => !(state.completed_votes.map(vote => vote.categoryId).includes(category.id))).map(category => {
            return(
                <p key={category.id} className='categoryName' ><Link to={`${category.id}`}>{category.name}</Link></p>
            )
        })}
        </div>
    </div>
    );
}