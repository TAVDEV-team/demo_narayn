import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Contact from './pages/Contact';
// import History from './components/History';
import Fund from './pages/Fund';
import Register from './pages/Register';
import AdmissionDocuments from "./pages/AdmissionDocuments";
import ApprovedNotices from "./pages/ApprovedNotices";
import CreateNotice from "./pages/CreateNotice";
import PendingNotices from "./pages/PendingNotices";
import NoticeDetail from "./pages/NoticeDetail";
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="history" element={<History />} /> */}
          <Route path="fund" element={<Fund />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Redirect /notice-board to / */}
          <Route path="notice-board" element={<Navigate to="/" replace />} />
          <Route path="/documents" element={<AdmissionDocuments />} />
          {/* Optional: catch-all for any unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
           <Route path="notice-approved" element={<ApprovedNotices />} />
        <Route path="notices-create" element={<CreateNotice />} />
        <Route path="notice-pending" element={<PendingNotices />} />
        <Route path="notices/:id" element={<NoticeDetail />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
