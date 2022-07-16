const headerArea = document.querySelector('.header-area')
const header = headerArea.querySelector('.header')
let elY = 0;
let scrollY = 0;

headerArea.style.height = header.clientHeight + 'px'

fixedMenu()
window.addEventListener('scroll', fixedMenu)

function fixedMenu() {
    const el = document.querySelector('.header');
    const height = el.offsetHeight;
    // const pos = window.pageYOffset;
    // const diff = scrollY - pos;

    // elY = Math.min(0, Math.max(-height, elY + diff));

	// if (elY < 0) {
	// 	header.classList.remove('is-show')
	// }
	// else {
	// 	header.classList.add('is-show')
	// }

    // scrollY = pos;

	if (window.scrollY > 400) {
		if (!header.classList.contains('is-fixed')) {
			header.classList.add('is-fixed')
			header.setAttribute('data-lp', '')
			header.style.top = -header.clientHeight + 'px'
			header.classList.add('is-show')
		}
	}
	else {

		if (header.classList.contains('is-fixed')) {
			header.removeAttribute('data-lp')
			header.classList.remove('is-show')

			setTimeout(e => {
				header.classList.remove('is-fixed')
				header.style.top = 0
			}, 100)
		}
	}
}