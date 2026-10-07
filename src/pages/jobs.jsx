import PageTitle from "../components/page-title.jsx";
function Jobs() {
    return (
        <div id="main" className="main">
            <PageTitle title="Jobs" parent="Jobs" current="Job Listings" />
            <h1>Job Listings</h1>
            <p>Here you can find all the available job opportunities.</p>
        </div>
    );
}

export default Jobs;