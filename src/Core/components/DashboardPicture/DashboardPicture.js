import React from 'react';
import './DashboardPicture.scss';

import Avatar from '../../../global/components/Avatar';

export default function UserPicture() {
  return (
    <div className='picture-wrapper'>
      <h2 className='dash-heading'>Avatar</h2>
      <Avatar />
    </div>
  );
}
