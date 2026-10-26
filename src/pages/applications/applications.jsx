import PageTitle from '../../components/page-title.jsx';
import Layout from "../../components/layout.jsx";
import axios from '../../Lib/axios.js'
import React from "react";
import ApplicationModal from './application-modal.jsx';

const applicationStatuses = {
  1: { label: 'Applied', backgroundColor: '#6c757d', color: '#fff' },
  2: { label: 'Viewed', backgroundColor: '#0dcaf0', color: '#212529' },
  3: { label: 'Shortlisted', backgroundColor: '#ffc107', color: '#212529' },
  4: { label: 'Interviewed', backgroundColor: '#0d6efd', color: '#fff' },
  5: { label: 'Hired', backgroundColor: '#198754', color: '#fff' },
  6: { label: 'Rejected', backgroundColor: '#dc3545', color: '#fff' },
};

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selectedApplication, setSelectedApplication] = React.useState(null);

  const handleStatusChange = async (application, status) => {
    const formData = new FormData();
    formData.append('status', status);

    try {
      await axios.post(`applications/update.php?id=${application.id}`, formData);
      setApplications((currentApplications) =>
        currentApplications.map((item) =>
          item.id === application.id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleModalStatusUpdated = (applicationId, status) => {
    setApplications((currentApplications) =>
      currentApplications.map((item) =>
        String(item.id) === String(applicationId) ? { ...item, status } : item
      )
    );
  };


  React.useEffect(() => {
    let active = true;
    axios.get('/applications/index.php')
      .then((response) => {
        if (active) setApplications(response.data.data || []);
      })
      .catch((error) => {
        if (active) console.error('Error fetching applications:', error);
      });

    return () => {
      active = false;
    };
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
                      <th>Application ID</th>
                      <th>Company Name</th>
                      <th>Job Title</th>
                      <th>Seeker Name</th>
                      <th>Seeker Email</th>
                      
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application, index) => {
                      const status = applicationStatuses[application.status];
                      return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{application.id}</td>
                        <td>{application.company_name || "N/A"}</td>
                        <td>{application.job_title || "N/A"}</td>
                        <td>{application.seeker_name || "N/A"}</td>
                        <td>{application.seeker_email || "N/A"}</td>
                        
                        <td>
                          <div className="d-flex flex-column gap-2">
                            
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedApplication(application)}>
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusUpdated={handleModalStatusUpdated}
        />
      )}
    </Layout>
  );
}

export default Applications;
