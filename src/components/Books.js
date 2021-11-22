import { useDispatch, useSelector } from 'react-redux';
import '../css/Books.css';
import { fetchMoreBooks, setStartIndex } from '../redux/store';
import BookCard from './BookCard';
import Loader from './Loader';

export default function Books(){

    const books = useSelector(state => state.booksList)
    const totalNumber = useSelector(state => state.totalNumber)
    const enableLoadMore = useSelector(state => state.enableLoadMore)
    const fetchStatus = useSelector(state => state.status)

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setStartIndex(books.length))
        dispatch(fetchMoreBooks())
    }

    return (
        <div className='books'>
            {
                totalNumber ?
                <p className='books-total-number'>
                    Books found: {totalNumber}
                </p>
                : null
            }
            <div className='books-flex-container'>
                {
                    books.map(book => 
                        <BookCard 
                        key={book.etag}
                        book={book}
                        />
                        )
                }
            </div>
            {
                books.length ? 
                <button
                  disabled={!enableLoadMore}
                  className='pagination-button'
                  onClick={handleClick}
                >
                    Load more books
                </button>
                : null
            }

            {
                fetchStatus === 'loading' ?
                <Loader />
                : null
            }
        </div>
    )
}