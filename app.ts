const initialData = `{
  "events": [
    {
      "dateStart": "2022-01-01T01:00:00",
      "dateEnd": "2022-01-01T02:00:00",
      "type": 2
    },
    {
      "dateStart": "2022-01-01T08:21:00",
      "dateEnd": "2022-01-01T10:44:11",
      "type": 1
    },
    {
      "dateStart": "2022-01-01T11:11:00",
      "dateEnd": "2022-01-01T12:50:00",
      "type": 0
    },
    {
      "dateStart": "2022-01-01T13:11:00",
      "dateEnd": "2022-01-01T13:50:00",
      "type": 2
    },
    {
      "dateStart": "2022-01-01T14:11:00",
      "dateEnd": "2022-01-01T18:50:00",
      "type": 1
    }
  ],
  "intervalDates": {
    "dateStart": "2022-01-01T01:00:00",
    "dateEnd": "2022-01-02T01:00:00"
  }
}`;

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('jsonData').innerHTML = initialData;
});

function redirectToTimeline() {
  // @ts-ignore
  const jsonData = document.getElementById('jsonData').value;
  if (!isValidJSON(jsonData)) {
    alert('Ошибка при парсинге JSON');
    return;
  }
  sessionStorage.setItem('timelineData', jsonData);
  document.getElementById('container').style.display = 'none';
  document.getElementById('loader').style.display = 'block';

  let range = {min: 600, max: 1000};
  let delta = range.max - range.min;

  const time = Math.round(range.min + Math.random() * delta);
  setTimeout(() => {
    window.location.href = 'timeline.html';
  }, time);
}
