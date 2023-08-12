import PropTypes from 'prop-types';
import { useContext } from 'react';
function FeedbackStats({ feedback }) {
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating 
    }, 0)/ feedback.length;        // accumulator gonna be zero

    average = average.toFixed(1).replace(/[.,]0$/, '');
    return (
        <div className='feedback-Stats'>
            <h4> {feedback.length} Reviews</h4>
            <h4> Average rating: {isNaN(average) ? 0 : average}</h4>
        </div>

    )
}
FeedbackStats.prototypes = {
    feedback: PropTypes.array.isRequired,
}
export default FeedbackStats; 