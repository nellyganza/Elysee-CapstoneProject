/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let ropend = false
let nopend = false
function openrem() {
	if (!ropend) {
		document.getElementById('rem').style.display = 'flex'
		ropend = true
	} else {
		document.getElementById('rem').style.display = 'none'
		ropend = false
	}
}
function opennum() {
	if (!nopend) {
		document.querySelector('.other-rem >input').style.display = 'inline'
		nopend = true
	} else {
		document.querySelector('.other-rem >input').style.display = 'none'
		nopend = false
	}
}
