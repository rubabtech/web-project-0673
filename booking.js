// Form values are used only to prepare an enquiry; there is no account or payment system.
const bookingForm = document.querySelector('#booking-form');
const chosenCake = new URLSearchParams(window.location.search).get('cake');
if (chosenCake) bookingForm.elements.cake.value = chosenCake.slice(0, 100);
const dateField = bookingForm.elements.date;
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
dateField.min = `${year}-${month}-${day}`;

// A chosen reference image stays in this browser and is not uploaded.
let previewURL;
bookingForm.elements.photo.addEventListener('change', function () {
    const preview = document.querySelector('#photo-preview');
    const photo = this.files[0];
    if (previewURL) URL.revokeObjectURL(previewURL);
    preview.hidden = true;
    if (photo && photo.type.startsWith('image/')) {
        previewURL = URL.createObjectURL(photo);
        preview.src = previewURL;
        preview.hidden = false;
    }
});

bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const fields = bookingForm.elements;
    const message = [
        'Hello! I would like to enquire about a cake from Zohra Kitchen.',
        `Name: ${fields.customer.value.trim()}`,
        `Email: ${fields.email.value.trim()}`,
        `Phone: ${fields.phone.value.trim()}`,
        `Cake / design: ${fields.cake.value.trim() || 'Custom design'}`,
        `Preferred date: ${fields.date.value}`,
        `Preferred time: ${fields.time.value}`,
        `Weight: ${fields.weight.value} pound(s)`,
        `Flavour: ${fields.flavour.value}`,
        `Theme colour: ${fields.colour.value}`,
        `Decoration level: ${fields.decoration.value}/5`,
        `Collection/delivery: ${fields.delivery.value}`,
        `Design link: ${fields.reference.value || 'None'}`,
        `Message/instructions: ${fields.message.value.trim() || 'None'}`,
        `Updates requested: ${fields.updates.checked ? 'Yes' : 'No'}`,
        fields.photo.files.length ? 'I will attach my reference photo in this chat.' : '',
        'Please confirm availability and the final quote.'
    ].filter(Boolean).join('\n');
    // The optional demo password is deliberately excluded.
    const url = 'https://wa.me/923244316234?text=' + encodeURIComponent(message);
    document.querySelector('#booking-status').textContent = 'Opening WhatsApp. Your booking is not confirmed until the baker replies.';
    window.location.href = url;
});
