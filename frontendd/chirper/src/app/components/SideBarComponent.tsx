
import React, { useState,useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { userprops } from '@/types/props';

import HomeButton from '@/public/homeButton.svg';
import Setting from '@/public/setting.svg';
import Notification from '@/public/notification.svg';
import Profile from '@/public/profilepic.svg';
import OpenMenu from '@/public/openmenu.svg';
import CloseMenu from '@/public/CloseMenu.svg';
import LogoutIcon from '@/public/logout.svg'; 
import defaultProfilePic from '@/public/profilepic.svg'

const SideBarComponent: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<userprops | null>(null);
  
  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  useEffect(() => {
    fetchProfile();
    
  }, []);
  const username=user?.username;
  const profilePic=user?.profileImg ? user?.profileImg:defaultProfilePic

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleHomeClick = () => {
    router.push('/'); 
  };

  const handleProfileClick = () => {
    router.push(`/profilepage/@${username}`);
  };

  const handleMouseEnter = () => {
    setIsCollapsed(true);
  };

  
  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/api/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        router.push('/authentication'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className={`bg-gray-800 h-screen p-5 flex flex-col opacity-0  hover:opacity-100 justify-between bg-gradient-to-t from-gray-900 to-gray-600 fixed left-0 top-0 ${
        isCollapsed ? "w-20"  : "w-64" 
      }  transition-all duration-500`}
    >
      <div className="space-y-6 rounded-3xl">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none hover:text-gray-400"
        >
          <Image
            src={isCollapsed ? OpenMenu : CloseMenu}
            alt="Menu Toggle"
            width={30}
            height={30}
            className="rounded-full"
          />
        </button>

        <nav className="space-y-4">
          <div
            className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } cursor-pointer`} 
            onClick={handleHomeClick} 
          >
            <Image
              src={HomeButton}
              alt="Home"
              width={30}
              height={30}
              className="rounded-full"
            />
            {!isCollapsed && <span>Home</span>}
          </div>

          <div
            className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } cursor-pointer`} 
            onClick={handleProfileClick} 
          >
            <Image
              src={profilePic}
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            {!isCollapsed && <span>Profile</span>}
          </div>

          <div
            className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } cursor-pointer`} 
          >
            <Image
              src={Notification}
              alt="Notifications"
              width={30}
              height={30}
              className="rounded-full"
            />
            {!isCollapsed && <span>Notifications</span>}
          </div>

          <div
            className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
              isCollapsed ? "justify-center" : ""
            } cursor-pointer`} 
          >
            <Image
              src={Setting}
              alt="Settings"
              width={30}
              height={30}
              className="rounded-full"
            />
            {!isCollapsed && <span>Settings</span>}
          </div>
          <div
          onClick={handleLogout} 
          className={`flex items-center space-x-4  p-2 text-white hover:bg-gray-700 rounded-lg ${
            isCollapsed ? "justify-center" : ""
          } cursor-pointer`} 
        >
          <Image
            src={LogoutIcon}
            alt="Logout"
            width={30}
            height={30}
            className="rounded-full"
          />
          {!isCollapsed && <span>Logout</span>}
        </div>
        </nav>
      </div>

      <div className="flex flex-col items-center">
        
        <div className={`${isCollapsed ? "text-center" : ""} text-white`}>
          {isCollapsed ? "©" : "© 2024 CHIRPIR"}
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
