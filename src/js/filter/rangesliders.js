import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

const rangeElems = document.querySelectorAll('.acc-options__range')

rangeElems.forEach(range => {
	const rangeBody = range.querySelector('.acc-options__range-roller')
	const tfMin = range.querySelector('.acc-options__range-tf.is-min input')
	const tfMax = range.querySelector('.acc-options__range-tf.is-max input')

	const rangeSlider = noUiSlider.create(rangeBody, {
		start: [
			Number(range.dataset.minValue) || Number(range.dataset.min),
			Number(range.dataset.maxValue) || Number(range.dataset.max),
		],
		connect: true,
		step: 1,
		range: {
			'min': Number(range.dataset.min),
			'max': Number(range.dataset.max)
		},
		format: wNumb({
			decimals: 0,
			thousand: ' ',
		})
	})

	rangeSlider.on('update', arr => {
		tfMin.value = arr[0]
		tfMax.value = arr[1]

		tfMin.parentElement.dataset.value = arr[0]
		tfMax.parentElement.dataset.value = arr[1]
	})

	Array.from([ tfMin, tfMax ]).forEach( tf => {

		tf.addEventListener('focus', e => {
            tf.select()
		})

		tf.addEventListener('input', e => {
			rangeSlider.set([ tfMin.value, tfMax.value ])
		})
	} )

	range.RangeSlider = rangeSlider
})