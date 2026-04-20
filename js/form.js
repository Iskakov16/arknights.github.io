const form = document.querySelector(".contact")

form.addEventListener("submit", function (event) {
    const name = form.querySelector('input[name="name"]').value.trim()
    const contact = form.querySelector('input[name="contact"]').value.trim()
    const message = form.querySelector('textarea[name="message"]').value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // проверка имени
    if (!name) {
        event.preventDefault()
        alert("Введите имя.")
        return
    }

    // проверка контакта
    if (!contact) {
        event.preventDefault()
        alert("Введите email.")
        return
    }

    if (!emailRegex.test(contact)) {
        event.preventDefault()
        alert("Введите корректный email.")
        return
    }

    // проверка сообщения
    if (!message) {
        event.preventDefault()
        alert("Введите сообщение.")
        return
    }
})