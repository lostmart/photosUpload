const form = document.querySelector('[data-form-photo]')
const fileInput = form.elements[2]
let picToSend = null

axios
	.get('http://localhost:3000/api')
	.then(function (response) {
		// handle success
		console.log(response)
	})
	.catch(function (error) {
		// handle error
		console.log(error)
	})
	.then(function () {
		// always executed
	})

fileInput.addEventListener('change', (e) => {
	picToSend = e.target.files
	console.log(picToSend)
})

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	if (formControl(form.elements[0])) return false
	else if (formControl(form.elements[1])) return false
	else {
		/*
		funciona ok!
		let formData = {
			msg: form.elements[0].value,
			itemDesc: form.elements[1].value,
		}
		*/
		const token = localStorage.getItem('token')

		let formData = new FormData()
		formData.append('size', form.elements[0].value)
		formData.append('itemDesc', form.elements[1].value)
		for (let i = 0; i < picToSend.length; i++) {
			let pic = picToSend[i]
			formData.append('fileItems', pic)
		}
		/*
		picToSend.forEach((pic) => {
			formData.append('fileItems', pic)
		})
		*/

		axios
			.post('http://localhost:3000/api/media', formData)
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
})

const formControl = (element) => {
	if (element.value === '') {
		alert('cant be empty !')
		element.focus()
		return false
	}
}
