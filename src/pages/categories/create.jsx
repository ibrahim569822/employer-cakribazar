import React from 'react';
import { Link,useParams } from 'react-router';
import PageTitle from '../../components/page-title.jsx';
import axios from '../../Lib/axios.js';
import Layout from '../../components/layout.jsx';

function CategoryCreate() {
   const [category, setCategory] = React.useState({'id':0,'name':'','icon':'','description':'','slug':''});

  let { id } = useParams();
  const [message, setMessage] = React.useState("");
  const fetchCategory = async (e) => {
    let res= await axios.get('category/single.php?id='+id)
    setCategory(res?.data?.data[0])
  }

  React.useEffect(() => {
    if(id)
      fetchCategory();
  }
, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let url = '';
    
    if (id) {
        url = 'category/update.php?id=' + id;
    } else {
        url = 'category/create.php';
    }
    let response = await axios.post(url, formData);

    window.location.href = '/categories';
  };

  return (
    <Layout>
      <PageTitle title={id ? "Update Category" : "Create Category"} parent="Categories" current={id ? "Update" : "Create"} />
    <div className="container mt-4">
      <div className="page-inner">
        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body p-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group mb-3">
                    <label htmlFor="categoryIcon">Category Icon</label>
                    <input type="file" name="icon" className="form-control" id="categoryIcon" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="categoryName">Category Name</label>
                    <input type="text" onChange={(e) => setCategory({...category, name: e.target.value})} value={category.name} name="name" className="form-control" id="categoryName" placeholder="Enter category name" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="categoryDescription">Category Description</label>
                    <input type="text" onChange={(e) => setCategory({...category, description: e.target.value})} value={category.description} name="description" className="form-control" id="categoryDescription" placeholder="Enter category description" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="slug">Category Slug</label>
                    <input type="text" onChange={(e) => setCategory({...category, slug: e.target.value})} value={category.slug} name="slug" className="form-control" id="slug" placeholder="Enter category slug" />
                  </div>
                  {id ? (<button type="submit" className="btn btn-primary mt-3">Update Category</button>) : (<button type="submit" className="btn btn-primary mt-3">Add Category</button>) }
                  
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

export default CategoryCreate;