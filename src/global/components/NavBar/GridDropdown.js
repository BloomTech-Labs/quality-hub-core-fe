import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';

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
          <div className="test-css-grid">
          <Link to='/' className="box">
                <img
                  src="/favicon.svg"
                  height="50px"
                  width="50px"
                  alt="ResumeQ icon"
                />
                <p>CodingQ</p>
            </Link>

          
              <Link to='/interviewq' className="box">
                <img
                  src="/interview.svg"
                  height="50px"
                  width="50px"
                  alt="InterviewQ icon"
                />
                <p>InterviewQ</p>
              </Link>

              <Link to='/' className="box">
                <img
                  src="/resume.svg"
                  height="50px"
                  width="50px"
                  alt="ResumeQ icon"
                />
                <p>ResumeQ</p>
            </Link>

            <Link to='/' className="box">
                <img
                  src="/design.svg"
                  height="50px"
                  width="50px"
                  alt="DesignQ icon"
                />
                <p>DesignQ</p>
              </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridDropdown;
