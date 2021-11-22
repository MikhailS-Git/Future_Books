import '../css/Loader.css';
import loader from '../img/loader1.png'

export default function Loader(){
    return (
        <div className='loader'>
            <div className='loader-image'>
                <img src={loader} alt='' />
            </div>
        </div>
    )
}