/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// Display of Blog
window.onload = function getBlogl() {
	const ref = firebase.database().ref('Blog')
	ref.on('value', getData, errorData)

	const ref2 = firebase.database().ref('Contact')
	ref2.on('value', getcData, errorcData)

	const ref3 = firebase.database().ref('Portfolio')
	ref3.on('value', getfData, errorfData)

	const ref4 = firebase.database().ref('Reminders')
	ref4.on('value', getEvent, eventerror)
}
setInterval(function() {
    // catch all the errors.
    currentTime()
},1000)
let events = [];
function getEvent(data) {
    evens  = data.val()
	const keys = Object.keys(evens)
	console.log(evens)
	console.log("Remainder",keys)
	keys.forEach((key)=>{
        const event = {when:evens[key].When,at:evens[key].At,desc: evens[key].Desc}
        events.push(event)
	});
    console.log("events",events)
}
function eventerror(error) {
	console.log(error.message)
}




function notifyMe(body) {

    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Remainder!', {
                body: body,
                icon: 'https://bit.ly/2DYqRrh',
            });
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Remainder!', {
                        body: body,
                        icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}



function currentTime(){
	var list_events = events;
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDay()
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	var sdate = year+"-"+month+"-"+day;
	var stime = hours+":"+minutes;
	if(list_events.when===sdate && list_events.at === stime){
		notifyMe(list_events.desc);
	}
};






function getData(data) {
	const blogs = data.val()
	const keys = Object.keys(blogs)
	document.getElementById('num-of-ent').value = keys.length;
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		const title = blogs[k].Title
		addblog(k, title, i)
	}
}
function errorData(error) {
	console.log(error.message)
}
let j = 0; let i = 1
function addblog(k, title, id) {
	firebase.storage().ref(`BlogImage/${k}/blog.jpg`).getDownloadURL().then((imgUrl) => {
		const blo = document.getElementById('blog-list')
		console.log('Blog-List ==> ', blo)
		console.log('Item :', k + title + id)
		let dtab
		console.log('ID =', id)
		console.log('J =', j)
		const ch = j % 5 === 0
		console.log('Choice = ', ch)
		if (ch) {
			console.log('1')
			dtab = document.createElement('div')
			dtab.setAttribute('id', `tab${i}`)
			dtab.setAttribute('class', 'tab-list')
			blo.appendChild(dtab)
			console.log('In CH True :', dtab)
			i++
		} else {
			console.log('J IN Else ', j)
			console.log('I IN Else ', i)
			dtab = document.getElementById(`tab${i - 1}`)
			console.log('Value :', dtab)
		}

		const ldiv = document.createElement('div')
		ldiv.classList.add('art-item')
		ldiv.setAttribute('onclick','setBlogs(event)')
		dtab.appendChild(ldiv)

		const limg = document.createElement('img')
		limg.setAttribute('src', imgUrl)
		limg.setAttribute('width', '80px')
		limg.setAttribute('height', '60')
		limg.setAttribute('alt', 'Blog  Image')
		ldiv.appendChild(limg)
		const lh = document.createElement('h1')
		lh.style.fontSize = '16px'
		lh.innerHTML = `<strong style="margin-right:5px,">ID :${k}</strong> <br>Title  :${title}`
		ldiv.appendChild(lh)

		if (ch) {
			const butab = document.getElementsByClassName('number-tabs')[0]
			const label = document.createElement('label')
			label.setAttribute('onclick', `nextTab(event, 'tab${i - 1}')`)
			label.setAttribute('class', 'nextlinks')
			label.innerHTML = `${i - 1}`
			butab.appendChild(label)
		}

		j++
	})
		.catch((error) => {
			console.log(error)
		})
}

function nextTab(event, tannum) {
	let i, tablist, nextlinks
	tablist = document.getElementsByClassName('tab-list')
	for (i = 0; i < tablist.length; i++) {
		tablist[i].style.display = 'none'
	}
	nextlinks = document.getElementsByClassName('nextlinks')
	for (i = 0; i < nextlinks.length; i++) {
		nextlinks[i].className = nextlinks[i].className.replace(' active', '')
	}
	document.getElementById(tannum).style.display = 'block'
	event.currentTarget.className += ' active'
}

// Contact from to read Messages

function getcData(data) {
	const conacts = data.val()
	const keys = Object.keys(conacts)
	console.log(keys)
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		const { Name } = conacts[k]
		const email = conacts[k].Email
		const Phone = conacts[k].PhoneNumber
		const address = conacts[k].Address
		const comment = conacts[k].Comment

		addComment(Name, email, Phone, address, comment)
	}
}
function errorcData(error) {
	console.log(error.message)
}

