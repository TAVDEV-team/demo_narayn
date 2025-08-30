import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Fund from './pages/Fund';
import Register from './pages/Register';
import AdmissionDocuments from "./pages/AdmissionDocuments";
import ApprovedNotices from "./pages/ApprovedNotices";
import CreateNotice from "./pages/CreateNotice";
import PendingNotices from "./pages/PendingNotices";
import NoticeDetail from "./pages/NoticeDetail";
import Login from './pages/Login';
import StudentPortal from "./pages/StudentPortal";
import ClassStudents from "./pages/ClassStudents";
import ClassGroups from "./pages/ClassGroups";
import AddStudent from './pages/AddStudent';
import GradeHandler from './pages/GradeHandler';
// import HeadMasterProfile from './pages/HeadMasterProfile';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import AddResult from "./pages/AddResult";
import TeacherInformation from './pages/TeacherInfo';
import StaffsInformation from './pages/StaffsInformation';
import ExamCard from './pages/ExamCard';
import ResultsClasses from "./pages/ResultsClasses";
import ResultsTable from "./pages/ResultsTable";
import Routine from './pages/Routine';
import GoverningBody from './pages/GoverningBody';
import SyllabusPage from './pages/Syllabus';
import SyllabusViewer from "./pages/SyllabusViewer";
import RoutineForm from './pages/RoutineForm';
import AddStaffs from './pages/AddStaffs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="fund" element={<Fund />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="notice-board" element={<Navigate to="/" replace />} />
          <Route path="/documents" element={<AdmissionDocuments />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="notice-approved" element={<ApprovedNotices />} />
          <Route path="notices-create" element={<CreateNotice />} />
          <Route path="notice-pending" element={<PendingNotices />} />
          <Route path="notices/:id" element={<NoticeDetail />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="student" element={<AddStudent />} />
          {/* <Route path="headmaster" element={<HeadMasterProfile/>} /> */}
           <Route path="gallery" element={<Gallery/>} />

          {/* ✅ Use GradeHandler to manage 6-8 vs 9-10 */}
          <Route path="/class/:grade" element={<GradeHandler />} />

          {/* Students inside a specific group (only used for 9-10) */}
          <Route path="/class/:grade/:group" element={<ClassStudents />} />

          <Route path="/profile" element={<Profile/>} />
          <Route path="/add-result" element={<AddResult />} />
           <Route path="/teacher" element={<TeacherInformation />} />
           <Route path="/staffs" element={<StaffsInformation />} />
            <Route path="/results" element={<ExamCard />} />
        <Route path="/results/:examId" element={<ResultsClasses />} />
        <Route path="/results/:examId/:classId" element={<ResultsTable />} />
        <Route path="routine" element={<Routine />} />
        <Route path="governing-body" element={<GoverningBody/>} />
        <Route path="syllabus" element={<SyllabusPage/>} />
        <Route path="/syllabus/:id" element={<SyllabusViewer />} />
        <Route path="update-routine" element={<RoutineForm />} />
         <Route path="add-staffs" element={<AddStaffs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
// conflict
