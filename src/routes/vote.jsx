import { useParams, Link, useNavigate } from "react-router-dom";
import categories from '../data/voting-categories.json';
import { SORT_BY, sort } from "../utils/sorting";
import { filterByMember } from "../utils/filters";
import processedBooks from "../utils/process-books";
import BookCard from "../components/book-card";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/global-context";
import ACTIONS from "../context/actions";
import { Form, Button } from 'react-bootstrap';
import { capitalise } from "../utils/common"

export default function Category() {
    const navigateTo = useNavigate();
    const { state, dispatch } = useContext(GlobalContext);

    if (state.user == null) {
        return (
            <div>
                <p>You must be verified a verified Tubber to vote.</p>
                <p><Link to={'/verify'}>Verify self</Link></p>
                <p><Link to={'/'}>Home</Link></p>
            </div>
        )
    }

    const { categoryId } = useParams();
    const category = categories.find(category => {
        return category.id == categoryId
    })

    if (category == undefined) {
        return (
            <>
                <p>Category does not exist</p>
                <p><Link to='/vote'>Return to voting page</Link></p>
            </>
        )
    }

    const [books, setBooks] = useState(category.type == "shared" ? filterByMember('shared', processedBooks) : filterByMember(state.user, processedBooks));
    const [sortBy, setSortBy] = useState(SORT_BY.DATE_READ_LAST);
    const [votes, setVotes] = useState(Array.apply(null, Array(category.options)).map((_, i) => ({ 'rank': i + 1, 'value': '$UNDEFINED$' })))

    useEffect(() => {
        setBooks(prev => {
            let sorted = [...prev]
            let sortFunction = sortBy == SORT_BY.RATING ? (a, b) => a.reads.find(read => read.member == state.user).rating < b.reads.find(read => read.member == state.user).rating ? 1 : -1 : sort(sortBy)
            return sorted.sort(sortFunction)
        })
    }, [sortBy]);


    const confirm_votes = confirmed_votes => {
        dispatch({ type: ACTIONS.UPDATE_VOTED, payload: { categoryId: category.id, votes: confirmed_votes } })
        navigateTo("/vote");
    }


    return (
        <>
            <div>
                <div className="voting">
                    <p>{category.name}</p>
                </div>

                {votes.map(vote => (
                    <div key={vote.rank} style={{display: 'flex'}}>
                        <p>{vote.rank}: </p>
                        <Form.Select value={vote.value} onChange={e => {
                            let updated_vote = { ...vote, value: e.target.value }
                            let duplicate = votes.find(old_vote => old_vote.value == e.target.value)

                            duplicate ?
                                setVotes(prev => [...prev.filter(old_vote => {
                                    return old_vote.rank != updated_vote.rank && duplicate.rank != old_vote.rank
                                }), updated_vote, { rank: duplicate.rank, value: '$UNDEFINED$' }].sort((a, b) => a.rank > b.rank ? 1 : -1))
                                :
                                setVotes(prev => [...prev.filter(old_vote => old_vote.rank != updated_vote.rank), updated_vote].sort((a, b) => a.rank > b.rank ? 1 : -1))
                        }} defaultValue="$UNDEFINED$">
                            {books.map(book => {
                                return <option key={book.id} value={book.id}>{capitalise(book.name)} - {book.author}</option>;
                            })}
                            <option value="$UNDEFINED$" disabled>-</option>
                        </Form.Select>
                    </div>
                ))}

                <Button onClick={() => {
                    if (votes.map(vote => vote.value).includes("$UNDEFINED$")) {
                        alert("You have not voted for the required number of candidates.")
                    } else {
                        confirm(`Do you want to confirm your vote?\n${votes.map(vote => `${vote.rank} - ${books.find(book => book.id == vote.value).name}`).join('\n')}`) && confirm_votes(votes)
                    }
                }}>Vote</Button>


                <h3>Candidates</h3>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ marginRight: '2rem' }}>Sort by:</h3>
                    <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        {[SORT_BY.AUTHOR, SORT_BY.DATE, SORT_BY.NAME,
                        SORT_BY.RATING, SORT_BY.DATE_READ_FIRST, SORT_BY.DATE_READ_LAST].map((val) => {
                            return <option key={val} value={val}>{capitalise(val)}</option>;
                        })}
                    </Form.Select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {books.map(book => {
                        return (
                            <BookCard
                                key={book.id}
                                book={book}
                                member={state.user}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    );
}