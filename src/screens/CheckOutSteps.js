import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Link
  } from "react-router-dom";

function CheckOutSteps({ step1, step2, step3, step4 }) {
    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <ul className="nav">
                    <li className="nav-item">
                    {
                        step1?<Link className="nav-link" to="/login">SignUp</Link>:<Link className="nav-link" to="#" disable={true}>Sign Up</Link>
                    }
                    </li>
                    <li className="nav-item">
                    {
                        step2?<Link className="nav-link" to="/shipping">Shipping Address</Link>:<Link className="nav-link" to="#" disable={true}>Shipping Address</Link>
                    }
                    </li>
                    <li className="nav-item">
                    {
                        step3?<Link className="nav-link" to="/payment">Payment</Link>:<Link className="nav-link" to="#" disable={true}>Payment</Link>
                    }
                    </li>
                    <li className="nav-item">
                    {
                        step4?<Link className="nav-link" to="/placeorder">Place Order</Link>:<Link className="nav-link" to="#" disable={true}>Place Order</Link>
                    }
                    </li>
          </ul>


                {/* <Nav className="justify-content-center">
                <Nav.Item>
                    {step1 ? (
                            <LinkContainer to="/login">
                                <Nav.Link>SignIn</Nav.Link>
                            </LinkContainer>
                        ):(<Nav.Link disabled>Sign In</Nav.Link>) }
                </Nav.Item>
                <Nav.Item>
                    {step2 ? (
                            <LinkContainer to="/shipping">
                                <Nav.Link>Shipping</Nav.Link>
                            </LinkContainer>
                        ):(<Nav.Link disabled>Shipping</Nav.Link>) }
                </Nav.Item>
                <Nav.Item>
                    {step3 ? (
                            <LinkContainer to="/payment">
                                <Nav.Link>Payment</Nav.Link>
                            </LinkContainer>
                        ):(<Nav.Link disabled>Payment</Nav.Link>) }
                </Nav.Item>
                <Nav.Item>
                    {step3 ? (
                            <LinkContainer to="/placeorder">
                                <Nav.Link>Place Order</Nav.Link>
                            </LinkContainer>
                        ):(<Nav.Link disabled>Place Order</Nav.Link>) }
                </Nav.Item>
           </Nav>             */}
            </div>

        </>
    )
}

export default CheckOutSteps
