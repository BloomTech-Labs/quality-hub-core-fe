import React from 'react';

export const Intres = (props) => (
	<div>
		<p className="intres">
			<span className="detail-span">{document()}</span>
			What do you want to get out of your mock interview?
									</p>
		<p className="indented">{props.info.interviewGoals}</p>
		<p className="indented intres">
			What kind of questions do you want to focus on?
									</p>
		<p className="indented last-cal-detail">
			{props.info.interviewQuestions}
		</p>
	</div>
);
