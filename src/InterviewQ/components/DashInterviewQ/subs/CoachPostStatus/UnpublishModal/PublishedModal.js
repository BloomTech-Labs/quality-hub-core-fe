import React, { useState } from 'react';
import Icon from '../../../../../../global/icons/Icon';
import { ICONS } from '../../../../../../global/icons/iconConstants';

const PublishedModal = ({ node, setSuccess }) => {
	const [loading, setLoading] = useState(true);

	const handleLoad = () => {
		setLoading(false);
	};

	return (
		<div className='published-post-modal' ref={node}>
      <div className= 'published-post-modal-header'  onClick={()=> setSuccess(false)}>
      		<Icon
						icon={ICONS.CLOSE}
						width={24}
						height={24}
            color='#096DD9'
           
					/>
          </div>
			<img src='/images/confirmed.svg' onLoad={handleLoad} />
			{loading === false ? (
				<>
        <div></div>
					<h2>Your coach post is live!</h2>
				</>
			) : null}
		</div>
	);
};

export default PublishedModal;