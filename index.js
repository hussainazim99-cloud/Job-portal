// Mock job data
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Corp",
        location: "New York, NY",
        salary: "$80,000 - $100,000",
        description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive web applications using HTML, CSS, and JavaScript."
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Data Systems Inc",
        location: "San Francisco, CA",
        salary: "$90,000 - $120,000",
        description: "Join our backend team to develop scalable server-side applications. Experience with Node.js, Python, or Java is required."
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "Creative Agency",
        location: "Los Angeles, CA",
        salary: "$70,000 - $90,000",
        description: "Create beautiful and intuitive user interfaces. Proficiency in design tools like Figma, Adobe XD, and understanding of user-centered design principles is essential."
    },
    {
        id: 4,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        location: "Austin, TX",
        salary: "$85,000 - $110,000",
        description: "Work on both frontend and backend development for our innovative web platform. Knowledge of React, Node.js, and databases is preferred."
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Seattle, WA",
        salary: "$95,000 - $130,000",
        description: "Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes is highly desirable."
    },
    {
        id: 6,
        title: "Data Analyst",
        company: "Analytics Pro",
        location: "Chicago, IL",
        salary: "$75,000 - $95,000",
        description: "Analyze large datasets to provide insights for business decisions. Proficiency in SQL, Python, and data visualization tools is required."
    }
];

let currentJob = null;

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const jobListings = document.getElementById('jobListings');
const jobModal = document.getElementById('jobModal');
const applyModal = document.getElementById('applyModal');
const modalTitle = document.getElementById('modalTitle');
const modalCompany = document.getElementById('modalCompany');
const modalLocation = document.getElementById('modalLocation');
const modalSalary = document.getElementById('modalSalary');
const modalDescription = document.getElementById('modalDescription');
const applyBtn = document.getElementById('applyBtn');
const applyForm = document.getElementById('applyForm');

// Display jobs
function displayJobs(jobArray) {
    jobListings.innerHTML = '';
    jobArray.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong></p>
            <p>${job.location}</p>
            <p>${job.salary}</p>
            <p>${job.description.substring(0, 100)}...</p>
        `;
        jobCard.addEventListener('click', () => openJobModal(job));
        jobListings.appendChild(jobCard);
    });
}

// Open job detail modal
function openJobModal(job) {
    currentJob = job;
    modalTitle.textContent = job.title;
    modalCompany.textContent = job.company;
    modalLocation.textContent = job.location;
    modalSalary.textContent = job.salary;
    modalDescription.textContent = job.description;
    jobModal.style.display = 'block';
}

// Close modals
document.querySelector('.close').addEventListener('click', () => {
    jobModal.style.display = 'none';
});

document.querySelector('.close-apply').addEventListener('click', () => {
    applyModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === jobModal) {
        jobModal.style.display = 'none';
    }
    if (event.target === applyModal) {
        applyModal.style.display = 'none';
    }
});

// Apply button
applyBtn.addEventListener('click', () => {
    jobModal.style.display = 'none';
    applyModal.style.display = 'block';
});

// Apply form submission
applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('applicantName').value;
    const email = document.getElementById('applicantEmail').value;
    const message = document.getElementById('applicantMessage').value;
    
    alert(`Application submitted for ${currentJob.title} at ${currentJob.company}!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    
    applyForm.reset();
    applyModal.style.display = 'none';
});

// Search functionality
function searchJobs() {
    const query = searchInput.value.toLowerCase();
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
    );
    displayJobs(filteredJobs);
}

searchBtn.addEventListener('click', searchJobs);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchJobs();
    }
});

// Initial display
displayJobs(jobs);