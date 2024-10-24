import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import down from '../../public/arrowdoen.svg'

import up from "../../public/arowup.svg"

import defaultProfilePic from "@/public/profilepic.svg"

interface SuggestedUserProps {
  profileImg: string;
  fullName: string;
  username: string;
}

const SuggestedUser: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // State for visibility

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
  

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  if (loading) {
    return <div>Loading suggested users...</div>;
  }

  return (
    <div className="bg-gray-800 p-1 min-w-40 rounded-lg shadow-lg fixed top-1 right-1">
      <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
        Suggested Users
        <button
          onClick={toggleVisibility}
          className="text-white focus:outline-none"
        >
          <Image
            src={isVisible ? up : down} 
            alt={isVisible ? 'Collapse' : 'Expand'}
            width={24}
            height={24}
          />
        </button>
      </h2>
      {isVisible && (
        <ul>
          {suggestedUsers.map((user) => (
            <div key={user.username}>
              <li
                className="flex items-center p-2 mb-2 bg-gray-900 rounded-lg transition duration-200 hover:bg-gray-700 cursor-pointer"
                style={{ transition: 'background-color 0.2s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563'; // Darker gray
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Original color
                }}
              >
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
      )}
    </div>
  );
};

export default SuggestedUser;
