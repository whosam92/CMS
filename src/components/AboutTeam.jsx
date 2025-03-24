export default function AboutTeam() {
  return (
      <>
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
                At APEX, our experienced team ensures every project is completed to the highest standards with efficiency and precision.
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item position-relative">
                <img className="img-fluid" src={`${import.meta.env.BASE_URL}img/team-1.jpg`} alt="John Doe" />
                <div className="team-text bg-white p-4">
                  <h5>John Doe</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="team-item position-relative">
                <img className="img-fluid" src={`${import.meta.env.BASE_URL}img/team-2.jpg`} alt="Mike Smith" />
                <div className="team-text bg-white p-4">
                  <h5>Mike Smith</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="team-item position-relative">
                <img className="img-fluid" src={`${import.meta.env.BASE_URL}img/team-3.jpg`} alt="Alan Delaroche" />
                <div className="team-text bg-white p-4">
                  <h5>Alan Delaroche</h5>
                  <span>Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
}
