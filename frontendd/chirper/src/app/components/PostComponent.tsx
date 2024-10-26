



'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { postProps, userprops } from '@/types/props';
import axios from 'axios';
import defaultProfilePic from '@/public/profilepic.svg';
import likeIcon from '@/public/likeButton.svg';
import likedIcon from '@/public/likedButton.svg';
import commentIcon from '@/public/commentButton.svg';
import ImageModal from './ImageModal';

const PostComponent: React.FC<postProps> = ({ user, text, img, likes, comments, _id, createdAt }) => {
  const [liked, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState(comments);
  const commentRef = useRef<HTMLDivElement | null>(null);
  const [loggedInUsername, setLoggedInUser] = useState<userprops | null>(null);
  const [likedTweets, setLikedTweets] = useState<postProps[]>([]);
  const profileImageSrc = user.profileImg ? user.profileImg.toString() : defaultProfilePic;
  const router = useRouter();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const response = await fetch(`http://localhost:5000/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setLoggedInUser(data.username);
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (loggedInUsername) {
      const fetchLikedPosts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/post/likes/${loggedInUsername}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const data = await response.json();
          setLikedTweets(data);
          setLike(data.some((tweet: postProps) => tweet._id === _id));
        } catch (error) {
          console.error('Error fetching liked posts:', error);
        }
      };
      fetchLikedPosts();
    }
  }, [loggedInUsername, _id]);

  const handleClickOutside = (event: MouseEvent) => {
    if (commentRef.current && !commentRef.current.contains(event.target as Node)) {
      setCommentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLikeClicked = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`http://localhost:5000/api/post/like/${_id}`, {}, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLike(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleProfileClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profilepage/@${user.username}`);
  };

  const handlePostClicked = () => {
    router.push(`/post/${_id}`);
  };

  const formattedTimestamp = new Date(createdAt).toLocaleString();

  const handleCommentToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCommentVisible(!isCommentVisible); 
    
  };
  useEffect(() => {
    
    console.log('isCommentVisible:', isCommentVisible);
  }, [isCommentVisible]);


  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      const response = await axios.post(`http://localhost:5000/api/post/comment/${_id}`, { text: newComment }, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPostComments([...postComments, response.data.comments[response.data.comments.length - 1]]);
        setNewComment('');
        setCommentVisible(false);
      }
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  return (
    <div>
      <div className="bg-neutral-800 p-4 mx-auto border-2 border-sky-800 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl">
        <div className="flex items-center">
          <Image
            src={profileImageSrc}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full mr-2 cursor-pointer"
            onClick={handleProfileClicked}
          />
          <div className="flex flex-col">
            <h2 className="text-[#ffffff] font-bold font-sans cursor-pointer" onClick={handleProfileClicked}>{user.fullName}</h2>
            <h2 className="text-[#555453] font-sans cursor-pointer" onClick={handleProfileClicked}>@{user.username}</h2>
          </div>
        </div>

        <p className="text-[#ffffff] font-sans mb-4 ml-10 pt-5" onClick={handlePostClicked}>{text}</p>
        {img && (
          <div className="flex justify-center mb-4">
            <img
              src={img}
              alt="Post image"
              className="max-w-[400px] h-auto rounded-lg cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        )}
        <div className="text-[#A0A0A0] mb-2 font-sans" onClick={handlePostClicked}>{formattedTimestamp}</div>
        <div className="h-0.5 bg-gray-400 my-2" />

        <div className="flex justify-between text-[#ffffff] ml-10 items-center">
          <div className="flex items-center cursor-pointer" onClick={handleLikeClicked}>
            <Image
              src={liked ? likedIcon : likeIcon}
              alt="Like"
              width={24}
              height={24}
            />
            <span className="ml-2 font-sans">{likeCount} Likes</span>
          </div>
          <div className="flex items-center cursor-pointer" onClick={handleCommentToggle}>
            <Image
              src={commentIcon}
              alt="Comment"
              width={24}
              height={24}
            />
            <span className="ml-2 font-sans">{postComments.length} Comments</span>
          </div>
        </div>
        <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgSrc={img} />
      </div>
      {isCommentVisible && (
        <div ref={commentRef} className="relative bottom-0 left-0 right-0 p-4 bg-gray-800">
          <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              className="flex-grow h-8 border-b border-gray-300 rounded-none text-white bg-transparent px-2 text-sm outline-none"
              placeholder="Write a comment..."
            />
            <button type="submit" className="text-sky-500 font-semibold ml-2">Post</button>
          </form>
        </div>
      )}
      <div className="h-0.5 bg-white my-4 "></div> 
      
    </div>
    
  );
};

export default PostComponent;


















































// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { postProps, userprops } from '@/types/props';
// import axios from 'axios';
// import defaultProfilePic from '@/public/profilepic.svg';
// import likeIcon from '@/public/likeButton.svg';
// import likedIcon from '@/public/likedButton.svg';
// import commentIcon from '@/public/commentButton.svg';
// import ImageModal from './ImageModal';

// const PostComponent: React.FC<postProps> = ({ user, text, img, likes, comments, _id, createdAt }) => {
//   const [liked, setLike] = useState(false);
//   const [likeCount, setLikeCount] = useState(likes.length);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCommentVisible, setCommentVisible] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [postComments, setPostComments] = useState(comments);
//   const [isPostVisible, setIsPostVisible] = useState(false);
//   const postRef = useRef<HTMLDivElement | null>(null);
//   const commentRef = useRef<HTMLDivElement | null>(null);
//   const [loggedInUsername, setLoggedInUser] = useState<userprops | null>(null);
//   const router = useRouter();

//   // Fetch logged in user
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       const response = await fetch(`http://localhost:5000/api/auth/me`, {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const data = await response.json();
//       setLoggedInUser(data.username);
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Like state for each post
//   useEffect(() => {
//     if (loggedInUsername) {
//       const fetchLikedPosts = async () => {
//         try {
//           const response = await fetch(`http://localhost:5000/api/post/likes/${loggedInUsername}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//           });
//           const data = await response.json();
//           setLike(data.some((tweet: postProps) => tweet._id === _id));
//         } catch (error) {
//           console.error('Error fetching liked posts:', error);
//         }
//       };
//       fetchLikedPosts();
//     }
//   }, [loggedInUsername, _id]);

//   // Intersection Observer for lazy loading
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsPostVisible(entry.isIntersecting),
//       { threshold: 0.1 } // Adjust this threshold as needed
//     );

//     if (postRef.current) observer.observe(postRef.current);
    
//     return () => {
//       if (postRef.current) observer.unobserve(postRef.current);
//     };
//   }, []);

//   // Like/Unlike post
//   const handleLikeClicked = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       const response = await axios.post(`http://localhost:5000/api/post/like/${_id}`, {}, { withCredentials: true });
//       if (response.status === 200) {
//         setLike(!liked);
//         setLikeCount(liked ? likeCount - 1 : likeCount + 1);
//       }
//     } catch (error) {
//       console.error('Error liking/unliking post:', error);
//     }
//   };

//   const handleProfileClicked = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     router.push(`/profilepage/@${user.username}`);
//   };

//   const handlePostClicked = () => {
//     router.push(`/post/${_id}`);
//   };

//   const formattedTimestamp = new Date(createdAt).toLocaleString();

//   const handleCommentToggle = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setCommentVisible(!isCommentVisible); 
//   };

//   const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (!newComment) return;
//     try {
//       const response = await axios.post(`http://localhost:5000/api/post/comment/${_id}`, { text: newComment }, {
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         setPostComments([...postComments, response.data.comments[response.data.comments.length - 1]]);
//         setNewComment('');
//         setCommentVisible(false);
//       }
//     } catch (error) {
//       console.error('Error commenting on post:', error);
//     }
//   };

//   return (
//     <div ref={postRef}>
//       {isPostVisible && (
//         <div className="bg-neutral-800 p-4 mx-auto border-2 border-sky-800 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl">
//           <div className="flex items-center">
//             <Image
//               src={user.profileImg.toString() || defaultProfilePic}
//               alt="Profile Picture"
//               width={40}
//               height={40}
//               className="rounded-full mr-2 cursor-pointer"
//               onClick={handleProfileClicked}
//             />
//             <div className="flex flex-col">
//               <h2 className="text-[#ffffff] font-bold font-sans cursor-pointer" onClick={handleProfileClicked}>{user.fullName}</h2>
//               <h2 className="text-[#555453] font-sans cursor-pointer" onClick={handleProfileClicked}>@{user.username}</h2>
//             </div>
//           </div>

//           <p className="text-[#ffffff] font-sans mb-4 ml-10 pt-5" onClick={handlePostClicked}>{text}</p>
//           {img && (
//             <div className="flex justify-center mb-4">
//               <img
//                 src={img}
//                 alt="Post image"
//                 className="max-w-[400px] h-auto rounded-lg cursor-pointer"
//                 onClick={() => setIsModalOpen(true)}
//               />
//             </div>
//           )}
//           <div className="text-[#A0A0A0] mb-2 font-sans" onClick={handlePostClicked}>{formattedTimestamp}</div>
//           <div className="h-0.5 bg-gray-400 my-2" />

//           <div className="flex justify-between text-[#ffffff] ml-10 items-center">
//             <div className="flex items-center cursor-pointer" onClick={handleLikeClicked}>
//               <Image src={liked ? likedIcon : likeIcon} alt="Like" width={24} height={24} />
//               <span className="ml-2 font-sans">{likeCount} Likes</span>
//             </div>
//             <div className="flex items-center cursor-pointer" onClick={handleCommentToggle}>
//               <Image src={commentIcon} alt="Comment" width={24} height={24} />
//               <span className="ml-2 font-sans">{postComments.length} Comments</span>
//             </div>
//           </div>
//           <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgSrc={img} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostComponent;
