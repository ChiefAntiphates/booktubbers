import { useParams, Link, useNavigate } from "react-router-dom";
import votingData from './data.json';
import BookCard from "./book-card";
import React, { useContext } from "react";
import GlobalContext from "./context/global-context";
import ACTIONS from "./context/actions";

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
    const category = votingData["voting-categories"].find(category => {
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
                const sharedBooks = votingData['shared-reads']
                return (
                    <>{sharedBooks.map(read => {
                        let book = votingData.books.find(book => book.id == read['book-id'])
                        let author = votingData.authors.find(author => author.id == book['author-id'])
                        return(
                            <BookCard 
                                key={book.id}
                                book={book}
                                author={author}
                                review={read.review}
                            />
                        )
                    })}</>
                )
        }
    }


    return (
        <>
        <div style={{display: 'flex'}}>
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