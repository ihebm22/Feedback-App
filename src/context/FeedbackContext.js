 //API Provider file! yahoooo

import { createContext, useState, useEffect } from "react"; 


const FeedbackContext = createContext();

export const FeedbackProvider =({children})=> {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState( //we pass the items for those feedbacks
  []
  );
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`); //`http://localhost:5000/feedback?_sort=id&_order=desc`=> will load the data directly from db.json, we created a shortcut to it at package.json
    const data = await response.json(); 

    setFeedback(data); //this will display the data on the screen as before
    isLoading(false);

  };

//delete feedback  
const deleteFeedback = async(id) => {
    if (Window.confirm('Are you sure?')) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})

        setFeedback(feedback.filter( (item)=> item.id !==id)) //filter here would return an array minus the item we are deleting
    }
};

//add feedback..
const addFeedback = async (newFeedback) => {
  const response = await fetch(`/feedback`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(newFeedback), //sends new feedback to back-end
  });

  const data = await response.json() // gives us the new feedback to add it
    //newFeedback.id = uuidv4(); not needed anymore as that ID will be created automatically
    setFeedback([data, ...feedback]) //we're taking all objects from feedback into its position in the array
};

//set item to get updated
const editFeedback = (item) => {
    setFeedbackEdit({
        item: {},
        edit: true,
    })
    };

    //update feedback item 
    const updateFeedback = async (id, updItem) => {//sett te edit value to the feedback item

      const response = await fetch(`/feedback/${id}`, {
        method: 'PUT', //means update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem)
      });
      const data = await response.json();


      setFeedback(
        feedback.map((item) => (item.id === id ? {...item, ...data} : item))
        );
      

    }

 return <FeedbackContext.Provider value={{  //passing down the state above into the components that need em
   feedback,
   feedbackEdit,
   isLoading,
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