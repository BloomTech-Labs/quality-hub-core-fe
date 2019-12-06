// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//Icons
// import grid from '../../../globalIcons/grid.svg';
import favicon from '../../../globalIcons/favicon.svg';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

import {Interviewqicon} from '../../../globalIcons/interviewqicon';
import {Resumeq} from '../../../globalIcons/resumeqicon';
import {Designqicon} from '../../../globalIcons/designqicon';
import {Codeqicon} from '../../../globalIcons/codeqicon';
import {Recruiterqicon} from '../../../globalIcons/recruiterqicon';
import {Networkqicon} from '../../../globalIcons/networkqicon';

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
				<Icon icon={ICONS.GRID} width={24} height={24} />
			</div>

			{open && (
				<div className='dropdown-grid-content dropdown-icons'>
					<div className='test-css-grid'>
						<Link to='/interviewq' className='box' onClick={() => setOpen(false)}>
		
							{Interviewqicon()}
							<p>InterviewQ</p>
						</Link>

						<Link to='#' className='box' onClick={() => setOpen(false)}>
							{Resumeq()}
							<p>ResumeQ</p>
						</Link>

						<Link to='#' className='box' onClick={() => setOpen(false)}>
							 {Designqicon()}
							<p>DesignQ</p>
						</Link>

						<Link to='#' className='box' onClick={() => setOpen(false)}>
							{Codeqicon()}
							<p>CodeQ</p>
						</Link>

						<Link to='#' className='box' onClick={() => setOpen(false)}>
							{Networkqicon()}
							<p>NetworkQ</p>
						</Link>

						<Link to='#' className='box' onClick={() => setOpen(false)}>
							{Recruiterqicon()}
							<p>Recruiterqicon</p>
						</Link>
					</div>
					<div className="grid-dropdown-bottom-content">
					<hr className="grid-dropdown-bottom-hr" />
					<p className="grid-dropdown-more">More</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default GridDropdown;
