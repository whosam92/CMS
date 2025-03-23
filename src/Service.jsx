import "../public/css/style.css";
import { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

export default function Service() {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [contractData, setContractData] = useState({
    contract_name: "",
    signing_date: "",
    expiration_date: "",
    total_cost: "",
    agree: false,
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "services"));
      const serviceList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(serviceList);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const openForm = (service) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setContractData({
      ...contractData,
      signing_date: "",
      expiration_date: "",
      contract_name: service.name,
      total_cost: "",
      status: "pending",
    });
    setSelectedService(service);
    setShowForm(true);
  };

  const calculateTotalCost = () => {
    if (
      !contractData.signing_date ||
      !contractData.expiration_date ||
      !selectedService
    )
      return;
    const startDate = new Date(contractData.signing_date);
    const endDate = new Date(contractData.expiration_date);
    const timeDiff = endDate - startDate;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    const totalCost = days * selectedService.cost_per_day;
    setContractData((prevState) => ({
      ...prevState,
      total_cost: totalCost.toFixed(2),
    }));
  };

  useEffect(() => {
    calculateTotalCost();
  }, [
    contractData.signing_date,
    contractData.expiration_date,
    selectedService,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContractData({
      ...contractData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!contractData.signing_date)
      newErrors.signing_date = "Signing Date is required";
    if (!contractData.expiration_date)
      newErrors.expiration_date = "Expiration Date is required";
    if (!contractData.total_cost)
      newErrors.total_cost = "Total Cost is required";
    if (!contractData.agree)
      newErrors.agree = "You must agree to the terms and conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addDoc(collection(db, "contracts"), {
        ...contractData,
        user_id: user.uid,
      });
      Swal.fire({
        title: 'Contract submitted successfully!',
        text: 'Your request is pending approval from our team.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting contract: ", error);
    }
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-end mb-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="border-start border-5 border-warning ps-4">
                <h6 className="text-body text-uppercase mb-2">Our Services</h6>
                <h1 className="display-6 mb-0">
                  Construction And Renovation Solutions
                </h1>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {services.map((service, index) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp "
                data-wow-delay={`${0.1 + index * 0.2}s`}
                key={index}
              >
                <div className="service-item bg-light overflow-hidden h-100">
                  <img
                      className="img-fluid w-100"
                      src={service.imageUrl}
                      alt=""
                      style={{
                        minHeight: "300px",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  <div className="service-text position-relative text-center p-3 d-flex flex-column justify-content-around" style={{ height: "150px" }}>
                    <h5 className="mb-3">{service.name}</h5>
                    <button
                      className="btn btn-warning"
                      onClick={() => openForm(service)}
                    >
                      Create Contract
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Contract Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedService && (
              <>
                <h4>
                  <strong>Contract Name:</strong> {selectedService.name}
                </h4>
                <p>{selectedService.description}</p>
                {selectedService.videoUrl && (
                  <iframe
                    width="100%"
                    height="250"
                    src={selectedService.videoUrl.replace(
                      "youtu.be",
                      "www.youtube.com/embed"
                    )}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}

                <label>Signing Date</label>
                <input
                  type="date"
                  name="signing_date"
                  value={contractData.signing_date}
                  className={`form-control ${
                    errors.signing_date ? "is-invalid" : ""
                  }`}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.signing_date}</div>

                <label>Expiration Date</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={contractData.expiration_date}
                  className={`form-control ${
                    errors.expiration_date ? "is-invalid" : ""
                  }`}
                  min={
                    contractData.signing_date ||
                    new Date().toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.expiration_date}</div>

                <label>Cost Per Day</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedService?.cost_per_day || ""}
                  readOnly
                />

                <label>Total Cost</label>
                <input
                  type="text"
                  name="total_cost"
                  className={`form-control ${
                    errors.total_cost ? "is-invalid" : ""
                  }`}
                  value={contractData.total_cost}
                  readOnly
                />
                <div className="invalid-feedback">{errors.total_cost}</div>

                <label className="mt-3 d-block">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={contractData.agree}
                    onChange={handleChange}
                    className="me-2"
                    required
                  />
                  Kindly review your contract:{" "}
                  <a
                    href="/files/terms.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Full Contract Terms and Conditions
                  </a>
                </label>
                <div className="text-danger">{errors.agree}</div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button variant="warning" type="submit">
              Submit Contract
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}