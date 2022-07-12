import Swiper, { Navigation, Pagination, EffectFade } from "swiper"

const reviewsSwiper = new Swiper(".reviews__slider", {
    modules: [ Navigation ],


	breakpoints: {
		950: {
			slidesPerView: 3,
			spaceBetween: 20,
			centeredSlides: false,
			loop: true,
		},
		768: {
			slidesPerView: 2.5,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		600: {
			slidesPerView: 2,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		450: {
			slidesPerView: 1.6,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		0: {
			slidesPerView: 1.2,
			centeredSlides: true,
			spaceBetween: 10,
			loop: true,
		},
	},

    navigation: {
        nextEl: ".reviews__arrow-next",
        prevEl: ".reviews__arrow-prev",
    },
});

const gallerySwiper = new Swiper(".gallery__slider", {
    modules: [ Navigation ],

	breakpoints: {
		950: {
			slidesPerView: 5,
			spaceBetween: 20,
			centeredSlides: false,
			loop: true,
		},
		768: {
			slidesPerView: 4,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		600: {
			slidesPerView: 2,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		450: {
			slidesPerView: 1.6,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		0: {
			slidesPerView: 1.2,
			centeredSlides: true,
			spaceBetween: 10,
			loop: true,
		},
	},

    navigation: {
        nextEl: ".gallery__arrow-next",
        prevEl: ".gallery__arrow-prev",
    },
});

const trustSwiper = new Swiper(".trust-slider__slider", {
    modules: [ Navigation, Pagination, EffectFade ],

	effect: 'fade',

	breakpoints: {
		// 950: {
		// 	slidesPerView: 5,
		// 	spaceBetween: 20,
		// 	centeredSlides: false,
		// 	loop: true,
		// },
		// 768: {
		// 	slidesPerView: 4,
		// 	centeredSlides: true,
		// 	spaceBetween: 20,
		// 	loop: true,
		// },
		// 600: {
		// 	slidesPerView: 2,
		// 	centeredSlides: true,
		// 	spaceBetween: 20,
		// 	loop: true,
		// },
		// 450: {
		// 	slidesPerView: 1.6,
		// 	centeredSlides: true,
		// 	spaceBetween: 20,
		// 	loop: true,
		// },
		// 0: {
		// 	slidesPerView: 1.2,
		// 	centeredSlides: true,
		// 	spaceBetween: 10,
		// 	loop: true,
		// },
	},

    navigation: {
        nextEl: ".trust-slider__arrow-next",
        prevEl: ".trust-slider__arrow-prev",
    },
});