import React from 'react';
import { Link, useParams } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
import axios from '../../Lib/axios.js';
import Layout from '../../components/layout.jsx';

function JobsCreate() {
    const [job, setJob] = React.useState({'id':0,'name':'','icon':'','description':'','slug':''});

  let { id } = useParams();
  const [message, setMessage] = React.useState("");
  const fetchJob = async (e) => {
    let res= await axios.get('jobs/single.php?id='+id)
    setJob(res?.data?.data[0])
  }

  React.useEffect(() => {
    if(id)
      fetchJob();
  }
, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let url = '';
    if (id) {
        url = 'jobs/update.php?id=' + id;
    } else {
        url = 'jobs/create.php';
    }
    let response = await axios.post(url, formData);

    //window.location.href = '/jobs';
  };

  return (
    <Layout>
      <PageTitle title={job.id!=0 ? "Updates Job": "Create Job"} parent="Jobs" current={job.id!=0 ? "Updates": "Create"} />
    <div className="container mt-4">
      <div className="page-inner">
        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body p-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="form-group mb-3">
                    <label htmlFor="jobIcon">Job Icon</label>
                    <input type="file" name="icon" className="form-control" id="jobIcon" />
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="company_id">Company</label>
                      <input type="text" name="company_id" id="company_id" className="form-control"
                        value={job.company_id}
                        onChange={(e) => setJob({ ...job, company_id: e.target.value })} /> 
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="category_id">Category</label>
                      <input type="text" name="category_id" id="category_id" className="form-control"
                        value={job.category_id}
                        onChange={(e) => setJob({ ...job, category_id: e.target.value })} />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="title">Job Title</label>
                    <input type="text" name="title" id="title" className="form-control" maxLength={200}
                      placeholder="Enter job title"
                      value={job.title}
                      onChange={(e) => setJob({ ...job, title: e.target.value })} />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="description">Job Description</label>
                    <textarea name="description" id="description" className="form-control" rows={5}
                      placeholder="Enter job description"
                      value={job.description}
                      onChange={(e) => setJob({ ...job, description: e.target.value })} />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="requirements">Requirements</label>
                    <textarea name="requirements" id="requirements" className="form-control" rows={4}
                      placeholder="Optional"
                      value={job.requirements}
                      onChange={(e) => setJob({ ...job, requirements: e.target.value })} />
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="location">Location</label>
                      <input type="text" name="location" id="location" className="form-control" maxLength={100}
                        placeholder="Enter location"
                        value={job.location}
                        onChange={(e) => setJob({ ...job, location: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="job_type">Job Type</label>
                      <input type="text" name="job_type" id="job_type" className="form-control" maxLength={50}
                        placeholder="Enter job type"
                        value={job.job_type}
                        onChange={(e) => setJob({ ...job, job_type: e.target.value })} />
                    
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="experience_years">Experience (years)</label>
                      <input type="number" name="experience_years" id="experience_years" className="form-control" min="0" max="255"
                        value={job.experience_years}
                        onChange={(e) => setJob({ ...job, experience_years: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="vacancies">Vacancies</label>
                      <input type="number" name="vacancies" id="vacancies" className="form-control" min="1"
                        value={job.vacancies}
                        onChange={(e) => setJob({ ...job, vacancies: e.target.value })} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="salary_min">Minimum Salary</label>
                      <input type="number" name="salary_min" id="salary_min" className="form-control" min="0"
                        value={job.salary_min}
                        onChange={(e) => setJob({ ...job, salary_min: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="salary_max">Maximum Salary</label>
                      <input type="number" name="salary_max" id="salary_max" className="form-control" min="0"
                        value={job.salary_max}
                        onChange={(e) => setJob({ ...job, salary_max: e.target.value })} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="deadline">Application Deadline</label>
                      <input type="date" name="deadline" id="deadline" className="form-control"
                        value={job.deadline}
                        onChange={(e) => setJob({ ...job, deadline: e.target.value })} />
                    </div>

                    <div className="col-md-6 form-group mb-3">
                      <label htmlFor="status">Status</label>
                      <select name="status" id="status" className="form-select"
                        value={job.status}
                        onChange={(e) => setJob({ ...job, status: e.target.value })}>
                        <option value="1">Pending</option>
                        <option value="2">Active</option>
                        <option value="3">Closed</option>
                        <option value="4">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {job.id != 0 ? (
                    <button type="submit" className="btn btn-primary mt-3">Update Job</button>
                  ) : (
                    <button type="submit" className="btn btn-primary mt-3">Add Job</button>
                  )}

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

export default JobsCreate;