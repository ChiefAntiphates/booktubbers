

export default function BookCard(props) {
    const {book, author, review} = props
    
    return (
    <div style={{backgroundColor: 'grey'}}>
        <h1>{book.name}</h1>
        <h2>{author.name}</h2>
        <img src={book['image-url']} />
    </div>
    );
}