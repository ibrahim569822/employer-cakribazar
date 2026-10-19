import PageTitle from '../../components/page-title.jsx';
import Layout from "../../components/layout.jsx";
import { Link } from "react-router";
import axios from '../../Lib/axios.js'
import React from "react";

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [jobs, setJobs] = React.useState([]);
  const [seekers, setSeekers] = React.useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/applications/index.php');
      setApplications(res.data.data || []);
      console.log("Fetched applications:", res.data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };


  React.useEffect(() => {
    fetchApplications();
  }, []);

  

  return (
    <Layout>
      <PageTitle title="Applications" parent="Applications" current="Applications" />

      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h4 className="card-title">Applications</h4>

                {/* <Link
                  to="/applications/create"
                  className="btn btn-primary btn-round ms-auto"
                >
                  <i className="fa fa-plus"></i>
                  &nbsp; Add Application
                </Link> */}
              </div>
            </div>

            <div className="card-body">
              {/* Search */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-icon">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search job title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <span className="input-icon-addon">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Job Id</th>
                      <th>Job Title</th>
                      <th>Seeker Name</th>
                      <th>Seeker Email</th>
                      <th>Resume</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{application.job_id}</td>
                        <td>{application.job_title || "N/A"}</td>
                        <td>{application.seeker_name || "N/A"}</td>
                        <td>{application.seeker_email || "N/A"}</td>
                        <td>
                          <a href={`${import.meta.env.VITE_API_URL}/${application.resume}`} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        </td>
                        <td>
                          <Link to={`/applications/view/${application.id}`} className="btn btn-sm btn-primary">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Applications;
