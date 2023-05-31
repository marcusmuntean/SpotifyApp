import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import Discussion from './Discussion';
import BoardPage from './BoardPage';

function DiscussionHome() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Discussion />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default DiscussionHome;
