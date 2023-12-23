import "../css/App.css"
import tubberData from "../data/tubbers-info.json"
import sharedReads from "../data/shared-reads.json"
import indiReads from "../data/individual-reads.json"
import authors from "../data/authors.json"
import books from "../data/books.json"

const getIndiReadsPages = name => indiReads[name].reduce((total, read) => total+(parseInt(books.find(book => book.id == read["book-id"]).pages)),0)

const getAvgGoodreadsDiscrepancy = (name, books_read) => ((indiReads[name].reduce((total, read) => total+Math.abs(books.find(book => book.id == read["book-id"])["goodreads-rating"] - read.rating),0) + sharedReads.reduce((total, read) => total+Math.abs(books.find(book => book.id == read["book-id"])["goodreads-rating"] - read.review[name].rating),0))/books_read).toFixed(2)

const getGenres = name => {
    let genres = {}
    indiReads[name].forEach(read => {
        let book = books.find(book => book.id == read["book-id"])
        book.genres.forEach(genre => {
            if (genre != "fiction"){
                if (genre in genres) {
                    genres[genre].count += 1
                    genres[genre].cumulative_rating += read.rating
                } else {
                    genres[genre] = {count: 1, cumulative_rating: read.rating}
                }
            }
        })
    })
    // var result = Object.keys(obj).map((key) => [key, obj[key]]);
    return Object.keys(genres).map(key => ({count: genres[key].count, favour: parseFloat((genres[key].cumulative_rating/genres[key].count).toFixed(2))+(genres[key].count/2), avg_rating: parseFloat((genres[key].cumulative_rating/genres[key].count).toFixed(2)), genre: [key]}))
    // return genres
}

export default function Stats() {
    const books_read = indiReads.harry.length+indiReads.bethany.length+indiReads.katie.length+indiReads.ollie.length+sharedReads.length
    const pages_read = sharedReads.reduce((total, read) => total+(4*parseInt(books.find(book => book.id == read["book-id"]).pages)),0) + 
        tubberData.members.reduce((total, name) => total + getIndiReadsPages(name),0)
    return (
    <div>
        <h1>Group stats:</h1>
        <p>Sessions this year: {tubberData.sessions.length} (increase of {Math.round((tubberData.sessions.length/tubberData[2022].sessions)*100)-100}% from last year) | A success rate of {Math.round(tubberData.sessions.length/26*100)}%</p>
        <p>Total books read this year: {books_read} (increase of {Math.round((books_read/tubberData[2022].reads_total)*100)-100}% from last year)</p>
        <p>Total pages read this year: {pages_read} (increase of {Math.round((pages_read/tubberData[2022].pages_total)*100)-100}% from last year)</p>
        <p>Shared reads this year: {sharedReads.length} (increase of {Math.round((sharedReads.length/tubberData[2022].shared_reads_total)*100)-100}% from last year)</p>
        {
            tubberData.members.map(name => {
            let pages_read = getIndiReadsPages(name)+sharedReads.reduce((total, read) => total+(parseInt(books.find(book => book.id == read["book-id"]).pages)),0)
            let books_read = indiReads[name].length + sharedReads.length
            let rating = ((sharedReads.reduce((total, read) => total+(parseFloat(read.review[name].rating)),0)+indiReads[name].reduce((total,read) => total+parseFloat(read.rating),0))/books_read).toFixed(2)
            let fives = sharedReads.reduce((total, read) => read.review[name].rating == "5" ? total + 1 : total,0) + indiReads[name].reduce((total,read) => read.rating == "5" ? total+1:total,0)
            let male_reads = sharedReads.reduce((total, read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "male" ? total + 1 : total,0) + indiReads[name].reduce((total,read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "male" ? total + 1 : total,0)
            let male_avg = ((sharedReads.reduce((total, read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "male" ? total + parseFloat(read.review[name].rating) : total,0) + indiReads[name].reduce((total,read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "male" ? total + parseFloat(read.rating) : total,0))/male_reads).toFixed(2)
            let female_reads = sharedReads.reduce((total, read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "female" ? total + 1 : total,0) + indiReads[name].reduce((total,read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "female" ? total + 1 : total,0)
            let female_avg = ((sharedReads.reduce((total, read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "female" ? total + parseFloat(read.review[name].rating) : total,0) + indiReads[name].reduce((total,read) => authors.find(author => author.id == books.find(book => book.id == read["book-id"])["author-id"]).gender == "female" ? total + parseFloat(read.rating) : total,0))/female_reads).toFixed(2)
            let genres = getGenres(name).sort((a,b) => a.favour < b.favour ? 1 : -1)
            console.log(genres.slice(-3))
            return(<div>
                <h3>{name}</h3>
                <p>Pages read: {pages_read} (increase of {Math.round((pages_read/tubberData[2022].pages_read[name])*100)-100}%)</p>
                <p>Books read: {books_read} (increase of {Math.round((books_read/tubberData[2022].books_read[name])*100)-100}%)</p>
                <p>Average rating: {rating} (last year was {tubberData[2022].average_rating[name]})</p>
                <p>Number of 5 stars: {fives} (last year was {tubberData[2022].five_star_total[name]})</p>
                <p>Book read written by male authors: {male_reads} (change of {((male_reads/tubberData[2022].gender_divide[name].male.books_read)*100-100).toFixed(0)}%)</p>
                <p>Average rating of male authors: {male_avg} (last year was {tubberData[2022].gender_divide[name].male.average_rating})</p>
                <p>Book read written by female authors: {female_reads} (change of {((female_reads/tubberData[2022].gender_divide[name].female.books_read)*100-100).toFixed(0)}%)</p>
                <p>Average rating of female authors: {female_avg} (last year was {tubberData[2022].gender_divide[name].female.average_rating})</p>
                <p>Good reads discrepancy: {getAvgGoodreadsDiscrepancy(name, books_read)}</p>
                <p>Favourite genres</p>
                {genres.slice(0,3).map(genre => <p>{genre.genre} - Count: {genre.count} - Average Rating: {genre.avg_rating}</p>)}
                <p>Least Favourite genres</p>
                {genres.sort((a,b) => a.favour > b.favour ? 1 : -1).slice(0,3).map(genre => <p>{genre.genre} - Count: {genre.count} - Average Rating: {genre.avg_rating}</p>)}
            </div>)})
        }
    </div>
    );
}