import { bodyLock, bodyUnlock } from './utils/functions.js'

// Открытие/закрытие моб. меню
class Menu {

	constructor(selector) {
		this.menu = document.querySelector(selector)
		this.container = this.menu.querySelector('.menu__list-container')
		this.btnBack = this.menu.querySelector('.menu__back')
		this.menuIsOpen = false
		this.isSecondScreen = false
		this._init()
	}

	_init() {
		document.addEventListener('click', e => {

			if (e.target.classList.contains('[data-menu-close]') || e.target.closest('[data-menu-close]')) {
				this.close()
			}

			if (e.target.classList.contains('menu') && this.menuIsOpen) {
				this.close()
			}

			if (e.target.classList.contains('[data-menu-open]') || e.target.closest('[data-menu-open]')) {
				this.open()
			}
		})

		if (window.innerWidth <= 1400) {
			const hasSubMenuArr = Array.from(this.menu.querySelectorAll('.has-sub-menu'))

			hasSubMenuArr.forEach(item => {
				const btn = item.querySelector('.sub-link__arrow')
				const subMenu = item.querySelector('.sub-menu')

				btn.addEventListener('click', e => {
					this.showSubMenu(subMenu)
				})
			})

			this.btnBack.addEventListener('click', e => {
				this.showSubMenu()
			})
		}
	}

	showSubMenu(subMenu) {
		if (!subMenu) subMenu = this.menu.querySelector('.sub-menu.is-show')

		if (!this.isSecondScreen) {
			subMenu.classList.add('is-show')
			this.btnBack.classList.remove('is-hide')
			this.container.style.transform = `translateX(-50%)`
			this.isSecondScreen = true
		}
		else {
			subMenu.classList.remove('is-show')
			this.btnBack.classList.add('is-hide')
			this.container.style.transform = `translateX(0)`
			this.isSecondScreen = false
		}
	}

	open() {
		this.menu.classList.add('is-show')
		bodyLock()

		this.menuIsOpen = true
	}

	close() {
		this.menu.classList.remove('is-show')
		bodyUnlock()

		if (this.isSecondScreen) {
			this.container.style.transform = `translateX(0)`
			this.isSecondScreen = false
			this.btnBack.classList.add('is-hide')
		}

		this.menuIsOpen = false
	}
}

export const menu = new Menu('.menu')
