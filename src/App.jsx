import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import History from './pages/History';
import Fund from './pages/Fund';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="history" element={<History />} />
          <Route path="fund" element={<Fund />} />
          <Route path="register" element={<Register />} />

          {/* Redirect /notice-board to / */}
          <Route path="notice-board" element={<Navigate to="/" replace />} />

          {/* Optional: catch-all for any unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
