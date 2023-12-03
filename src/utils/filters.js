import sharedReads from "../data/shared-reads.json"

export const filterByMember = (member, books) => {
    if (member == "shared") {
        return books.filter(book => sharedReads.find( read => read["book-id"] == book.id))
    }
    if (member != "any") { 
        return books.filter(book => {
            book.reads.find(read => {
                return(read.member == member)
            })
            return(book.reads.find(read => read.member == member))
        })
    }
    return books
}