import React, { useEffect, useState, useRef } from "react";

const AvatarDropdown = props => {
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
      <img
        src="avatar.png"
        alt="Grid Menu"
        className="avatar-menu"
        onClick={e => setOpen(!open)}
      />
      {open && (
        <div className="dropdown-content">
          <div className="dropdown-avatar-camera">
            {/* Avatar image in dropdown menu */}
            <img
              src="/avatar.png"
              alt="Profile avatar"
              className="avatar-submenu"
            />
            {/* This is the offset camera icon */}
            <div className="dropdown-camera-icon">&#x1F4F7;</div>
          </div>
          <p className="dropdown-menu-name">Quailnana</p>
          <p className="dropdown-menu-email">quailnana@qualityhub.com</p>

          {/* Need to link to dashboard */}
          <button className="manage-btn">
            Manage your Quality Hub account
          </button>
          <hr />
          {/* Need to add sign out functionality */}
          <button className="signout-btn">Sign Out </button>
          <hr />
          <div className="dropdown-menu-links-div">
            {/* Need to link to policy and TOS eventually */}
            <a href="#" className="dropdown-menu-links">
              Privacy Policy
            </a>
            &#8226;
            <a href="#" className="dropdown-menu-links">
              Terms of Service
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
