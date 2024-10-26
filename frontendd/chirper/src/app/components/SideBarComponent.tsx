
// import React, { useState,useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from 'next/navigation';
// import { userprops } from '@/types/props';

// import HomeButton from '@/public/homeButton.svg';
// import Setting from '@/public/setting.svg';
// import Notification from '@/public/notification.svg';
// import Profile from '@/public/profilepic.svg';
// import OpenMenu from '@/public/openmenu.svg';
// import CloseMenu from '@/public/CloseMenu.svg';
// import LogoutIcon from '@/public/logout.svg'; 
// import defaultProfilePic from '@/public/profilepic.svg'

// const SideBarComponent: React.FC = () => {
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const router = useRouter();
//   const [user, setUser] = useState<userprops | null>(null);
  
//   const fetchProfile = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/me', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       const data = await response.json();
//       setUser(data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };
//   useEffect(() => {
//     fetchProfile();
    
//   }, []);
//   const username=user?.username;
//   const profilePic=user?.profileImg ? user?.profileImg:defaultProfilePic

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const handleHomeClick = () => {
//     router.push('/'); 
//   };

//   const handleProfileClick = () => {
//     router.push(`/profilepage/@${username}`);
//   };

//   const handleMouseEnter = () => {
//     setIsCollapsed(true);
//   };

  
//   const handleMouseLeave = () => {
//     setIsCollapsed(true);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/auth/api/logout', {
//         method: 'POST',
//         credentials: 'include', 
//       });

//       if (response.ok) {
//         router.push('/authentication'); 
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
// console.log(username)
// console.log(user)
//   return (
//     <div
//       onMouseEnter={handleMouseEnter} 
//       onMouseLeave={handleMouseLeave}
//       className={`bg-gray-800 h-screen p-5 flex flex-col opacity-0  hover:opacity-100 justify-between bg-gradient-to-t from-gray-900 to-gray-600 fixed left-0 top-0 ${
//         isCollapsed ? "w-20"  : "w-64" 
//       }  transition-all duration-500`}
//     >
//       <div className="space-y-6 rounded-3xl">
//         <button
//           onClick={toggleSidebar}
//           className="text-white focus:outline-none hover:text-gray-400"
//         >
//           <Image
//             src={isCollapsed ? OpenMenu : CloseMenu}
//             alt="Menu Toggle"
//             width={30}
//             height={30}
//             className="rounded-full"
//           />
//         </button>

//         <nav className="space-y-4">
//           <div
//             className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
//               isCollapsed ? "justify-center" : ""
//             } cursor-pointer`} 
//             onClick={handleHomeClick} 
//           >
//             <Image
//               src={HomeButton}
//               alt="Home"
//               width={30}
//               height={30}
//               className="rounded-full"
//             />
//             {!isCollapsed && <span>Home</span>}
//           </div>

//           <div
//             className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
//               isCollapsed ? "justify-center" : ""
//             } cursor-pointer`} 
//             onClick={handleProfileClick} 
//           >
//             <Image
//               src={profilePic}
//               alt="Profile"
//               width={30}
//               height={30}
//               className="rounded-full"
//             />
//             {!isCollapsed && <span>Profile</span>}
//           </div>

//           <div
//             className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
//               isCollapsed ? "justify-center" : ""
//             } cursor-pointer`} 
//           >
//             <Image
//               src={Notification}
//               alt="Notifications"
//               width={30}
//               height={30}
//               className="rounded-full"
//             />
//             {!isCollapsed && <span>Notifications</span>}
//           </div>

//           <div
//             className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-lg ${
//               isCollapsed ? "justify-center" : ""
//             } cursor-pointer`} 
//           >
//             <Image
//               src={Setting}
//               alt="Settings"
//               width={30}
//               height={30}
//               className="rounded-full"
//             />
//             {!isCollapsed && <span>Settings</span>}
//           </div>
//           <div
//           onClick={handleLogout} 
//           className={`flex items-center space-x-4  p-2 text-white hover:bg-gray-700 rounded-lg ${
//             isCollapsed ? "justify-center" : ""
//           } cursor-pointer`} 
//         >
//           <Image
//             src={LogoutIcon}
//             alt="Logout"
//             width={30}
//             height={30}
//             className="rounded-full"
//           />
//           {!isCollapsed && <span>Logout</span>}
//         </div>
//         </nav>
//       </div>

//       <div className="flex flex-col items-center">
        
//         <div className={`${isCollapsed ? "text-center" : ""} text-white`}>
//           {isCollapsed ? "©" : "© 2024 CHIRPIR"}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBarComponent;






























import React, { useState, useEffect } from "react";
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
import defaultProfilePic from '@/public/profilepic.svg';
import logo from '@/public/logo.png'; 

const SideBarComponent: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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
  
  const username = user?.username;
  const profilePic = user?.profileImg ? user.profileImg : defaultProfilePic;

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleHomeClick = () => {
    router.push('/'); 
  };

  const handleProfileClick = () => {
    router.push(`/profilepage/@${username}`);
  };
  const handlelogoclicked=()=>{
    router.push('/')
  }
  const handleNotificationClick=()=>{
    router.push('/notifications')

  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
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
    <div className="relative" onMouseLeave={() => setIsHovered(false)}>
      {/* Hover Strip */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        className="absolute top-0 left-0 h-full w-4 bg-transparent z-10"
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-t from-gray-900 to-gray-600 p-5 flex flex-col justify-between transition-all duration-500 ${
          (isHovered) ? "w-20 opacity-100" : "w-20 opacity-0"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-26 h-26 rounded-3xl overflow-hidden border-1 border-white" onClick={handlelogoclicked}>
            <Image
              src={logo}
              alt="Chirper Logo"
              layout="responsive"
              width={64}
              height={64}
              objectFit="cover"
            />
          </div>
        </div>

        {/* <button
          onClick={toggleSidebar}
          className={`text-white focus:outline-none hover:text-gray-400`}
        >
          <Image
            src={isCollapsed ? OpenMenu : CloseMenu}
            alt="Menu Toggle"
            width={30}
            height={30}
            className="rounded-full"
          />
        </button> */}

        <nav className="space-y-8 mt-6">
          {/* Home Button */}
          <div className="relative group">
            <div
              onClick={handleHomeClick}
              className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-800 rounded-lg cursor-pointer`}
            >
              <Image src={HomeButton} alt="Home" width={30} height={30} />
            </div>
            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md transform -translate-y-16 left-1/2 -translate-x-1/2 hidden group-hover:block">
              Home
            </span>
          </div>

          {/* Profile Button */}
          <div className="relative group">
            <div
              onClick={handleProfileClick}
              className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-800 rounded-lg cursor-pointer`}
            >
              <Image src={profilePic} alt="Profile" width={30} height={30} className="rounded-full" />
              <span className="hidden group-hover:block">Profile</span>
            </div>
            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md transform -translate-y-16 left-1/2 -translate-x-1/2 hidden group-hover:block">
              Profile
            </span>
          </div>

          {/* Notifications Button */}
          <div className="relative group">
            <div className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-800 rounded-lg cursor-pointer`}
            onClick={handleNotificationClick}>
              <Image src={Notification} alt="Notifications" width={30} height={30} />
              <span className="hidden group-hover:block">Notifications</span>
            </div>
            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md transform -translate-y-16 left-1/2 -translate-x-1/2 hidden group-hover:block">
              Notifications
            </span>
          </div>

          {/* Settings Button */}
          <div className="relative group">
            <div className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-800 rounded-lg cursor-pointer`}>
              <Image src={Setting} alt="Settings" width={30} height={30} />
              <span className="hidden group-hover:block">Settings</span>
            </div>
            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md transform -translate-y-16 left-1/2 -translate-x-1/2 hidden group-hover:block">
              Settings
            </span>
          </div>

          {/* Logout Button */}
          <div className="relative group">
            <div
              onClick={handleLogout}
              className={`flex items-center space-x-4 p-2 text-white hover:bg-gray-800 rounded-lg cursor-pointer`}
            >
              <Image src={LogoutIcon} alt="Logout" width={30} height={30} />
              <span className="hidden group-hover:block">Logout</span>
            </div>
            <span className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md transform -translate-y-16 left-1/2 -translate-x-1/2 hidden group-hover:block">
              Logout
            </span>
          </div>
        </nav>
        
        <div className="flex flex-col items-center text-white">
          {"© 2024 CHIRPER"}
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
