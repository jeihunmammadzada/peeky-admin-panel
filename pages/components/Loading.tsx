import React from 'react'
import { Container, Row} from 'react-bootstrap'

const GlobalLoading = () => {
  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>
      <Row
        className="align-items-center justify-content-center"
        style={{
          height: "100vh",
          width: "100%",
          background: "#6D6AFF", // Ensures it spans the full width
          margin: 0,
        }}
      >
        <div style={{color: "#F6941C"}} className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
      </Row>
    </Container>
  )
}

export default GlobalLoading