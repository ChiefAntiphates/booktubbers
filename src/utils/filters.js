export const filterByMember = (member, books) => {
    if (member != "all") { 
        books = books.filter(book => {
            book.reads.find(read => {
                return(read.member == member)
            })
            return(book.reads.find(read => read.member == member))
        })
    }
    return books
}