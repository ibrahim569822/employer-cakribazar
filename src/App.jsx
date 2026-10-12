
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import './App.css'
import Dashboard from './pages/dashboard.jsx'
import Jobs from './pages/jobs/jobs.jsx'
import JobsCreate from './pages/jobs/create.jsx'
import Profile from './pages/profile.jsx'
import Footer from './components/footer.jsx'
import Catergories from './pages/categories/categories.jsx'
import CategoryCreate from './pages/categories/create.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogIn from './pages/login.jsx'
import Register from './pages/register.jsx'
import Companies from './pages/companies/companies.jsx'
import CompanyCreate from './pages/companies/create.jsx'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
        <Route path="/companies">
          <Route index element={<Companies />} />
          <Route path="create" element={<CompanyCreate />} />
          <Route path="edit/:id" element={<CompanyCreate />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
