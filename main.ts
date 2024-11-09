function addMoreSkills(): void {
    const skillsContainer = document.getElementById("skillsContainer") as HTMLDivElement;

    const skillField = document.createElement("div");
    skillField.classList.add("skillField");

    skillField.innerHTML = `
        <input type="text" class="skill" placeholder="Skill Name (e.g., JavaScript)" required>
    `;

    skillsContainer.appendChild(skillField);
}

function addMoreLanguages(): void {

    console.log("hello world")
    const languagesContainer = document.getElementById("languagesContainer") as HTMLDivElement;

    const languagesField = document.createElement("div");
    languagesField.classList.add("languagesField");

    languagesField.innerHTML = `
        <input type="text" class="languages" placeholder="Enter Languages (e.g., English)" required>
    `;

    languagesContainer.appendChild(languagesField);
}

const addSkillButton = document.getElementById("addSkill") as HTMLButtonElement;
if (addSkillButton) {
    addSkillButton.addEventListener("click", addMoreSkills);
}
const addLanguagesButton = document.getElementById("addLanguages") as HTMLButtonElement;
if (addLanguagesButton) {
    addLanguagesButton.addEventListener("click", addMoreLanguages);
}

function addMoreEducation() {
    const educationContainer = document.getElementById("educationContainer") as HTMLDivElement;

    const educationField = document.createElement("div");
    educationField.classList.add("educationField");

    educationField.innerHTML = `
    <label for="degree">Degree:</label>
    <input type="text" class="degree" id="degree" placeholder="Degree (e.g., B.Sc. Computer Science)" required>

    <label for="institution">Institution:</label>
    <input type="text" class="institution" id="institution" placeholder="Institution (e.g., XYZ University)" required>

    <label for="gradeYear">Graduation Year:</label>
    <input type="number" class="gradeYear" id="gradeYear" placeholder="Graduation Year (e.g., 2022 or 2022-2023)" pattern="^\d{4}(-\d{4})?$" title="Enter year in format: 2022 or 2022-2023" required>
`;

    educationContainer.appendChild(educationField);
}
function addMoreExperience(): void {
    const experienceContainer = document.getElementById("experienceContainer") as HTMLDivElement;

    const experienceField = document.createElement("div");
    experienceField.classList.add("experienceField");

    experienceField.innerHTML = `
    <label for="company">Company Name:</label>
    <input type="text" class="company" id="company" placeholder="Company Name (e.g., ABC Corp)" required>

    <label for="role">Role/Position:</label>
    <input type="text" class="role" id="role" placeholder="Role/Position (e.g., Software Developer)" required>

    <label for="experienceYears">Years Worked:</label>
    <input type="number" class="experienceYears" id="experienceYears" placeholder="Years Worked (e.g., 2022 or 2022-2023)" pattern="^\d{4}(-\d{4})?$" title="Enter year in format: 2022 or 2022-2023" required>

    <label for="experienceDes">Experience Description:</label>
    <textarea id="experienceDes" placeholder="Summarize your experience at [Company Name] and describe your role." rows="4" required class="experienceDes"></textarea>
`;

    experienceContainer.appendChild(experienceField);
}

const addExperienceButton = document.getElementById("addExperience") as HTMLButtonElement;
addExperienceButton?.addEventListener("click", addMoreExperience);


function collectSkills(): { skillName: string }[] {
    const skillFields = document.querySelectorAll("#skillsContainer .skillField"); 
    return Array.from(skillFields).map(field => {
        const skillName = (field.querySelector(".skill") as HTMLInputElement)?.value || 'Not provided';
        return { skillName };
    });
}


function updateSkillsDisplay(): void {
    const skillsContainer = document.getElementById("skillsContainer") as HTMLDivElement;
    const skills = collectSkills();

    skillsContainer.innerHTML = skills.map(skill => `
         <div id="skillsContainer">
            <div class="skillField name">
            <input type="text" class="skill"  value="${skill.skillName}" placeholder="Skill Name (e.g., JavaScript)" id="skills">
        </div>
    `).join('');
}

function collectLanguages(): { languagesName: string }[] {
    const languagesFields = document.querySelectorAll("#languagesContainer .languagesField"); 
    return Array.from(languagesFields).map(field => {
        const languagesName = (field.querySelector(".languages") as HTMLInputElement)?.value || 'Not provided';
        return { languagesName };
    });
}

