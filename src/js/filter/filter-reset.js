// Сброс настроек
const filter = document.querySelector('.filter__acc form.acc-options__content')

if (filter) {
	const resetBtn = filter.querySelector('.acc-options__reset')
	const selectCheckboxElems = filter.querySelectorAll('.select-checkbox')
	const rangeElems = document.querySelectorAll('.acc-options__range')

	resetBtn.addEventListener('click', e => {
		e.preventDefault()

		selectCheckboxElems.forEach( elem => {
			elem.SelectCheckbox.reset()
		} )

		rangeElems.forEach( elem => {
			elem.RangeSlider.reset()
		} )
	})
}