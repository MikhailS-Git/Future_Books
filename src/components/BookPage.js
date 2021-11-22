import { useSelector } from 'react-redux';
import '../css/BookPage.css';
import bookCover from '../img/book-cover.gif';
import { useParams, Link } from 'react-router-dom';
import Page404 from './Page404';

export default function BookPage(){

    const bookId = useParams().bookId

    const book = useSelector(state => state.booksList.find((item) => bookId === item.id))

    
    const scroll = useSelector(state => state.scroll)
    const handleClick = ()=> {
        setTimeout(()=>{
            window.scrollTo(0, scroll)
        }, 0)
    }

    return (
        book ?
        <div className='bookPage'>
            <Link 
              to='/'
              className='goBack-link'
              onClick={handleClick}
            >
                Go Back
            </Link>
            <div className='bookPage-image'>
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookCover} alt=''/>
            </div>
            <div className='bookPage-content'>
                {
                    book.volumeInfo.categories ?
                    <p className='bp-c-category'>
                        {book.volumeInfo.categories.map(
                            (item, ind, arr) => ind === arr.length-1 ?
                            <span key={item+ind}>{item}</span>
                            : <span key={item+ind}>{item} / </span>
                        )}
                    </p>
                    : null
                }
                
                <h3 className='bp-c-title'>
                    {book.volumeInfo.title}
                </h3>
                {
                    book.volumeInfo.authors ?
                    <p className='bp-c-author'>
                        {book.volumeInfo.authors.map(
                            (item, ind, arr) => ind === arr.length-1 ?
                            <span key={item+ind}>{item}</span>
                            : <span key={item+ind}>{item} / </span>
                        )}
                    </p>
                    : null
                }

                {
                    book.volumeInfo.description ?
                    <p className='bp-c-desc'>
                        {book.volumeInfo.description}
                    </p>
                    : null
                }    
                
            </div>
        </div>
        : <Page404/>
    )
}