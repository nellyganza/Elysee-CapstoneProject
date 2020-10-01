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

var when,at,desc;
function requi() {
	when = document.getElementById('select-date').value
	at = document.getElementById('select-times').value
	desc = document.getElementById('type-desc').value
}


document.getElementById('saveRem').onclick =  async function saveBlog() {
	requi()
	console.log(when,at,desc)
	try{
		const savedRem = await firebase.database().ref(`Reminders/${new Date()}`).set({
			When: when,
			At: at,
			Desc: desc
		})
		message('success','Remainder Setted!!')
	}catch(e){
		console.log(e.message)
	}

}
