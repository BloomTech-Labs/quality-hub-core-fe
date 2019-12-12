// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//Icons
import { Interviewqicon } from '../../icons/interviewqicon';
import { Resumeq } from '../../icons/resumeqicon';
import { Designqicon } from '../../icons/designqicon';
import { Codeqicon } from '../../icons/codeqicon';
import { Recruiterqicon } from '../../icons/recruiterqicon';
import { Networkqicon } from '../../icons/networkqicon';
import { Gridicon } from '../../icons/gridicon';

const GridDropdown = props => {
	const node = useRef();
	const [open, setOpen] = useState(false);

	const handleOutsideClick = e => {
		if (node.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);

	return (
		<div ref={node}>
			<div className='grid-menu grid-icon' onClick={() => setOpen(!open)}>
				{/* <Icon icon={ICONS.GRID} width={24} height={24} /> */}
				{Gridicon()}
			</div>

			{open && (
				<div className='dropdown-grid-content dropdown-icons'>
					{/* <div className="test-css-grid"> */}
					<div className='grid-dropdown-top-content'>
						<div className='grid-dropdown-top-row-1'>
							<Link
								to='/interviewq'
								className='box'
								onClick={() => setOpen(false)}>
								{Interviewqicon()}
								<p>InterviewQ</p>
							</Link>

							<Link
								to='/resumeq'
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
					{/* </div> */}
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
