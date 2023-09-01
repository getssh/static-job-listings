import { fetchData } from './api.js';

const container = document.querySelector('.container');
const filters = [];

let allJobs = [];

const filtersSection = document.createElement('div');
filtersSection.className = `filters-section flex flex-wrap sm:flex-nowrap bg-white justify-between items-center gap-2 py-5 px-4 w-10/12 min-h-10 drop-shadow-lg mb-0 relative -top-10`;
// document.body.insertBefore(filtersSection, container);

fetchData()
  .then(data => {
    allJobs = data;
    renderJobs(allJobs);
  })
  .catch(error => {
    container.innerHTML = 'Error couldnt load data';
    console.log(error)
  });

function renderFilters() {
  filtersSection.innerHTML = '';
  const filterElementContainer = document.createElement('div');
  filterElementContainer.className = 'flex flex-wrap gap-2';
  filters.forEach(filter => {
    const filterElement = document.createElement('div');
    const fitlerText = document.createElement('span');
    fitlerText.className = 'py-1';
    filterElement.className = 'filter text-primary bg-lighbg pl-2 rounded-sm flex flex-between';
    fitlerText.textContent = filter;

    const deleteButton = document.createElement('span');
    deleteButton.className = 'delete-button hover:cursor-pointer hover:bg-verydark px-3 py-1 font-bold bg-primary text-white rounded-r-md ml-2';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => removeFilter(filter));

    filterElement.appendChild(fitlerText)
    filterElement.appendChild(deleteButton)
    filterElementContainer.appendChild(filterElement)
    // filterElementContainer.appendChild(deleteButton);
    filtersSection.appendChild(filterElementContainer);
  });

  if (filters.length > 0) {
      const clearFiltersButton = document.createElement('button');
      clearFiltersButton.className = 'clear-filters-button self-center text-primary font-bold hover:underline';
      clearFiltersButton.textContent = 'Clear';
      clearFiltersButton.addEventListener('click', clearAllFilters);
      filtersSection.appendChild(clearFiltersButton);
  }
}

