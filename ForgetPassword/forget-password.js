document.getElementById("sendOtp").addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
    } else {
      alert(`OTP has been sent to ${email}`);
      // You can add actual OTP logic here
    }
  });
  
  document.getElementById("forgetPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const otp = document.getElementById("otp").value.trim();
  
    if (otp === "") {
      alert("Please enter the OTP.");
      return;
    }
  
    alert("OTP verified! Proceed to reset password.");
    // Add OTP validation or redirect here
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  