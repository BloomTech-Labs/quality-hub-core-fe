// Libraries
import React, { useEffect, useRef } from 'react';

// Styles & Icons
import './CoachCardModal.scss';
import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

const CoachCard = ({ post, setOpen, open }) => {
	const node = useRef();
	let { coach } = post;

	useEffect(() => {
		if (open) {
			document.getElementById('overlay-coachcard-expand').style.display =
				'block';
		} else {
			document.getElementById('overlay-coachcard-expand').style.display =
				'none';
		}
	}, [open]);

	return (
		<div ref={node}>
			<div id='overlay-coachcard-expand' onClick={() => setOpen(false)}></div>
			<div className='coachcard-expand'>
				<button
					className='close-coachcard-expand'
					onClick={() => setOpen(false)}>
					<Icon
						icon={ICONS.CLOSE}
						width={24}
						height={24}
						color='rgba(0, 0, 0, 0.54)'
					/>
				</button>
				<div className="coachcard-expand-inner">
				<div
					className={
						coach.first_name.length > 25 || coach.last_name.length > 25
							? 'coachcard-header-expand coachcard-header-expand-longname'
							: 'coachcard-header-expand'
					}>
					<div className='coachcard-header-txt-expand'>
						<h3>
							{coach.first_name} {coach.last_name}
						</h3>
						<h4>{post.price === 0 ? 'Free' : `$${post.price} per hour`}</h4>
					</div>
					<div className='coach-photo-expand'>
						{coach.image_url ? (
							<img src={coach.image_url} alt='Coach Profile Pic' />
						) : (
							<img
								src='https://www.birdorable.com/img/bird/th440/california-quail.png'
								alt='Coach Profile Pic'
							/>
						)}
					</div>
				</div>
				<div className='coachcard-info-expand'>
					<p>
						<span className='coachcard-icon-expand'>
							<Icon icon={ICONS.BAG} width={16} height={20} color='#595959' />
						</span>
						{post.company} - {post.position}
					</p>
					<p>
						<span className='coachcard-icon-expand'>
							<Icon
								icon={ICONS.LOCATION}
								width={16}
								height={22}
								color='#595959'
							/>
						</span>
						{coach.city}, {coach.state}
					</p>
					<p>
						<span className='coachcard-icon-expand'>
							<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
						</span>
						4.9
					</p>
				</div>
				<div className='coachcard-description-expand'>
					<p>{post.description}</p>
					{/* {need to style the tags here} */}
				<div className='coachcard-tags-container-expand'>
					{post.tags.map(tag => (
						<p className="coachcard-tag-button-expand" key={tag.id}>{tag.name}</p>
					))}
				</div>
				</div>
				<div className='coachcard-footer-expand'>
					<div className='coachcard-links-exand'>
						{post.coach.twitter_url && (
							<a
								href={post.coach.linkedin_url}
								target='_blank'
								rel='noopener noreferrer'>
								<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
							</a>
						)}
						{post.coach.twitter_url && (
							<a
								href={post.coach.twitter_url}
								target='_blank'
								rel='noopener noreferrer'>
								<Icon icon={ICONS.TWITTER} width={24} height={24} />
							</a>
						)}
					</div>
					<button className='interview-button-expand' disabled>
						Request Interview
					</button>
				</div>
			</div>
			</div>
		</div>

	);
};

export default CoachCard;
