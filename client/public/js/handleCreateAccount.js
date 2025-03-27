const formFeedback = document.getElementById("form-validation-feedback");
const passwordFeedback = document.getElementById(
  "password-validation-feedback"
);
const form = document.getElementById("login-form");

const isFormValid = () => {
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("password-check").value;
  const email = document.getElementById("email").value;

  if (!password || !email || !passwordCheck) {
    formFeedback.innerText = "please fill out all fields";
    return false;
  }

  if (password !== passwordCheck) {
    passwordFeedback.innerText = "passwords do not match";
    return false;
  }
  return true;
};

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isFormValid()) return;

  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const payload = {
    email,
    password,
  };

  const result = await fetch("api/v1/auth/create-account", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const response = await result.json();

  if (response.error) {
    // handle it
    if (response.statusCode === "400") {
      formFeedback.innerText =
        "Please check credentials are correct and try again.";
    }
    if (response.statusCode === "409") {
      formFeedback.innerText =
        "This user already exists. \n Please use the link below to reset your password.";
    }

    if (response.statusCode === "500") {
      formFeedback.innerText =
        "Our servers are not working correctly. Please try again later.";
    }

    return;
  } else {
    window.location.replace("/dashboard");
  }
});

document.getElementById("email").addEventListener("change", (e) => {
  // reset validation warnings
  formFeedback.innerText = "";
});

document.getElementById("password").addEventListener("keydown", (e) => {
  // reset validation warnings
  formFeedback.innerText = "";
  passwordFeedback.innerText = "";
});

document.getElementById("password-check").addEventListener("keydown", (e) => {
  // reset validation warnings
  formFeedback.innerText = "";
  passwordFeedback.innerText = "";
});
