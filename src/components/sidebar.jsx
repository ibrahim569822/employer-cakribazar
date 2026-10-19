import { Link } from "react-router-dom";
function Sidebar() {
    return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
          <i className="bi bi-menu-button-wide"></i><span>Components</span><i className="bi bi-chevron-down ms-auto"></i>
        </Link>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/components-alerts">
              <i className="bi bi-circle"></i><span>Alerts</span>
            </Link>
          </li>
          <li>
            <Link to="/components-accordion">
              <i className="bi bi-circle"></i><span>Accordion</span>
            </Link>
          </li>
          <li>
            <Link to="/components-badges">
              <i className="bi bi-circle"></i><span>Badges</span>
            </Link>
          </li>
          <li>
            <Link to="/components-breadcrumbs">
              <i className="bi bi-circle"></i><span>Breadcrumbs</span>
            </Link>
          </li>
          <li>
            <Link to="/components-buttons">
              <i className="bi bi-circle"></i><span>Buttons</span>
            </Link>
          </li>
          <li>
            <Link to="/components-cards">
              <i className="bi bi-circle"></i><span>Cards</span>
            </Link>
          </li>
          <li>
            <Link to="/components-carousel">
              <i className="bi bi-circle"></i><span>Carousel</span>
            </Link>
          </li>
          <li>
            <Link to="/components-list-group">
              <i className="bi bi-circle"></i><span>List group</span>
            </Link>
          </li>
          <li>
            <Link to="/components-tooltips">
              <i className="bi bi-circle"></i><span>Tooltips</span>
            </Link>
          </li>
        </ul>
      </li>
      

      <li className="nav-heading">Pages</li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/profile">
          <i className="bi bi-person"></i>
          <span>Profile</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/categories">
          <i className="bi bi-grid"></i>
          <span>Categories</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/jobs">
          <i className="bi bi-grid"></i>
          <span>Jobs</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/applications">
          <i className="bi bi-grid"></i>
          <span>Applications</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/companies">
          <i className="bi bi-grid"></i>
          <span>Companies</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/register">
          <i className="bi bi-card-list"></i>
          <span>Register</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/login">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/blank">
          <i className="bi bi-file-earmark"></i>
          <span>Blank</span>
        </Link>
      </li>

    </ul>

  </aside>
    );
}

export default Sidebar;