function renderJobs(jobs) {
    container.innerHTML = '';

    const filteredJobs = filters.length > 0 ? filterJobsByFilters(jobs, filters) : jobs;
    renderFilters();

    if (filters.length) {
      container.appendChild(filtersSection);
    }
    filteredJobs.forEach((job) => {
        const jobContainer = document.createElement('div');
        jobContainer.className = `flex py-5 flex-col md:flex-row xl:flex-row sm:flex-wrap lg:flex-nowrap justify-start sm:justify-between items-start sm:items-center drop-shadow-lg bg-white w-10/12 my-6 sm:my-3 px-3 ${job.featured ? 'border-l-4 border-primary' : ''}`;

        const jobDetails = document.createElement('div');
        jobDetails.className = 'flex flex-col sm:flex-row items-center gap-5 p-3 absolute sm:reletive -top-16 sm:-top-0 relative mt-20 sm:mt-0';

        const logoDiv = document.createElement('div');
        logoDiv.className = 'self-start sm:self-center flex-shrink-0 absolute sm:relative bottom-28 sm:bottom-0 w-16 sm:w-auto';
        const logoImage = document.createElement('img');
        logoImage.src = job.logo;
        logoImage.className = 'max-w-full h-auto';
        logoDiv.appendChild(logoImage);
        jobDetails.appendChild(logoDiv);

        const textDetails = document.createElement('div');
        textDetails.className = "flex flex-col gap-2";
        const companyInfo = document.createElement('div');
        companyInfo.className = 'flex gap-3';
        const companyName = document.createElement('p');
        companyName.className = 'text-primary font-bold';
        companyName.textContent = job.company;
        const isNew = document.createElement('p');
        isNew.textContent = job.new ? 'New!' : '';
        isNew.className = job.new ? 'text-white bg-primary font-semibold px-3 py-1 text-sm uppercase rounded-2xl' : '';
        const isFeatured = document.createElement('p');
        isFeatured.textContent = job.featured ? 'Featured' : '';
        isFeatured.className = job.featured ? 'text-white uppercase text-sm bg-verydark px-3 py-1 rounded-2xl' : '';
        companyInfo.appendChild(companyName);
        companyInfo.appendChild(isNew);
        companyInfo.appendChild(isFeatured);
        textDetails.appendChild(companyInfo);

        const position = document.createElement('h2');
        position.textContent = job.position;
        position.className = 'font-bold cursor-pointer hover:text-primary'
        textDetails.appendChild(position);

        const contractDetails = document.createElement('ul');
        contractDetails.className = 'flex gap-10 list-none';
        const postedAt = document.createElement('li');
        postedAt.textContent = job.postedAt;
        postedAt.className = 'text-darkgray whitespace-nowrap';
        const contractType = document.createElement('li');
        contractType.textContent = job.contract;
        contractType.className = 'text-darkgray list-disc pl-2 whitespace-nowrap';
        const location = document.createElement('li');
        location.textContent = job.location;
        location.className = 'text-darkgray list-disc pl-2 whitespace-nowrap';
        
        contractDetails.appendChild(postedAt);
        contractDetails.appendChild(contractType);
        contractDetails.appendChild(location);
        
        textDetails.appendChild(contractDetails);
        jobDetails.appendChild(textDetails);


        const roleLanguagesTools = document.createElement('div');
        roleLanguagesTools.className = 'flex flex-wrap sm:flex-nowrap gap-4 md:flex-nowrap border-t border-darkgray sm:border-none pt-5 sm:pt-0 md:pt-5 -mt-16 sm:mt-0 ';
        const roleElement = document.createElement('p');
        roleElement.textContent = job.role;
        roleElement.className = 'bg-lightfiler px-3 py-1 text-primary font-bold cursor-pointer hover:bg-primary hover:text-white rounded-md';
        roleElement.addEventListener('click', () => toggleFilter(job.role));
        roleLanguagesTools.appendChild(roleElement);

        const levelElement = document.createElement('p');
        levelElement.textContent = job.level;
        levelElement.className = 'bg-lightfiler px-3 py-1 text-primary font-bold cursor-pointer hover:bg-primary hover:text-white rounded-md';
        levelElement.addEventListener('click', () => toggleFilter(job.level));
        roleLanguagesTools.appendChild(levelElement);

        job.languages.forEach(language => {
          const languageElement = document.createElement('p');
          languageElement.textContent = language;
          languageElement.className = 'bg-lightfiler px-3 py-1 text-primary font-bold cursor-pointer hover:bg-primary hover:text-white rounded-md';
          languageElement.addEventListener('click', () => toggleFilter(language));
          roleLanguagesTools.appendChild(languageElement);
        });

        job.tools.forEach(tool => {
          const toolElement = document.createElement('p');
          toolElement.textContent = tool;
          toolElement.className = 'bg-lightfiler px-3 py-1 text-primary font-bold cursor-pointer hover:bg-primary hover:text-white rounded-md';
          toolElement.addEventListener('click', () => toggleFilter(tool));
          roleLanguagesTools.appendChild(toolElement);
        });

        jobContainer.appendChild(jobDetails);
        jobContainer.appendChild(roleLanguagesTools);

        container.appendChild(jobContainer);
    });
}

function toggleFilter(filterValue) {
  if (filters.includes(filterValue)) {
    return;
  } else {
      filters.push(filterValue);
  }
  renderJobs(allJobs);
}

function removeFilter(filterValue) {
  filters.splice(filters.indexOf(filterValue), 1);
  renderJobs(allJobs);
}

function clearAllFilters() {
  filters.length = 0;
  renderJobs(allJobs);
}

function filterJobsByFilters(jobs, filters) {
    return jobs.filter(job => {
        return (
            filters.every(filter => job.role.includes(filter) || job.level.includes(filter) || job.languages.includes(filter) || job.tools.includes(filter))
        );
    });
}
