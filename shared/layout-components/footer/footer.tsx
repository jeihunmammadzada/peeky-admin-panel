import React from "react";

const Footer = () => {
  return (
    <div className="footer mt-auto py-3 bg-white text-center">
      <div className="container">
        <div className="text-muted">
          <div className="col-md-12">
            <span>
              Copyright ©  {new Date().getFullYear() } {" "}
              <a href="#!" className="text-dark fw-semibold">
                Peeky
              </a>{" "}
              Powered by{" "}
              <a href="https://peeky.az">
                <span className="fw-semibold text-primary text-decoration-underline">
                  Peeky
                </span>
              </a>{" "}
              All rights reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
