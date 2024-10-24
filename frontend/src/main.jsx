import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import PostCard from './components/PostCardcomponent.jsx';
import Sidebar from './components/SideBarcomponent.jsx';
import WritePost from './components/WritePostcompinent.jsx';
import ProfilePage from './components/Profilecomponent.jsx';
import Authentication from './app/Authentication.jsx'; 
import HomePage from './app/HomePage.jsx';
import './index.css';

const Layout = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="flex bg-slate-500">
      {/* Conditionally render the sidebar only if not on the /auth route */}
      {location.pathname !== '/auth' && <Sidebar />}
      <div className="flex-1 p-4">
        <Routes>
          {/* Define routes for your components */}
          <Route path="/auth" element={<Authentication />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/post" element={<PostCard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Layout />
    </Router>
  </StrictMode>,
);
