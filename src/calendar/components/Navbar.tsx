
const subNavs = document.querySelectorAll(`.subnav`);
const buttons = document.querySelectorAll(`.sidebar button`);

export const Navbar = () => {
  

  const resetSidebar = () => {
    subNavs.forEach((nav: any) => {
      nav.style.height = 0;
    });
  
    buttons.forEach((b) => {
      b.classList.remove("active");
    });
  };
  const handleHeaderClicked = (subNav:string) => {    
    resetSidebar();

    const subNavOuter:any = document.querySelector(`#${subNav}`),
    subNavInner:any = document.querySelector(`#${subNav} .subnav-inner`),
    button = subNavOuter.previousElementSibling;

    if (subNavOuter.clientHeight > 0) {
      subNavOuter.style.height = 0;
      button.classList.remove("active");
      return;
    }

    button.classList.toggle("active");
    const newHeight = `${subNavInner.clientHeight}px`;
    subNavOuter.style.height = newHeight;
  }
  const handleToolsClicked = () => handleHeaderClicked('tools');   
  const handleSettingsClicked = () => handleHeaderClicked('settings');   
  return (
    <>
      <div className ="navbar navbar-dark bg-dark mb-4 px-4">
        
          <span className = 'navbar-brand'>
              <i className='fas fa-calendar-alt'></i>
              &nbsp;
              Calendar
          </span>
          <button className='btn btn-outline-danger'>
              <i className='fas fa-sign-out-alt'></i>
              <span>Sign out</span>
          </button>
      </div>
      <aside className='sidebar'>
        <button>
          <span className="material-symbols-outlined"> home </span>
          <span>Home</span>
        </button>
        <button onClick={handleToolsClicked}>
          <span className="material-symbols-outlined"> build </span>
          <span>Tools</span>
          <span className="material-symbols-outlined" > expand_more </span>
        </button>      
        <div id="tools" className="subnav">
        <div className="subnav-inner">
            <button>
              <span>Documents</span>
            </button>
            <button>
              <span>Editor</span>
            </button>
            <button>
              <span>Themes</span>
            </button>
          </div>
        </div>

        <button onClick={handleSettingsClicked}>
          <span className="material-symbols-outlined"> settings </span>
          <span>Settings</span>
          <span className="material-symbols-outlined" > expand_more </span>
        </button>
        <div id="settings" className="subnav">
          <div className="subnav-inner">
            <button>
              <span>Display</span>
            </button>
            <button>
              <span>Audio</span>
            </button>
            <button>
              <span>Interface</span>
            </button>
            <button>
              <span>Accessibility</span>
            </button>
          </div>
        </div>

       

        <button>
          <span className="material-symbols-outlined"> account_circle </span>
          <span>Profile</span>
        </button>
        <button>
          <span className="material-symbols-outlined"> logout </span>
          <span>Sign Out</span>
        </button>
      </aside>
    </>
  )
}
