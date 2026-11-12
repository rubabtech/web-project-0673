const form = document.querySelector('#contact-form');
const message = form.elements.message;
const count = document.querySelector('#character-count');
const link = document.querySelector('#message-link');
const status = document.querySelector('#contact-status');

message.addEventListener('input', function () {
    count.textContent = `${message.value.length} / 500 characters`;
});

// Editing a prepared enquiry hides the old link, so stale details are not sent.
form.addEventListener('input', function () {
    link.hidden = true;
    status.textContent = '';
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const text = `Hello Zohra Kitchen!\nName: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nMessage: ${message.value.trim()}`;
    link.href = 'https://wa.me/923244316234?text=' + encodeURIComponent(text);
    link.hidden = false;
    status.textContent = 'Your message is ready. Open WhatsApp below, then choose to send it.';
});

const toggle = document.querySelector('#faq-toggle');
const answer = document.querySelector('#faq-answer');
toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    answer.hidden = isOpen;
});
