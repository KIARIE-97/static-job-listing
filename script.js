const level = document.querySelector('.data_level');
const role = document.querySelector('.data_role');
const tools = document.querySelector('.data_tools');
const language = document.querySelector('.data_language');
const btn = document.querySelector('.btn');
const levelData = ['Junior', 'Midweight', 'Senior'];
const roleData = ['Frontend', 'Backend', 'Fullstack'];
const toolsData = ['React', 'Sass', 'Vue', 'Django', 'RoR'];
const languageData = ['Python', 'JavaScript', 'Ruby', 'HTML', 'CSS'];

let jobListings= [];

 const fetchJobs = async () => {
 const res = await fetch('./data.json');
    const data = await res.json();
    console.log(data);
    jobListings = data;
    displayData(jobListings);
 }
fetchJobs();
// .then(response => response.json())
// .then(data => {
//   jobListings = data;
//   displayData(jobListings);
// })
// .catch(error => console.error('Error fetching the data:', error));




//filter
function displayData(jobs) {
    const jobListingsContainer = document.querySelector('.cards_container');
    jobListingsContainer.innerHTML = "";
    jobs.forEach(job => {
        const roles = job.roles || [];
    const languages = job.languages || [];
    const tools = job.tools || [];
      const jobCard = `
        <div class="cards">
          <div class="card_info">
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
            ${roles.map(role => `<button>${role}</button>`).join('')}
            <button>${job.level}</button>
            ${languages.map(language => `<button>${language}</button>`).join('')}
            ${tools.map(tool => `<button>${tool}</button>`).join('')}
          </div>
        </div>
      `;
      jobListingsContainer.innerHTML += jobCard;
    });

    
  }
function filterJobs() {

  const filteredJobs = jobListings.filter(job => {
    const matchesRole = !role || job.roles.some(role => role.toLowerCase().includes(role));
    const matchesLevel = !level || job.level.toLowerCase().includes(level);
    const matchesLanguage = !language || job.languages.some(language => language.toLowerCase().includes(language));
    const matchesTools = !tools || job.tools.some(tool => tool.toLowerCase().includes(tools));

    return matchesRole && matchesLevel && matchesLanguage && matchesTools;
  });
  displayData(filteredJobs);
}

btn.addEventListener('click', filterJobs);

// // Level
// const levelOptions = levelData.map((item) => {
//   return `<option value="${item}">${item}</option>`;
// }).join('');
// level.innerHTML = levelOptions;

// // Role
// const roleOptions = roleData.map((item) => {
//   return `<option value="${item}">${item}</option>`;
// }).join('');
// role.innerHTML = roleOptions;

// // Tools
// const toolsOptions = toolsData.map((item) => {
//   return `<option value="${item}">${item}</option>`;
// }).join('');
// tools.innerHTML = toolsOptions;

// // Language
// const languageOptions = languageData.map((item) => {
//   return `<option value="${item}">${item}</option>`;
// }).join('');
// language.innerHTML = languageOptions;




