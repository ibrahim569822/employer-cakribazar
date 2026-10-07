
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import './App.css'
import Dashboard from './pages/dashboard.jsx'
import Jobs from './pages/jobs.jsx'
import Profile from './pages/profile.jsx'
import Footer from './components/footer.jsx'
import Catergories from './pages/categories/categories.jsx'
import CategoryEdit from './pages/categories/edit.jsx'
import CategoryCreate from './pages/categories/create.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {


  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories">
          <Route index element={<Catergories />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
        </Route>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
