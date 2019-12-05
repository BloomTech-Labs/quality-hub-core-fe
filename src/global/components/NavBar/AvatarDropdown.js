// Libraries
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import axios from 'axios';

// Icons
import { blankavatar } from '../../../globalIcons/blankavatar';

const GET_USER = gql`
	query dropdownMenu {
		me {
			id
			first_name
			last_name
			email
			image_url
		}
	}
`;

const EDIT_IMG = gql`
	mutation EditImage($image_url: String) {
		update(image_url: $image_url) {
			image_url
		}
	}
`;

const AvatarDropdown = props => {
	const [getUser, { client, data }] = useLazyQuery(GET_USER);

	const [picture, setPicture] = useState(null);
	const [open, setOpen] = useState(false);

	const node = useRef();

	const [editImage] = useMutation(EDIT_IMG, {
		update(
			cache,
			{
				data: {
					update: { image_url },
				},
			},
		) {
			const { me } = cache.readQuery({ query: GET_USER });
			cache.writeQuery({
				query: GET_USER,
				data: { me: { ...me, image_url } },
			});
		},
	});

	const logout = () => {
		client.clearStore(); //remove token from cache
		document.removeEventListener('mousedown', handleOutsideClick);
		setOpen(false);
		props.setLoggedin(false);
		props.logout();
	};

	//If you click outside the dropdown menu, the menu will close.
	const handleOutsideClick = e => {
		if (props.loggedin) {
			if (node.current) {
				if (node.current.contains(e.target)) {
					return;
				}
				setOpen(false);
			}
		}
	};

	useEffect(() => {
		if (picture) {
			const formData = new FormData();
			formData.append('file', picture);
			formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

			axios
				.post(
					`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
					formData,
				)
				.then(res => {
					editImage({ variables: { image_url: res.data.secure_url } });
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [picture]);

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
		getUser();
	}, [open]);

	return (
		<div ref={node}>
			<div
				style={{
					backgroundImage: `url('${data && data.me.image_url}')`,
				}}
				className='avatar-menu'
				onClick={e => setOpen(!open)}>
				{data && !data.me.image_url && blankavatar()}
			</div>
			{open && (
				<div className='dropdown-content'>
					<div className='dropdown-avatar-camera'>
						<input
							className='image-input-dropdown'
							type='file'
							id='imageInput'
							onChange={e => setPicture(e.target.files[0])}
						/>
						<label htmlFor='imageInput-2'>
							<div className='img-wrapper-dropdown'>
								{data ? //ternary 1
								data.me.image_url ? //ternary 2
								<div
									className='profile-img-dropdown'
									style={{
										backgroundImage: `url('${data.me.image_url}')`,
									}}></div> : //ternary 2
									<div className='profile-img-dropdown2'>{blankavatar(100,100)}</div>: //ternary 1
									<div className='profile-img-dropdown3'>{blankavatar(100,100)}</div>}
							</div>
						</label>
						{/* Avatar image in dropdown menu */}
						{/* This is the offset camera icon */}
						<label htmlFor='imageInput' className='camera-label'>
							<div className='dropdown-camera-icon grey-on-hover'>
								<span role='img' aria-label='camera icon'>
									&#x1F4F7;
								</span>
							</div>
						</label>
					</div>
					{data && (
						<p className='dropdown-menu-name'>
							{data.me.first_name + ' ' + data.me.last_name}
						</p>
					)}
					{data && <p className='dropdown-menu-email'>{data.me.email}</p>}
					<Link to='/dashboard'>
						<button className='manage-btn' onClick={() => setOpen(false)}>
							Manage your Quality Hub account
						</button>
					</Link>
					<hr />
					<Link to='/'>
						<button className='signout-btn' onClick={() => logout()}>
							Sign Out
						</button>
					</Link>
					<hr />
					<div className='dropdown-menu-links-div'>
						{/* Need to link to policy and TOS eventually */}
						<a href='/' className='dropdown-menu-links'>
							Privacy Policy
						</a>
						&#8226;
						<a href='/' className='dropdown-menu-links'>
							Terms of Service
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default AvatarDropdown;
