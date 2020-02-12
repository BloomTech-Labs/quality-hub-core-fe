import { useEffect } from 'react';

// checks if a modal or dropdown menu is open, if open, clicking outside the modal will close it
export const useModalEffect = (openState, eventHandler) => {
  useEffect(() => {
		if (openState) {
			document.addEventListener('mousedown', eventHandler);
		} else {
			document.removeEventListener('mousedown', eventHandler);
		}
	}, [openState]);
};