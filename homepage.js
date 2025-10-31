function isValidCard(card) {
  return (
    typeof card.head === 'string' &&
    typeof card.title === 'string' &&
    typeof card.description === 'string' &&
    typeof card.link === 'string'
  );
}

async function loadCards() {
  try {
    const response = await fetch('http://localhost:3000/api/home_data');
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    const container = document.getElementById('card-container');
    container.innerHTML = '';

    data.forEach(card => {
      if (isValidCard(card)) {
        const cardHTML = `
          <div class="card" onclick="location.href='${card.link}'">
            <div class="card-head">${card.head}</div>
            <div class="card-title">${card.title}</div>
            <div class="card-desc">${card.description}</div>
            <div class="card-click">${card.click}</div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
      } else {
        console.warn('Invalid card skipped:', card);
      }
    });
  } catch (error) {
    console.error('Failed to load card data:', error);
    document.getElementById('card-container').innerHTML = '<p>Error loading cards.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadCards);