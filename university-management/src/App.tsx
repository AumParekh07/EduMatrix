import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/User/loginWPass";
import { Register } from "./pages/User/register";
import { SendOtp } from "./pages/User/SendOTP";
import { VerifyOtp } from "./pages/User/VerifyOTP";

// import { AllUniversityList } from "./components/alluniversity";

import { StdDetail } from "./pages/Student/studentDetail";
import { UniversityList } from "./pages/Student/UniversityList";
import { UniversityById } from "./pages/Student/UniversityById";
import { EnrollCourse } from "./pages/Student/enrollCourse";
import { StudentDashboard } from "./pages/Student/dashboard";

import { AdminStreams } from "./pages/Admin/listStream";
import { AdminSubjects } from "./pages/Admin/listSubject";
import { AdminCourses } from "./pages/Admin/listCourse";
import { CreateStream } from "./pages/Admin/createStream";
import { CreateSubject } from "./pages/Admin/createSubject";

import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/RoleBasedRoute";
import { CreateCourse } from "./pages/Admin/createCourse";
import { CreateUniversity } from "./pages/Admin/createUniversity";
import { CreateFeeCapacity } from "./pages/Admin/createFeeCapacity";
import { AdminUniversityList } from "./pages/Admin/adminUniversity";
import { UniversityList1 } from "./pages/Admin/listUniversity";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/send-otp" element={<SendOtp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />


      <Route path="/std-detail" element={<PrivateRoute allowedRole="student"><StdDetail /></PrivateRoute>} />
      <Route path="/university" element={<PrivateRoute allowedRole="student"><UniversityList /></PrivateRoute>} />
      <Route path="/university/:id" element={<PrivateRoute allowedRole="student"><UniversityById /></PrivateRoute>} />
      <Route path="/enroll-course/:id" element={<PrivateRoute allowedRole="student"><EnrollCourse /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute allowedRole="student"><StudentDashboard /></PrivateRoute>} />


      <Route path="/admin/stream" element={<PrivateRoute allowedRole="admin"><AdminStreams /></PrivateRoute>} />
      <Route path="/admin/subject" element={<PrivateRoute allowedRole="admin"><AdminSubjects /></PrivateRoute>} />
      <Route path="/admin/course" element={<PrivateRoute allowedRole="admin"><AdminCourses /></PrivateRoute>} />
      <Route path="/admin/university" element={<PrivateRoute allowedRole="admin"><UniversityList /></PrivateRoute>} />
      <Route path="/admin/university/:id" element={<PrivateRoute allowedRole="admin"><UniversityById /></PrivateRoute>} />


      <Route path="/admin/create-stream" element={<PrivateRoute allowedRole="admin"><CreateStream /></PrivateRoute>} />
      <Route path="/admin/create-subject" element={<PrivateRoute allowedRole="admin"><CreateSubject /></PrivateRoute>} />
      <Route path="/admin/create-course" element={<PrivateRoute allowedRole="admin"><CreateCourse /></PrivateRoute>} />
      <Route path="/admin/create-university" element={<PrivateRoute allowedRole="admin"><CreateUniversity /></PrivateRoute>} />
      <Route path="/admin/create-feeCapacity" element={<PrivateRoute allowedRole="admin"><CreateFeeCapacity /></PrivateRoute>} />


      <Route path="*" element={<PageNotFound />} />

    </Routes>


  );
}

export default App;
