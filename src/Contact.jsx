import "../public/css/style.css";

import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import AboutTeam from "./components/AboutTeam";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";

export default function Contact() {
  return (
    <>
      <Header title="Contact Us" />

        {/* Contact Start */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-6">
                    <img className="img-fluid" src="img/team-1.jpg" alt="" />
                  </div>
                  <div className="col-sm-6">
                    <h3 className="mb-0">Johnathan Harris</h3>
                    <p>Head of Sales</p>
                    <h6>Contact Details</h6>
                    <p>With over 15 years of experience in the construction and renovation industry, Johnathan leads our sales team with a focus on customer satisfaction and project excellence.</p>
                    <p className="mb-0">Call: +012 345 6789</p>
                    <p className="mb-0">Email: j.harris@renovatepros.com</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="row g-4 align-items-center">
                  <div className="col-sm-6">
                    <img className="img-fluid" src="img/team-2.jpg" alt="" />
                  </div>
                  <div className="col-sm-6">
                    <h3 className="mb-0">Michael Turner</h3>
                    <p>Head of Marketing</p>
                    <h6>Contact Details</h6>
                    <p>Michael is a marketing expert with 10+ years of experience in construction and renovation, leading impactful campaigns to drive brand growth.</p>
                    <p className="mb-0">Call: +012 345 6789</p>
                    <p className="mb-0">Email: m.turner@renovatepros.com</p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ minHeight: 450 }}
              >
                <div className="position-relative h-100">
                  <iframe
                    className="position-relative w-100 h-100"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68200.47735200678!2d35.810771238605795!3d32.01044834106399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca376353d78e7%3A0xd43933b341374f91!2sOrange%20digital%20center%20-%20salt!5e0!3m2!1sen!2sjo!4v1742655185588!5m2!1sen!2sjo"
                    frameBorder={0}
                    style={{ minHeight: 450, border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex={0}
                  />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="border-start border-5 border-primary ps-4 mb-5">
                  <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
                  <h1 className="display-6 mb-0">
                    If You Have Any Query, Please Contact Us
                  </h1>
                </div>
                <p className="mb-4" style={{ textAlign: "justify" }}>
                Our team is here to help and will respond as quickly as possible to address any queries or support requests you may have. Whether you're looking for more information about our services, need clarification on a project, or simply want to discuss your next renovation, we’re always happy to assist.
                </p>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0 bg-light"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control border-0 bg-light"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control border-0 bg-light"
                          id="subject"
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control border-0 bg-light"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: 150 }}
                          defaultValue={""}
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary py-3 px-5" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      
      
      
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}