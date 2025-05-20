const reloadOrientation = () => {
  window.addEventListener("orientationchange", () => {
    location.reload();
  }, false);
}

const getYearsOfExperience = () => {
  const startDate = new Date("2010-06-01");
  const today = new Date();
  const yearsOfExperience = today.getFullYear() - startDate.getFullYear();
  return yearsOfExperience;
}

fetch('/js/version.json')
  .then((response) => response.json())
  .then((data) => {
    const footer = document.querySelector('footer p');
    if (footer) {
      footer.textContent = `Version ${data.version} - Last updated: ${data.lastUpdated}`;
    }
  })
  .catch((error) => console.error('Error fetching version:', error));