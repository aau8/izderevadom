// Ползунки в разделе фильтра опций
import { removeAllClasses } from "../utils/functions.js";

// Проверяем есть ли выбранные элементы при загрузке страницы. Если есть, то селект заполняется
// const selectedItemElems = document.querySelectorAll('.select:not(.select[data-select-with-checkbox]) .select-dropdown__item.is-selected')

// for (let i = 0; i < selectedItemElems.length; i++) {
// 	const selectedItem = selectedItemElems[i];
// 	const select = selectedItem.closest('.select')
// 	const sTitle = select.querySelector('.select-input__title')
// 	const sInput = select.querySelector('input[type=hidden]')

// 	sTitle.innerText = selectedItem.innerHTML
// 	sInput.value = selectedItem.innerHTML
// 	select.classList.add('is-valid')
// }


class CheckedCheckbox {
	constructor(select) {
		this.select = typeof select === 'string' ? document.querySelector(select) : select

		this.selectIsOpen = false
		this._init()
		this.select.SelectCheckbox = this
	}

	_init() {
		window.addEventListener('click', e => {

			if (e.target !== this.select && e.target.closest('.select-checkbox') !== this.select) {
				if (this.selectIsOpen) this.close()
			}
		})

		this.select.querySelector('.select-input').addEventListener('click', e => {
			if (this.selectIsOpen) this.close()
			else this.open()
		})


		this.selectCheckboxElems = Array.from(this.select.querySelectorAll('.select-dropdown__checkbox input'))
		this.selectedArr = []

		// this._checkAfterLoadDOM()


		this.selectCheckboxElems.forEach(checkedCheckbox => {

			this._checkedInputAfterLoadDOM(checkedCheckbox)

			checkedCheckbox.addEventListener('change', e => {
				this._checkedInput(checkedCheckbox)
			})

		})

		this.selectedArr = this.selectCheckboxElems.filter( input => input.checked )
		this._setData()
	}

	_checkedInputAfterLoadDOM(checkedCheckbox) {

		if (checkedCheckbox.parentElement.classList.contains('select-dropdown__checkbox-all') && checkedCheckbox.checked) {
			this.selectCheckboxElems.map( input => input.checked = checkedCheckbox.checked )
		}
	}

	_checkedInput(checkedCheckbox) {
		const inputElemsExceptInputAll = this.selectCheckboxElems.filter( input => !input.parentElement.classList.contains('select-dropdown__checkbox-all') )
		const checkboxAll = this.selectCheckboxElems.find( input => input.parentElement.classList.contains('select-dropdown__checkbox-all') )

		if (checkedCheckbox.parentElement.classList.contains('select-dropdown__checkbox-all')) {
			this.selectCheckboxElems.map( input => input.checked = checkedCheckbox.checked )
		}

		if (inputElemsExceptInputAll.every( input => input.checked )) {
			checkboxAll.checked = true
		}
		else {
			checkboxAll.checked = false
		}

		this.selectedArr = this.selectCheckboxElems.filter( input => input.checked )
		this._setData()
	}

	_setData() {
		const selectTitle = this.select.querySelector('.select-input__title')
		let value

		if (this.selectedArr.find( input => input.parentElement.classList.contains('select-dropdown__checkbox-all') )) {
			value = 'Все'
		}
		else if (this.selectedArr.length === 0) {
			value = 'Выберите пункт'
		}
		else {
			value = this.selectedArr.map( input => input.parentElement.querySelector('span').textContent ).join(', ')
		}

		selectTitle.innerText = value
	}

	reset() {
		this.selectCheckboxElems.map( input => input.checked = false )
		this.selectedArr = []

		this._setData()
	}

	open() {
		this.select.classList.add('is-open')
		this.selectIsOpen = true
	}

	close() {
		this.select.classList.remove('is-open')
		this.selectIsOpen = false
	}
}


const selectCheckboxElems = document.querySelectorAll('.select-checkbox')

selectCheckboxElems.forEach(elem => {
	new CheckedCheckbox(elem)
})