import "../public/css/style.css";
import Spinner from "./components/Spinner";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import FeatureUs from "./components/FeatureUs";
import Testimonial from "./components/TestimonialComp";
import Youtube from "./components/Youtube";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";

export default function Index() {
  return (
    <>
      
      {/* Carousel Start */}
      <div
        className="container-fluid p-0 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                      <h5 className="text-light text-uppercase mb-3 animated slideInDown">
                        Welcome to Apex
                      </h5>
                      <h1 className="display-2 text-light mb-3 animated slideInDown">
                        A Construction &amp; Renovation Company
                      </h1>
                      <ol className="breadcrumb mb-4 pb-2">
                        <li className="breadcrumb-item fs-5 text-light">
                          Commercial
                        </li>
                        <li className="breadcrumb-item fs-5 text-light">
                          Residential
                        </li>
                        <li className="breadcrumb-item fs-5 text-light">
                          Industrial
                        </li>
                      </ol>
                      <a href="about" className="btn btn-primary py-3 px-5">
                        More Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                      <h5 className="text-light text-uppercase mb-3 animated slideInDown">
                        Welcome to Apex
                      </h5>
                      <h1 className="display-2 text-light mb-3 animated slideInDown">
                        Professional Tiling &amp; Painting Services
                      </h1>
                      <ol className="breadcrumb mb-4 pb-2">
                        <li className="breadcrumb-item fs-5 text-light">
                          Commercial
                        </li>
                        <li className="breadcrumb-item fs-5 text-light">
                          Residential
                        </li>
                        <li className="breadcrumb-item fs-5 text-light">
                          Industrial
                        </li>
                      </ol>
                      <a href="service" className="btn btn-primary py-3 px-5">
                        More Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel End */}

      <AboutUs />

      {/* Facts Start */}
      <div className="container-fluid my-5 p-0">
        <div className="row g-0">
          <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="position-relative">
              <img className="img-fluid w-100" src="img/fact-1.jpg" alt="" />
              <div className="facts-overlay">
                <h1 className="display-1">01</h1>
                <h4 className="text-white mb-3">Construction</h4>
                <p className="text-white">
                  Expert construction services tailored to meet your needs,
                  ensuring quality and precision in every project.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.3s">
            <div className="position-relative">
              <img className="img-fluid w-100" src="img/fact-2.jpg" alt="" />
              <div className="facts-overlay">
                <h1 className="display-1">02</h1>
                <h4 className="text-white mb-3">Mechanical</h4>
                <p className="text-white">
                  Innovative mechanical solutions designed to enhance efficiency
                  and performance across all sectors.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="position-relative">
              <img className="img-fluid w-100" src="img/fact-3.jpg" alt="" />
              <div className="facts-overlay">
                <h1 className="display-1">03</h1>
                <h4 className="text-white mb-3">Architecture</h4>
                <p className="text-white">
                  Creative and functional architectural designs that bring your
                  vision to life while meeting your practical needs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 wow fadeIn" data-wow-delay="0.7s">
            <div className="position-relative">
              <img className="img-fluid w-100" src="img/fact-4.jpg" alt="" />
              <div className="facts-overlay">
                <h1 className="display-1">04</h1>
                <h4 className="text-white mb-3">Interior Design</h4>
                <p className="text-white">
                  Stylish and functional interior designs that transform spaces
                  into environments that inspire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Facts End */}

      <FeatureUs />

      {/* Appointment Start */}
      {/* <div
        className="container-fluid appointment my-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-5 col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <div className="border-start border-5 border-primary ps-4 mb-5">
                <h6 className="text-white text-uppercase mb-2">Appointment</h6>
                <h1 className="display-6 text-white mb-0">
                  A Company Involved In Service And Maintenance
                </h1>
              </div>
              <p className="text-white mb-0">
                At APEX, we offer expert service and maintenance solutions to
                ensure the longevity and efficiency of your property. Schedule
                an appointment today, and let us take care of your needs.
              </p>
            </div>
            <div className="col-lg-7 col-md-6 wow fadeIn" data-wow-delay="0.5s">
              <form>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-dark border-0"
                        id="gname"
                        placeholder="Gurdian Name"
                      />
                      <label htmlFor="gname">Your Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control bg-dark border-0"
                        id="gmail"
                        placeholder="Gurdian Email"
                      />
                      <label htmlFor="gmail">Your Email</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-dark border-0"
                        id="cname"
                        placeholder="Child Name"
                      />
                      <label htmlFor="cname">Your Mobile</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-dark border-0"
                        id="cage"
                        placeholder="Child Age"
                      />
                      <label htmlFor="cage">Service Type</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control bg-dark border-0"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 100 }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Get Appointment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      Appointment End */}

      <Testimonial />

      <Youtube />

      

    
    </>
  );
}
