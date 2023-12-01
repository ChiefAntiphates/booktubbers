import React, { useState, useEffect } from "react";
import processedBooks from "../utils/process-books";

import tubberData from "../data/tubbers-info.json"
import { capitalise } from "../utils/common"
import { Form } from 'react-bootstrap';
import { filterByMember } from "../utils/filters";

const SORT_BY = {
    DATE_READ_LAST: 'Date Last Read',
    DATE_READ_FIRST: 'Date First Read',
    DATE: 'Date Published',
    AUTHOR: 'Author',
    NAME: 'Name',
    RATING: 'Rating'
}

export default function Library() {
    const [books, setBooks] = useState(processedBooks);
    const [memberFilter, setMemberFilter] = useState("all");
    const [sortBy, setSortBy] = useState(SORT_BY.DATE_READ_LAST);

    useEffect(() => {
        let filteredBooks = processedBooks;
        
        filteredBooks = filterByMember(memberFilter, filteredBooks);
        
        setBooks(filteredBooks);
    }, [memberFilter]);

    useEffect(() => {
        let sortFunction = (a,b) => 1
        console.log(books)
        switch(sortBy) {
            case SORT_BY.AUTHOR:
                sortFunction = (a,b) => a["author-id"] > b["author-id"] ? 1 : -1
                break;
            case SORT_BY.DATE:
                sortFunction = (a,b) => a["publication-date-fmt"] > b["publication-date-fmt"] ? 1 : -1
                break;
            case SORT_BY.NAME:
                sortFunction = (a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                break;
            case SORT_BY.RATING:
                sortFunction = (a,b) => a.averageRating < b.averageRating ? 1 : -1
                break;
            case SORT_BY.DATE_READ_FIRST:
                sortFunction = (a,b) => new Date(Math.min.apply(null, a.reads.map(read => read.dateFmt))) - new Date(Math.min.apply(null, b.reads.map(read => read.dateFmt)))
                break;
            case SORT_BY.DATE_READ_LAST:
                sortFunction = (a,b) => new Date(Math.max.apply(null, b.reads.map(read => read.dateFmt))) - new Date(Math.max.apply(null, a.reads.map(read => read.dateFmt)))
        };

        setBooks(prev => {
            let sorted = [...prev]
            return sorted.sort(sortFunction)
        })
    }, [sortBy, memberFilter]);
    
    return (
    <div>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
            <div style={{display: 'flex'}}>
            <h3 style={{marginRight: '2rem'}}>Filters:</h3>
            <p>Read by:</p>
            <Form.Select value={memberFilter} onChange={e=>setMemberFilter(e.target.value)}>
                {tubberData.members.map((val) => {
                    return <option key={val} value={val}>{capitalise(val)}</option>;
                })}
                <option value="all">All</option>;
            </Form.Select>
                
            </div>
            <div style={{display: 'flex'}}>
                <h3 style={{marginRight: '2rem'}}>Sort by:</h3>
            <Form.Select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                {[SORT_BY.AUTHOR, SORT_BY.DATE, SORT_BY.NAME, 
                SORT_BY.RATING, SORT_BY.DATE_READ_FIRST, SORT_BY.DATE_READ_LAST].map((val) => {
                    return <option key={val} value={val}>{capitalise(val)}</option>;
                })}
            </Form.Select>
            </div>
        </div>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
        }}>
            {books.map(book => {
                return(
                    <div key={book.id} style={{
                        display:'flex', 
                        justifyContent:'space-between', 
                        alignItems:'center', 
                        backgroundColor:'#6d8fb0', 
                        margin: '1.5rem',
                        border: '2px solid white',
                        borderRadius: '3px',
                        padding: '1rem'
                        }}>
                        <div>
                            <img src={book["image-url"]} style={{width: '10rem'}}/>
                        </div>
                        <div key={book.id} style={{width: '15rem', paddingLeft: '2rem', paddingRight: '2rem'}}>
                            <h3>{book.name}</h3>
                            <h4>{book.author}</h4>
                            <div style={{display: 'flex', flexDirection:'column', alignItems:'start', textAlign: 'left'}}>
                            {book.reads.map(read => (
                                <div key={`${read.member}-${book.id}`} style={{
                                    backgroundColor:'#e08026', 
                                    padding: "0.2rem",
                                    margin: '0.5rem',
                                    border: '2px solid white',
                                    width: '100%', 
                                    borderRadius: '4px'}}>
                                    <p style={{margin: '0.1rem'}}>{capitalise(read.member)} - {read.rating} stars</p>
                                    <p style={{margin: '0.1rem'}}>"{read.quote}" <span style={{color: 'black', fontSize: '10px'}}>{read.date}</span></p>
                                </div>
                            ))}
                            </div>
                            <br/>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
    );
}