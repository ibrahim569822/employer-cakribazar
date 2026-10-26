function PageTitle({ title, parent, current }) {
    return (
        <div className="pagetitle">
                <h1>{title}</h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item">{parent}</li>
                    <li className="breadcrumb-item active">{current}</li>
                    </ol>
                </nav>
            </div>
    );
}

export default PageTitle;