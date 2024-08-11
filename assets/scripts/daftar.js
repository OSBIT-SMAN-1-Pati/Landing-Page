import awesomePhonenumber from 'https://cdn.jsdelivr.net/npm/awesome-phonenumber@6.10.0/+esm'


/** @type {HTMLInputElement} */
const nama = document.querySelector('#nama')
/** @type {HTMLInputElement} */
const whatsapp = document.querySelector('#whatsapp')
const submitButton = document.querySelector('button.button[type=submit]')
const form = document.querySelector('#form')
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const normalizedName = nama.value.trim()
    const phoneNumber = awesomePhonenumber('+62' + whatsapp.value)
    const normalizedWhatsapp = phoneNumber.g.number.e164.replace(/\+/, '')
    formData.set('nama', normalizedName)
    formData.set('whatsapp', normalizedWhatsapp)

    submitButton.disabled = true
    try {
        const res = await fetch('api/daftar.php', {
            method: 'POST',
            body: formData
        })
        const json = await res.json()
        if (!json.success) {
            handleUnsuccessful(json)
        } else {
            alert(`Sukses mendaftar sebagai ${normalizedName}. Pastikan whatsapp dengan nomor yang telah kamu daftarkan (+${normalizedWhatsapp}) aktif!`)
        }
    } catch (e) {
        console.error(e)
        alert('Terjadi kesalahan dalam melakukan permintaan. Silakan coba lagi.')
    } finally {
        submitButton.disabled = false
    }
})


function handleUnsuccessful(json) {
    switch (json.type) {
        case 'connection-error':
            {
                alert('Kesalahan pada koneksi database! Tolong hubungi administrator!')
                break
            }
        case 'duplicate-error':
            {
                alert('Duplikasi data terdeteksi! Data telah terdaftar sebelumnya!')
                break
            }
        default:
            alert(json.message || json.type)
    }
}

function validateNameInput(event) {
    // Remove more than one whitespace
    nama.value = event.target.value.replace(/\s\s+/g, ' ')
    const value = event.target.value
    // console.log('Name', { value })
    if (!value) {
        nama.setCustomValidity('Isi dengan nama lengkapmu!')
        return
    }
    const pattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
    if (value.length < 4) {
        nama.setCustomValidity('Gunakan nama panjang!')
    } else if (value.length >= 100) {
        nama.setCustomValidity('Nama terlalu panjang!')
        // Only exact pattern allowed
    } else if (!value.match(pattern)) {
        nama.setCustomValidity('Nama hanya boleh menggunakan huruf!')
    } else {
        nama.setCustomValidity('')
    }
}

nama.addEventListener('keydown', validateNameInput)
nama.addEventListener('input', validateNameInput)
nama.addEventListener('change', (event) => {
    nama.value = event.target.value.trim()
    validateNameInput(event)
})


function validateWhatsappInput(event) {
    const value = event.target.value
    // console.log('Whatsapp', { value })
    if (!value) {
        whatsapp.setCustomValidity('Isi dengan nomor whatsapp aktif!')
        return
    }
    const telp = '+62' + value
    const phoneNumber = awesomePhonenumber(telp)
    if (phoneNumber.g.possibility === 'too-short') {
        whatsapp.setCustomValidity('Nomor handphone terlalu pendek!')
    } else if (phoneNumber.g.possibility === 'too-long') {
        whatsapp.setCustomValidity('Nomor handphone terlalu panjang!')
    } else if (!phoneNumber.g.valid) {
        whatsapp.setCustomValidity('Nomor handphone tidak valid!')
    } else {
        whatsapp.setCustomValidity("")
    }
}
whatsapp.addEventListener('keydown', validateWhatsappInput)
whatsapp.addEventListener('input', validateWhatsappInput)
whatsapp.addEventListener('change', validateWhatsappInput)