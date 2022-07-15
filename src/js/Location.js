import { bodyLock, bodyUnlock } from './utils/functions.js'

// Выбор города
class Location {

	constructor(selector) {
		this.location = document.querySelector(selector)
		this.btn = this.location.querySelector('.location__toggle')
		this.dropdown = this.location.querySelector('.location-dropdown')
		this.locationIsOpen = false

		this._init()
	}

	_init() {
		document.addEventListener('click', e => {

			if (e.target.classList.contains('location__toggle') || e.target.closest('.location__toggle')) {

				if (this.locationIsOpen) this.close()
				else this.open()
			}
			else {

				if (!e.target.classList.contains('location-dropdown') && !e.target.closest('.location-dropdown') ) {

					if (this.locationIsOpen) this.close()
				}

				if (e.target.classList.contains('location__link') || e.target.closest('.location__link')) {
					if (this.locationIsOpen) this.close()
				}

				if (e.target.classList.contains('location-dropdown__close') || e.target.closest('.location-dropdown__close')) {
					if (this.locationIsOpen) this.close()
				}
			}
		})

		this.dropdown.addEventListener('mouseout', e => {

			if (!e.relatedTarget.closest('.location')) {
				this.close()
			}
		})
	}

	open() {
		this.location.classList.add('is-open')
		this.locationIsOpen = true

		bodyLock()
	}

	close() {
		this.location.classList.remove('is-open')
		this.locationIsOpen = false

		bodyUnlock()
	}
}

const location = new Location('.location')
//========================================================================================================================================================
