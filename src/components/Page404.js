import '../css/Page404.css';
import { Link } from 'react-router-dom'; 

export default function Page404(){
    return (
        <div className='page404'>
            <h1>404</h1>
            <h3>Sorry, there is no such a page.</h3>
            <Link
              to='/'
              className='go-back-link'
            >
                Go back
            </Link>
        </div>
    )
}