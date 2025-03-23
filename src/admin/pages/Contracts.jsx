import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // To toggle between Add/Edit
  const [contractData, setContractData] = useState({
    contract_name: "",
    approved_by: "",
    total_cost: "",
    expiration_date: "",
    signing_date: "",
    status: "pending", // Default status is "pending"
  });
  const [selectedContract, setSelectedContract] = useState(null); // To store the contract being edited

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contracts"));
        const contractsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContracts(contractsList);
      } catch (error) {
        console.error("Error fetching contracts data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractData({
      ...contractData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !contractData.contract_name ||
      !contractData.approved_by ||
      !contractData.total_cost
    ) {
      console.error("Missing required fields");
      return;
    }

    try {
      if (editMode) {
        // Update the contract
        await updateDoc(
          doc(db, "contracts", selectedContract.id),
          contractData
        );
        setContracts(
          contracts.map((contract) =>
            contract.id === selectedContract.id
              ? { ...contractData, id: selectedContract.id }
              : contract
          )
        );
      } else {
        // Create a new contract
        const docRef = await addDoc(collection(db, "contracts"), contractData);
        setContracts([...contracts, { id: docRef.id, ...contractData }]);
      }

      setShowModal(false);
      setEditMode(false); // Reset edit mode
      setContractData({
        contract_name: "",
        approved_by: "",
        total_cost: "",
        expiration_date: "",
        signing_date: "",
        status: "pending", // Reset to default status
      });
    } catch (error) {
      console.error("Error saving contract data", error);
    }
  };

  const handleDelete = async (contractId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contract?"
    );
    if (!isConfirmed) return; // If user cancels, do nothing

    try {
      await deleteDoc(doc(db, "contracts", contractId));
      setContracts(contracts.filter((contract) => contract.id !== contractId));
    } catch (error) {
      console.error("Error deleting contract", error);
    }
  };

  const handleEdit = (contract) => {
    setContractData(contract);
    setSelectedContract(contract);
    setEditMode(true); // Switch to edit mode
    setShowModal(true);
  };

  const handleAddNew = () => {
    setContractData({
      contract_name: "",
      approved_by: "",
      total_cost: "",
      expiration_date: "",
      signing_date: "",
      status: "pending", // Reset to default status
    });
    setEditMode(false); // Switch to add mode
    setShowModal(true);
  };

  const handleView = (contract) => {
    navigate("/contract-details", { state: { contract } }); // Pass contract to the details page
  };

  return (
    <div className="container py-4">
       <div className="d-flex justify-content-between align-items-center mx-3 mb-4 pb-4">
       <h2 className="text-center mb-0">Contract List</h2>
        <button className="btn btn-warning" onClick={handleAddNew}>
          Add New Contract
        </button>
       
      </div>


      {loading ? (
        <div className="text-center">Loading...</div>
      ) : contracts.length === 0 ? (
        <div className="text-center">No contracts found.</div>
      ) : (
          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle table-bordered">
                <thead className="table-dark color-warning text-center">
                  <tr>
                    <th scope="col">Contract Name</th>
                    <th scope="col">Approved By</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total Cost</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Signing Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td>{contract.contract_name}</td>
                      <td>
                        {contract.approved_by ||
                          (contract.status === "approved" ? "Approved" : "-")}
                      </td>
                      <td>
                        <span
                          className={`badge bg-${getStatusBadge(
                            contract.status
                          )} text-uppercase p-2 `}
                        >
                          {contract.status}
                        </span>
                      </td>
                      <td>${contract.total_cost}</td>
                      <td>{contract.expiration_date}</td>
                      <td>{contract.signing_date}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-outline-info btn-sm"
                            onClick={() => handleView(contract)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEdit(contract)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(contract.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="addContractModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Edit Contract" : "Add New Contract"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="contract_name" className="form-label">
                      Contract Name
                    </label>
                    <input
                      type="text"
                      id="contract_name"
                      name="contract_name"
                      value={contractData.contract_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="approved_by" className="form-label">
                      Approved By
                    </label>
                    <input
                      type="text"
                      id="approved_by"
                      name="approved_by"
                      value={contractData.approved_by}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="total_cost" className="form-label">
                      Total Cost
                    </label>
                    <input
                      type="number"
                      id="total_cost"
                      name="total_cost"
                      value={contractData.total_cost}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expiration_date" className="form-label">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      id="expiration_date"
                      name="expiration_date"
                      value={contractData.expiration_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signing_date" className="form-label">
                      Signing Date
                    </label>
                    <input
                      type="date"
                      id="signing_date"
                      name="signing_date"
                      value={contractData.signing_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={contractData.status}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="approved">Approved</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Update Contract" : "Add Contract"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusBadge = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "expired":
      return "dark";
    case "rejected":
      return "danger";
    default:
      return "primary";
  }
};

export default Contracts;
