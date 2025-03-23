import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // To pass state via routing

const ContractDetails = () => {
  const location = useLocation();
  const { contract } = location.state || {}; // Get contract from location state

  if (!contract) {
    return <div>No contract found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contract Details</h2>
      <div className="card shadow-lg rounded-lg border-0">
        <div className="card-body">
          <h5 className="card-title text-uppercase fw-bold text-primary">
            {contract.contract_name}
          </h5>
          <p>
            <strong>Approved By:</strong> {contract.approved_by}
          </p>
          <p>
            <strong>Total Cost:</strong> ${contract.total_cost}
          </p>
          <p>
            <strong>Expiration Date:</strong> {contract.expiration_date}
          </p>
          <p>
            <strong>Signing Date:</strong> {contract.signing_date}
          </p>
          <p>
            <strong>Status:</strong> {contract.status}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
