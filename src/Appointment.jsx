import "../public/css/style.css";

import Header from "./components/Header";


export default function Appointment() {
  return (
    <>
     
      <Header title="Appointment" />

      {/* Appointment Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="border-start border-5 border-primary ps-4 mb-5">
                <h6 className="text-body text-uppercase mb-2">Appointment</h6>
                <h1 className="display-6 mb-0">
                  A Company Involved In Service And Maintenance
                </h1>
              </div>
              <p className="mb-0">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo magna dolore erat amet
              </p>
            </div>
            <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <form>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
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
                        className="form-control bg-light border-0"
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
                        className="form-control bg-light border-0"
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
                        className="form-control bg-light border-0"
                        id="cage"
                        placeholder="Child Age"
                      />
                      <label htmlFor="cage">Service Type</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control bg-light border-0"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 100 }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Get Appointment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment End */}
      
    
      
   
    </>
  );
}
