let selectedFilters = [];
let jobData = [];

const fetchJobs = async () => {
  const res = await fetch('./data.json');
  jobData = await res.json(); // Corrected to update global jobData
  renderData();
}

function filterData(filters) {
  selectedFilters = filters;
  renderData();
}

function renderData() {
  const jobListingsContainer = document.querySelector(".cards_container");
  jobListingsContainer.innerHTML = ""; // Clear previous listings

  const filteredData = selectedFilters.length === 0
    ? jobData
    : jobData.filter(({ role, level, languages, tools }) => {
        return (
          selectedFilters.includes(role) ||
          selectedFilters.includes(level) ||
          languages.some(language => selectedFilters.includes(language)) ||
          tools.some(tool => selectedFilters.includes(tool))
        );
      });

  filteredData.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = `cards ${job.featured ? "featured-card" : ""}`;
    if (job.featured) {
      jobCard.style.borderLeft = "5px solid lightskyblue";
    }

    const roles = job.roles || [];
    const languages = job.languages || [];
    const tools = job.tools || [];

    const jobCardHTML = `
      <div class="cards">
        <div class="card_info">
          <div class="images">
            <img src="${job.logo}" alt="">
          </div>
          <div class="company">
            <p>${job.company}</p>
          </div>
          <h2>${job.position}</h2>
          <div class="time">
            ${job.postedAt}
            <ul>
              <li>${job.contract}</li>
            </ul>
            <ul>
              <li>${job.location}</li>
            </ul>
          </div>
        </div>
        <div class="card_roles">
          ${roles.map(role => `<button class="role">${role}</button>`).join('')}
          <button class="level">${job.level}</button>
          ${languages.map(language => `<button class="language">${language}</button>`).join('')}
          ${tools.map(tool => `<button class="tool">${tool}</button>`).join('')}
        </div>
      </div>
    `;

    jobCard.innerHTML = jobCardHTML;
    jobListingsContainer.appendChild(jobCard);
  });
}

fetchJobs();
