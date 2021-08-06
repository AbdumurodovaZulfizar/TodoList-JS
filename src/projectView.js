const projectView = () => {
  const render = projects => {
    const element = `
        ${projects.map((project, index) => `<button type="button" class="project-item pro fs-4 px-4 menu-button" data-index="${index}">${project.title}</button><br>`).join('')}
    `;
    document.getElementById('projects').innerHTML = element;
  };

  return { render };
};

export default projectView;
