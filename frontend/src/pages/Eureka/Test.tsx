import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { styled } from 'styled-components';

const style = {
	height: 100,
	border: '1px solid green',
	margin: 6,
	padding: 8,
};

const StyledContainer = styled.div`
	height: 400px;
	overflow: auto;
`;

const Test = () => {
	const [items, setItems] = useState(Array.from({ length: 20 }));

	const fetchMoreData = () => {
		console.log('다음 페이지');
		setTimeout(() => {
			setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
		}, 1500);
	};

	return (
		<StyledContainer>
			<h1>demo: react-infinite-scroll-component</h1>
			<hr />
			<InfiniteScroll
				dataLength={items.length}
				next={fetchMoreData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				height={700}
			>
				{items.map((i, index) => (
					<div style={style} key={index}>
						div - #{index}
					</div>
				))}
			</InfiniteScroll>
		</StyledContainer>
	);
};

export default Test;
