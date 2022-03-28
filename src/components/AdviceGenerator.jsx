import React, { useState, useEffect } from 'react';
import dice from '/assets/icon-dice.svg';
import dividerDesktop from '/assets/pattern-divider-desktop.svg';
import dividerMobile from '/assets/pattern-divider-mobile.svg';

const AdviceGenerator = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		try {
			const response = await fetch('https://api.adviceslip.com/advice');
			const data = await response.json();
			setData(data);
			setIsLoading(false);
			console.log(data.slip);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => fetchData(), []);

	const handleOnClick = () => {
		fetchData();
	};

	if (isLoading) {
		return (
			<div className='card'>
				<p>loading...</p>
			</div>
		);
	}

	return (
		<>
			<div className='card' role={'main'}>
				<span>{`ADVICE #${data.slip.id}`}</span>
				<p className='quote'>"{data.slip.advice}"</p>
				<img
					className='divider-desktop'
					src={dividerDesktop}
					alt='divider'
				/>
				<img
					className='divider-mobile'
					src={dividerMobile}
					alt='divider'
				/>
			</div>
			<button onClick={handleOnClick}>
				<img src={dice} alt='dice icon' />
			</button>
		</>
	);
};

export default AdviceGenerator;
