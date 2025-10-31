function isValidTimelineData(data) {
  if (!Array.isArray(data)) return false;

  return data.every(item =>
    (typeof item.year === 'number' || (typeof item.year === 'string' && item.year.trim() !== '')) &&
    typeof item.title === 'string' && item.title.trim() !== '' &&
    typeof item.description === 'string' && item.description.trim() !== ''
  );
}

async function loadTimelineData() {
  try {
    const response = await fetch('http://localhost:3000/api/academic');
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    //JSON data validator 
    if (!isValidTimelineData(data)) {
      throw new Error('Invalid timeline data format');
    }

    const source = document.getElementById('timeline-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(data);

    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = html;

  } catch (error) {
    console.error('Failed to load timeline data:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadTimelineData);