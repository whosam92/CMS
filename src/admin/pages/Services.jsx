import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { FaTrash, FaEdit } from "react-icons/fa"; // استيراد أيقونات الحذف والتعديل
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const AddService = ({ onServiceAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [costPerDay, setCostPerDay] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "services"), {
        name,
        description,
        cost_per_day: parseInt(costPerDay),
        imageUrl,
        videoUrl,
      });
      setMessage("Service added successfully!");
      onServiceAdded();
      setName("");
      setDescription("");
      setCostPerDay("");
      setImageUrl("");
      setVideoUrl("");
    } catch (error) {
      setMessage("Error adding service: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      
      <h2 className="text-center mb-3">Add New Service</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="form-group mb-2">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="costPerDay">Cost per Day</label>
          <input
            type="number"
            id="costPerDay"
            className="form-control"
            value={costPerDay}
            onChange={(e) => setCostPerDay(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="url"
            id="videoUrl"
            className="form-control"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
        {message && <div className="mt-2 text-center">{message}</div>}
      </form>
    </div>
  );
};

const EditService = ({ service, onSave, onCancel }) => {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [costPerDay, setCostPerDay] = useState(service.cost_per_day);
  const [imageUrl, setImageUrl] = useState(service.imageUrl);
  const [videoUrl, setVideoUrl] = useState(service.videoUrl);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const serviceRef = doc(db, "services", service.id);
      await updateDoc(serviceRef, {
        name,
        description,
        cost_per_day: parseInt(costPerDay),
        imageUrl,
        videoUrl,
      });
      onSave(); // Call to update the list
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="container py-3">
      <h2 className="text-center mb-3">Edit Service</h2>
      <form
        onSubmit={handleSave}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="form-group mb-2">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="costPerDay">Cost per Day</label>
          <input
            type="number"
            id="costPerDay"
            className="form-control"
            value={costPerDay}
            onChange={(e) => setCostPerDay(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="url"
            id="videoUrl"
            className="form-control"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-2 w-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // State for Add Modal
  const [showEditModal, setShowEditModal] = useState(false); // State for Edit Modal

  const fetchServices = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "services"));
      const servicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesList);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceAdded = () => {
    fetchServices();
    setShowAddModal(false); // Close modal after adding service
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowEditModal(true); // Open the edit modal
  };

  const handleSaveEdit = () => {
    fetchServices(); // Refresh the services after saving
    setShowEditModal(false); // Close the edit modal
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Close the edit modal without saving
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteDoc(doc(db, "services", id));
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container py-4">
         <div className="d-flex justify-content-between align-items-center mx-3 mb-4 pb-4">
         <h2 className="text-center ">Our Premium Services</h2>
         <Button variant="warning" onClick={() => setShowAddModal(true)}>
            Add New Service
          </Button>
      </div>
      <>
        

        {services.length === 0 ? (
          <p className="text-center mt-3">
            No services available at the moment.
          </p>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-xl-4 col-lg-6 mb-4">
                <div className="card shadow-sm border-light rounded h-100 overflow-hidden">
                  <img
                    src={service.imageUrl || "https://via.placeholder.com/300"}
                    className="card-img-top img-fluid h-50"
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    alt={service.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                  <div className="card-body justify-content-between d-flex flex-column">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <p className="card-text">
                      <strong>Cost per day: </strong>${service.cost_per_day}
                    </p>
                    <div className="justify-content-center d-flex">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => window.open(service.videoUrl)}
                        target="_blank"
                      >
                        Watch Video
                      </button>
                      <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => handleEditService(service)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-outline-danger me-2"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for adding a new service */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <AddService onServiceAdded={handleServiceAdded} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for editing a service */}
        <Modal show={showEditModal} onHide={handleCancelEdit}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {editingService && (
              <EditService
                service={editingService}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            )}
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Services;
