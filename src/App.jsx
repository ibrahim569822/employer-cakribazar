import { useState } from 'react'
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import './App.css'
import Dashboard from './pages/dashboard.jsx'
import Jobs from './pages/jobs/jobs.jsx'
import Applications from './pages/applications/applications.jsx'
import JobsCreate from './pages/jobs/create.jsx'
import Profile from './pages/profile.jsx'
import Footer from './components/footer.jsx'
import Catergories from './pages/categories/categories.jsx'
import CategoryCreate from './pages/categories/create.jsx'
import {BrowserRouter, Routes, Route} from 'react-router'
import LogIn from './pages/login.jsx'
import Register from './pages/register.jsx'
import Companies from './pages/companies/companies.jsx'
import CompanyCreate from './pages/companies/create.jsx'
import Logout from './Auth/logout.jsx'
import Protected from './Auth/protected.jsx'
function App() {
  const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    return localStorage.getItem("access_token") == 'undefined' || localStorage.getItem("access_token") == null ? false : true;
    /* if you want, user will be logged when they close the browser*/
    //return sessionStorage.getItem("access_token") || false;
  });
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Protected isSignedIn={isSignedIn} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories">
          <Route index element={<Catergories />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryCreate />} />
        </Route>
        <Route path="/jobs">
          <Route index element={<Jobs />} />
          <Route path="create" element={<JobsCreate />} />
          <Route path="edit/:id" element={<JobsCreate />} />
        </Route>
        <Route path="/applications">
          <Route index element={<Applications />} />
        </Route>
        <Route path="/companies">
          <Route index element={<Companies />} />
          <Route path="create" element={<CompanyCreate />} />
          <Route path="edit/:id" element={<CompanyCreate />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
