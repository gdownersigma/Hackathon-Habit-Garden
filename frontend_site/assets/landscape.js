userId = sessionStorage.getItem("user_id");
username = sessionStorage.getItem("username");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitNameInput = document.getElementById("habitNameInput");
const frequencyInput = document.getElementById("frequencyInput");
const submitHabitBtn = document.getElementById("submitHabitBtn");
const datePicker = document.getElementById("datePicker");
const submitLogBtn = document.getElementById("submitLogBtn");
const bgMusic = document.getElementById("bgMusic");

const logHabitBtn = document.getElementById("logHabitBtn");
console.log("Log button element:", logHabitBtn);

let currentHabitId = null;
let currentFrequency = null;
let currentHabitName = null;

bgMusic.volume = 0.2;
bgMusic.play().catch(function(error) {
    console.error("Error playing background music:", error);
});

function showPlant(stage, habitName) {
    const container = document.getElementById("plantContainer");
    console.log("Stage value:", stage);
    console.log("Plant path:", './plant/plant' + stage + '.html');
    container.innerHTML = '<iframe src="./plant/plant' + stage + '.html" frameborder="0" scrolling="no" width="1400" height="650"></iframe>';
    
    const titleElement = document.getElementById("habitTitle");
    if (habitName && titleElement) {
        titleElement.textContent = habitName;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/"+userId, {
        method: "GET",
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Habits response:", data);
        console.log("Habits length:", data.length);
        if (data.length === 0) {
            document.getElementById("addHabitBtn").classList.remove("hidden");
        } else {
            document.getElementById("addHabitBtn").classList.add("hidden");
            document.getElementById("logHabitBtn").classList.remove("hidden");
            const habit = data[0];
            const habit_id = habit.habit_id;
            const frequency = habit.frequency;
            const habit_name = habit.habit_name;
            currentHabitId = habit_id;
            currentFrequency = frequency;
            currentHabitName = habit_name;

            fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/score?user_id=" + userId + "&habit_id=" + currentHabitId + "&freq=" + currentFrequency, {
                method: "GET"
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(score) {
                console.log("Score:", score.score);
                showPlant(score.score, habit_name);
            })
            .catch(function(error) {
                console.error("Error fetching score:", error);
            });
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
});

// Show modal when "Add Habit" button is clicked
addHabitBtn.addEventListener("click", function() {
    console.log("Button clicked!");
    const addHabitModal = new bootstrap.Modal(document.getElementById("addHabitModal"));
    addHabitModal.show();
});

// Submit the new habit
submitHabitBtn.addEventListener("click", function() {
    const habitName = habitNameInput.value.trim();
    const frequency = frequencyInput.value;
    const userId = sessionStorage.getItem("user_id");
    
    currentFrequency = parseInt(frequency);
    currentHabitName = habitName;
    
    if (!habitName) {
        alert("Please enter a habit name");
        return;
    }
    
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            habit_name: habitName,
            frequency: parseInt(frequency),
            user_id: parseInt(userId)
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Habit created:", data);
        
        // Get habit_id from the response
        currentHabitId = data.habit_id;
        
        const modal = bootstrap.Modal.getInstance(document.getElementById("addHabitModal"));
        modal.hide();
        habitNameInput.value = "";
        
        // Show the log button now that habit exists
        document.getElementById("addHabitBtn").classList.add("hidden");
        document.getElementById("logHabitBtn").classList.remove("hidden");
        
        fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/score?user_id=" + userId + "&habit_id=" + currentHabitId + "&freq=" + currentFrequency, {
            method: "GET"
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(score) {
            showPlant(score.score, currentHabitName);
        });
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong");
    });
});

logHabitBtn.addEventListener("click", function() {
    const today = new Date().toISOString().split('T')[0];
    datePicker.value = today;
    datePicker.max = today;
    console.log("Log Habit Button clicked!");
    const logModal = new bootstrap.Modal(document.getElementById("logHabitModal"));
    logModal.show();
});
console.log("Event listener attached");

submitLogBtn.addEventListener("click", function() {
    const selectedDate = datePicker.value;
    const userId = sessionStorage.getItem("user_id");
    
    if (!selectedDate) {
        alert("Please select a date");
        return;
    }
    
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            habit_id: currentHabitId,
            user_id: parseInt(userId),
            date_practiced: selectedDate
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Logged:", data);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById("logHabitModal"));
        modal.hide();
        document.getElementById("successSound").play();

        fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/score?user_id=" + userId + "&habit_id=" + currentHabitId + "&freq=" + currentFrequency, {
            method: "GET"
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(score) {
            showPlant(score.score, currentHabitName);
        });
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong");
    });
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    console.log("Logout clicked!");
    sessionStorage.clear();
    window.location.href = "../index.html";
});