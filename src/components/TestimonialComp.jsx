import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function TestimonialComp() {
  const options = {
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 600,
  };

  return (
    <>
      {/* Testimonial Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="border-start border-5 border-primary ps-4 mb-5">
                <h6 className="text-body text-uppercase mb-2">Testimonial</h6>
                <h1 className="display-6 mb-0">What Our Happy Clients Say!</h1>
              </div>
              <p className="mb-4">
                Our clients trust us for exceptional service and quality. Here's
                what they have to say about working with APEX.
              </p>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa fa-users fa-2x text-primary flex-shrink-0" />
                    <h1 className="ms-3 mb-0">123+</h1>
                  </div>
                  <h5 className="mb-0">Happy Clients</h5>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa fa-check fa-2x text-primary flex-shrink-0" />
                    <h1 className="ms-3 mb-0">123+</h1>
                  </div>
                  <h5 className="mb-0">Projects Done</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.5s">
              <OwlCarousel className="owl-theme" {...options}>
                <div className="testimonial-item p-4 text-center shadow-sm rounded bg-white">
                  <img
                    className="img-fluid mb-3"
                    src="img/testimonial-1.jpg"
                    alt="Client"
                    style={{
                      height: "120px",
                      width: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      margin: "0 auto",
                      border: "4px solid #f1f1f1",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <p className="fs-6 text-muted px-2">
                    “Dolores sed duo clita tempor justo dolor et stet lorem kasd
                    labore dolore lorem ipsum. At lorem lorem magna ut et,
                    nonumy et labore et tempor diam tempor erat.”
                  </p>
                  <div
                    className="bg-primary mx-auto mb-3"
                    style={{
                      width: "60px",
                      height: "5px",
                      borderRadius: "2px",
                    }}
                  />
                  <h5 className="mb-0">Mohammad Khaled</h5>
                  <small className="text-secondary">Doctor</small>
                </div>

                <div className="testimonial-item p-4 text-center shadow-sm rounded bg-white">
                  <img
                    className="img-fluid mb-3"
                    src="img/testimonial-2.jpg"
                    alt="Client"
                    style={{
                      height: "120px",
                      width: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      margin: "0 auto",
                      border: "4px solid #f1f1f1",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <p className="fs-6 text-muted px-2">
                    “Dolores sed duo clita tempor justo dolor et stet lorem kasd
                    labore dolore lorem ipsum. At lorem lorem magna ut et,
                    nonumy et labore et tempor diam tempor erat.”
                  </p>
                  <div
                    className="bg-primary mx-auto mb-3"
                    style={{
                      width: "60px",
                      height: "5px",
                      borderRadius: "2px",
                    }}
                  />
                  <h5 className="mb-0">Sarah Sameer</h5>
                  <small className="text-secondary">Social Worker</small>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
}
