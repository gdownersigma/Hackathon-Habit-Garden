// Get references to elements
const form = document.querySelector("form");
const createAccountBtn = document.getElementById("createAccount");
const usernameInput = document.getElementById("floatingInput");

// Sign in - listen for form submit
form.addEventListener("submit", function(event) {
    // Stop page refresh
    event.preventDefault();
    
    // Get username from input
    const username = usernameInput.value.trim();
    
    // Check if username is empty
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    // TODO: Make API call to check if user exists and get user data
    // For now, just log it
    console.log("Sign in:", username);
    
    // Later this will be:
    // fetch("/api/login", { ... })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.exists) {
    //             sessionStorage.setItem("username", username);
    //             window.location.href = "/garden.html";
    //         } else {
    //             alert("User not found");
    //         }
    //     });
});

// Create account - listen for click
createAccountBtn.addEventListener("click", function() {
    // Get username from input
    const username = usernameInput.value.trim();
    
    // Check if username is empty
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    // TODO: Make API call to create new user
    // For now, just log it
    console.log("Create account:", username);

});