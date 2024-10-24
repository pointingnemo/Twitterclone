import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import imageAttachment from '@/public/imageAttachmentButton.svg';
import emoji from '@/public/emoji.svg'
import send from '@/public/send.svg';
import profilepic from '@/public/profilepic.svg';
import { EmojiButton } from '@joeattardi/emoji-button';

const WritePost: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const picker = new EmojiButton();
    const button = emojiButtonRef.current;

    if (button) {
      picker.on("emoji", (selection) => {
        setPostContent((prev) => prev + selection.emoji);
      });

      button.addEventListener("click", () => {
        picker.togglePicker(button);
      });
    }

    return () => {
      if (button) {
        button.removeEventListener("click", () => {});
      }
    };
  }, []);

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null)
  };

  const handlePostSubmit = async () => {
    if (!postContent.trim() && !selectedImage) {
      console.error("Post must have text or an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/post/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          text: postContent,
          img: selectedImage, 
        }),
      });

      if (response.ok) {
        console.log("Post created successfully");
        setPostContent(""); 
        setSelectedImage(null); 
      } else {
        const errorResponse = await response.json();
        console.error("Failed to create post:", errorResponse.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto bg-gray-800 shadow-md rounded-lg p-4 my-4 max-w-screen-md">
      <div className="flex items-start space-x-4">
        <Image
          className="w-12 h-12 rounded-full"
          src={profilepic}
          alt="Profile"
          width={48}
          height={48}
        />
        <div className="flex-1">
          <textarea
            className="w-full p-2 border bg-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-50"
            placeholder="Say your mind..."
            rows={3}
            value={postContent}
            onChange={handlePostChange}
          ></textarea>

            {selectedImage && (
            <div className="mt-2 relative">
              <img 
                src={selectedImage} 
                alt="Selected preview" 
                className="w-full h-auto rounded-lg"
              />
              <button 
                onClick={handleRemoveImage} 
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-700">
                ✕
              </button>
            </div>
          )}
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <div className="flex justify-between items-center mt-2">
            {/* <button className="text-blue-500 hover:text-blue-700">
              <Image src={imageAttachment} alt="Attach Image" width={24} height={24} />
            </button> */}
            <button className="relative text-blue-500 hover:text-blue-700 border-2 border-gray-800 hover:border-blue-500 ">
    
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 " 
              />
              <Image src={imageAttachment} alt="Attach Image" width={30} height={24} />
            </button>
            <button
              ref={emojiButtonRef}
              className="trigger text-blue-500 hover:text-blue-700 border-2 border-gray-800 hover:border-blue-500"
            >
              <Image src={emoji} alt="Attach Image" width={30} height={24} />
            </button>
            <button
              className={`bg-slate-600 text-white px-8 py-2 rounded-full flex items-center hover:bg-blue-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePostSubmit}
              disabled={isSubmitting}
            >
              <Image src={send} alt="Send" width={30} height={24} />
              {isSubmitting && <span className="ml-2">Posting...</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;




































// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import imageAttachment from '@/public/imageAttachmentButton.svg';
// import emoji from '@/public/emoji.svg'
// import send from '@/public/send.svg';
// import profilepic from '@/public/profilepic.svg';
// import { EmojiButton } from '@joeattardi/emoji-button';

// const WritePost: React.FC = () => {
//   const [postContent, setPostContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const emojiButtonRef = useRef<HTMLButtonElement | null>(null);

//   useEffect(() => {
//     const picker = new EmojiButton();
//     const button = emojiButtonRef.current;

//     if (button) {
//       picker.on("emoji", (selection) => {
//         setPostContent((prev) => prev + selection.emoji);
//       });

//       button.addEventListener("click", () => {
//         picker.togglePicker(button);
//       });
//     }

//     return () => {
//       if (button) {
//         button.removeEventListener("click", () => {});
//       }
//     };
//   }, []);

//   const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setPostContent(e.target.value);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result as string); 
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleRemoveImage = () => {
//     setSelectedImage(null)
//   };

//   const handlePostSubmit = async () => {
//     if (!postContent.trim() && !selectedImage) {
//       console.error("Post must have text or an image");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/post/create', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           text: postContent,
//           img: selectedImage, 
//         }),
//       });

//       if (response.ok) {
//         console.log("Post created successfully");
//         setPostContent(""); 
//         setSelectedImage(null); 
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to create post:", errorResponse.message || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error posting:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mx-auto bg-gray-800 shadow-md rounded-lg p-4 my-4 max-w-screen-md">
//       <div className="flex items-start space-x-4">
//         <Image
//           className="w-12 h-12 rounded-full"
//           src={profilepic}
//           alt="Profile"
//           width={48}
//           height={48}
//         />
//         <div className="flex-1">
//           <textarea
//             className="w-full p-2 border bg-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-50"
//             placeholder="Say your mind..."
//             rows={3}
//             value={postContent}
//             onChange={handlePostChange}
//           ></textarea>

//             {selectedImage && (
//             <div className="mt-2 relative">
//               <img 
//                 src={selectedImage} 
//                 alt="Selected preview" 
//                 className="w-full h-auto rounded-lg"
//               />
//               <button 
//                 onClick={handleRemoveImage} 
//                 className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-700">
//                 ✕
//               </button>
//             </div>
//           )}
//           {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
//           <div className="flex justify-between items-center mt-2">
//             {/* <button className="text-blue-500 hover:text-blue-700">
//               <Image src={imageAttachment} alt="Attach Image" width={24} height={24} />
//             </button> */}
//             <button className="relative text-blue-500 hover:text-blue-700 border-2 border-gray-800 hover:border-blue-500 ">
    
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="absolute inset-0 opacity-0 " 
//               />
//               <img src={imageAttachment} alt="Attach Image" width={30} height={24} />
//             </button>
//             <button
//               ref={emojiButtonRef}
//               className="trigger text-blue-500 hover:text-blue-700 border-2 border-gray-800 hover:border-blue-500"
//             >
//               <Image src={emoji} alt="Attach Image" width={30} height={24} />
//             </button>
//             <button
//               className={`bg-slate-600 text-white px-8 py-2 rounded-full flex items-center hover:bg-blue-600 ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               onClick={handlePostSubmit}
//               disabled={isSubmitting}
//             >
//               <img src={send} alt="Send" width={30} height={24} />
//               {isSubmitting && <span className="ml-2">Posting...</span>}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WritePost;
