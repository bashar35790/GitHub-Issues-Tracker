const userNameInput = document.getElementById("userName");
const passwordInput = document.getElementById("password");

function logIn() {
  const userName = userNameInput.value;
  const password = passwordInput.value;

  if (userName === "admin" && password === "admin123") {
    alert("Login successful!");
    // redirect to dashboard or another page
    window.location.href = "./issue-dashboard.html"; // replace with your dashboard page
  } else {
    alert("Invalid username or password. Please try again.");
  }
}
