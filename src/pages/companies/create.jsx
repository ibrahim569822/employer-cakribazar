import React from 'react';
import { Link , useParams } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
import axios from '../../Lib/axios.js';
import Layout from '../../components/layout.jsx';

function CompanyCreate() {
    const [company, setCompany] = React.useState({'name':'','icon':'','description':'','slug':''});

  let { id } = useParams();
  const [message, setMessage] = React.useState("");
  const fetchCompany = async (e) => {
    let res= await axios.get('companies/single.php?id='+id)
    setCompany(res?.data?.data[0])
  }

  React.useEffect(() => {
    if(id)
      fetchCompany();
  }
, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let url = '';
    if (id) {
        url = 'companies/update.php?id=' + id;
    } else {
        url = 'companies/create.php';
    }
    let response = await axios.post(url, formData);

    window.location.href = '/companies';
  };

  return (
    <Layout>
      <PageTitle title={id ? "Update Company" : "Create Company"} parent="Companies" current={id ? "Update" : "Create"} />
    <div className="container mt-4">
      <div className="page-inner">
        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body p-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="form-group mb-3">
                    <label htmlFor="companyLogo">Company Logo</label>
                    <input type="file" name="logo" className="form-control" id="companyLogo" accept="image/*" />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="name">Company Name</label>
                    <input type="text" name="name" id="name" className="form-control" maxLength={150}
                      placeholder="Enter company name"
                      value={company.name}
                      onChange={(e) => setCompany({ ...company, name: e.target.value })} />
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="user_id">User Id</label>
                      <input type="number" name="user_id" id="user_id" className="form-control" min="1"
                        placeholder="Optional (leave empty if managed by admin)"
                        value={company.user_id}
                        onChange={(e) => setCompany({ ...company, user_id: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="status">Status</label>
                      <select name="status" id="status" className="form-select"
                        value={company.status}
                        onChange={(e) => setCompany({ ...company, status: e.target.value })}>
                        <option value="1">Pending</option>
                        <option value="2">Approved</option>
                        <option value="3">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="website">Website</label>
                      <input type="url" name="website" id="website" className="form-control" maxLength={200}
                        placeholder="https://example.com"
                        value={company.website}
                        onChange={(e) => setCompany({ ...company, website: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="industry">Industry</label>
                      <input type="text" name="industry" id="industry" className="form-control" maxLength={100}
                        placeholder="e.g. Software, Garments"
                        value={company.industry}
                        onChange={(e) => setCompany({ ...company, industry: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="size">Company Size</label>
                    <select name="size" id="size" className="form-select"
                      value={company.size}
                      onChange={(e) => setCompany({ ...company, size: e.target.value })}>
                      <option value="">Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" className="form-control" rows={4}
                      placeholder="About the company"
                      value={company.description}
                      onChange={(e) => setCompany({ ...company, description: e.target.value })} />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" className="form-control" maxLength={255}
                      placeholder="Enter address"
                      value={company.address}
                      onChange={(e) => setCompany({ ...company, address: e.target.value })} />
                  </div>

                  {id ? (<button type="submit" className="btn btn-primary mt-3">Update Company</button>) : (<button type="submit" className="btn btn-primary mt-3">Add Company</button>) }
                  
                  {message && (
                    <div className="mt-3">
                      <p className={message.includes("successfully") ? "text-success" : "text-danger"}>{message}</p> 
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Layout>
  );
}

export default CompanyCreate;