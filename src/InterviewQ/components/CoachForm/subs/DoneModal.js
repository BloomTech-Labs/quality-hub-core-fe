import React from 'react';
import Icon from '../../../../global/icons/Icon';
import { ICONS } from '../../../../global/icons/iconConstants';
import { checkcircle } from '../../../../global/icons/checkcircle';
import { Link } from 'react-router-dom';

const DoneModal = ({ closeWindow, setAvailability }) => {
	return (
		<div className='done-modal'>
			<button className='close-coach-form-button' onClick={() => closeWindow()}>
				<Icon
					icon={ICONS.CLOSE}
					width={24}
					height={24}
					color='rgba(0, 0, 0, 0.54)'
				/>
			</button>
			<div className='done-modal-content'>
				<div className='done-modal-checkcircle'>{checkcircle()}</div>
				<div className='done-modal-all-text'>
					<p className='done-modal-text-1'>Your coach post is live!</p>
					<p className='done-modal-text-2'>
						You can edit your coach post and set your availability in your
						dashboard.
					</p>
				</div>
				<div className='done-modal-buttons'>
					<button onClick={() => closeWindow()}>Skip for now</button>
					<Link
						to='/interviewq/settings'
						className='add-coach-set-availability-link'>
						<button
							onClick={() => setAvailability()}
							className='done-modal-set-availability-btn'>
							Set Availability
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DoneModal;
