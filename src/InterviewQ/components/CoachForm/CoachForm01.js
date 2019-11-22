import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CoachForm = ({setFormState, formState, history, setProgress, industriesData, data}) => {


    function submitHandler () {
        setProgress(2)
        history.push("/addcoach/02")
    }

    function backHandler () {
        history.push("/")
    }
    
    
    console.log(data)
    return(
        <div className="coach-form-container"> 
            <h2 className="coach-form-title">Coach Profile</h2>
            <p className="coach-form-title">
                This is your InterviewQ coach profile. Seekers will see this information. Write everything that you want seekers to know about you. This is your chance to sell yourself to prospective seekers! 
            </p>
            <form className="coach-form" >

                <div className="coach-form-company">
                    <h3>Company</h3>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formState.company}
                        onChange={event => setFormState({...formState, company: event.target.value})}
                        />
                </div>
                <div className="coach-form-position">
                    <h3>Position</h3>
                    <input
                        type="text"
                        name="position"
                        placeholder="Position Title"
                        value={formState.position}
                        onChange={event =>  setFormState({...formState, position: event.target.value})}
                        />
                </div>
                <div className="coach-form-industry">
                    <h3>Industry</h3>
                    <select>
                        {industriesData &&
                               industriesData.industries.map(industries => {
                                   return (
                                       <option value={industries.name} key={industries.name}>{industries.name}</option>
                                   )
                               }) 
                        }
                    </select>
                </div>
                <div className="coach-form-description">
                    <h3>Description</h3>
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Name"
                        value={formState.description}
                        onChange={event => setFormState({...formState, description: event.target.value})}
                        />
                </div>
                <div className="coach-form-buttons">
                    {/* <div onClick={handleProgress}>Back</div> */}
                    {/* <button type="submit" value="next" onClick={handleProgress}>Save and next</button> */}
                    <button onClick={backHandler} >Back</button>
                    <button onClick={submitHandler} value="next">Save and next</button>
                </div>
            </form>
        </div>
    )
}

export default CoachForm;