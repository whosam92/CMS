export default function AboutUs() {
    return (
    <>
    {/* About Start */}
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div
                className="position-relative overflow-hidden ps-5 pt-5 h-100"
                style={{ minHeight: 400 }}
                >
                <img
                    className="position-absolute w-100 h-100"
                    src="img/about.jpg"
                    alt=""
                    style={{ objectFit: "cover" }}
                />
                <div
                    className="position-absolute top-0 start-0 bg-white pe-3 pb-3"
                    style={{ width: 200, height: 200 }}
                >
                    <div className="d-flex flex-column justify-content-center text-center bg-primary h-100 p-3">
                    <h1 className="text-white">25</h1>
                    <h2 className="text-white">Years</h2>
                    <h5 className="text-white mb-0">Experience</h5>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                <div className="h-100">
                <div className="border-start border-5 border-primary ps-4 mb-5">
                    <h6 className="text-body text-uppercase mb-2">About Us</h6>
                    <h1 className="display-6 mb-0">
                    Unique Solutions For Residentials &amp; Industries!
                    </h1>
                </div>
                <p style={{ textAlign: "justify" }}>
                    At APEX, we specialize in providing high-quality construction and renovation services for commercial, residential, and industrial sectors. With a commitment to excellence, we deliver tailored solutions that meet the unique needs of each client. Whether you're looking to build from the ground up, renovate an existing space, or transform your property into something new, our team is here to turn your vision into reality.
                </p>
                <p className="mb-4" style={{ textAlign: "justify" }}>
                    Our expertise spans across a wide range of construction projects, ensuring that every project is completed on time, and to the highest standards. From residential homes to large-scale industrial facilities, we pride ourselves on our integrity, craftsmanship, and dedication to customer satisfaction.
                </p>
                <div className="border-top mt-4 pt-4">
                    <div className="row g-4">
                    <div
                        className="col-sm-4 d-flex wow fadeIn"
                        data-wow-delay="0.1s"
                    >
                        <i className="fa fa-check fa-2x text-primary flex-shrink-0 me-3" />
                        <h6 className="mb-0">Ontime at services</h6>
                    </div>
                    <div
                        className="col-sm-4 d-flex wow fadeIn"
                        data-wow-delay="0.3s"
                    >
                        <i className="fa fa-check fa-2x text-primary flex-shrink-0 me-3" />
                        <h6 className="mb-0">24/7 hours services</h6>
                    </div>
                    <div
                        className="col-sm-4 d-flex wow fadeIn"
                        data-wow-delay="0.5s"
                    >
                        <i className="fa fa-check fa-2x text-primary flex-shrink-0 me-3" />
                        <h6 className="mb-0">Verified professionals</h6>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    {/* About End */}
    </>
    )
}