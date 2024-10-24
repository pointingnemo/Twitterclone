// import './index.css';

// const App = () => {
//   return (
//     <div className="min-h-screen flex justify-left items-center bg-gray-100">
//       <div className="w-64 h-64 bg-blue-500 rounded-md">
//         <p>hiiii</p>
//       </div>
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './app/Authentication'; // Import your component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to your Authentication component */}
        <Route path="/auth" element={<Authentication />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
