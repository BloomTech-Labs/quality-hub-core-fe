import React from 'react';

import Icon from '../../../global/globalIcons/Icon';
import { ICONS } from '../../../global/globalIcons/iconConstants';

import './Rating.scss';
const Rating = ({ handleHover, hoverIdx, fields, index, handleClick }) => {
  return (
    <>
      {hoverIdx >= index ?
      <div
        className='star'
        onClick={(e) => handleClick(e, index)} 
        onMouseOver={(e) => handleHover(e, index)}
        onMouseLeave={(e) => handleHover(e, fields.rating)}
      >
        <Icon icon={ICONS.STAR_YELLOW} width={26} height={24} color='#096dd9' 
        />
      </div>
      :
      <div
        className='star'
        onClick={(e) => handleClick(e, index)} 
        onMouseOver={(e) => handleHover(e, index)}
        onMouseLeave={(e) => handleHover(e, fields.rating)}>
        <Icon icon={ICONS.STAR_FILL} width={26} height={24} color='#EFEFEF' 
        />
      </div>
      }
    </>
  )
}

export default Rating;