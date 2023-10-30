enum EventTypes {
  NORMAL,
  DANGEROUS,
  CRITICAL,
}

interface IntervalDates {
  dateStart: string;
  dateEnd: string;
}

interface TimelineEvent {
  dateStart: string;
  dateEnd: string;
  type: EventTypes;
}

type Data = {
  events: TimelineEvent[];
  intervalDates: IntervalDates;
};

const getColor = (eventType: EventTypes): string => {
  switch (eventType) {
    case EventTypes.NORMAL:
      return 'green';
    case EventTypes.DANGEROUS:
      return 'orange';
    case EventTypes.CRITICAL:
      return 'red';
    default:
      return 'grey';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const jsonData = sessionStorage.getItem('timelineData');
  const data = JSON.parse(jsonData);

  // Очистим таймлайн от предыдущих событий
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';
  const tooltip = document.getElementById('tooltip');
  if (!timeline || !tooltip) return;

  // Вычисление общей продолжительности интервала в миллисекундах
  const totalDuration = new Date(data.intervalDates.dateEnd).getTime() - new Date(data.intervalDates.dateStart).getTime();

  let percentage = 0;

  data.events.forEach((event, index, array) => {
    const eventDuration = new Date(event.dateEnd).getTime() - new Date(event.dateStart).getTime();
    const eventStartPos = new Date(event.dateStart).getTime() - new Date(data.intervalDates.dateStart).getTime();

    // Преобразование даты начала и продолжительности события в процентное значение
    const eventWidthPercentage = (eventDuration / totalDuration) * 100;
    const eventStartPercentage = (eventStartPos / totalDuration) * 100;
    const eventMarginLeft = eventStartPercentage - percentage

    const eventDiv = document.createElement('div');
    eventDiv.style.width = `${eventWidthPercentage}%`;
    eventDiv.style.marginLeft = `${eventMarginLeft}%`;
    eventDiv.style.backgroundColor = getColor(event.type);
    eventDiv.style.borderRadius = '7px';

    eventDiv.addEventListener('mouseenter', (e) => {
      tooltip.innerHTML = `Type: ${EventTypes[event.type]}<br>Start: ${event.dateStart}<br>End: ${event.dateEnd}`;
      tooltip.style.left = `${e.pageX}px`;
      tooltip.style.top = `${e.pageY + 20}px`;  // добавил небольшой отступ сверху
      tooltip.style.display = 'block';
    });

    eventDiv.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    timeline.appendChild(eventDiv);

    percentage += eventMarginLeft + eventWidthPercentage;
  });
});