function addComment(Name, email, Phone, address, comment) {
	console.log(Name, email, Phone, address, comment)
	const ccontainer = document.getElementById('contact-list')
	const innerMessage = document.createElement('div')
	innerMessage.classList.add('message-item')

	ccontainer.appendChild(innerMessage)

	const namelbl = document.createElement('label')
	namelbl.innerText = `Full Name : ${Name}`
	innerMessage.appendChild(namelbl)

	const emaillbl = document.createElement('label')
	emaillbl.setAttribute('id', 'button1')
	emaillbl.setAttribute('value', `${email}`)
	emaillbl.setAttribute('role', 'button')
	emaillbl.setAttribute('onclick', `parent.location="mailto:${email}"`)
	emaillbl.innerText = `Email Address : ${email}`
	innerMessage.appendChild(emaillbl)
	const phonelbl = document.createElement('label')
	phonelbl.innerText = `Phone Number : ${Phone}`
	innerMessage.appendChild(phonelbl)
	const addresslbl = document.createElement('label')
	addresslbl.innerText = `Physical Address : ${address}`
	innerMessage.appendChild(addresslbl)
	const commentlbl = document.createElement('textarea')
	commentlbl.innerText = comment
	innerMessage.appendChild(commentlbl)
}

function getfData(data) {
	const ports = data.val()
	const keys = Object.keys(ports)
	console.log(keys)
	for (let i = 0; i < keys.length; i++) {
		const k = keys[i]
		const title = ports[k].Title

		addPort(k, title, i)
	}
}
function errorfData(error) {
	console.log(error.message)
}
let t = 0, m = 1
function addPort(k, title, id) {
	firebase.storage().ref(`Portfolio/${k}/port.jpg`).getDownloadURL().then((imgUrl) => {
		const blo = document.getElementById('port-listid')
		console.log(blo)
		console.log(k + title + id)
		let dtab
		if (t % 5 === 0) {
			console.log('1')
			dtab = document.createElement('div')
			dtab.setAttribute('id', `ftab${m}`)
			dtab.setAttribute('class', 'ftab-list')
			blo.appendChild(dtab)
			m++
		} else {
			dtab = document.getElementById(`ftab${m - 1}`)
			console.log(dtab)
		}

		const ldiv = document.createElement('div')
		ldiv.classList.add('art-item','port-art-item')
		ldiv.setAttribute('onclick','setPorts(event)')
		dtab.appendChild(ldiv)

		const limg = document.createElement('img')
		limg.setAttribute('src', imgUrl)
		limg.setAttribute('width', '80px')
		limg.setAttribute('height', '60')
		limg.setAttribute('alt', 'Portfolio  Image')
		ldiv.appendChild(limg)
		const lh = document.createElement('h1')
		lh.style.fontSize = '16px'
		lh.innerHTML = `<strong style="margin-right:5px,">ID :${k}</strong> <br>Title  :${title}`
		ldiv.appendChild(lh)

		if (t % 5 === 0) {
			const butab = document.getElementById('fnumber-tabs')
			const label = document.createElement('label')
			label.setAttribute('onclick', `fnextTab(event, 'ftab${m - 1}')`)
			label.setAttribute('class', 'fnextlinks')
			label.innerHTML = `${m - 1}`
			butab.appendChild(label)
		}

		t++
	})
		.catch((error) => {
			console.log(error)
		})
}

function fnextTab(event, tannum) {
	let i, tablist, nextlinks
	tablist = document.getElementsByClassName('ftab-list')
	for (i = 0; i < tablist.length; i++) {
		tablist[i].style.display = 'none'
	}
	nextlinks = document.getElementsByClassName('fnextlinks')
	for (i = 0; i < nextlinks.length; i++) {
		nextlinks[i].className = nextlinks[i].className.replace(' active', '')
	}
	document.getElementById(tannum).style.display = 'block'
	event.currentTarget.className += ' active'
}


async function setBlogs(event){
	const info = event.currentTarget
	var id = info.querySelector('h1> strong').innerText;
	id = id.split(":");
	id = id[1];
	const imgurl = await firebase.storage().ref(`BlogImage/${id}/blog.jpg`).getDownloadURL()
		document.getElementById('imageid').src = imgurl
	await firebase.database().ref(`Blog/${id}`).on('value', (snapshot) => {
		document.getElementById('blogid').value = snapshot.val().Id
		document.getElementById('titleid').value = snapshot.val().Title
		document.getElementById('descid').value = snapshot.val().Descripttion
		document.getElementById('dateid').value = snapshot.val().Date
		document.getElementById('introid').value = snapshot.val().Introduction
		document.getElementById('contid').value = snapshot.val().Content
	})
}


async function setPorts(event){
	const info = event.currentTarget
	var id = info.querySelector('h1> strong').innerText;
	id = id.split(":");
	id = id[1];
	const imgurl = await firebase.storage().ref(`Portfolio/${id}/port.jpg`).getDownloadURL()
		document.getElementById('pimageid').src = imgurl
	await firebase.database().ref(`Portfolio/${id}`).on('value', (snapshot) => {
		document.getElementById('ppotid').value = snapshot.val().Id
		document.getElementById('ptitle').value = snapshot.val().Title
		document.getElementById('plink').value = snapshot.val().Link
		document.getElementById('pexp').value = snapshot.val().Explanation
	})
}

const ADMIN_EMAILS = ['nishimwelys@gmail.com','karenzi123@gmail.com']
function checkAdmin(email) {
	if(ADMIN_EMAILS.includes(email)){
		document.getElementById('tabform').style.display = 'block'
	}
	else
	{
		window.location.href = "../index.html";
	}
}