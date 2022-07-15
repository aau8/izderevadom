// Открытие видео при клике по карточкам с отзывами
import { modals } from './modals.js'

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