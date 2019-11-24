// Libraries
import React from 'react';
import { createPortal } from 'react-dom';

// Styles
import './DeleteModal.scss';

// Icons
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

const DeleteModal = ({ isShowing, hide, deleteAccount }) =>
	isShowing
		? createPortal(
				<div className='modal-container'>
					<div className='modal-wrapper' aria-modal aria-hidden role='dialog'>
						<div className='modal-header'>
							<Icon
								icon={ICONS.QUESTIONMARK}
								width={24}
								height={24}
								color='#FAAD14'
							/>
							<h2> Do you want to delete your account?</h2>
						</div>
						<p>
							Deleting your account will remove all of your content and data
							associated with it.
						</p>
						<div className='modal-button-cont'>
							<button className='cancel' onClick={hide}>
								Cancel
							</button>
							<button className='ok-button' onClick={deleteAccount}>
								OK
							</button>
						</div>
					</div>
				</div>,
				document.body,
		  )
		: null;

export default DeleteModal;
