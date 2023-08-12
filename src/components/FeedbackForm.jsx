import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './components/RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const [text, setText] = useState(' ');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState(' ');

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]) //the [] means it will process the side effect whenever we click on edit

    const handleTextChange = (e) => { //e is just a parameter
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== null && text.trim().length <= 10) {
            setMessage('Text must be at least 10 char');
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
            setMessage(null); 
        }
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }
            addFeedback(newFeedback);
            setText('');
        }
        if (feedbackEdit.edti === true) {// check if update is true to update the feedback
            updateFeedback(feedbackEdit.item.id, newFeedback);
        }else {
            addFeedback(newFeedback);
    }
    }
    

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2> How would u rate our service?</h2>
                {/* @todo - rating select component */}
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className='input-group'>
                    <input onChange={handleTextChange} type='text' placeholder='Write a review' value={text} />
                    <Button type='submit' isDisabled={btnDisabled}> Send</Button>
                </div>

                {message && <div className='message'> {message}</div> }
            </form>
        </Card>

    )
}
export default FeedbackForm; 