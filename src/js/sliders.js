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
			slidesPerView: 3,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		450: {
			slidesPerView: 2.6,
			centeredSlides: true,
			spaceBetween: 20,
			loop: true,
		},
		0: {
			slidesPerView: 2.2,
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

	slidesPerView: 1,
	effect: 'fade',
	autoHeight: true,

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

	pagination: {
		el: '.trust-visual__pagin-list',
		type: 'bullets',
		clickable: true,
		renderBullet: (i, className) => `<div class="${className} trust-visual__pagin-block"><button class="trust-visual__pagin">${i + 1 <= 9 ? '0' + (i + 1) : i + 1}</button></div>`
	},

	on: {
		paginationRender: ( swiper, paginationEl ) => {

			if (window.innerWidth > 1100) {
				distribInCircle( 265, 370, paginationEl )
			}
			else if (window.innerWidth > 800 && window.innerWidth <= 1100) {
				distribInCircle( 265, 360, paginationEl )
			}
			else if (window.innerWidth > 450 &&window.innerWidth <= 800) {
				distribInCircle( 285, 435, paginationEl )
			}
			else if (window.innerWidth <= 450) {
				distribInCircle( 270, 450, paginationEl )
			}
		}
	}
});

function distribInCircle( start, end, paginationEl ) {
	const bulletBlockElems = paginationEl.querySelectorAll('.trust-visual__pagin-block')
	const part = ( end - start ) / ( bulletBlockElems.length - 1 )
	let counterPart = start

	bulletBlockElems.forEach(bulletBlock => {
		const bullet = bulletBlock.querySelector('.trust-visual__pagin')

		bulletBlock.style.transform = `translate(-50%, -50%) rotate(${counterPart}deg)`
		bullet.style.transform = `translate(-50%, -50%) rotate(-${counterPart}deg)`

		counterPart += part
	})
}