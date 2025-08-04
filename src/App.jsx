import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import History from './pages/History'
import Fund from './pages/Fund';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="history" element={<History />} />
          <Route path="fund" element={<Fund />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
