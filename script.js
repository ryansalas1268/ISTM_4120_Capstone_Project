
function setRSVP(status) {
    showToast(`Got it! Your RSVP is set to: ${status}`);
    const guestList = document.getElementById('guestList');
    let myEntry = document.getElementById('currentUserEntry');

    let statusColorClass = '';
    let displayStatusText = '';
    
    if (status === 'Going') {
        statusColorClass = 'going'; 
        displayStatusText = 'Going';
    } else if (status === 'Maybe') {
        statusColorClass = 'maybe'; 
        displayStatusText = 'Maybe';
    } else {
        statusColorClass = 'no';    
        displayStatusText = 'Can\'t go';
    }

    if (!myEntry) {
        myEntry = document.createElement('li'); 
        myEntry.id = 'currentUserEntry';        
        guestList.appendChild(myEntry);         
    }

    myEntry.innerHTML = `
        <span class="status ${statusColorClass}"></span> 
        <a href="#" class="handle">@User</a> "Me" (${displayStatusText})
    `;
}

function vote(timeString, elementId) {
    const voteElement = document.getElementById(elementId);
    let currentVotes = parseInt(voteElement.innerText);
    currentVotes += 1;
    voteElement.innerText = `${currentVotes} votes`;
    showToast(`You voted for ${timeString}!`);
}

let totalTasks = 0;
let completedTasks = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() === "") {
        showToast("⚠️ Please type a task first!");
        return;
    }

    const newTask = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            completedTasks += 1; 
        } else {
            completedTasks -= 1; 
        }
        updateProgressBar(); 
    });

    newTask.appendChild(checkbox);
    const taskText = document.createTextNode(` [${prioritySelect.value}] ${taskInput.value}`);
    newTask.appendChild(taskText);
    taskList.appendChild(newTask);
    
    totalTasks += 1;
    updateProgressBar();
    taskInput.value = ""; 
    showToast("Task added to the group list!");
}

function updateProgressBar() {
    const progressBar = document.getElementById('taskProgress');
    const progressText = document.getElementById('progressText');
    
    if (totalTasks === 0) {
        progressBar.style.width = '0%';
        progressText.innerText = '0% Completed';
        return;
    }

    const percentage = Math.round((completedTasks / totalTasks) * 100);
    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `${percentage}% Completed (${completedTasks}/${totalTasks})`;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

let voteIdCounter = 3; 

function proposeTime() {
    const timeInput = document.getElementById('newTimeInput');
    const pollContainer = document.getElementById('pollContainer');

    if (timeInput.value.trim() === "") {
        showToast("⚠️ Please enter a time first!");
        return;
    }

    const newTime = timeInput.value.trim();
    const newVoteId = `vote${voteIdCounter}`;
    voteIdCounter++; 

    const pollOptionDiv = document.createElement('div');
    pollOptionDiv.className = 'poll-option'; 

    pollOptionDiv.innerHTML = `
        <button class="btn-vote" onclick="vote('${newTime}', '${newVoteId}')">+1</button>
        <span>${newTime}</span>
        <span id="${newVoteId}" class="vote-count">0 votes</span>
    `;

    pollContainer.appendChild(pollOptionDiv);
    timeInput.value = "";
    showToast(`"${newTime}" added to the poll!`);
}