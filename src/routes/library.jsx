import React, { useState, useEffect } from "react";
import processedBooks from "../utils/process-books";

import tubberData from "../data/tubbers-info.json"
import { capitalise } from "../utils/common"
import { Form } from 'react-bootstrap';

export default function Library() {
    const [books, setBooks] = useState(processedBooks)
    const [memberFilter, setMemberFilter] = useState("all")

    useEffect(() => {
        let filteredBooks = processedBooks
        
        if (memberFilter != "all") { 
                filteredBooks = filteredBooks.filter(book => {
                book.reads.find(read => {
                    console.log(read)
                    console.log(read.member)
                    return(read.member == memberFilter)
                })
                return(book.reads.find(read => read.member == memberFilter))
            })
        }
        setBooks(filteredBooks)
    }, [memberFilter])

    console.log(books)
    
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
                <h3>Sort:</h3>
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