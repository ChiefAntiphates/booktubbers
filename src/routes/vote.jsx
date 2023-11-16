import { useParams, Link, useNavigate } from "react-router-dom";
import categories from '../data/voting-categories.json';
import books from '../data/books.json'
import authors from '../data/authors.json'
import sharedReads from '../data/shared-reads.json'
import individualReads from '../data/individual-reads.json'
import tubbersData from '../data/tubbers-info.json'
import BookCard from "../components/book-card";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";
import ACTIONS from "../context/actions";

export default function Category() {
    const navigateTo = useNavigate();
    const {state, dispatch} = useContext(GlobalContext);

    if (state.user == null) {
        return(
            <div>
                <p>You must be verified a verified Tubber to vote.</p>
                <p><Link to={'/verify'}>Verify self</Link></p>
                <p><Link to={'/'}>Home</Link></p>
            </div>
        )
    }

    const {categoryId} = useParams();
    const category = categories.find(category => {
        return category.id == categoryId
    })

    if (category == undefined){
        return (
            <>
                <p>Category does not exist</p>
                <p><Link to='/vote'>Return to voting page</Link></p>
            </>
        )
    }

    const getOptions = categoryType => {
        switch (categoryType){
            case "individual":
                break;
            case "member":
                break;
            case "shared":
                return (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        {sharedReads.map(read => {
                        let book = books.find(book => book.id == read['book-id'])
                        let author = authors.find(author => author.id == book['author-id'])
                        return(
                            <BookCard 
                                key={book.id}
                                book={book}
                                author={author}
                                review={read.review[state.user]}
                            />
                        )
                    })}
                    </div>
                )
        }
    }


    return (
        <>
        <div>
            <div className="voting">
                <p>{category.name}</p>
                <p>{category.type}</p>
            </div>
            <div>
                {getOptions(category.type)}
            </div>
        </div>
        <button onClick={()=>{
            // Add confirmation box
            dispatch({ type: ACTIONS.UPDATE_VOTED, payload: {categoryId: categoryId}})
            navigateTo("/vote");
        }}>vote</button>
        </>
    );
}