 //API Provider file! yahoooo

import { createContext, useState } from "react"; 
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider =({children})=> {
  const [feedback, setFeedback] = useState([ //we pass the items for those feedbacks
  {
    id: 1,
    text: 'this is feedback item 1',
    rating:10
  },{
    id: 2,
    text: 'this is feedback item 2',
    rating:10
  },{
    id: 3,
    text: 'this is feedback item 3',
    rating:10
  },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

//delete feedback  
const deleteFeedback = (id) => {
    if (Window.confirm('Are u sure?')) {
        setFeedback(feedback.filter( (item)=> item.id !==id)) //filter here would return an array minus the item we are deleting
    }
};

//add feedback..
const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]) //we're taking all objects from feedback into its position in the array
};

//set item to get updated
const editFeedback = (item) => {
    setFeedbackEdit({
        item: {},
        edit: true,
    })
    };

    //update feedback item 
    const updateFeedback = (id, updItem) => { //sett te edit value to the feedback item
      setFeedback(feedback.map((item) => (item.id === id ? {...item, ...updItem} : item)));

    }

 return <FeedbackContext.Provider value={{ //passing down the state above into the components that need em
   feedback,
   deleteFeedback,
   addFeedback,
   editFeedback, //the function that runs when we click the button
     feedbackEdit, //the new edited text
     updateFeedback,
 }}>
    {children}

 </FeedbackContext.Provider>
}
export default FeedbackContext;