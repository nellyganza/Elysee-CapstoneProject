/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
window.onload = function getPortfolio() {
	const ref = firebase.database().ref('Portfolio')
	ref.on('value', getData, errorData)
}

function getData(data) {
	const ports = data.val()
	const keys = Object.keys(ports)
	console.log(keys)
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		const title = ports[k].Title
		const exp = ports[k].Explanation
		const link = ports[k].Link

		addblog(k, title, exp, link)
	}
}
function errorData(error) {
	console.log(error.message)
}

function addblog(k, title, exp, link) {
	firebase.storage().ref(`Portfolio/${k}/port.jpg`).getDownloadURL().then((imgUrl) => {
		const pcontainer = document.getElementsByClassName('p-content')[0]
		const div1 = document.createElement('div')
		div1.classList.add('p-item')
		div1.style.backgroundImage = `url('${imgUrl}')`
		div1.style.backgroundRepeat = 'no-repeat'
		div1.style.backgroundSize = '100% 100%'
		pcontainer.appendChild(div1)
		const h3 = document.createElement('h3')
		h3.innerText = title
		div1.appendChild(h3)
		const p = document.createElement('p')
		p.innerText = exp
		div1.appendChild(p)

		const a = document.createElement('a')
		a.setAttribute('target', 'blank-page')
		a.href = link
		div1.appendChild(a)
		const b1 = document.createElement('button')
		b1.innerText = 'Click here to view'
		a.appendChild(b1)
	})
		.catch((error) => {
			console.log(error)
		})
}
