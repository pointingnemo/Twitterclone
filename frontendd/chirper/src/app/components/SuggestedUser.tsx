
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import down from '../../public/arrowdoen.svg';
// import up from '../../public/arowup.svg';
// import defaultProfilePic from '@/public/profilepic.svg';

// interface SuggestedUserProps {
//   profileImg: string;
//   fullName: string;
//   username: string;
// }

// const SuggestedUser: React.FC = () => {
//   const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUserProps[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false); 

//   useEffect(() => {
//     const fetchSuggestedUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/users/suggested', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });
//         const data = await response.json();
//         setSuggestedUsers(data);
//       } catch (error) {
//         console.error('Error fetching suggested users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSuggestedUsers();
//   }, []);

//   const toggleVisibility = () => {
//     setIsVisible((prev) => !prev);
//   };

//   if (loading) {
//     return <div>Loading suggested users...</div>;
//   }

//   return (
//     <div
//       className={`fixed top-4 right-4 transition-all duration-500 ease-in-out 
//       ${isVisible ? 'w-72 h-96 rounded-lg p-4 ' : 'w-12 h-12 rounded-full animate-bounce'} 
//       bg-gray-800 shadow-lg overflow-hidden`}
//     >
//       <div
//         onClick={toggleVisibility}
//         className="flex justify-center items-center w-full h-full cursor-pointer"
//       >
//         {!isVisible ? (
//           <Image
//             src={defaultProfilePic}
//             alt="Open Suggested Users"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//         ) : (
//           <div className="w-full h-full flex flex-col">
//             <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
//               Suggested Users
//               <button onClick={toggleVisibility} className="text-white focus:outline-none">
//                 <Image
//                   src={up}
//                   alt="Collapse"
//                   width={24}
//                   height={24}
//                 />
//               </button>
//             </h2>
//             <ul className="overflow-y-auto">
//               {suggestedUsers.map((user) => (
//                 <div key={user.username}>
//                   <li className="flex items-center p-2 mb-2 bg-gray-900 rounded-lg transition duration-200 hover:bg-gray-700 cursor-pointer">
//                     <Image
//                       src={defaultProfilePic}
//                       alt={user.fullName}
//                       width={24}
//                       height={24}
//                       className="rounded-full mr-4"
//                     />
//                     <div className="text-white">
//                       <Link href={`/profilepage/@${user.username}`}>
//                         <h3 className="font-semibold">{user.fullName}</h3>
//                         <p className="text-gray-400">@{user.username}</p>
//                       </Link>
//                     </div>
//                   </li>
//                   <div className="h-0.5 bg-gray-400 my-2" />
//                 </div>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuggestedUser;















































import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import defaultProfilePic from '@/public/profilepic.svg';

interface SuggestedUserProps {
  profileImg: string;
  fullName: string;
  username: string;
}

const SuggestedUser: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  let closeTimeout: NodeJS.Timeout;

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/suggested', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setSuggestedUsers(data);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout); // Cancel any close timer
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    // Delay the collapse to prevent immediate flicker
    closeTimeout = setTimeout(() => setIsVisible(false), 200);
  };

  if (loading) {
    return <div>Loading suggested users...</div>;
  }

  return (
    <div
      className={`fixed top-4 right-4 transition-all duration-300 ease-in-out 
      ${isVisible ? 'w-72 h-96 rounded-lg p-4' : 'w-12 h-12 rounded-full'} 
      bg-gray-800 shadow-lg overflow-hidden`}
      onMouseEnter={handleMouseEnter}  // Keeps open when hovering on the container
      onMouseLeave={handleMouseLeave}  // Starts close timer when leaving the container
    >
      <div className="flex justify-center items-center w-full h-full cursor-pointer">
        {!isVisible ? (
          <Image
            src={defaultProfilePic}
            alt="Open Suggested Users"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
              Suggested Users
              {/* <button onClick={() => setIsVisible(false)} className="text-white focus:outline-none">
                <Image src={up} alt="Collapse" width={24} height={24} />
              </button> */}
            </h2>
            <ul className="overflow-y-auto">
              {suggestedUsers.map((user) => (
                <div key={user.username}>
                  <li className="flex items-center p-2 mb-2 bg-gray-900 rounded-lg transition duration-200 hover:bg-gray-700 cursor-pointer">
                    <Image
                      src={defaultProfilePic}
                      alt={user.fullName}
                      width={24}
                      height={24}
                      className="rounded-full mr-4"
                    />
                    <div className="text-white">
                      <Link href={`/profilepage/@${user.username}`}>
                        <h3 className="font-semibold">{user.fullName}</h3>
                        <p className="text-gray-400">@{user.username}</p>
                      </Link>
                    </div>
                  </li>
                  <div className="h-0.5 bg-gray-400 my-2" />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedUser;
