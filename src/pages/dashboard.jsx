import PageTitle from "../components/page-title.jsx";
import Layout from "../components/layout.jsx";

function Dashboard() {
    return (
        <Layout>
            <PageTitle title="Dashboard" parent="Home" current="Dashboard" />
            <h1>Welcome to the Dashboard</h1>
            <p>This is the main landing page of our application.</p>
        </Layout>
    );
}

export default Dashboard;