import React from 'react';

export default function AccountIcon({ userKey }) {
	console.log(userKey);

	return userKey && userKey.includes('linkedin') ? (
		<span>LI!</span>
	) : userKey.includes('github') ? (
		<span>Git!</span>
	) : userKey.includes('personal') ? (
		<span>Personal!</span>
	) : userKey.includes('twitter') ? (
		<span>Twitter!</span>
	) : userKey.includes('portfolio') ? (
		<span>Portfolio!</span>
	) : userKey.includes('blog') ? (
		<span>Blog!</span>
	) : null;
}
