// const accElems = document.querySelectorAll('.acc__content.has-many-item')

// accElems.forEach( acc => {
// 	const list = acc.querySelector('.acc-category__block-list')
// 	const btnMore = acc.querySelector('.acc-category__block-more')
// } )

class CategoryAccordion {

	constructor(acc) {
		this.acc = acc
		this.list = acc.querySelector('.acc-category__block-list')
		this.itemArr = Array.from(this.list.querySelectorAll('li'))
		this.btnMore = acc.querySelector('.acc-category__block-more')
		this.contentExternal = acc.closest('.acc-category__content')

		this._init()
	}

	_init() {
		this.firstSixItemsHeight = this.itemArr.slice(0, 6).reduce( (accum, e) => accum + e.offsetHeight , 0)
		this.listHeight = this.itemArr.reduce( (accum, e) => accum + e.offsetHeight , 0)

		this.close()

		this.btnMore.addEventListener('click', e => {

			if (this.acc.classList.contains('is-open')) {
				this.close()
			}
			else {
				this.open()
			}
		})
	}

	open() {
		this.list.style.maxHeight = this.listHeight + 'px'
		this.acc.classList.add('is-open')
		this.btnMore.innerText = 'Скрыть'


		let accParent = this.acc

		while (accParent.parentElement.closest('.acc')) {
			accParent = accParent.parentElement.closest('.acc')
			accParent.Accordions.open(accParent, false, this.contentExternal - this.listHeight + 'px')
		}
	}

	close() {
		this.list.style.maxHeight = this.firstSixItemsHeight + 'px'
		this.acc.classList.remove('is-open')
		this.btnMore.innerText = 'Показать еще'
	}
}

if (window.innerWidth > 600) {
	const accElems = document.querySelectorAll('.acc-category__block-column.has-many-items')

	accElems.forEach(acc => {
		const categoryAccordion = new CategoryAccordion(acc)
	})
}