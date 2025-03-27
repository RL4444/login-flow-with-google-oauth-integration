const formFeedback = document.getElementById("form-validation-feedback");
const form = document.getElementById("login-form");

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (!password || !email) {
    formFeedback.innerHTML = "please fill out all fields";
    return;
  }

  const payload = {
    email,
    password,
  };

  const result = await fetch("api/v1/auth/login", {
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

    if (response.statusCode === "500") {
      formFeedback.innerText =
        "Our servers are not working correctly. Please try again later.";
    }

    return;
  } else {
    window.location.replace("/dashboard");
  }
});

document.getElementById("password").addEventListener("change", (e) => {
  // reset validation warnings
  formFeedback.innerText = "";
});

document.getElementById("email").addEventListener("change", (e) => {
  // reset validation warnings
  formFeedback.innerText = "";
});
