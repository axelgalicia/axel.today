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