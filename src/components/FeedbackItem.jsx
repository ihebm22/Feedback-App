//import { useState } from 'react';
import { useContext } from 'react';
import { FaTimes, FaEdit} from 'react-icons/fa'; //times for x icon and edit for pencil icon
import Card from './shared/Card';
import PropTypes from 'prop-types';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({item}) {

    const {deleteFeedback ,editFeedback} = useContext(FeedbackContext);
    /*const [rating, setRating] = useState(7); //[name of state , function to update this state]
    const [text, setText] = useState('This is an exmple of card text');
 
    const handleClick = (id) => { //here we change/reset the states
        //setRating(10);
        console.log(id);
    }
    setRating((prev) => { //same but mainly to get the previous state
            return prev + 1;
        })
    */
    //<button onClick={handleClick}> Click </button>
   
    return (
        <Card reverse={true }>
            <div className='num-display'>{item.rating} </div>

            <button onClick={() => deleteFeedback(item.id)} className="close">
                <FaTimes color='purple'/></button>

                <button onClick={() => editFeedback(item)} className='edit'>
                    <FaEdit color='purple'/>
                </button>
            <div className='text-display'>{item.text}</div>
           
        </Card>

    )
}

FeedbackItem.prototype = {
    item: PropTypes.object.isRequired,
}

export default FeedbackItem;