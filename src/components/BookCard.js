import { useDispatch, useSelector } from 'react-redux';
import '../css/BookCard.css';
import bookCover from '../img/book-cover.gif'
import { Link } from 'react-router-dom';
import { setScroll } from '../redux/store';

export default function BookCard({book}){

    const category =  useSelector(state => state.category)

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setScroll(document.documentElement.scrollTop))
        setTimeout(()=>{
            window.scrollTo(0,0)
        }, 0)
    }

    return (
        
        <div className='bookCard'
          // fake filtration by category
          style={{display: (category === 'All' || (category !== 'All' && book.volumeInfo.categories && book.volumeInfo.categories.includes(category))) ? 'block' : 'none'}}
        >
            <Link
              to={`/books/${book.id}`}
              className='bookPage-link'
              onClick={handleClick}
            >
                <div className='book-image'>
                    <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookCover} alt=''/> 
                </div>
                <p className='book-category'>
                    {book.volumeInfo.categories && book.volumeInfo.categories[0]}
                </p>
                <p className='book-title'>
                    {book.volumeInfo.title}
                </p>
                <p className='book-authors'>
                    {
                        book.volumeInfo.authors &&
                        <>Автор: {book.volumeInfo.authors && book.volumeInfo.authors.map(
                        (author, index, array) => index === array.length-1 ?
                            <span key={author}>{author}</span> :
                            <span key={author}>{author}, </span>
                        )}
                        </>
                    }
                </p>
            </Link>
        </div>
        

        
    )
}