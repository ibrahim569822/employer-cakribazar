import React from 'react';
import { Link } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
function CategoryCreate() {

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    fetch('http://localhost/cakribazar/category/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Optionally, you can redirect the user to another page or show a success message here
        window.location.href = '/categories';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div className="main" id="main">
      <PageTitle title="Create Category" parent="Categories" current="Create" />
    <div className="container">
      <div className="page-inner">


        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="categoryName">Category Name</label>
                    <input type="text" name="name" className="form-control" id="categoryName" placeholder="Enter category name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryDescription">Category Description</label>
                    <input type="text" name="description" className="form-control" id="categoryDescription" placeholder="Enter category description" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Category</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  );
}

export default CategoryCreate;