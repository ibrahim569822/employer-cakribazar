import React from 'react';
import { Link } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
import Layout from '../../components/layout.jsx';
function Companies() {

  const [company, setCompany] = React.useState([]);

  function fetchCompany() {
    fetch('http://localhost/cakribazar/companies/index.php')
      .then(response => response.json())
      .then(data => setCompany(data.data))
      .catch(error => console.error('Error fetching companies:', error));
  }

  React.useEffect(() => {
    fetchCompany();
  }
, [company]);

function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this company?")) {
    fetch(`http://localhost/cakribazar/companies/delete.php?id=${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'true') {
          fetchCompany();
        }
      })
      .catch(error => console.error('Error deleting company:', error));
  }
}


    return (
        <Layout>
      <PageTitle title="Companies" parent="Companies" current="Companies" />
      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
                    <div className="card-header">
                        < div className="d-flex align-items-center">

                          <h4 className="card-title">
                            Companies
                          </h4>

                          <Link to="/companies/create" className="btn btn-primary btn-round ms-auto">
                            <i className="fa fa-plus"></i>
                            &nbsp; Add Company
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
                                <th>Company Name</th>
                                <th>Industry</th>
                                <th>Address</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                                    {company.map((company, index) => (

                                    <tr key={company.id}>

                                      <td>{index + 1}</td>
                                      <td>
                                        <img src={`${import.meta.env.VITE_API_URL}${company.logo}`} alt={company.name} width="30" />
                                      </td>

                                      <td>
                                        <strong>{company.name}</strong>
                                      </td>

                                      <td>{company.industry}</td>
                                      <td>{company.address}</td>
                                      <td>
                                        <div className="form-button-action">

                                          <Link to={`/companies/edit/${company.id}`}
                                            className="btn btn-link btn-light"
                                            title="Edit"
                                          >
                                            <i className="fa-solid fa-pen-to-square"></i>

                                          </Link>

                                          <button
                                            className="btn btn-link btn-light"
                                            title="Delete"
                                            onClick={() => handleDelete(company.id)}
                                          >
                                            <i className="fa-solid fa-trash text-danger"></i>
                                          </button>
                                        </div>
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

export default Companies;