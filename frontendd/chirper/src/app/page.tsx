
'use client';

import PostListComponent from './components/PostListComponent';
import SideBarComponent from './components/SideBarComponent';
import WritePost from './components/WritePostComponent';
import SuggestedUser from './components/SuggestedUser';

export default function Home() {
  document.title='Home'
  return (
    
    // <div className="flex min-h-screen bg-gradient-to-l from-gray-800 to-gray-500 backdrop-blur-xl"> 
    <div className="flex min-h-screen bg-neutral-800"> 
        <SideBarComponent />
      <div className="min-h-screen sm:p-5 flex-grow ml-40 mr-60 border-l border-r backdrop-blur-lg bg-neutral-900">
        <WritePost/>
        <div className="h-2 bg-white my-4 "></div> 
        <PostListComponent />
      
      </div>
      <div className=''>
      <SuggestedUser/>
      </div>
    </div>
  );
}