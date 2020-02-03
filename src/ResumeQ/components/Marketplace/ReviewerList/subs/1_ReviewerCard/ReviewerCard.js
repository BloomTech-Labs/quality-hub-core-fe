// Libraries
import React from 'react';
import { Link } from 'react-router-dom';


// Styles & Icons
import './ReviewerCard.scss';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';
import { star, greystar } from '../../../../../../global/icons/star';

const ReviewerCard = ({ listing }) => {

	let { coach } = listing;
	let maxWidth = 100;

	const linkedin =
		coach.linkedin_url &&
		(coach.linkedin_url.startsWith('http')
			? coach.linkedin
			: `http://${coach.linkedin_url}`);
	const twitter =
		coach.twitter_url &&
		(coach.twitter_url.startsWith('http')
			? coach.linkedin
			: `http://${coach.twitter_url}`);
	const fullName = `${coach.first_name} ${coach.last_name}`;

	return (
		<div className='coach-container'>
			<div className='coach-card'>
				<div id='overlay-confirm-interview'></div>
				<div className='coachcard-header'>
					<div className='coachcard-header-txt'>
						<h3>
							{fullName.length > 25
								? `${fullName.substring(0, 25)}...`
								: fullName}
						</h3>
						<h4 className='coach-price'>
							{listing.price === 0 ? 'Free' : `$${listing.price}`}
						</h4>
					</div>
					<div className='coach-photo'>
						{coach.image_url ? (
							<img src={coach.image_url} alt='Coach Profile Pic' height="80" width="80" />
						) : (
								<div className='blank-image'>
									<Icon
										icon={ICONS.BLANK_AVATAR}
										color='white'
										width={80}
										height={90}
									/>
								</div>
							)}
					</div>
				</div>
				<div className='coachcard-info'>
					<p>
						<span className='coachcard-icon industry'>
							<Icon icon={ICONS.BAG} width={18} height={18} color='#595959' />
						</span>
						<span className='text'>{`${listing.company} - ${listing.position}`}</span>
					</p>
					<p>
						<span className='coachcard-icon'>
							<Icon
								icon={ICONS.LOCATION}
								width={18}
								height={18}
								color='#595959'
							/>
						</span>
						<span className='coachcard-posloc'>
							{coach.city}, {coach.state}
						</span>
					</p>
					{/* <p>
					<span className='coachcard-icon'>
						<Icon icon={ICONS.STAR} width={19} height={20} color='#595959' />
					</span>
					<span>{data && data.ratingByCoach ? data.ratingByCoach : '-'}</span>
				</p> */}
				</div>
				<div className='coachcard-description'>
					<div className='p-ellipsis'>
						{listing.description.substring(0, maxWidth)}
						{/* <span>
						{listing.description.length >= maxWidth ? '...' : ''}{' '}
						<CoachModal listing={listing} openReviewModal={openReviewModal} />
					</span> */}
					</div>
				</div>
				<div className='coachcard-rating' onClick={console.log('')}>
					{coach.average_coach_rating &&
						<span className='coachcard-stars'>
							{coach.average_coach_rating >= 0.5 ? star() : greystar()}
							{coach.average_coach_rating >= 1.5 ? star() : greystar()}
							{coach.average_coach_rating >= 2.5 ? star() : greystar()}
							{coach.average_coach_rating >= 3.5 ? star() : greystar()}
							{coach.average_coach_rating >= 4.5 ? star() : greystar()}
						</span>
					}
					<span className='text rating-score'>
						{coach.average_coach_rating && <span>{coach.average_coach_rating}  --  </span>}
						<span>{` (${
							coach.average_coach_rating
								? coach.ratingsReceived
								: 'No'
							} Reviews)`}</span>
					</span>
				</div>
				<div className='coachcard-footer'>
					<div className='coachcard-links'>
						{listing.coach.linkedin_url && (
							<a href={linkedin} target='_blank' rel='noopener noreferrer'>
								<Icon icon={ICONS.LINKEDIN} width={24} height={24} />
							</a>
						)}
						{listing.coach.twitter_url && (
							<a href={twitter} target='_blank' rel='noopener noreferrer'>
								<Icon icon={ICONS.TWITTER} width={24} height={24} />
							</a>
						)}
					</div>
					{coach.id === localStorage.getItem('id') ? (
						<button className='interview-button-disabled'>Request</button>
					) : (
							<button className='interview-button'>
								<Link
									to={{
										pathname: `/resumeq/request/${coach.id}`,
										state: {
											coachName: `${listing.coach.first_name} ${listing.coach.last_name}`,
											listing: listing
										},
									}}>
									Request
						</Link>
							</button>
						)}
				</div>
				{/* {reviewModal && (
				<ReviewModal
					reviewnode={node}
					openReviewModal={openReviewModal}
					reviewList={coachReviews.reviewsByCoach}
					rating={data.ratingByCoach}
					reviewModal={reviewModal}
				/>
			)} */}

			</div>
		</div>

	);
};

export default ReviewerCard;
