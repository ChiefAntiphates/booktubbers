import { Link } from "react-router-dom";
import React, { useContext } from "react";
import GlobalContext from "../context/global-context";
import books from "../data/books.json"
import authors from "../data/authors.json"
import individualReads from "../data/individual-reads.json"
import sharedReads from "../data/shared-reads.json"
import tubberData from "../data/tubbers-info.json"
import { capitalise } from "../utils/common"

export default function Library() {
    const { state, /*dispatch*/ } = useContext(GlobalContext);

    // console.log(books)
    // console.log(sharedReads)
    // console.log(individualReads)

    
    
    return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }}>
        {
            books.map(book => {
                let author = authors.find(author => author.id == book["author-id"])
                let reads = []
                let shared = sharedReads.find(read => read["book-id"] == book.id)
                shared ? 
                    tubberData.members.forEach(member =>{
                        reads.push({[member.toLowerCase()]: shared.review[member.toLowerCase()]})
                    })
                : 
                    tubberData.members.forEach(member =>{
                        let member_reads = individualReads[member.toLowerCase()].find(read => read["book-id"] == book.id)
                        if (member_reads) reads.push({[member.toLowerCase()]: member_reads})
                    })
                
                return(
                    <div style={{
                        display:'flex', 
                        justifyContent:'space-between', 
                        alignItems:'center', 
                        backgroundColor:'#6d8fb0', 
                        margin: '3rem',
                        border: '2px solid white',
                        borderRadius: '3px',
                        padding: '1rem'
                        }}>
                        <img src={book["image-url"]} style={{width: '10rem'}}/>
                        <div key={book.id} style={{width: '15rem', paddingLeft: '2rem', paddingRight: '2rem'}}>
                            <h3>{book.name}</h3>
                            <h4>{author.name}</h4>
                            <div style={{display: 'flex', flexDirection:'column', alignItems:'start', textAlign: 'left'}}>
                            {reads.map(read => {
                                let member = Object.keys(read)[0]
                                return(
                                    <p key={`${member}-${book.id}`}>{capitalise(member)} | {read[member].rating} stars - {read[member].quote}</p>
                                )
                            })}
                            </div>
                            <br/>
                        </div>
                    </div>
                )
            })
        }
    </div>
    );
}