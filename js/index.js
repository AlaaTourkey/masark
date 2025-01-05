function toggleAccordion(clickedHeader) {
  const allAccordions = document.querySelectorAll(".accordion");

  allAccordions.forEach((accordion) => {
    const content = accordion.querySelector(".accordion-content");
    const icon = accordion.querySelector(".icon");
    const header = accordion.querySelector(".accordion-header");

    if (accordion.contains(clickedHeader)) {
      if (content.classList.contains("max-h-0")) {
        content.classList.remove("max-h-0");
        content.classList.add("max-h-[120%]");
        icon.className = "icon fa-solid fa-angle-up";
        header.classList.remove("bg-gray-300");
        header.classList.add("bg-[#ef4256]", "text-white");
      } else {
        content.classList.add("max-h-0");
        content.classList.remove("max-h-[120%]");
        icon.className = "icon fa-solid fa-angle-down";
        header.classList.remove("bg-[#ef4256]", "text-white");
        header.classList.add("bg-gray-300");
      }
    } else {
      content.classList.add("max-h-0");
      content.classList.remove("max-h-[120%]");
      icon.className = "icon fa-solid fa-angle-down";
      const otherHeader = accordion.querySelector(".accordion-header");
      otherHeader.classList.remove("bg-[#ef4256]", "text-white");
      otherHeader.classList.add("bg-gray-300");
    }
  });
}

// slider using owlCarousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    margin: 10,
    stagePadding: 60,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: false,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
});

// countries for phone number

var input = document.querySelector("#phone");
var resultMessage = document.getElementById("resultMessage");
const submitButton = document.getElementById("submitButton");

var iti = window.intlTelInput(input, {
  preferredCountries: ["eg", "us"],
  separateDialCode: true,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

input.parentNode.style.width = "100%";
document.querySelector(".iti").style.width = "100%";
document.querySelector(".iti__flag-container").style.width = "auto";

const phonePattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

document.querySelector("#phone").addEventListener("blur", function () {
  const fullNumber = iti.getNumber();

  if (!phonePattern.test(fullNumber)) {
    resultMessage.textContent =
      "Please enter a valid phone number like  01089468543 or  1089468543.";
    resultMessage.style.color = "red";
    return;
  }
});

// Submit form
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      first_name: document.getElementById("first_name").value.trim(),
      last_name: document.getElementById("last_name").value.trim(),
      phone: iti.getNumber(),
      email: document.getElementById("email").value.trim(),
      country: document.getElementById("country").value.trim(),
    };

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone ||
      !formData.email ||
      !formData.country
    ) {
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

    if (!phonePattern.test(formData.phone)) {
      resultMessage.textContent =
        "Please enter a valid phone number like  01068894543 or  1068894543.";
      resultMessage.style.color = "red";
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "First Name": formData.first_name,
      "Last Name": formData.last_name,
      Phone: formData.phone,
      Email: formData.email,
      Country: formData.country,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // spinner for submit button
    submitButton.innerHTML = `
                <div role="status" class="flex items-center justify-center"> 
                    <svg aria-hidden="true" class="w-8 h-8 text-white-200 animate-spin dark:text-white-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                `;
    submitButton.disabled = true;

    fetch("https://sheetdb.io/api/v1/kpywcruuapu9f", requestOptions)
      .then((response) => {
        if (response.ok) {
          resultMessage.textContent = "Form submitted successfully!";
          resultMessage.style.color = "green";
        } else {
          throw new Error(
            "Failed to submit form. Status code: " + response.status
          );
        }
      })
      .catch((error) => {
        console.error(error);
        resultMessage.textContent = "Error submitting the form.";
        resultMessage.style.color = "red";
      })
      .finally(() => {
        submitButton.innerHTML = "Submit";
        submitButton.disabled = false;
      });
  });
