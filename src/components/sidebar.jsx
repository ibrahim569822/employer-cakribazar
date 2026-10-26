import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Lib/axios.js";

function Sidebar() {
    const userData = JSON.parse(localStorage.getItem("userdata") || "null");
    const userId = userData?.id;
    const readKey = `read-application-ids-${userId}`;
    const pendingReadKey = `read-applications-on-next-load-${userId}`;
    const [unreadCount, setUnreadCount] = useState(0);
    const applicationIdsRef = useRef([]);
    const applicationsLoadedRef = useRef(false);
    const markReadOnLoadRef = useRef(false);

    useEffect(() => {
      if (!userId) return undefined;

      let active = true;
      axios.get("/applications/notifications.php")
        .then((response) => {
          if (!active) return;

          const applicationIds = (response.data.data || []).map((id) => String(id));
          applicationIdsRef.current = applicationIds;
          applicationsLoadedRef.current = true;

          let readIds = [];
          try {
            const savedIds = JSON.parse(localStorage.getItem(readKey) || "[]");
            if (Array.isArray(savedIds)) readIds = savedIds.map(String);
          } catch (error) {
            console.error("Unable to read seen application IDs:", error);
          }

          const shouldMarkRead = markReadOnLoadRef.current
            || localStorage.getItem(pendingReadKey) === "1";
          const currentReadIds = shouldMarkRead
            ? applicationIds
            : readIds.filter((id) => applicationIds.includes(id));

          localStorage.setItem(readKey, JSON.stringify(currentReadIds));
          localStorage.removeItem(pendingReadKey);
          markReadOnLoadRef.current = false;
          setUnreadCount(applicationIds.filter((id) => !currentReadIds.includes(id)).length);
        })
        .catch((error) => {
          if (active) console.error("Unable to load application notifications:", error);
        });

      return () => {
        active = false;
      };
    }, [userId, readKey, pendingReadKey]);

    const markApplicationsRead = () => {
      setUnreadCount(0);
      if (applicationsLoadedRef.current) {
        localStorage.setItem(readKey, JSON.stringify(applicationIdsRef.current));
        localStorage.removeItem(pendingReadKey);
      } else {
        markReadOnLoadRef.current = true;
        localStorage.setItem(pendingReadKey, "1");
      }
    };

    return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* <li className="nav-item">
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
      </li> */}
      

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
        <Link className="nav-link collapsed" to="/applications" onClick={markApplicationsRead}>
          <i className="bi bi-grid"></i>
          <span>Applications</span>
          {unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill ms-auto" aria-label={`${unreadCount} new applications`}>
              {unreadCount}
            </span>
          )}
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