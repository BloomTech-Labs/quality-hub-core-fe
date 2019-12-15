import React from 'react';

import SettingsHeader from './subs/1_SettingsHeader';
import DeleteAccount from './subs/2_DeleteAccount';

export default function Setting() {
	return (
		<div>
			<SettingsHeader />
			<DeleteAccount />
		</div>
	);
}
