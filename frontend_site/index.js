const form = document.querySelector("form");
const createAccountBtn = document.getElementById("createAccount");
const usernameInput = document.getElementById("floatingInput");


let userId = null;

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/auth/login?username="+username, {
        method: "GET",
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        if (data.user_id) {
            userId = data.user_id;
            
            sessionStorage.setItem("user_id", userId);
            sessionStorage.setItem("username", username);
            
            console.log("Signed in! User ID:", userId);
            
            successModalBody.textContent = "Successfully logged in!";
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        } else {
            alert("User not found. Try creating an account.");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong. Is the API running?");
    });
});

createAccountBtn.addEventListener("click", function() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert("Please enter a username");
        return;
    }
    
    fetch("https://sigmalabshackathonteam7.eu.pythonanywhere.com/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "username": username })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        if (data.user_id) {
            userId = data.user_id;
            
            sessionStorage.setItem("user_id", userId);
            sessionStorage.setItem("username", username);
            
            console.log("Account created! User ID:", userId);
            successModalBody.textContent = "Account Created!";
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        } else {
            alert(data.error || "Could not create account");
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Something went wrong. Is the API running?");
    });

});