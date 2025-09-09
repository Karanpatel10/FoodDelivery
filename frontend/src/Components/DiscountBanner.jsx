import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";

const DiscountBanner = () => {
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("discountSlideShown");
    if (hasSeen == "true") return;
      // Show after 1 second
      const timerIn = setTimeout(() => setShow(true), 3000);

      // Start slide-out after 6 seconds (1s delay + 5s visible)
      const timerOut = setTimeout(() =>{ 
        setAnimateOut(true);
        localStorage.setItem("discountSlideShown", "true");
      },9000);

      // Mark as seen
      return () => {
        clearTimeout(timerIn);
        clearTimeout(timerOut);
      };
    
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-120%); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
          zIndex: 1050,
          animation: animateOut
            ? "slideOut 0.5s forwards"
            : "slideIn 0.5s forwards"
        }}
      >
        <Card className="shadow-lg" style={{ width: "18rem"}}>
          <Card.Body className="text-center">
            <Card.Title>🎉 Special Offer</Card.Title>
            <Card.Text>
              Get <b>$5 OFF</b> your first order! <br />
              Use code: <strong>WELCOME5</strong>
            </Card.Text>
            <Link to='/cart'><Button
              variant="success"
              size="sm"
              onClick={() => setAnimateOut(true)}
            >
              Shop Now
            </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default DiscountBanner;
