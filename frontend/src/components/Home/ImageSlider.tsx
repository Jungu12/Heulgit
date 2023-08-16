import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectCreative, Pagination, Navigation } from 'swiper/modules';
import { styled } from 'styled-components';
import { colors } from '@constants/colors';

const StyledSliderContainer = styled.div`
	display: flex;
	margin-top: 24px;

	.swiper {
		--swiper-theme-color: ${colors.primary.primary};
	}

	.swiper-slide-active {
		display: flex;
	}

	.swiper-button-next:after,
	.swiper-button-prev:after {
		font-size: 32px;
		color: ${colors.primary.primatyDark};
	}

	.swiper-pagination {
		bottom: -8px;
	}
`;

const StyledImage = styled.img`
	max-width: 75% !important;
	margin: auto;
	object-fit: contain;
`;

type Props = {
	images: string[];
};

const ImageSlider = ({ images }: Props) => {
	return (
		<StyledSliderContainer onClick={(e) => e.stopPropagation()}>
			<Swiper
				// @ts-expect-error: Temporary fix for grabCursor prop missing in SwiperProps
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				style={{ zIndex: 0 }}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				grabCursor={true}
				effect={'creative'}
				modules={[EffectCreative, Pagination, Navigation]}
				creativeEffect={{
					prev: {
						shadow: true,
						translate: ['-120%', 0, -500],
					},
					next: {
						shadow: true,
						translate: ['120%', 0, -500],
					},
				}}
				className="mySwiper"
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<StyledImage src={image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</StyledSliderContainer>
	);
};

export default ImageSlider;
