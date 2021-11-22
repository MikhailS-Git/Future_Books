import '../css/App.css';
import { Provider } from 'react-redux'; 
import store from '../redux/store';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Provider>
    
  );
}

export default App;
