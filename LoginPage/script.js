document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }
  
    // If everything is valid
    alert("Login successful!");
    // Proceed with login logic or redirection here
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    // At least 6 characters, one upper, one lower, one digit, one special char
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  }
  