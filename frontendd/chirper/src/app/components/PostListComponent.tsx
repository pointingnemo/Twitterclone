// 'use client';
// import React, { useState, useEffect } from 'react';
// import PostComponent from './PostComponent';
// import { postProps } from '@/types/props';

// const PostListComponent = () => {
//   const [posts, setPosts] = useState<postProps[]>([]); 

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/post/all', {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials:'include'
//           });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch posts');
//         }

//         const data = await response.json();  
//         setPosts(data); 
//       } catch (error: any) {
//         console.error('Error fetching posts:', error.message);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <PostComponent 
//           key={post._id}
//           _id={post._id}
//           user={post.user}     
//           text={post.text}    
//           img={post.img}       
//           likes={post.likes}   
//           comments={post.comments} 
//           createdAt={post.createdAt}
//         />
//       ))}
//     </div>
//   );
// };

// export default PostListComponent;
























// 'use client';
// import React, { useState, useEffect } from 'react';
// import PostComponent from './PostComponent';
// import { postProps } from '@/types/props';

// const PostListComponent = () => {
//   const [posts, setPosts] = useState<postProps[]>([]); 

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/post/all', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch posts');
//       }

//       const data = await response.json();
//       setPosts(data); 
//     } catch (error: any) {
//       console.error('Error fetching posts:', error.message);
//     }
//   };

//   // Initial and interval fetch using AJAX
//   useEffect(() => {
//     fetchPosts(); // Initial fetch on component mount

//     const intervalId = setInterval(() => {
//       fetchPosts(); // Fetch posts every 5 seconds
//     }, 5000);

//     return () => clearInterval(intervalId); 
//   }, []);


//   return (
//     <div>
//       {posts.map((post) => (
//         <PostComponent 
//           key={post._id}
//           _id={post._id}
//           user={post.user}     
//           text={post.text}    
//           img={post.img}       
//           likes={post.likes}   
//           comments={post.comments} 
//           createdAt={post.createdAt}
//         />
//       ))}
//     </div>
//   );
// };

// export default PostListComponent;




















import React, { useState, useEffect } from 'react';
import PostComponent from './PostComponent';
import { postProps } from '@/types/props';

interface PostListComponentProps {
  refreshKey: number;
}

const PostListComponent: React.FC<PostListComponentProps> = ({ refreshKey }) => {
  const [posts, setPosts] = useState<postProps[]>([]); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/post/all', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();  
        setPosts(data); 
      } catch (error: any) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [refreshKey]); // Re-fetch posts whenever refreshKey changes

  return (
    <div>
      {posts.map((post) => (
        <PostComponent 
        key={post._id}
        _id={post._id}
        user={post.user}     
        text={post.text}    
        img={post.img}       
        likes={post.likes}   
        comments={post.comments} 
        createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default PostListComponent;
