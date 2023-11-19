import books from "../data/books.json"
import authors from "../data/authors.json"
import individualReads from "../data/individual-reads.json"
import sharedReads from "../data/shared-reads.json"
import tubberData from "../data/tubbers-info.json"
export default books.map(book => {
    let author = authors.find(author => author.id == book["author-id"])
    let reads = []
    let shared = sharedReads.find(read => read["book-id"] == book.id)
    shared ? 
        tubberData.members.forEach(member =>{
            reads.push({[member.toLowerCase()]: {...shared.review[member.toLowerCase()], ["book-club-date"]: shared["book-club-date"]} })
        })
    : 
        tubberData.members.forEach(member =>{
            let member_reads = individualReads[member.toLowerCase()].find(read => read["book-id"] == book.id)
            if (member_reads) reads.push({[member.toLowerCase()]: member_reads})
        })
    
    reads = reads.map(read => {
        let member = Object.keys(read)[0]
        return(
            {
                member,
                rating: read[member].rating,
                quote: read[member].quote,
                date: read[member]['book-club-date']
            }
        )
    })
    
    return(
        {...book, author: author.name, reads}
    )
})