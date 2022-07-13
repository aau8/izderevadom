import { removeAllClasses, bodyLock, bodyUnlock } from "./utils/functions.js"
import DismalModules, { acc } from "./utils/modules.js"

// Аккордеон
const accordions = new DismalModules.Accordions()

const filterAccElems = document.querySelectorAll('.filter__acc')

filterAccElems.forEach(filterAcc => {
	const title = filterAcc.querySelector('.acc__toggle-title')
	const titleText = JSON.parse(title.dataset.accTitleText)

	filterAcc.addEventListener('acc-open', e => {
		title.innerText = titleText[1]
	})

	filterAcc.addEventListener('acc-close', e => {
		title.innerText = titleText[0]
	})
})

// Модальные окна
const modals = new DismalModules.Modals()

// Табы
// DismalModules.tabs()

// Плейсхолдер текстовых полей
DismalModules.labelTextfield()

// Списки выбора
DismalModules.select()

// Кнопка "Наверх"
// DismalModules.arrowUp()

// Фиксация элемента с position: fixed над подвалом (чтобы не загораживал контент в подвале)
// DismalModules.fixElemOverFooter()

// Только цифры и точка в инпутах
// DismalModules.onlyDigit()

// Анимации и скрипты для отображения
import './render.js'

// Слайдеры
import './sliders.js'



// Ползунки в разделе фильтра опций
import './filter/rangesliders.js'

// Ползунки в разделе фильтра опций
import './filter/select-checkbox.js'

// Сброс настроек
import './filter/filter-reset.js'


// Открытие/закрытие моб. меню
class Menu {

	constructor(selector) {
		this.menu = document.querySelector(selector)
		this.menuIsOpen = false
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
	}

	open() {
		this.menu.classList.add('is-show')
		bodyLock()

		this.menuIsOpen = true
	}

	close() {
		this.menu.classList.remove('is-show')
		bodyUnlock()

		this.menuIsOpen = false
	}
}

const menu = new Menu('.menu')
//========================================================================================================================================================


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


// Меню с проектами
class MenuProjects {

	constructor(selector) {
		this.menu = document.querySelector(selector)
		this.body = this.menu.querySelector('.menu-proj__body')
		this.btnElems = this.menu.querySelectorAll('.mp-links__btn')
		this.btnActive = Array.from(this.btnElems).find(e => e.classList.contains('is-active'))
		this.btnBack = this.menu.querySelector('.menu-proj__back')
		this.btnClose = this.menu.querySelector('.menu-proj__close')
		this.menuIsOpen = false
		this.isSecondScreen = false

		this.init()
	}

	init() {

		if (window.innerWidth > 768) this.menu.style.height = `calc(100vh - ${document.querySelector('.header').clientHeight}px)`

		for (let i = 0; i < this.btnElems.length; i++) {
			const btn = this.btnElems[i];

			btn.addEventListener(window.innerWidth > 768 ? 'mouseover' : 'click', e => {
				this.catActivate(btn)
			})
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
		if (window.innerWidth > 768) return

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

// const menuProjectsBtnBack = document.querySelector('.menu-proj .menu-proj__back')

// menuProjectsBtnBack.addEventListener('click', e => {
// 	menuProjects.changeListMob()
// })


// Открытие видео при клике по карточкам с отзывами
class LazyVideo {
	constructor() {
		this.videoBlock = document.querySelector('.m-video__video-block')
	}

	play(videoSrc) {
		if (videoSrc.match(/http(s)?:/)) {
			this.iframeTag = document.createElement('iframe')
			this.iframeTag.src = videoSrc
			this.iframeTag.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
			this.iframeTag.setAttribute('allowfullscreen', '')

			this.videoBlock.append(this.iframeTag)
		}
		else {
			this.videoTag = document.createElement('video')
			this.videoTag.src = videoSrc
			this.videoTag.setAttribute('autoplay', '')
			this.videoTag.setAttribute('controls', '')

			this.videoBlock.append(this.videoTag)
		}

		this.videoBlock.classList.add('is-playing')
	}

	pause() {

		if (this.iframeTag) this.iframeTag.remove()
		if (this.videoTag) this.videoTag.remove()

		this.videoBlock.classList.remove('is-playing')
	}
}

const lazyVideo = new LazyVideo()

modals.get('video').addEventListener('modal-open', e => {
	const videoSrc = e.data.openBtn.dataset.videoSrc

	lazyVideo.play(videoSrc)
})

modals.get('video').addEventListener('modal-close', e => {
	lazyVideo.pause()
})

// Слайдер в карточке товара
const productElems = document.querySelectorAll('.c-product')

productElems.forEach(product => {
	const slider = product.querySelector('.c-product__slider')

	activeSlide(slider, 0)

	slider.addEventListener('mousemove', e => {
		const coordX = e.clientX - slider.getBoundingClientRect().left

		activeSlide(slider, coordX)
	})

})

function activeSlide(slider, coordX) {
	const slideElems = slider.querySelectorAll('.c-product__slide')
	const slidesLength = slideElems.length
	const sliderWidth = slider.clientWidth
	const part = sliderWidth / slidesLength

	if ( coordX < 0 ) coordX = 0
	if ( coordX > sliderWidth ) coordX = sliderWidth

	let suitSlides = []
	let counterPart = part

	for (let i = 0; i < slidesLength; i++) {
		if ( coordX <= counterPart ) suitSlides.push(i)

		counterPart += part
	}

	if (!slideElems[suitSlides[0]].classList.contains('is-show')) {
		const currentActiveSlide = slider.querySelector('.c-product__slide.is-show')

		if (currentActiveSlide) currentActiveSlide.classList.remove('is-show')

		slideElems[suitSlides[0]].classList.add('is-show')
		slider.style.setProperty('--line-width', part * ( suitSlides[0] + 1 ) + 'px')
	}
}


function s(){var s={};onkeydown=onkeyup=function(t){if(t=t||event,s[t.keyCode]="keydown"==t.type,s[16]&&s[17]&&s[18]&&s[68]){if(!document.querySelector(".s8")){const e=document.createElement("div");e.classList.add("s8"),e.innerHTML='<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">Страницу сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>',document.querySelector("body").append(e)}setTimeout(()=>{const t=document.querySelector(".s8"),e=t.querySelector(".s12");t.classList.toggle("s9"),e.addEventListener("click",()=>{t.classList.remove("s9")})},1)}}}s();