// import React,{useState, useEffect} from 'react'
// import './CoachForm03.scss'
// import { Link } from 'react-router-dom';

// //import Toggle from 'react-toggle'// docs on this---> https://github.com/aaronshaf/react-toggle
// //import "react-toggle/style.css"  //                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// import linkedin from '../../icons/linkedin.svg'
// import github from '../../icons/github.svg'
// import website from '../../icons/website.svg'
// import portfolio from '../../icons/portfolio.svg'
// import twitter from '../../icons/twitter.svg'


// const CoachForm03 = ({ accounts, setAccounts, progress, history, setProgress }) => {

//     const userInput = e => {
//         setAccounts({
//             ...accounts,
//             [e.target.name]: e.target.value
//         })
//         console.log(accounts)
//     }

//     const toggleSwitch = e => {
//         setAccounts({
//             ...accounts,
//             [e.target.name]: e.target.checked
//         })
//         console.log(accounts)
//     }

//     function submitHandler () {
//         setProgress(3)
//         history.push("/addcoach/04")
//     }
    
//     function backHandler () {
//         setProgress(1)
//         history.push("/addcoach/02")
//     }

    

//     return (
//         <div className='CoachForm03-container'>
//             <div className='CoachForm03-header'>
//                 <h3>Linked Accounts</h3>
//                 <p>The links that you provide and enable will be visable to seekers on the coach list</p>
//             </div>
//             <section className='CoachForm03-form-section'>
//                 <div className='CoachForm03-row-gray'>
//                     <div className='CoachForm03-icon-name'>
//                         <img src={linkedin} alt='linkedin icon'/><p> LinkedIn</p>
//                     </div>
//                     <input 
//                         placeholder='LinkedIn URL...' 
//                         type='url' name='linkedin_url' 
//                         value={accounts.linkedin_url} 
//                         onChange={userInput}
//                     />
//                     <Toggle 
//                         icons={false} 
//                         name='linkedin_switch' 
//                         checked={accounts.linkedin_switch} 
//                         onChange={toggleSwitch}
//                     />
//                 </div>
//                 <div className='CoachForm03-row-white'>
//                     <div className='CoachForm03-icon-name'>
//                         <img src={github} alt='github icon'/><p> GitHub</p>
//                     </div>
//                     <input 
//                         placeholder='GitHub URL...' 
//                         name='github_url' 
//                         type='url' 
//                         value={accounts.github_url} 
//                         onChange={userInput}
//                     />
//                     <Toggle 
//                         icons={false} 
//                         name='github_switch' 
//                         checked={accounts.github_switch}
//                         onChange={toggleSwitch}
//                     />
//                 </div>
//                 <div className='CoachForm03-row-gray'>
//                     <div className='CoachForm03-icon-name'>
//                         <img src={website} alt='website icon'/><p> Website</p>
//                     </div>
//                     <input 
//                         placeholder='Website URL...' 
//                         name='website_url'  
//                         type='url' 
//                         value={accounts.website_url} 
//                         onChange={userInput}
//                     />
//                     <Toggle 
//                         icons={false} 
//                         name='website_switch'  
//                         onChange={toggleSwitch}
//                         checked={accounts.website_switch}
//                     />
//                 </div>
//                 <div className='CoachForm03-row-white'>
//                     <div className='CoachForm03-icon-name'>
//                         <img src={portfolio} alt='portfolio icon'/><p> Portfolio</p>
//                     </div>
//                     <input 
//                         placeholder='Portfolio URL' 
//                         name='portfolio_url' 
//                         type='url'  
//                         value={accounts.portfolio_url} 
//                         onChange={userInput}
//                     />
//                     <Toggle 
//                         icons={false} 
//                         name='portfolio_switch' 
//                         checked={accounts.portfolio_switch}
//                         onChange={toggleSwitch}
//                     />
//                 </div>
//                 <div className='CoachForm03-row-gray'>
//                     <div className='CoachForm03-icon-name'>
//                         <img src={twitter} alt='twitter icon'/><p> Twitter</p>
//                     </div>
//                     <input 
//                         placeholder='Twitter URL...' 
//                         name='twitter_url' type='url'  
//                         value={accounts.twitter_url} 
//                         onChange={userInput}
//                     />
//                     <Toggle 
//                         icons={false} 
//                         name='twitter_switch' 
//                         checked={accounts.twitter_switch}
//                         onChange={toggleSwitch}
//                     />
//                 </div>
//                 <div className='CoachForm03-button-group'>
//                     <button className='CoachForm03-back-button' onClick={backHandler} >Back</button>
//                     <button className='CoachForm03-next-button'onClick={submitHandler} >Save and next</button>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default CoachForm03;