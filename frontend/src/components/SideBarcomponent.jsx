import React, { useState } from "react";
import { FaHome, FaBell, FaUser, FaCog } from "react-icons/fa"; // Icons

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-gray-800 h-screen p-5 flex flex-col justify-between ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      
      <div className="space-y-6">
      
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none hover:text-gray-400"
        >
          {isCollapsed ? ">>" : "<<"}
        </button>

        {/* Sidebar Menu Items */}
        <nav className="space-y-4">
          <SidebarItem
            icon={<FaHome />}
            label="Home"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FaBell />}
            label="Notifications"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FaCog />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className={`${isCollapsed ? "text-center" : ""} text-white`}>
        {isCollapsed ? "©" : "© 2024 Your App"}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isCollapsed }) => {
  return (
    <div
      className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
        isCollapsed ? "justify-center" : ""
      }`}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </div>
  );
};

export default Sidebar;
