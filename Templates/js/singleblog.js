/* eslint-disable no-empty */
const getParams = function (url) {
	const params = {}
	const parser = document.createElement('a')
	parser.href = url
	const query = parser.search.substring(1)
	const vars = query.split('&')
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=')
		params[pair[0]] = decodeURIComponent(pair[1])
	}
	return params
}
const params = getParams(document.URL)
const singleblog = document.getElementById('single-blog')
const { img } = params
singleblog.querySelector('img').src = img
const { title } = params
singleblog.querySelector('h1').innerText = title
const { desc } = params
singleblog.querySelectorAll('p')[0].innerText = desc
const { intro } = params
singleblog.querySelectorAll('p')[1].innerText = intro
const { cont } = params
singleblog.querySelectorAll('p')[2].innerText = cont
const { id } = params
console.log(id)

function commentBlog() {
	if (signedUser()) {
		const comment = document.getElementById('textareacomment').value
		if (comment != '') {
			firebase.database().ref(`Comment/${id}/${new Date()}`).set({
				Id: id,
				Username: document.getElementById('top-username').innerText,
				Comment: comment
			}).catch((e) => {
				if (e) {

				} else {
				}
			})
				.then((e) => {
					message('success', 'Comment Sent !!')
					location.reload()
				})
		} else {
			console.log('no Comment')
		}
	} else {
		document.getElementById('id01').style.display = 'block'
	}
}

window.onload = function getComments() {
	const comm = firebase.database().ref(`Comment/${id}`)
	comm.on('value', getcommentdata, commenterror)
}

function getcommentdata(data) {
	const comments = data.val()
	const keys = Object.keys(comments)
	console.log(keys)
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		console.log(k)
		const name = comments[k].Username
		const comment = comments[k].Comment
		addcomments(comment, name)
	}
}
function commenterror(error) {
	console.log(error.message)
}
const j = 0
function addcomments(comment, name) {
	console.log(comment)
	const com = document.getElementById('comments')
	const fs = document.createElement('div')
	fs.setAttribute('id', 'comment-field')
	com.appendChild(fs)
	const lg = document.createElement('legend')
	lg.innerText = name
	fs.appendChild(lg)
	const p = document.createElement('p')
	p.innerText = comment
	fs.appendChild(p)
}
const lastPlayerRef = firebase.database().ref('Blog/').orderByValue().limitToLast(5)

lastPlayerRef.on('value', (data) => {
	const blos = data.val()
	const keys = Object.keys(blos)
	console.log(keys)
	console.log(data.val())

	for (let i = keys.length - 1; i < keys.length; i--) {
		const k = keys[i]
		const title = blos[k].Title
		const ul = document.querySelector('.recent >ul')
		const li = document.createElement('li')
		li.innerText = title
		ul.appendChild(li)
		console.log(title)
	}
}, (error) => {
	console.log(`Error: ${error.code}`)
})