function updateLanguagesDisplay(): void {
    const languagesContainer = document.getElementById("languagesContainer") as HTMLDivElement;
    const languages = collectLanguages();

    languagesContainer.innerHTML = languages.map(languages => `
         <div id="languagesContainer">
            <div class="languagesField name">
            <input type="text" class="languages"  value="${languages.languagesName}" placeholder="Enter Languages (e.g., English)" id="languages">
        </div>
    `).join('');
}
function updateExperienceDisplay(): void {
    const experienceContainer = document.getElementById("experienceContainer") as HTMLDivElement;
    const experiences = collectExperience(); 

    experienceContainer.innerHTML = experiences.map(exp => `

    <div class="experienceField">
    <label for="company">Company Name:</label>
    <input type="text" id="company" class="company" value="${exp.company}" placeholder="Company Name (e.g., ABC Corp)" required>

    <label for="role">Role/Position:</label>
    <input type="text" id="role" class="role" value="${exp.role}" placeholder="Role/Position (e.g., Software Developer)" required>

    <label for="experienceYears">Years Worked:</label>
    <input type="number" id="experienceYears" class="experienceYears" value="${exp.experienceYears}" placeholder="Years Worked (e.g., 2019-2022)" required>

    <label for="experienceDes">Experience Description:</label>
    <textarea id="experienceDes" placeholder="Summarize your experience at [Company Name] and describe your role." rows="4" required class="experienceDes">${exp.experienceDes}</textarea>
</div>



    `).join('');
}


function collectExperience(): { company: string; role: string; experienceYears: string; experienceDes: string }[] {
    const experienceFields = document.querySelectorAll("#experienceContainer .experienceField");
    return Array.from(experienceFields).map(field => {
        const company = (field.querySelector(".company") as HTMLInputElement)?.value || 'Not provided';
        const role = (field.querySelector(".role") as HTMLInputElement)?.value || 'Not provided';
        const experienceYears = (field.querySelector(".experienceYears") as HTMLInputElement)?.value || 'Not provided';
        const experienceDes = (field.querySelector(".experienceDes") as HTMLTextAreaElement)?.value || 'Not provided';
        return { company, role, experienceYears, experienceDes };
    });
}

function updateEducationDisplay(): void {
    const education = collectEducation();
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;

    resumeOutput.innerHTML = '';

    education.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("educationField");
        div.innerHTML = `
            <span class="degreeStyle">${item.degree}</span><br>
            <span class="instituteStyle">${item.institution}</span><br>
            <span class="instituteStyle">(${item.gradeYear})</span>
            <div class="line"></div> <!-- Optional line separator -->
        `;
        resumeOutput.appendChild(div);
    });

}

function collectEducation(): { degree: string; institution: string; gradeYear: string }[] {
    const educationFields = document.querySelectorAll("#educationContainer .educationField");
    return Array.from(educationFields).map(field => {
        const degreeInput = field.querySelector(".degree") as HTMLInputElement;
        const institutionInput = field.querySelector(".institution") as HTMLInputElement;
        const gradeYearInput = field.querySelector(".gradeYear") as HTMLInputElement;

        const degree = degreeInput ? degreeInput.value : 'Not provided';
        const institution = institutionInput ? institutionInput.value : 'Not provided';
        const gradeYear = gradeYearInput ? gradeYearInput.value : 'Not provided';

        return { degree, institution, gradeYear };
    });
}

function collectContactDetails(): { email: string; phone: string; linkedin: string; github: string; website: string ; address:string} {
    return {
        email: (document.getElementById("contactEmail") as HTMLInputElement).value,
        phone: (document.getElementById("contactPhone") as HTMLInputElement).value,
        address: (document.getElementById("address") as HTMLInputElement).value,
        linkedin: (document.getElementById("linkedin") as HTMLInputElement).value,
        github: (document.getElementById("github") as HTMLInputElement).value,
        website: (document.getElementById("website") as HTMLInputElement).value
    };
}


const addEduButton = document.getElementById("addMoreEducation");
addEduButton?.addEventListener("click", () => {
    addMoreEducation();
    updateEducationDisplay();
});

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

const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;
profileImageInput?.addEventListener("change", handleFileInputChange);

