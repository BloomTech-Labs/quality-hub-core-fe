// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//Icons
// import grid from '../../../globalIcons/grid.svg';
import favicon from '../../../globalIcons/favicon.svg';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

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
			{/* Styling here needs to be changed to CSS Grid to make it more stable */}
			{/* <img
				src={grid}
				alt='Grid Menu'
				className='grid-menu grid-icon'
				onClick={() => setOpen(!open)}
			/> */}
			<div className='grid-menu grid-icon' onClick={() => setOpen(!open)}>
				<Icon icon={ICONS.GRID} width={24} height={24} />
			</div>

			{open && (
				<div className='dropdown-grid-content dropdown-icons'>
					<div className='test-css-grid'>
						<Link to='/' className='box'>
							<img
								src={favicon}
								height='50px'
								width='50px'
								alt='ResumeQ icon'
							/>
							<p>CodingQ</p>
						</Link>

						<Link to='/interviewq' className='box'>
							{/* <img
								src={interviewQ}
								height='50px'
								width='50px'
								alt='InterviewQ icon'
							/> */}
							<Icon icon={ICONS.INTERVIEWQ} width={24} height={24} />
							<p>InterviewQ</p>
						</Link>

						<Link to='/' className='box'>
							{/* <img
								src={resumeQ}
								height='50px'
								width='50px'
								alt='ResumeQ icon'
							/> */}
							<Icon icon={ICONS.RESUMEQ} width={24} height={22} />
							<p>ResumeQ</p>
						</Link>

						<Link to='/' className='box'>
							{/* <img
								src={designQ}
								height='50px'
								width='50px'
								alt='DesignQ icon'
							/> */}
							<Icon icon={ICONS.DESIGNQ} width={24} height={20} />
							<p>DesignQ</p>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default GridDropdown;
