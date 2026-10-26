import React from 'react';
import { Link } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
import Layout from '../../components/layout.jsx';
import axios from '../../Lib/axios.js'
function Categories() {

  const [categories, setCategories] = React.useState([]);

  async function fetchCategories() {
    let res = await axios.get('/category/index.php');
    setCategories(res.data.data);
  }

  React.useEffect(() => {
    fetchCategories();
  }
, []);

async function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this category?")) {
    let res = await axios.delete(`http://localhost/cakribazar/category/delete.php?id=${id}`)
    if (res.data.status === 'success') {
      await fetchCategories();
    }
     
    }
    
}

  return (
    <Layout>
      <PageTitle title="Categories" parent="Categories" current="Categories" />
      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
                    <div className="card-header">
                        < div className="d-flex align-items-center">

                          <h4 className="card-title">
                            Parts Categories
                          </h4>

                          <Link to="/categories/create" className="btn btn-primary btn-round ms-auto">
                            <i className="fa fa-plus"></i>
                            &nbsp; Add Category
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
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Slug</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>

                              {categories.map((category, index) => (

                                <tr key={category.id}>

                                  <td>{index + 1}</td>
                                  <td>
                                    <img src={`${import.meta.env.VITE_API_URL}${category.icon}`} alt={category.name} width="30" />
                                  </td>

                                  <td>
                                    <strong>{category.name}</strong>
                                  </td>

                                  <td>{category.description}</td>
                                  <td>{category.slug}</td>
                                  <td>
                                    <div className="form-button-action">

                                      <Link to={`/categories/edit/${category.id}`}
                                        className="btn btn-link btn-light"
                                        title="Edit"
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>

                                      </Link>

                                      <button
                                        className="btn btn-link btn-light"
                                        title="Delete"
                                        onClick={() => handleDelete(category.id)}
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

export default Categories;