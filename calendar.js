function buildCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    
    for (let i = 1; i <= 31; i++) {
        let dayBox = document.createElement('div');
        dayBox.className = 'calendar-day';
        dayBox.innerText = i; 
        
        if (i === 31) {
            dayBox.classList.add('today'); 
        }
        
        if (i === 20 || i === 25) {
            dayBox.classList.add('has-event');
        }

        dayBox.addEventListener('click', function() {
            alert(`You clicked on March ${i}! In the full app, this would open day details.`);
        });

        calendarGrid.appendChild(dayBox);
    }
}


function toggleTask(checkboxElement) {
    const taskText = checkboxElement.nextElementSibling;
    
    if (checkboxElement.checked) {
        taskText.classList.add('task-completed');
    } else {
        taskText.classList.remove('task-completed');
    }

    
}

window.onload = buildCalendar;