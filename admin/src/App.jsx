import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Contentarea from "./component/sidebar/Contentarea";
import Sidebar from "./component/sidebar/Sidebar";
import List from "./pages/List";
import Order from "./pages/Order";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddOrder from "./pages/AddOrder";
import { ToastContainer } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const URL = "http://localhost:4000";
  return (
    <>
      <section>
        <Container fluid>
          <Row>
            <Col md={12} className="border-bottom border-1 border-secondary">
             <Navbar />
            </Col>
          </Row>
          <Row >
            <Col sm={2} className="border-end border-1 border-secondary" style={{minHeight:'100vh'}}>
             <Sidebar />
            </Col>
            <Col md={10} className="p-5">
             <Routes>
                 <Route path="/" element={<Contentarea URL={URL}/>} />
                 <Route path="/addorder" element={<AddOrder URL={URL}/>} />
                 <Route path="/order" element={<Order URL={URL}/>} />
                 <Route path="/list" element={<List URL={URL}/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </section>
     
    </>
  );
}

export default App;
