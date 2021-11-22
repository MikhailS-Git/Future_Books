import '../css/Main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './Books';
import BookPage from './BookPage';
import Page404 from './Page404';

export default function Main(){

    return (
        <div className='main'>
            <Router>
                <Routes>
                    <Route 
                      path='/'
                      element={<Books/>}
                    />
                    <Route
                      path='books/:bookId'
                      element={<BookPage/>}
                    />
                    <Route 
                      path='*'
                      element={<Page404/>}
                    />
                </Routes>
            </Router>
        </div>
    )
}