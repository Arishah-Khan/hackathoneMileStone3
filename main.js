"use strict";
function addMoreSkills() {
    const skillsContainer = document.getElementById("skillsContainer");
    const skillField = document.createElement("div");
    skillField.classList.add("skillField");
    // Add HTML directly for the new skill input field
    skillField.innerHTML = `
        <input type="text" class="skill" placeholder="Skill Name (e.g., JavaScript)" required>
    `;
    // Append the newly created skill field to the skills container
    skillsContainer.appendChild(skillField);
}
// Attach the event listener to the "Add Skill" button
let addSkillButton = document.getElementById("addSkill");
if (addSkillButton) {
    addSkillButton.addEventListener("click", addMoreSkills);
}
// Function to add more education fields
function addMoreEducation() {
    const educationContainer = document.getElementById("educationContainer");
    const educationField = document.createElement("div");
    educationField.classList.add("educationField");
    educationField.innerHTML = `
        <input type="text" class="degree" placeholder="Degree (e.g., B.Sc. Computer Science)" required>
        <input type="text" class="institution" placeholder="Institution (e.g., XYZ University)" required>
        <input type="number" class="gradYear" placeholder="Graduation Year (e.g., 2024)" required>
    `;
    educationContainer.appendChild(educationField);
}
// Function to add more work experience fields
function addMoreExperience() {
    const experienceContainer = document.getElementById("experienceContainer");
    const experienceField = document.createElement("div");
    experienceField.classList.add("experienceField");
    experienceField.innerHTML = `
        <input type="text" class="company" placeholder="Company Name (e.g., ABC Corp)" required>
        <input type="text" class="role" placeholder="Role/Position (e.g., Software Developer)" required>
        <input type="number" class="experienceYears" placeholder="Years Worked (e.g., 2019-2022)" required>
    `;
    experienceContainer.appendChild(experienceField);
}
// Attach event listeners to the buttons
const addEduButton = document.getElementById("addMoreEducation");
addEduButton?.addEventListener("click", addMoreEducation);
const addExperienceButton = document.getElementById("addExperience");
addExperienceButton?.addEventListener("click", addMoreExperience);
// Function to collect skills
function collectSkills() {
    const skillFields = document.querySelectorAll("#skillsContainer .skillField"); // Update the selector
    return Array.from(skillFields).map(field => {
        const skillName = field.querySelector(".skill")?.value || 'Not provided';
        return { skillName };
    });
}
// Function to collect education details
function collectEducation() {
    const educationFields = document.querySelectorAll("#educationContainer .educationField");
    let education = '';
    educationFields.forEach(field => {
        const degree = field.querySelector(".degree").value;
        const institution = field.querySelector(".institution").value;
        const gradYear = field.querySelector(".gradYear").value;
        education += `${degree} from ${institution} (${gradYear})<br>`;
    });
    return education.trim();
}
// Function to collect work experience details
function collectExperience() {
    const experienceFields = document.querySelectorAll("#experienceContainer .experienceField");
    let experience = '';
    experienceFields.forEach(field => {
        const company = field.querySelector(".company").value;
        const role = field.querySelector(".role").value;
        const experienceYears = field.querySelector(".experienceYears").value;
        experience += `${role} at ${company} (${experienceYears})<br>`;
    });
    return experience.trim();
}
// Function to collect contact details
function collectContactDetails() {
    return {
        email: document.getElementById("contactEmail").value,
        phone: document.getElementById("contactPhone").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        website: document.getElementById("website").value
    };
}
// Function to handle file input change
function handleFileInputChange(event) {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result;
            const imgPreview = document.getElementById("profileImagePreview");
            imgPreview.src = imageUrl;
        };
        reader.readAsDataURL(file);
    }
}
// Attach event listener to the file input
const profileImageInput = document.getElementById("profileImage");
profileImageInput?.addEventListener("change", handleFileInputChange);
// Function to generate and display resume
function generateResume(event) {
    event.preventDefault();
    // Collect form values
    const profileImage = document.getElementById("profileImagePreview").src;
    const nameInput = document.getElementById("name").value.trim();
    const name = nameInput ? nameInput.charAt(0).toUpperCase() + nameInput.slice(1) : "No name provided";
    const subheading = document.getElementById("subheading").value;
    const profileSummary = document.getElementById("profileSummary").value;
    console.log('Name input:', nameInput);
    console.log('Transformed name:', name);
    // Collect all other data
    const skills = collectSkills();
    const education = collectEducation();
    const experience = collectExperience();
    const contact = collectContactDetails();
    // Display the collected information in the resume output section
    const resumeOutput = document.getElementById("resumeOutput");
    resumeOutput.innerHTML = `
    <div>
        <h1 class="resume changeBg">Resume</h1>

        ${profileImage ? `<div class="resume"><img src="${profileImage}" alt="Profile Image" style="max-width: 200px; height: auto; border-radius: 50%; margin-bottom: 20px;" class="img"></div>` : ''}</div>
        <div class="bgColor">
        <h3 class="javaName">${name}</h3>
        <h5 class="sub">${subheading}</h5>
        </div>
        <h4>Profile Summary</h4>
        <p class="profile"> ${profileSummary}</p>
        <h4>Skills</h4>
     <p class="profile">${skills.map(skill => skill.skillName).join('<br>')}</p>
        <h4>Education</h4>
        <p class="profile">${education}</p>
        <h4>Work Experience</h4>
        <p class="profile">${experience}</p>
        <h4 >Contact Information</h4>
        <p class="profile"><strong>Email:</strong> ${contact.email}</p>
        <p class="profile"><strong>Phone Number:</strong> ${contact.phone}</p>
        <p class="profile"><strong>LinkedIn:</strong> <a href="${contact.linkedin}" target="_blank">${contact.linkedin}</a></p>
        <p class="profile"><strong>GitHub:</strong> <a href="${contact.github}" target="_blank">${contact.github}</a></p>
        <p class="profile"><strong>Website:</strong> <a href="${contact.website}" target="_blank">${contact.website}</a></p>
    `;
    document.getElementById("resumeForm").style.display = 'none';
    resumeOutput.style.display = 'block';
}
// Attach event listener to the form submission
const resumeForm = document.getElementById("resumeForm");
resumeForm?.addEventListener("submit", generateResume);
