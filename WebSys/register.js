// Registration
document.addEventListener("DOMContentLoaded", function(){
    const registerForm = document.getElementById("register-form");
    
    if (registerForm) {
        registerForm.addEventListener("submit", function(e){
            e.preventDefault();
            
            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            
            if (!username || !email || !password) {
                alert("All fields are required.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long.");
                return;
            }

            if (localStorage.getItem(email)) {
                alert("Email is already registered. Please log in.");
                return;
            }

            localStorage.setItem(email, JSON.stringify({ username, email, password }));

            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html";
        });
    }
});


// Login
document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e){
            e.preventDefault();
            
            const email = document.getElementById("login-email").value.trim().toLowerCase();
            const password = document.getElementById("login-password").value;

            console.log("Attempt login", email);

            const userData = localStorage.getItem(email);
            if (userData) {
                const user = JSON.parse(userData);
                
                if (user.password === password){
                    console.log("Login Successful");
                    sessionStorage.setItem("loggedinUser", email);
                    window.location.href = "home.html";
                } else {
                    alert ("Invalid password. Try again!");
                }
            } else {
                alert ("User not found. Please register.");
            }
        });
    }
});

// Profile Page
document.addEventListener("DOMContentLoaded", function(){
    if (document.getElementById("profile-username")) {  
        const email = sessionStorage.getItem("loggedinUser");
        if (!email) {
            window.location.href = "login.html";  
            return;
        }

        const userData = JSON.parse(localStorage.getItem(email));
        document.getElementById("profile-username").textContent = userData.username;
        document.getElementById("profile-email").textContent = userData.email;
    }

    // Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(){
            sessionStorage.removeItem("loggedinUser");
            window.location.href = "login.html";
        });
    }
});
