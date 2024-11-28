function toggleAccordion(clickedHeader) {
  const allAccordions = document.querySelectorAll('.accordion');

  allAccordions.forEach((accordion) => {
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.icon');
    const header = accordion.querySelector('.accordion-header');

    if (accordion.contains(clickedHeader)) {
      if (content.classList.contains('max-h-0')) {
        content.classList.remove('max-h-0');
        content.classList.add('max-h-screen');  
        icon.className = 'icon fa-solid fa-angle-up';
        header.classList.remove('bg-gray-300');
        header.classList.add('bg-[#ef4256]', 'text-white');  // Replace bg-green-600 with #ef4256
      } else {
        content.classList.add('max-h-0');
        content.classList.remove('max-h-screen');
        icon.className = 'icon fa-solid fa-angle-down'; 
        header.classList.remove('bg-[#ef4256]', 'text-white'); // Replace bg-green-600 with #ef4256
        header.classList.add('bg-gray-300');
      }
    } else {
      content.classList.add('max-h-0');
      content.classList.remove('max-h-screen');
      icon.className = 'icon fa-solid fa-angle-down'; 
      const otherHeader = accordion.querySelector('.accordion-header');
      otherHeader.classList.remove('bg-[#ef4256]', 'text-white'); // Replace bg-green-600 with #ef4256
      otherHeader.classList.add('bg-gray-300');
    }
  });
}


var input = document.querySelector("#phone");
  var iti = window.intlTelInput(input, {
    preferredCountries: ["us", "ca"],
    separateDialCode: true, 
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",  
  });

  input.parentNode.style.width = "100%";
  document.querySelector('.iti').style.width = "100%";
  document.querySelector('.iti__flag-container').style.width = "auto";
