// Модальные окна
import DismalModules, { acc } from "./utils/modules.js"

export const modals = new DismalModules.Modals()

modals.get(['category', 'options']).forEach( modal => {
	const header = document.querySelector('.header')

	if (modal === null) return

	modal.addEventListener('modal-open', () => {
		header.classList.add('is-hide')
	})

	modal.addEventListener('modal-close', () => {
		header.classList.remove('is-hide')
	})
})