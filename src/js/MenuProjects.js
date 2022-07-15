import { bodyLock, bodyUnlock } from './utils/functions.js'
import { menu } from './Menu.js'

// Меню с проектами
class MenuProjects {

	constructor(selector) {
		this.menu = document.querySelector(selector)
		this.body = this.menu.querySelector('.menu-proj__body')
		this.itemElems = this.menu.querySelectorAll('.mp-links__item')
		this.btnActive = Array.from(this.itemElems).find(e => e.classList.contains('is-active'))
		this.btnBack = this.menu.querySelector('.menu-proj__back')
		this.btnClose = this.menu.querySelector('.menu-proj__close')
		this.menuIsOpen = false
		this.isSecondScreen = false

		this.init()
	}

	init() {

		if (window.innerWidth > 800) this.menu.style.height = `calc(100vh - ${document.querySelector('.header').clientHeight}px)`

		for (let i = 0; i < this.itemElems.length; i++) {
			const item = this.itemElems[i];
			const btn = item.querySelector('.mp-links__item-btn')

			if (window.innerWidth > 800) {

				item.addEventListener('mouseover', e => {
					this.catActivate(item)
				})
			}
			else {

				btn.addEventListener('click', e => {
					this.catActivate(item)
				})
			}
		}

		document.addEventListener('click', e => {

			if (e.target.classList.contains('[data-project-open]') || e.target.closest('[data-project-open]')) {
				this._btnOpener = e.target.classList.contains('[data-project-open]') ? e.target : e.target.closest('[data-project-open]')

				if (this.menuIsOpen) {
					this.hide()
				}
				else {
					this.show()
				}
			}
		})

		this.btnBack.addEventListener('click', e => {
			this.changeListMob()
		})

		this.btnClose.addEventListener('click', e => {
			this.hide()
		})
	}

	catActivate(btn) {
		this.catDeactivate()

		btn.classList.add('is-active')
		this.btnActive = btn

		this.showBody(btn.dataset.projectBtn)

		this.changeListMob()
	}

	catDeactivate(btn) {
		this.btnActive.classList.remove('is-active')
	}

	changeListMob() {
		if (window.innerWidth > 800) return

		if (!this.isSecondScreen) {
			this.body.style.transform = `translateX(-100vw)`
			this.isSecondScreen = true
			this.btnBack.classList.remove('is-hide')
		}
		else {
			this.body.style.transform = `translateX(0)`
			this.isSecondScreen = false
			this.btnBack.classList.add('is-hide')
		}
	}

	showBody(cat) {
		const bodyShow = this.menu.querySelector('.mp-section.is-show')
		const bodyCurrent = this.menu.querySelector(`.mp-section[data-project-block=${cat}]`)

		bodyShow.classList.remove('is-show')
		bodyCurrent.classList.add('is-show')
	}

	show() {
		this.menu.classList.add('is-show')
		this._btnOpener.classList.add('is-active')
		bodyLock()

		this.menuIsOpen = true

		const _eMenuShow = new Event('show')
		_eMenuShow.data = this

		this.menu.dispatchEvent(_eMenuShow)
	}

	hide() {
		this.menu.classList.remove('is-show')
		this._btnOpener.classList.remove('is-active')
		bodyUnlock()

		if (this.isSecondScreen) {
			this.body.style.transform = `translateX(0)`
			this.isSecondScreen = false
			this.btnBack.classList.add('is-hide')
		}

		this.menuIsOpen = false

		const _eMenuHide = new Event('hide')
		_eMenuHide.data = this

		this.menu.dispatchEvent(_eMenuHide)
	}
}

const menuProjects = new MenuProjects('.menu-proj')

menuProjects.menu.addEventListener('show', e => {
	if (menu.menuIsOpen) {
		menu.close()
	}
})