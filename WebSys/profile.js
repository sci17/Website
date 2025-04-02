document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const profileImage = document.getElementById("profileImage");
    const uploadImage = document.getElementById("uploadImage");
    const profileForm = document.getElementById("profileForm");

    // Load user data
    function loadProfile() {
        const savedUsername = localStorage.getItem("username");
        const savedEmail = localStorage.getItem("email");
        const savedProfileImage = localStorage.getItem("profileImage");

        if (savedUsername) usernameInput.value = savedUsername;
        if (savedEmail) emailInput.value = savedEmail;
        if (savedProfileImage) profileImage.src = savedProfileImage;
    }

    // Save profile updates
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("username", usernameInput.value);
        localStorage.setItem("email", emailInput.value);
        alert("Profile updated successfully!");
    });

    // Handle profile image upload
    uploadImage.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profileImage.src = reader.result;
                localStorage.setItem("profileImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load profile when page loads
    loadProfile();
});

document.addEventListener("DOMContentLoaded", () => {
    const profileImage = document.getElementById("profileImage");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");

    // Load stored profile data
    const savedUsername = localStorage.getItem("username") || "Guest";
    const savedEmail = localStorage.getItem("email") || "Not Set";
    const savedProfileImage = localStorage.getItem("profileImage") || "default-avatar.png";

    // Apply data to elements
    if (profileImage) profileImage.src = savedProfileImage;
    if (usernameDisplay) usernameDisplay.textContent = savedUsername;
    if (emailDisplay) emailDisplay.textContent = savedEmail;
});
