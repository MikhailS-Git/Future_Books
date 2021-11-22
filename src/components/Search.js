import '../css/Search.css';
import { fetchBooks, setEnableLoadMore, setFilterCategory, setFilterOrder, setSearchInput, setStartIndex } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


export default function Search(){

    const [input, setInput] = useState('')
    const [category, setCategory] = useState('All')
    const [order, setOrder] = useState('relevance')

    const dispatch = useDispatch()

    const getBooksFromServer = () => {
        if (input) {
            dispatch(setStartIndex(0))
            dispatch(setSearchInput(input))
            dispatch(fetchBooks())
            dispatch(setEnableLoadMore(true))
        } else {
            alert('Please enter something to make a search')
        }
        
    }

    const handleInputChange = (e) => {
        dispatch(setEnableLoadMore(false))
        setInput(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        dispatch(setFilterCategory(e.target.value))
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value)
        dispatch(setFilterOrder(e.target.value))
    }

    return (
        <div className='search'>
            <h2 className='search-title'>
                Search for a book
            </h2>
            <div className='search-container'>
                <div className='input-control'>
                    <input 
                    value={input}
                    onChange={handleInputChange}
                    />
                    <button
                    type='button'
                    className='search-button'
                    onClick={getBooksFromServer}
                    >
                        Search
                    </button>
                </div>

                <div className='select-control'>
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                    >
                        <option value='All'>All</option>
                        <option value='Art'>Art</option>
                        <option value='Biography'>Biography</option>
                        <option value='Computers'>Computers</option>
                        <option value='History'>History</option>
                        <option value='Medical'>Medical</option>
                        <option value='Poetry'>Poetry</option>
                    </select>
    
                    <select
                      value={order}
                      onChange={handleOrderChange}
                    >
                        <option value='relevance'>Relevance</option>
                        <option value='newest'>Newest</option>
                    </select>
                </div>
            </div>
        </div>
    )
}