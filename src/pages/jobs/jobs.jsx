import PageTitle from '../../components/page-title.jsx';
import Layout from "../../components/layout.jsx";
import { Link } from "react-router";
import React from "react";

function Jobs() {
  const [jobs, setJobs] = React.useState([]);
  const [search, setSearch] = React.useState("");

  function fetchJobs() {
    fetch("http://localhost/cakribazar/jobs/index.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((result) => {
        setJobs(result.data || []);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this job?")) {
      fetch(`http://localhost/cakribazar/jobs/delete.php?id=${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "true") {
            fetchJobs();
          }
        })
        .catch((error) => console.error("Error deleting job:", error));
    }
  }

  React.useEffect(() => {
    fetchJobs();
    
  }, []);

  const filteredJobs = jobs.filter((job) =>
    (job.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <PageTitle title="Jobs" parent="Jobs" current="Jobs" />

      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <h4 className="card-title">Jobs</h4>

                <Link
                  to="/jobs/create"
                  className="btn btn-primary btn-round ms-auto"
                >
                  <i className="fa fa-plus"></i>
                  &nbsp; Add Job
                </Link>
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
                      <th>Icon</th>
                      <th>Job Title</th>
                      <th>Description</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job, index) => (
                        <tr key={job.id || index}>
                          <td>{index + 1}</td>

                          <td>
                            <img
                              src={`http://localhost/cakribazar/${job.icon}`}
                              alt="Job Icon"
                              width="40"
                              height="40"
                              style={{ objectFit: "contain" }}
                            />
                          </td>

                          <td>{job.title}</td>
                          <td>{job.description.slice(0, 100)}...</td>
                          <td>{job.location}</td>

                          <td>
                            <Link to={`/jobs/edit/${job.id}`}
                              className="btn btn-link btn-light"
                              title="Edit"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>

                            </Link>

                            <button
                              className="btn btn-link btn-light"
                              title="Delete"
                              onClick={() => handleDelete(job.id)}
                            >
                              <i className="fa-solid fa-trash text-danger"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No jobs found.
                        </td>
                      </tr>
                    )}
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

export default Jobs;
