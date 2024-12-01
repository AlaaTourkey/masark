function toggleAccordion(clickedHeader) {
  const allAccordions = document.querySelectorAll('.accordion');

  allAccordions.forEach((accordion) => {
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.icon');
    const header = accordion.querySelector('.accordion-header');

    if (accordion.contains(clickedHeader)) {
      if (content.classList.contains('max-h-0')) {
        content.classList.remove('max-h-0');
        content.classList.add('max-h-[120%]');
        icon.className = 'icon fa-solid fa-angle-up';
        header.classList.remove('bg-gray-300');
        header.classList.add('bg-[#ef4256]', 'text-white'); 
      } else {
        content.classList.add('max-h-0');
        content.classList.remove('max-h-[120%]');
        icon.className = 'icon fa-solid fa-angle-down';
        header.classList.remove('bg-[#ef4256]', 'text-white');
        header.classList.add('bg-gray-300');
      }
    } else {
      content.classList.add('max-h-0');
      content.classList.remove('max-h-[120%]');
      icon.className = 'icon fa-solid fa-angle-down';
      const otherHeader = accordion.querySelector('.accordion-header');
      otherHeader.classList.remove('bg-[#ef4256]', 'text-white');
      otherHeader.classList.add('bg-gray-300');
    }
  });
}

// countries for phone number
var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
  preferredCountries: ["us", "ca"],
  separateDialCode: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

input.parentNode.style.width = "100%";
document.querySelector('.iti').style.width = "100%";
document.querySelector('.iti__flag-container').style.width = "auto";

// submit form 
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    first_name: document.getElementById("first_name").value.trim(),
    last_name: document.getElementById("last_name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    country: document.getElementById("country").value.trim()
  };
  

  const resultMessage = document.getElementById("resultMessage");

  if (!formData.first_name || !formData.last_name || !formData.phone || !formData.email || !formData.country) {
    resultMessage.textContent = "All fields are required!";
    resultMessage.style.color = "red";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.email)) {
    resultMessage.textContent = "Please enter a valid email address!";
    resultMessage.style.color = "red";
    return;
  }

  const phonePattern = /^[0-9]{11}$/;  
  if (!phonePattern.test(formData.phone)) {
    resultMessage.textContent = "Please enter a valid phone number!";
    resultMessage.style.color = "red";
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "bearer $(gcloud auth print-identity-token)");
  
  const raw = JSON.stringify(formData);
  console.log(raw);
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://function-1-66837296355.us-central1.run.app", requestOptions)
    .then((response) => {
      console.log(response);
      
      if (response.ok) {
        resultMessage.textContent = "Form submitted successfully!";
        resultMessage.style.color = "green";
      } else {
        Error("Failed to submit form. Status code: " + response.status);
      }
    })
    .catch((error) => {
      console.error(error);
      resultMessage.textContent = "Error submitting the form.";
      resultMessage.style.color = "red";
    });
});