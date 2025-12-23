userId = sessionStorage.getItem("user_id");
username = sessionStorage.getItem("username");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitNameInput = document.getElementById("habitNameInput");
const frequencyInput = document.getElementById("frequencyInput");
const submitHabitBtn = document.getElementById("submitHabitBtn");
document.addEventListener("DOMContentLoaded", function() {
    // Code here runs when page loads
    fetch("http://127.0.0.1:5000/habit/"+userId, {
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
            // TODO: Get stage and show flower
            
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
    fetch("http://127.0.0.1:5000/habit/new", {
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
