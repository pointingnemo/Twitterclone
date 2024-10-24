// 'use client';
// import React, { useState, useEffect } from 'react';
// import PostComponent from '../../components/PostComponent';
// import CommentComponent from '../../components/CommentComponent'; 
// import { postProps } from '@/types/props';
// import SideBarComponent from '@/app/components/SideBarComponent';

// interface PostProps {
//   params: {
//     id: number;
//   };
// }

// const PostPage: React.FC<PostProps> = ({ params }) => {
//   const [post, setPost] = useState<postProps | null>(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/post/${params.id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch post');
//         }

//         const data: postProps = await response.json(); 
//         setPost(data);
//       } catch (error: any) {
//         console.error('Error fetching post:', error.message);
//       }
//     };

//     fetchPost();
//   }, [params.id]);

  

//   return (
//     <div className="flex transition-all duration-300">
//       <div className='hover:mr-20'> 
//         <SideBarComponent /></div>
     

//       {/* Main content */}
//       <div className="flex-1 p-4 transition-all duration-300 ml-10 ">
//         {post ? (
//           <>
//             <PostComponent
//               _id={post._id}
//               user={post.user}
//               text={post.text}
//               img={post.img}
//               likes={post.likes}
//               comments={post.comments}
//               createdAt={post.createdAt}
//             />

//             {/* Render Comment Section */}
//             <div className="comments-section mt-8">
//               <h3 className="text-2xl font-semibold text-white">Comments</h3>
//               <div className="mt-4">
//                 {post.comments.length > 0 ? (
//                   post.comments.map((comment, index) => (
//                     <CommentComponent
//                       key={index}
//                       text={comment.text}
//                       user={comment.user}
//                     />
//                   ))
//                 ) : (
//                   <p className="text-gray-400">No comments yet.</p>
//                 )}
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostPage;


































'use client';
import React, { useState, useEffect } from 'react';
import PostComponent from '../../components/PostComponent';
import CommentComponent from '../../components/CommentComponent'; // Import CommentComponent
import { postProps } from '@/types/props';
import SideBarComponent from '@/app/components/SideBarComponent';

interface PostProps {
  params: {
    id: number;
  };
}

const PostPage: React.FC<PostProps> = ({ params }) => {
  const [post, setPost] = useState<postProps | null>(null);
  const [newComment, setNewComment] = useState<string>(''); // State for new comment
  const [comments, setComments] = useState(post?.comments || []); // Store comments
  
  useEffect(() => {
    document.title="Post"
    const fetchPost = async () => {
      const userId=await params
      try {
        const response = await fetch(`http://localhost:5000/api/post/${userId.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data: postProps = await response.json(); // Explicitly type the response
        setPost(data);
        setComments(data.comments); // Set the comments in state
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return; // Do not allow empty comments

    try {
      const response = await fetch(`http://localhost:5000/api/post/comment/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          text: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const updatedPost = await response.json();
      setComments(updatedPost.comments); // Update comments state with new comment
      setNewComment(''); // Reset comment input
    } catch (error: any) {
      console.error('Error posting comment:', error.message);
    }
  };

  return (
    <div className=''>
      <SideBarComponent/>
      <div className="flex-1 items-center p-4 transition-all duration-300 ml-20 mr-20  border-l border-r bg-neutral-800 ">
      {post ? (
        <>
          <PostComponent
            _id={post._id}
            user={post.user}
            text={post.text}
            img={post.img}
            likes={post.likes}
            comments={comments}
            createdAt={post.createdAt}
          />

           <div className="mt-4 ml-5">
              <form onSubmit={handleCommentSubmit} className="flex items-center">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-grow h-8 border-b border-gray-300 rounded-none text-white bg-transparent px-2 text-sm outline-none focus:ring-0"
                  placeholder="Write a comment..."
                />
                <button
                  type="submit"
                  className="ml-2 h-8 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Post
                </button>
              </form>
            </div>



          {/* Render Comment Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white">Comments</h3>

           



            <div className="mt-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <CommentComponent
                    key={index}
                    text={comment.text}
                    user={comment.user}
                  />
                ))
              ) : (
                <p className="text-gray-400">No comments yet.</p>
              )}
            </div>

            {/* Comment input field */}
            
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  );
};

export default PostPage;
