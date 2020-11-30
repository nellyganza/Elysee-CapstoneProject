/* eslint-disable func-names */
/* eslint-disable for-direction */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
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
const { id } = params

getBlogInfo(id);
async function getBlogInfo(id){
	const singleblog = document.getElementById('single-blog')
	const imgurl = await firebase.storage().ref(`BlogImage/${id}/blog.jpg`).getDownloadURL()
	singleblog.querySelector('img').src = imgurl
	await firebase.database().ref(`Blog/${id}`).on('value', (snapshot) => {
		singleblog.querySelector('h1').innerHTML = snapshot.val().Title+"<br><i> Posted at "+snapshot.val().Date+"</i>"
		singleblog.querySelectorAll('div')[0].innerHTML = snapshot.val().Descripttion
		singleblog.querySelectorAll('div')[1].innerHTML = snapshot.val().Introduction
		singleblog.querySelectorAll('div')[2].innerHTML = snapshot.val().Content
	})

}

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
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
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

	for (let i = keys.length - 1; i < keys.length; i--) {
		const k = keys[i]
		const title = blos[k].Title
		const ul = document.querySelector('.recent >ul')
		const li = document.createElement('li')
		li.innerText = title
		ul.appendChild(li)
	}
}, (error) => {
	console.log(`Error: ${error.code}`)
})
