document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const currentDateElement = document.getElementById('current-date');
    const eventsElement = document.getElementById('events');
    const addEventButton = document.getElementById('add-event');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const saveEventButton = document.getElementById('save-event');
    const eventNameInput = document.getElementById('event-name');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let events = JSON.parse(localStorage.getItem('events')) || {};

    function renderCalendar() {
        calendarDays.innerHTML = '';
        monthYear.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        currentDateElement.textContent = formatDate(new Date());

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.className = events[`${currentYear}-${currentMonth + 1}-${day}`] ? 'event-day' : '';
            dayCell.addEventListener('click', () => showEventsForDay(day));
            calendarDays.appendChild(dayCell);
        }

        showEventsForDay(new Date().getDate());
    }

    function getMonthName(month) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month];
    }

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function showEventsForDay(day) {
        currentDateElement.textContent = `${day} ${getMonthName(currentMonth)} ${currentYear}`;
        const eventKey = `${currentYear}-${currentMonth + 1}-${day}`;
        const dayEvents = events[eventKey] || [];
        eventsElement.innerHTML = dayEvents.length > 0 
            ? dayEvents.map((event, index) => `
                <div class="event-item">
                    <p>${event}</p>
                    <button onclick="deleteEvent('${eventKey}', ${index})">Eliminar</button>
                </div>
              `).join('') 
            : '<p>Hoy no hay eventos</p>';
    }

    function addEvent() {
        const day = currentDateElement.textContent.split(' ')[0];
        const eventKey = `${currentYear}-${currentMonth + 1}-${day}`;
        const eventName = eventNameInput.value.trim();
        if (eventName) {
            if (!events[eventKey]) {
                events[eventKey] = [];
            }
            events[eventKey].push(eventName);
            localStorage.setItem('events', JSON.stringify(events));
            renderCalendar();
            eventNameInput.value = '';
            eventModal.style.display = 'none';
        }
    }

    window.deleteEvent = function(eventKey, eventIndex) {
        events[eventKey].splice(eventIndex, 1);
        if (events[eventKey].length === 0) {
            delete events[eventKey];
        }
        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar();
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    addEventButton.addEventListener('click', () => {
        eventModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == eventModal) {
            eventModal.style.display = 'none';
        }
    });

    saveEventButton.addEventListener('click', addEvent);

    renderCalendar();
});
