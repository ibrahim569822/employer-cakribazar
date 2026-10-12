import PageTitle from "../../components/page-title.jsx";
import Layout from "../../components/layout.jsx";
import { Link } from "react-router-dom";
function Jobs() {
    return (
        <Layout>
      <PageTitle title="Jobs" parent="Jobs" current="Jobs" />
      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
                    <div className="card-header">
                        < div className="d-flex align-items-center">

                          <h4 className="card-title">
                            Jobs
                          </h4>

                          <Link to="/jobs/create" className="btn btn-primary btn-round ms-auto">
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
                                placeholder="Search category..."
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
                                <tr>
                                    <td>1</td>
                                    <td><img src="https://via.placeholder.com/30" alt="Category Icon" /></td>
                                    <td>Software Engineer</td>
                                    <td>Develop and maintain software applications.</td>
                                    <td>New York</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2">Edit</button>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
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