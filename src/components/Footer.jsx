export default function Footer() {
    return (
      <>
        {/* Footer Start */}
        <div
            className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn"
            data-wow-delay="0.1s"
        >
            <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                <h1 className="text-white mb-4">
                    <i className="fa fa-building text-primary me-3" />
                    APEX
                </h1>
                <p>
                Building excellence with expertise in construction and renovation.
                </p>
                <div className="d-flex pt-2">
                    <a className="btn btn-square btn-outline-primary me-1" href="">
                    <i className="fab fa-twitter" />
                    </a>
                    <a className="btn btn-square btn-outline-primary me-1" href="">
                    <i className="fab fa-facebook-f" />
                    </a>
                    <a className="btn btn-square btn-outline-primary me-1" href="">
                    <i className="fab fa-youtube" />
                    </a>
                    <a className="btn btn-square btn-outline-primary me-0" href="">
                    <i className="fab fa-linkedin-in" />
                    </a>
                </div>
                </div>
                <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Address</h4>
                <p>
                    <i className="fa fa-map-marker-alt me-3" />
                    2PRV+RV8, As-Salt
                </p>
                <p>
                    <i className="fa fa-phone-alt me-3" />
                    +962777777777
                </p>
                <p>
                    <i className="fa fa-envelope me-3" />
                    apex@gmail.com
                </p>
                </div>
                <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Quick Links</h4>
                <a className="btn btn-link" href="about">
                    About Us
                </a>
                <a className="btn btn-link" href="contact">
                    Contact Us
                </a>
                <a className="btn btn-link" href="service">
                    Our Services
                </a>
                <a className="btn btn-link" href="">
                    Terms &amp; Condition
                </a>
                <a className="btn btn-link" href="">
                    Support
                </a>
                </div>
                <div className="col-lg-3 col-md-6">
                <h4 className="text-light mb-4">Newsletter</h4>
                <p>Stay updated with the latest news, tips, and offers from APEX.</p>
                <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                    <input
                    className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                    />
                    <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                    >
                    SignUp
                    </button>
                </div>
                </div>
            </div>
            </div>
            <div className="container-fluid copyright">
            <div className="container">
            <div className="text-center mb-3 mb-md-0">
                <a href="#">APEX  © 2025</a>, All Right Reserved.
            </div>
            </div>
            </div>
        </div>
        {/* Footer End */}
      </>
    );
}