const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function truncateString(str, limit) {
  if (str.length > limit) {
    return str.substring(0, limit) + "...";
  }
  return str;
}
// Function to generate job card HTML based on provided job data

function generateJobCardHTML(job, index) {
  const truncatedDesc = truncateString(job.desc, 100); // Set the character limit (e.g., 100 characters)

  return `
    <div class="job-card" data-id="${index}" data-title="${job.title}" data-company="${job.company}" data-location="${job.location}" data-description="${job.desc}">
      <h3 class="job-title">${job.title}</h3>
      <p class="job-company">${job.company}</p>
      <p class="job-location">${job.location}</p>
      <p class="job-posted">${job.posted}</p>
      <p class="job-desc">${truncatedDesc}</p>
      <button class="details-btn">Details</button>
    </div>
  `;
}
const postJobButton1 = document.querySelector("#post");

// Add event listener to the button
postJobButton1.addEventListener("click", () => {
  // Get the post job form element
  const postJobForm = document.getElementById("post-job-form");

  // Scroll to the post job form
  postJobForm.scrollIntoView({ behavior: "smooth" });
});
// Get reference to job card container element
const jobCardContainer = document.querySelector(".job-card-container");

// Get reference to category buttons
const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "all"; // Default selected category

// Function to filter jobs by category and generate job card HTML for each job
function filterJobs(category) {
  jobCardContainer.innerHTML = "";
  jobs
    .filter((job) => {
      if (category === "all") {
        return true;
      } else {
        return job.category === category;
      }
    })
    .forEach((job, index) => {
      const jobCardHTML = generateJobCardHTML(job, index);
      jobCardContainer.innerHTML += jobCardHTML;
    });
}

// Event listener for category buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    selectedCategory = category; // Update selected category
    filterJobs(selectedCategory);
  });
});

// Display all job cards on page load
filterJobs(selectedCategory);

document
  .querySelector('a[href="#post-job"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector("#post-job-form")
      .scrollIntoView({ behavior: "smooth" });
  });

const postJobForm = document.getElementById("post-job-form");
const jobForm = document.getElementById("job-form");

// Add event listener to job form submit button
jobForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting

  // Get form input values
  const jobTitle = document.getElementById("job-title").value;
  const jobLocation = document.getElementById("job-location").value;
  const jobCompany = document.getElementById("job-company").value;
  const jobCategory = document.getElementById("job-category").value;
  const jobDescription = document.getElementById("job-description").value;

  // Create new job object
  const newJob = {
    title: jobTitle,
    location: jobLocation,
    company: jobCompany,
    posted: formatCurrentDateTime(),
    desc: jobDescription,
    category: jobCategory,
  };

  // Add new job to the jobs array
  jobs.push(newJob);
  console.log(newJob);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  // Save jobs array to local storage
  // Generate job card HTML for the new job and append it to the job card container
  const newJobCardHTML = generateJobCardHTML(newJob, jobs.length - 1);
  jobCardContainer.innerHTML += newJobCardHTML;

  // Reset form input values
  jobForm.reset();

  // Scroll to the new job card
  const newJobCard = jobCardContainer.lastElementChild;
  newJobCard.scrollIntoView({ behavior: "smooth" });
});

// Function to format current date and time as a string
function formatCurrentDateTime() {
  const currentDate = new Date();
  return currentDate.toLocaleString();
}

const postJobButton = document.querySelector("#hero .btn");
postJobButton.addEventListener("click", () => {});

// Function to open the job details modal
// Get the job cards
document.addEventListener("DOMContentLoaded", function () {
  const jobCards = document.querySelectorAll(".job-card");

  // Get the job modal elements
  const jobModal = document.getElementById("job-details");
  const modalTitle = document.getElementById("modal-job-title");
  const modalCompany = document.getElementById("modal-job-company");
  const modalLocation = document.getElementById("modal-job-location");
  const modalDescription = document.getElementById("modal-job-description");

  // Function to open the modal with job details
  function openJobModal(title, location, description, company) {
    modalTitle.textContent = title;
    modalCompany.textContent = company;
    modalLocation.textContent = location;
    modalDescription.textContent = description;
    jobModal.style.display = "block";
  }

  // Event listener for card click
  jobCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = card.dataset.title;
      const company = card.dataset.company;
      const location = card.dataset.location;
      const description = card.dataset.description;
      openJobModal(title, location, description, company);
    });
  });

  // Event listener for close button click
  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", function () {
    jobModal.style.display = "none";
  });

  // Check if job details exist in local storage
  const storedJobTitle = localStorage.getItem("jobTitle");
  const storedJobLocation = localStorage.getItem("jobLocation");
  const storedJobCompany = localStorage.getItem("jobCompany");
  const storedJobDescription = localStorage.getItem("jobDescription");

  // Populate the modal with stored job details
  if (
    storedJobTitle &&
    storedJobLocation &&
    storedJobDescription &&
    storedJobCompany
  ) {
    openJobModal(
      storedJobTitle,
      storedJobLocation,
      storedJobDescription,
      storedJobCompany
    );
  }
  // Get the apply button element
  const applyButton = document.getElementById("apply-btn");

  // Add event listener to the apply button
  applyButton.addEventListener("click", handleApplyButtonClick);

  // Function to handle the "Apply" button click
  function handleApplyButtonClick(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the selected file from the cv-file input
    const cvFileInput = document.getElementById("cv-file");
    const selectedFile = cvFileInput.files[0];

    // Get the error message element
    const errorMessage = document.getElementById("cv-error-message");

    // Check if a file is selected
    if (selectedFile) {
      // Show the success modal
      const successModal = document.getElementById("success-modal");
      successModal.style.display = "block";

      // Hide the current modal
      const currentModal = document.getElementById("job-details");
      currentModal.style.display = "none";

      // Hide the error message
      errorMessage.style.display = "none";
    } else {
      // Show the error message
      errorMessage.style.display = "block";
    }
  }
  // Get reference to CV file input and error message element
  const cvFileInput = document.getElementById("cv-file");
  const cvErrorMessage = document.getElementById("cv-error-message");

  // Add event listener to CV file input
  cvFileInput.addEventListener("change", () => {
    // Check if CV file input is not empty
    if (cvFileInput.files.length > 0) {
      // Hide the error message
      cvErrorMessage.style.display = "none";
    }
  });
  // Get the close success modal button element
  const closeSuccessModalButton = document.getElementById(
    "close-success-modal"
  );

  // Add event listener to the close success modal button
  closeSuccessModalButton.addEventListener("click", () => {
    const successModal = document.getElementById("success-modal");
    successModal.style.display = "none";
  });

  // Get the remove CV icon element
  const removeCVIcon = document.getElementById("remove-cv");

  // Add event listener to the remove CV icon
  removeCVIcon.addEventListener("click", handleRemoveCV);

  // Function to handle the remove CV icon click
  function handleRemoveCV() {
    // Clear the CV input value
    const cvFileInput = document.getElementById("cv-file");
    cvFileInput.value = "";

    // Hide the remove CV icon
    removeCVIcon.style.display = "none";
  }
});
