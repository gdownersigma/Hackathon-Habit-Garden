userId = sessionStorage.getItem("user_id");
username = sessionStorage.getItem("username");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitNameInput = document.getElementById("habitNameInput");
const frequencyInput = document.getElementById("frequencyInput");
const submitHabitBtn = document.getElementById("submitHabitBtn");
const datePicker = document.getElementById("datePicker");
const submitLogBtn = document.getElementById("submitLogBtn");

const logHabitBtn = document.getElementById("logHabitBtn");
console.log("Log button element:", logHabitBtn);

let currentHabitId = null;


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
    // Code here runs when page loads
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/"+userId, {
    method: "GET",
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Habits responnnse:", data);
        console.log("Habits length:", data.length);
        if (data.length === 0) {
        // Show the Add Habit button
            document.getElementById("addHabitBtn").classList.remove("hidden");
        } else {
            document.getElementById("addHabitBtn").classList.add("hidden");
            document.getElementById("logHabitBtn").classList.remove("hidden");
            const habit = data[0]; // Assuming one habit per user for simplicity
            const habit_id = habit.habit_id;
            const frequency = habit.frequency;
            const habit_name = habit.habit_name;
            currentHabitId = habit_id;

            fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/habit/score?user_id=" + userId + "&habit_id=" + habit_id + "&freq=" + frequency, {
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
        // TODO: Check if empty or has habits
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
    
    // Check if name is empty
    if (!habitName) {
        alert("Please enter a habit name");
        return;
    }
    
    // API call to create habit
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
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("addHabitModal"));
        modal.hide();
        
        // Clear the form
        habitNameInput.value = "";
        
        // TODO: Refresh habits / show the flower
        location.reload();
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

        location.reload();
        
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong");
    });

});
    document.getElementById("logoutBtn").addEventListener("click", function() {
        console.log("Logout clicked!");
        sessionStorage.clear();
        window.location.href = "../index.html";  // Or your landing page path
});
