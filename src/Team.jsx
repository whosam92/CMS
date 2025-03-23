import "../public/css/style.css";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

export default function Team() {
  return (
    <>
   

      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-4 text-white animated slideInDown mb-4">
            Our Team
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a className="text-white" href="#">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-white" href="#">
                  Pages
                </a>
              </li>
              <li
                className="breadcrumb-item text-primary active"
                aria-current="page"
              >
                Our Team
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-end mb-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="border-start border-5 border-primary ps-4">
                <h6 className="text-body text-uppercase mb-2">Our Team</h6>
                <h1 className="display-6 mb-0">Our Expert Worker</h1>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo magna dolore erat amet
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-1.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-2.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-3.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-2.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-3.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item position-relative">
                <img className="img-fluid" src="img/team-1.jpg" alt="" />
                <div className="team-text bg-white p-4">
                  <h5>Full Name</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
      
    
      
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}