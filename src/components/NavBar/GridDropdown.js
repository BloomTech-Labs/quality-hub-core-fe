import React, { useEffect, useState, useRef } from "react";


const GridDropdown = props => {
  const node = useRef();
  const [open, setOpen] = useState(false);

  const handleOutsideClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [open]);

  return (
    <div ref={node}>
      {/* Styling here needs to be changed to CSS Grid to make it more stable */}
      <img
        src="/grid.svg"
        alt="Grid Menu"
        className="grid-menu grid-icon"
        onClick={e => setOpen(!open)}
      />
      {open && (
        <div className="dropdown-grid-content dropdown-icons">
          <div>
            <a href="#">
              <img src="/favicon.svg" height="50px" width="50px" />
              <p>ResumeQ</p>
            </a>
          </div>
          <div>
            <a href="#">
              <img src="/interview.svg" height="50px" width="50px" />
              <p>InterviewQ</p>
            </a>
          </div>
          <div>
            <a href="#">
              <img src="/resume.svg" height="50px" width="50px" />
              <p>ResumeQ</p>
            </a>
          </div>
          <div>
            <a href="#">
              <img src="/design.svg" height="50px" width="50px" />
              <p>DesignQ</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridDropdown;
