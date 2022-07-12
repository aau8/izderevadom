import { nodeArray, isMobile } from "./utils/functions.js";

// Карточки шагов
if (!isMobile.any() && window.innerWidth > 550) {
	const stepArray = nodeArray('.c-steps')

	stepArray.forEach( step => {
		const titleWrap = step.querySelector('.c-steps__wrap')
		const title = step.querySelector('.c-steps__title')
		const titleHeight = title.offsetHeight

		step.classList.add('has-hide-content')
		titleWrap.style.transform = `translateY(calc(100% - ${titleHeight}px))`
	} )
}