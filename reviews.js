// Reuse the review service configured in the original website.
const reviewAPI = 'https://sheetdb.io/api/v1/22xsfxfxzb34n';
const reviewList = document.querySelector('#reviews-list');
const reviewStatus = document.querySelector('#review-status');
const reviewForm = document.querySelector('#review-form');

async function loadReviews() {
    reviewStatus.textContent = 'Loading customer reviews…';
    try {
        const response = await fetch(reviewAPI);
        if (!response.ok) throw new Error('Review service unavailable');
        const reviews = await response.json();
        if (!Array.isArray(reviews)) throw new Error('Unexpected review data');
        reviewList.replaceChildren();
        reviews.slice(-9).reverse().forEach(function (review) {
            const card = document.createElement('article');
            const stars = document.createElement('p');
            const text = document.createElement('p');
            const name = document.createElement('strong');
            stars.textContent = String(review.Stars || '');
            text.textContent = String(review.Review || '');
            name.textContent = String(review.Name || 'Customer');
            card.append(stars, text, name);
            reviewList.append(card);
        });
        reviewStatus.textContent = reviews.length ? '' : 'Be the first to share your experience.';
    } catch (error) {
        reviewStatus.textContent = 'Reviews are unavailable right now. Please try again later.';
    }
}

reviewForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!reviewForm.reportValidity()) return;
    const button = reviewForm.querySelector('button');
    button.disabled = true;
    reviewStatus.textContent = 'Publishing your review…';
    const data = { ID: String(Date.now()), Name: reviewForm.elements.reviewer.value.trim(), Stars: '★'.repeat(Number(reviewForm.elements.rating.value)), Review: reviewForm.elements.review.value.trim(), Date: new Date().toLocaleDateString() };
    try {
        const response = await fetch(reviewAPI, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: [data] }) });
        if (!response.ok) throw new Error('Review not saved');
        reviewForm.reset();
        await loadReviews();
    } catch (error) {
        reviewStatus.textContent = 'Your review could not be published. Please try again.';
    } finally {
        button.disabled = false;
    }
});

loadReviews();
