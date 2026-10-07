import PageTitle from "../components/page-title.jsx";

function Dashboard() {
    return (
        <div className="main" id="main">
            <PageTitle title="Dashboard" parent="Home" current="Dashboard" />
            <h1>Welcome to the Dashboard</h1>
            <p>This is the main landing page of our application.</p>
        </div>
    );
}

export default Dashboard;