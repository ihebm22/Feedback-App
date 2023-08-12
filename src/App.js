//import logo from './logo.svg';


import './App.css';
import FeedbackList from './components/FeedbackList';


import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import Header from './components/Header';
import './index.css';
import AboutPage from './components/pages/AboutPage';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'; //uses HTML5 history API to keep the UI in sync with the URL
import { FeedbackProvider } from './context/FeedbackContext'; //curly braces coz no export default for this file

function App() {
    
    //const [feedback, setFeedback] = useState(FeedbackData);
    
    return (
        <FeedbackProvider>
        <Router>
            <Header />
            <div className='container'>
              <Routes>
                <Route exact path='/' element={
                    <>
                    <FeedbackForm />
                 <FeedbackStats />
                 <FeedbackList />
                                        
                    </>
                }>
                 
                </Route>

                <Route path= '/about' element={<AboutPage/>}/>
              </Routes>
        </div>
    </Router>
    </FeedbackProvider>
    );
}

export default App;

