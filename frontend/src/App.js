import logo from './logo.svg';
import './App.css';
import Discussion from './components/Discussion';
import BoardPage from './components/BoardPage';
import { BrowserRouter as Router, Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Discussion />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
