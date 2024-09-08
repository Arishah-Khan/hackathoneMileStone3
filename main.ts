// Function to add more skills
function addMoreSkills(): void {
    const skillsInput = document.querySelector("#skills") as HTMLInputElement;

    if (skillsInput.value.trim() === '') {
        alert("Please enter a skill");
    } else {
        const skillsList = document.getElementById("skillsList") as HTMLUListElement;
        if (!skillsList) {
            alert("Skills list container not found. Please check your HTML.");
            return;
        }

        const listItem = document.createElement("li");
        listItem.textContent = skillsInput.value.trim();
        skillsList.appendChild(listItem);

        skillsInput.value = '';
    }
}

// Function to add more education fields
function addMoreEducation(): void {
    const educationContainer = document.getElementById("educationContainer") as HTMLDivElement;

    const educationField = document.createElement("div");
    educationField.classList.add("educationField");

    educationField.innerHTML = `
        <input type="text" class="degree" placeholder="Degree (e.g., B.Sc. Computer Science)" required>
        <input type="text" class="institution" placeholder="Institution (e.g., XYZ University)" required>
        <input type="text" class="gradYear" placeholder="Graduation Year (e.g., 2024)" required>
    `;

    educationContainer.appendChild(educationField);
}

// Function to add more work experience fields
function addMoreExperience(): void {
    const experienceContainer = document.getElementById("experienceContainer") as HTMLDivElement;

    const experienceField = document.createElement("div");
    experienceField.classList.add("experienceField");

    experienceField.innerHTML = `
        <input type="text" class="company" placeholder="Company Name (e.g., ABC Corp)" required>
        <input type="text" class="role" placeholder="Role/Position (e.g., Software Developer)" required>
        <input type="text" class="experienceYears" placeholder="Years Worked (e.g., 2019-2022)" required>
    `;

    experienceContainer.appendChild(experienceField);
}

// Attach event listeners to the buttons
const addSkillButton = document.getElementById("addSkill") as HTMLButtonElement;
addSkillButton?.addEventListener("click", addMoreSkills);

const addEduButton = document.getElementById("addMoreEducation") as HTMLButtonElement;
addEduButton?.addEventListener("click", addMoreEducation);

const addExperienceButton = document.getElementById("addExperience") as HTMLButtonElement;
addExperienceButton?.addEventListener("click", addMoreExperience);

// Function to collect skills
function collectSkills(): string {
    const skillsList = document.querySelectorAll("#skillsList li");
    let skills = '';

    skillsList.forEach(item => {
        skills += (item as HTMLLIElement).textContent + "<br>";
    });

    return skills.trim();
}

// Function to collect education details
function collectEducation(): string {
    const educationFields = document.querySelectorAll("#educationContainer .educationField");
    let education = '';

    educationFields.forEach(field => {
        const degree = (field.querySelector(".degree") as HTMLInputElement).value;
        const institution = (field.querySelector(".institution") as HTMLInputElement).value;
        const gradYear = (field.querySelector(".gradYear") as HTMLInputElement).value;

        education += `${degree} from ${institution} (${gradYear})<br>`;
    });

    return education.trim();
}

// Function to collect work experience details
function collectExperience(): string {
    const experienceFields = document.querySelectorAll("#experienceContainer .experienceField");
    let experience = '';

    experienceFields.forEach(field => {
        const company = (field.querySelector(".company") as HTMLInputElement).value;
        const role = (field.querySelector(".role") as HTMLInputElement).value;
        const experienceYears = (field.querySelector(".experienceYears") as HTMLInputElement).value;

        experience += `${role} at ${company} (${experienceYears})<br>`;
    });

    return experience.trim();
}

// Function to collect contact details
function collectContactDetails(): { email: string; phone: string; linkedin: string; github: string; website: string } {
    return {
        email: (document.getElementById("contactEmail") as HTMLInputElement).value,
        phone: (document.getElementById("contactPhone") as HTMLInputElement).value,
        linkedin: (document.getElementById("linkedin") as HTMLInputElement).value,
        github: (document.getElementById("github") as HTMLInputElement).value,
        website: (document.getElementById("website") as HTMLInputElement).value
    };
}

// Function to handle file input change
function handleFileInputChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            const imgPreview = document.getElementById("profileImagePreview") as HTMLImageElement;
            imgPreview.src = imageUrl;
        };

        reader.readAsDataURL(file);
    }
}

// Attach event listener to the file input
const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;
profileImageInput?.addEventListener("change", handleFileInputChange);

// Function to generate and display resume
function generateResume(event: Event): void {
    event.preventDefault();

    // Collect form values
    const profileImage = (document.getElementById("profileImagePreview") as HTMLImageElement).src;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const subheading = (document.getElementById("subheading") as HTMLInputElement).value;
    const profileSummary = (document.getElementById("profileSummary") as HTMLTextAreaElement).value;

    // Collect all other data
    const skills = collectSkills();
    const education = collectEducation();
    const experience = collectExperience();
    const contact = collectContactDetails();

    // Display the collected information in the resume output section
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
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
        <p class="profile"> ${skills}</p>
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
}

// Attach event listener to the form submission
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
resumeForm?.addEventListener("submit", generateResume);
