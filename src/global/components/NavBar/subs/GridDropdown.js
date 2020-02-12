// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// custom hooks/functions
import { useModalEffect } from '../../../../global/functions/customHooks';

//Icons
import { Interviewqicon } from '../../../icons/interviewqicon';
import { Resumeq } from '../../../icons/resumeqicon';
import { Designqicon } from '../../../icons/designqicon';
import { Codeqicon } from '../../../icons/codeqicon';
import { Recruiterqicon } from '../../../icons/recruiterqicon';
import { Networkqicon } from '../../../icons/networkqicon';
import { Gridicon } from '../../../icons/gridicon';
import { Gridicon_white } from '../../../icons/gridicon_white';
// import { InterviewQColoredIcon } from '../../../../global/icons/interviewqcoloredicon';

const GridDropdown = () => {
	const node = useRef();
	const location = useLocation();
	const [open, setOpen] = useState(false);

	// useModalEffect() and handleOutsideClick() enable modal pop-up functionality
	useModalEffect(open, handleOutsideClick);

	// Upon clicking outside of the modal pop-up, close the modal
	function handleOutsideClick(e) {
		if (node.current) {
			if (node.current.contains(e.target)) {
				return;
			} else {
				setOpen(false);
			}
		} else {
			setOpen(false);
		}
	};

	return (
		<div ref={node}>
			<div className='grid-menu grid-icon' onClick={() => setOpen(!open)}>
				{location.pathname === '/' ? Gridicon_white() : Gridicon()}
			</div>

			{open && (
				<div className='dropdown-grid-content dropdown-icons'>
					<div className='grid-dropdown-top-content'>
						<div className='grid-dropdown-top-row-1'>
							<Link
								to='/interviewq'
								className='box'
								onClick={() => setOpen(false)}>
								{Interviewqicon()}
								{/* <div className="grid-dropdown-interviewq"><p>Interview&nbsp;</p>{InterviewQColoredIcon()}</div> */}
								<p>InterviewQ</p>
							</Link>

							<Link
								to='/resumeq/marketplace'
								className='box'
								onClick={() => setOpen(false)}>
								{Resumeq()}
								<p>ResumeQ</p>
							</Link>

							<Link to='#' className='box' onClick={() => setOpen(false)}>
								{Designqicon()}
								<p>DesignQ</p>
							</Link>
						</div>

						<div className='grid-dropdown-top-row-2'>
							<Link to='#' className='box' onClick={() => setOpen(false)}>
								{Codeqicon()}
								<p>CodeQ</p>
							</Link>

							<Link to='#' className='box' onClick={() => setOpen(false)}>
								{Recruiterqicon()}
								<p>RecruiterQ</p>
							</Link>
							<Link to='#' className='box' onClick={() => setOpen(false)}>
								{Networkqicon()}
								<p>NetworkQ</p>
							</Link>
						</div>
					</div>
					<hr className='grid-dropdown-bottom-hr' />
					<div className='grid-dropdown-bottom-content'>
						<p className='grid-dropdown-more'>More</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default GridDropdown;
