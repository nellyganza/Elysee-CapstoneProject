/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
// Display of Blog

window.onload = function getBlog() {
	const ref = firebase.database().ref('Blog')
	ref.on('value', getData, errorData)
}

function getData(data) {
	const blogs = data.val()
	const keys = Object.keys(blogs)
	console.log(keys)
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		const title = blogs[k].Title
		const desc = blogs[k].Descripttion
		const date = blogs[k].Date
		const intro = blogs[k].Introduction
		const cont = blogs[k].Content

		addblog(k, title, desc, date, intro, cont)
	}
}
function errorData(error) {
	console.log(error.message)
}

function addblog(k, title, desc, date, intro, cont) {
	firebase.storage().ref(`BlogImage/${k}/blog.jpg`).getDownloadURL().then((imgUrl) => {
		const otherblogcontainer = document.getElementById('other-blog')
		console.log(otherblogcontainer)
		const figure = document.createElement('figure')
		figure.classList.add('single-blog')
		figure.setAttribute('onclick', 'singleBlog(event)')
		otherblogcontainer.appendChild(figure)
		const img = document.createElement('img')
		img.setAttribute('src', imgUrl)
		img.setAttribute('width', '100%')
		img.setAttribute('height', '200px')
		img.setAttribute('alt', 'This is The Image of the Blog post')
		figure.appendChild(img)
		const figcap = document.createElement('figcaption')
		figure.appendChild(figcap)
		const h1 = document.createElement('h1')
		h1.classList.add('title')
		h1.innerHTML = title
		figcap.appendChild(h1)
		const h3 = document.createElement('h3')
		figcap.appendChild(h3)
		const p1 = document.createElement('p')
		p1.classList.add('desc')
		p1.value = desc
		const p2 = document.createElement('p')
		p2.classList.add('date')
		p2.value = date
		h3.append(`${p1.value} , ${p2.value}`)
		const p = document.createElement('p')
		p.width = '100%'
		figcap.appendChild(p)
		p.innerText = intro
		const pp = document.createElement('p')
		pp.setAttribute('hidden', true)
		pp.innerText = cont
		figcap.appendChild(pp)

		const h5 = document.createElement('h5')
		h5.setAttribute('hidden', true)
		h5.innerText = k
		figcap.appendChild(h5)
	})
		.catch((error) => {
			console.log(error)
		})
	test()
}
let i = 0
const tid = setInterval(test, 5000)
function test() {
	try {
		const x = document.getElementsByClassName('single-blog')
		if (i === x.length) i = 0
		const y = x[i].lastChild
		const blo = document.getElementById('main-blog')
		blo.firstElementChild.innerHTML = y.firstChild.innerHTML
		blo.getElementsByTagName('img')[0].src = x[i].firstChild.src
		const into = blo.lastElementChild
		into.firstElementChild.innerText = y.getElementsByTagName('p')[0].innerText
		i++
	} catch (e) {

	}
}
