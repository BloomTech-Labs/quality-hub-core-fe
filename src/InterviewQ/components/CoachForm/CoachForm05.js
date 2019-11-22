import React from 'react';





//Icon
import Check from '../../icons/check.svg';



const CoachForm05 = ({ history }) => {

    function submitHandler () {
        console.log("this is where the gql goes")
        history.push('../')
    }

    return (
        <div>
           <img src={Check} alt='succesCheck'/>
             <h2> Your coach profile is live!</h2>
                  <br/>
                <h4>You can see it in the coaches list now. You can make changes to it in your dashboard.</h4>
                  <br/>
                  <button onClick={submitHandler}>Go To Dashboard</button>
        </div>
    )

};



export default CoachForm05;