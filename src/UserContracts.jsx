import { useState, useEffect } from "react";
import { db, auth } from "./admin/config/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function UserContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const contractsRef = collection(db, "contracts");
          const q = query(
            contractsRef,
            where("user_id", "==", user.uid),
            where("status", "==", "approved")
          );
          const querySnapshot = await getDocs(q);
          const contractsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const signingDate = new Date(data.signing_date);
            const expirationDate = new Date(data.expiration_date);
            const warrantyEndDate = new Date(
              expirationDate.getTime() + (expirationDate - signingDate) * 10
            );
            return {
              ...data,
              id: doc.id,
              warrantyStartDate: expirationDate.toISOString().split("T")[0],
              warrantyEndDate: warrantyEndDate.toISOString().split("T")[0],
            };
          });
          setContracts(
            contractsData.filter((contract) => {
              const expirationDate = new Date(contract.expiration_date);
              return expirationDate >= new Date();
            })
          );
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

const handlePrint = () => {
    const doc = new jsPDF();
    contracts.forEach((contract, index) => {
        if (index > 0) {
            doc.addPage(); // Add a new page for the next contract
        }
        doc.text(`Contract ${index + 1}`, 10, 10);
        doc.text(`Name: ${contract.contract_name}`, 10, 20);
        doc.text(`Signing Date: ${contract.signing_date}`, 10, 30);
        doc.text(`Expiration Date: ${contract.expiration_date}`, 10, 40);
        doc.text(`Total Cost: ${contract.total_cost}`, 10, 50);
        doc.text(`Approved By: ${contract.approved_by}`, 10, 60);
        doc.text(`Warranty Start: ${contract.warrantyStartDate}`, 10, 70);
        doc.text(`Warranty End: ${contract.warrantyEndDate}`, 10, 80);
    });
    doc.save("contracts.pdf");
};

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="py-5 text-center">
      <Button
        variant="secondary"
        className="mb-4 w-25"
        onClick={() => navigate("/profile")}
      >
        Back to Profile
      </Button>
      <Button variant="primary" className="mb-4 ms-2 w-25" onClick={handlePrint}>
        Print Contracts
      </Button>
      <Row>
        {contracts.map((contract) => {
          const expirationDate = new Date(contract.expiration_date);
          const daysToExpire = Math.ceil(
            (expirationDate - new Date()) / (1000 * 60 * 60 * 24)
          );
          const cardColor =
            daysToExpire <= 3
              ? "danger"
              : daysToExpire <= 10
              ? "warning"
              : "light";

            const textColor =
            daysToExpire <= 3
              ? "white"
              : daysToExpire <= 10
              ? "dark"
              : "dark";
        
          return (
            <Col md={4} key={contract.id} className="mb-4">
              <Card
                className={`p-3 shadow-sm bg-${cardColor} text-${textColor}`}
                style={{ height: "100%" }}
              >
                <Card.Body>
                  <Card.Title className="mb-5">{contract.contract_name}</Card.Title>
                  <Card.Text>
                    <strong>Signing Date:</strong> {contract.signing_date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Expiration Date:</strong> {contract.expiration_date}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total Cost:</strong> ${contract.total_cost}
                  </Card.Text>
                  <Card.Text>
                    <strong>Approved By:</strong> {contract.approved_by}
                  </Card.Text>
                  <Card.Text>
                    <strong>Warranty Start:</strong>{" "}
                    {contract.warrantyStartDate}
                  </Card.Text>
                  <Card.Text>
                    <strong>Warranty End:</strong> {contract.warrantyEndDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
