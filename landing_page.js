// Get references to elements
const form = document.querySelector("form");
const createAccountBtn = document.getElementById("createAccount");
const usernameInput = document.getElementById("floatingInput");


// Store user_id globally so you can use it elsewhere
let userId = null;

// ============================================
// SIGN IN - Check if user exists, get their ID
// ============================================
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    // --- API CALL: Get user ID ---
    // CHANGE: Update the URL to match your Flask API
    // CHANGE: The endpoint path might be different (e.g., "/users/get", "/login")
    // CHANGE: Might be GET instead of POST depending on how your teammate built it
    fetch("http://127.0.0.1:5000/auth/login?username="+username, {
        method: "GET",  // CHANGE: Might be "GET"
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // CHANGE: The response structure might be different
        // Check what your teammate's API actually returns
        
        if (data.user_id) {
            // Success - store the user ID
            userId = data.user_id;
            
            // Also store in sessionStorage so it persists to next page
            sessionStorage.setItem("user_id", userId);
            sessionStorage.setItem("username", username);
            
            console.log("Signed in! User ID:", userId);
            
            // Redirect to garden page
            // CHANGE: Update path to wherever your garden page is
            successModalBody.textContent = "Successfully logged in!";
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        } else {
            // User not found
            // CHANGE: Error message might be in data.error, data.message, etc.
            alert("User not found. Try creating an account.");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong. Is the API running?");
    });
});

// ============================================
// CREATE ACCOUNT - Add new user, get their ID
// ============================================
createAccountBtn.addEventListener("click", function() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    // --- API CALL: Create new user ---
    // CHANGE: Update the URL to match your Flask API
    // CHANGE: The endpoint path might be different (e.g., "/users/create", "/register")
    fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "username": username })  // CHANGE: Key might be different
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // CHANGE: The response structure might be different
        
        if (data.user_id) {
            // Success - store the user ID
            userId = data.user_id;
            
            sessionStorage.setItem("user_id", userId);
            sessionStorage.setItem("username", username);
            
            console.log("Account created! User ID:", userId);
            // Show success modal
            successModalBody.textContent = "Account Created!";
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        } else {
            // Failed - maybe username already taken?
            // CHANGE: Check what error message your API returns
            alert(data.error || "Could not create account");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong. Is the API running?");
    });

});