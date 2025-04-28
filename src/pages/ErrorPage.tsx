import "../styles/styles1.css";

interface Props {};

const ErrorPage = (_props: Props) => {
    return (
        <div className="container-fluid min-vh-100">
            <div className="col align-content-center justify-content-center">
                <div className="row pt-5 text-center">
                    <h1 className="py-5 mt-5 title">404. Page Not Found</h1>
                </div>
            </div>
        </div>
    )
};

export default ErrorPage;