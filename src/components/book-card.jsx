export default function BookCard(props) {
    const {book, member} = props
    const review = book.reads.find(read => read.member == member)
    return (
    <div style={{
            backgroundColor: '#e08026', 
            display: 'flex', 
            width: '30rem', 
            justifyContent:'space-between',
            border: '3px solid #de954b',
            margin: '10px',
            borderRadius: '3px'
        }}>
        <img src={book['image-url']} style={{width: '12rem'}} alt={`${book.name} - ${book.author}`} />
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '2rem',
            marginLeft: '2rem'
        }}>
            <div>
            <p>{book.name}</p>
            <p>{book.author}</p>
            </div>
            <p>{review.rating} Stars</p>
            <p>"{review.quote}"</p>
        </div>
    </div>
    );
}