function generatedResume(event: Event): void {


    event.preventDefault();

    const profileImage = (document.getElementById("profileImagePreview") as HTMLImageElement).src;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const subheading = (document.getElementById("subheading") as HTMLInputElement).value;
    const profileSummary = (document.getElementById("profileSummary") as HTMLTextAreaElement).value;

    const skills = collectSkills();
    const languages = collectLanguages();
    const education = collectEducation();
    const experience = collectExperience();
    const contact = collectContactDetails();

    const mainHeading = document.getElementById("resume") as HTMLDivElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    
    if (mainHeading && resumeOutput) {
      mainHeading.innerHTML = "Your Resume is Ready!";
    
      resumeOutput.innerHTML = `
        <div class="container">
          <div class="left">
            <div>
              ${profileImage ? `<div class="resume"><img src="${profileImage}" alt="Profile Image" style="max-width: 200px; height: auto; border-radius: 50%; margin-bottom: 20px;" class="img"></div>` : ''}
            </div>
            
            <div>
              <h3 class="setWidth">About Me</h3>
              <p class="sizeChange">${profileSummary}</p>
            </div>
    
            <div>
              <h3 class="setWidth">Contact Information</h3>
              <p class="sizeChange"><strong><i class="fas fa-envelope"></i> Email:</strong> ${contact.email}</p>
              <p class="sizeChange"><strong><i class="fas fa-phone"></i> Phone Number:</strong> ${contact.phone}</p>
              <p class="sizeChange"><strong><i class="fas fa-regular fa-address-card"></i> Address:</strong> ${contact.address}</p>
              <p class="sizeChange"><strong><i class="fab fa-linkedin"></i> LinkedIn:</strong> <a href="${contact.linkedin}" target="_blank">${contact.linkedin}</a></p>
              <p class="sizeChange"><strong><i class="fab fa-github"></i> GitHub:</strong> <a href="${contact.github}" target="_blank">${contact.github}</a></p>
              <p class="sizeChange"><strong><i class="fas fa-globe"></i> Website:</strong> <a href="${contact.website}" target="_blank">${contact.website}</a></p>
            </div>
    
            <div>
              <h3 class="setWidth">Skills</h3>
              <p class="setDiv">
                ${skills.map((skill) => `
                  <div class="skill-item">
                    <span class="circle"></span>
                    ${skill.skillName}
                  </div>
                `).join('')}
              </p>
            </div>
    
            <div>
              <h3 class="setWidth">Languages</h3>
              <p class="setDiv">
                ${languages.map((language) => `
                  <div class="skill-item">
                    <span class="circle"></span>
                    ${language.languagesName}
                  </div>
                `).join('')}
              </p>
            </div>
          </div>
    
          <div class="right">
            <div class="bgColor">
              <h3 class="nameHeading">${name}</h3>
              <div class="styleline"></div>
              <h5 class="sub">${subheading}</h5>
            </div>
            
            <div class="paddingSet">
              <div>
                <h3 class="nameHeadingStyle">Education</h3>
                <div class="styleline"></div>
                <div class="educationSection">
                  ${education.map((item) => `
                    <div class="educationField">
                      <span class="diamond"></span>
                      <span class="degreeStyle">${item.degree}</span><br>
                      <span class="instituteStyle">${item.institution}</span><br>
                      <span class="instituteStyle">${item.gradeYear}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
    
              <div>
                <h3 class="nameHeadingStyle">Work Experience</h3>
                <div class="styleline"></div>
                <div class="educationSection">
                  ${experience.map((exp) => `
                    <div class="educationField">
                      <span class="diamond"></span>
                      <span class="degreeStyle">${exp.company}</span><br>
                      <span class="instituteStyle">${exp.role}</span><br>
                      <span class="instituteStyle">${exp.experienceYears}</span><br>
                      <span class="instituteStyle">${exp.experienceDes}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
    
      `;
    }
    

    (document.getElementById("resumeForm") as HTMLFormElement).style.display = 'none';
    resumeOutput.style.display = 'block';

    const generateButton = document.querySelector("button[type='submit']") as HTMLButtonElement;
    if (generateButton) {
        generateButton.textContent = 'Save Resume';
    }
}


const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
resumeForm?.addEventListener("submit", generatedResume);


