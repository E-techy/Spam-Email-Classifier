// Cool background made using particle.js
particlesJS("particles-js", {
  particles: {
    number: {
      value: 19,
      density: {
        enable: true,
        value_area: 481.0236182596568,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 12,
      },
      image: {
        src: "https://www.sprinklr.com/wp-content/themes/sprinklr/assets/images/logo_sprinklr.svg",
        width: 250,
        height: 100,
      },
    },
    opacity: {
      value: 0.3286994724774322,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 47.34885849793636,
      random: true,
      anim: {
        enable: true,
        speed: 9.59040959040959,
        size_min: 5.594405594405594,
        sync: true,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6.413648243462092,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 320.6824121731046,
        rotateY: 481.0236182596568,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

// Setting event listener for the Classify button .
document.getElementById("classifyBtn").addEventListener("click", async () => {
  const emailContent = document.getElementById("emailInput").value;
  const result = document.getElementById("result");

  // alerting the user if he/she has not entered anything in the textarea.
  if (!emailContent) {
    alert("Please enter some content in the email box!");
    return;
  }

  result.classList.add("hidden");
  result.textContent = "Classifying...";

  // Reset textarea color
  const emailInput = document.getElementById("emailInput");

  try {
    // Sending POST request to the backend to see whether the email is spam or ham.
    const response = await fetch(`http://localhost:${backendPort}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: emailContent }),
    });
    // parsing the response received to a json object.
    const data = await response.json();

    // Updating the result and textarea based on classification
    // If email is spam then the color of the text inside the textarea changes to red.
    if (data.label === "spam") {
      result.textContent = "This email is a spam email";
      result.classList.remove("ham");
      result.classList.add("spam");
      emailInput.style.color = "red";
    } else if (data.label === "ham") {
      // If the email is classified as ham the color of the text inside the textarea changes to green.
      result.textContent = "This email looks genuine.";
      result.classList.remove("spam");
      result.classList.add("ham");
      emailInput.style.color = "green";
    }

    result.classList.remove("hidden");

    setTimeout(() => {
      result.classList.add("hidden");
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    result.textContent = "An error occurred. Please try again later.";
    result.classList.add("hidden");
  }
});

// Setting event listener for the reset button which deletes the entire content
// of the textarea and sets the text color to white.
document.getElementById("resetBtn").addEventListener("click", () => {
  const emailInput = document.getElementById("emailInput");
  emailInput.value = "";

  emailInput.style.color = "white";

  document.getElementById("result").classList.add("hidden");
});
