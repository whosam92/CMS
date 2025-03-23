import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { db } from "../config/Firebase"; // Your Firebase configuration
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement, // Add this import
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement, // Register PointElement
  LineElement
);

const AdminDashboard = ({ currentUser }) => {
  const [contracts, setContracts] = useState([]);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isAdmin = currentUser?.isAdmin; // Assuming user object has isAdmin property

  useEffect(() => {
    const fetchContracts = async () => {
      const contractsRef = collection(db, "contracts");
      const q = isAdmin
        ? contractsRef
        : query(contractsRef, where("status", "!=", "expired"));

      const snapshot = await getDocs(q);
      setContracts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchContracts();
  }, [isAdmin]);

  const handleApprove = async (contractId) => {
    await updateDoc(doc(db, "contracts", contractId), {
      status: "approved",
      approvedBy: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
      },
    });
    // Update local state
    setContracts(
      contracts.map((c) =>
        c.id === contractId
          ? { ...c, status: "approved", approvedBy: currentUser }
          : c
      )
    );
  };

  const [contractCount, setContractCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const contractsRef = collection(db, "contracts");
        const snapshot = await getDocs(contractsRef);
        setContractCount(snapshot.size);

        const q = query(
          contractsRef,
          where("status", "!=", "rejected") && where("status", "!=", "pending")
        );
        const revenueSnapshot = await getDocs(q);
        const revenue = revenueSnapshot.docs.reduce((sum, doc) => {
          const data = doc.data();
          return sum + (parseFloat(data.total_cost) || 0);
        }, 0);
        setRevenue(revenue);

        const servicesRef = collection(db, "services");
        const servicesSnapshot = await getDocs(servicesRef);
        setServiceCount(servicesSnapshot.size);

        const companiesRef = collection(db, "companies");
        const companiesSnapshot = await getDocs(companiesRef);
        setCompanyCount(companiesSnapshot.size);

        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);

        setUserCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching number of contracts:", error);
      }
    };

    fetchCounts();
  }, []);

  const handleDelete = async (contractId) => {
    await deleteDoc(doc(db, "contracts", contractId));
    setContracts(contracts.filter((c) => c.id !== contractId));
  };

  const barChartData = {
    labels: ["Contracts", "Services", "Users", "Companies"],
    datasets: [
      {
        label: "Counts",
        data: [contractCount, serviceCount, userCount, companyCount],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Approved", "Pending", "Rejected", "Expired"],
    datasets: [
      {
        data: [
          contracts.filter((c) => c.status === "approved").length,
          contracts.filter((c) => c.status === "pending").length,
          contracts.filter((c) => c.status === "rejected").length,
          contracts.filter((c) => c.status === "expired").length,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545", "#6c757d"],
        hoverBackgroundColor: ["#218838", "#e0a800", "#c82333", "#5a6268"],
      },
    ],
  };

  const processRevenueData = (contracts) => {
    const filteredContracts = contracts.filter(
      (contract) =>
        contract.status === "approved" || contract.status === "expired"
    );

    const revenueByDate = filteredContracts.reduce((acc, contract) => {
      const date = contract.signing_date;
      const cost = parseFloat(contract.total_cost) || 0;

      if (acc[date]) {
        acc[date] += cost;
      } else {
        acc[date] = cost;
      }

      return acc;
    }, {});

    const labels = Object.keys(revenueByDate).sort(); // Sort dates
    const data = labels.map((date) => revenueByDate[date]);

    return { labels, data };
  };

  const { labels: revenueLabels, data: revenueData } =
    processRevenueData(contracts);

  const lineChartData = {
    labels: revenueLabels,
    datasets: [
      {
        label: "Revenue",
        data: revenueData,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

    // Search contracts by name
    const filteredContracts = contracts.filter((contract) =>
      contract.contract_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Ensure proper cleanup of chart instances
  useEffect(() => {
    return () => {
      const charts = Object.values(ChartJS.instances || {});
      charts.forEach((chart) => {
        if (chart) {
          chart.destroy();
        }
      });
    };
  }, []);

  return (
    <div>
      <div className="content">
        <div className="animated fadeIn">
           {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-xl-3 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-1">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          $ <span className="count">{revenue}</span>
                        </div>
                        <div className="stat-heading">in revenue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-1">
                      <i className="pe-7s-file"></i>
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">{contractCount}</span>
                        </div>
                        <div className="stat-heading">contracts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-2">
                      <i className="pe-7s-tools"></i>
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">{serviceCount}</span>
                        </div>
                        <div className="stat-heading">services</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="stat-widget-five">
                    <div className="stat-icon dib flat-color-4">
                      <i className="pe-7s-users"></i>
                    </div>
                    <div className="stat-content">
                      <div className="text-left dib">
                        <div className="stat-text">
                          <span className="count">{userCount}</span>
                        </div>
                        <div className="stat-heading">users</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

           {/* Search Bar */}
           <div className="row mb-4">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search by contract name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search state
              />
            </div>
          </div>

{/* Contract Table */}
          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="text-center">Contracts</h2>
                </div>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  <table className="table table-hover table-striped align-middle table-bordered text-center">
                    <thead
                      className="table-dark"
                      style={{ position: "sticky", top: "0", zIndex: "1" }}
                    >
                      <tr>
                        <th scope="col">Contract ID</th>
                        <th scope="col">Contract Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContracts.map((contract) => (
                        <tr key={contract.id}>
                          <td>{contract.id}</td>
                          <td>{contract.contract_name}</td>
                          <td>
                            <span
                              className={`badge bg-${getStatusBadge(
                                contract.status
                              )} p-2 text-uppercase`}
                            >
                              {contract.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                setSelectedContract(contract);
                                setShowContractModal(true);
                              }}
                            >
                              Contract Details
                            </button>
                            {isAdmin && (
                              <>
                                <button
                                  className="btn btn-warning btn-sm ms-2"
                                  onClick={() => handleApprove(contract.id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-danger btn-sm ms-2"
                                  onClick={() => handleDelete(contract.id)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body mb-4" style={{ height: "400px" }}>
                  <h5 className="text-center">Counts Overview</h5>
                  <Bar
                    data={barChartData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body mb-4" style={{ height: "400px" }}>
                  <h5 className="text-center">Contract Status Distribution</h5>
                  <Pie
                    data={pieChartData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
              <div className="col-lg-12 mb-4">
                <div className="card">
                  <div className="card-body mb-4" style={{ height: "400px" }}>
                    <h5 className="text-center">Revenue Trends</h5>
                    <Line
                      key={JSON.stringify(lineChartData)} // Force reinitialization when data changes
                      data={lineChartData}
                      options={lineChartOptions}
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Details Modal */}
      <Modal
        show={showContractModal}
        onHide={() => setShowContractModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Contract Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContract && (
            <>
              <p>Total Cost: ${selectedContract.total_cost}</p>
              <p>expiration Date: {selectedContract.expiration_date}</p>
              <p>signing Date: {selectedContract.signing_date}</p>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Company Details Modal */}
      <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContract?.company ? (
            <>
              <p>Name: {selectedContract.company.company_name}</p>
              <p>Location: {selectedContract.company.location}</p>
              <p>Contact: {selectedContract.company.contact_info}</p>
            </>
          ) : (
            <p>No company details available</p>
          )}
        </Modal.Body>
      </Modal>
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

export default AdminDashboard;
