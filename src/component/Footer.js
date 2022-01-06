import React from 'react'
import visa from '../images/visa.png'
import maestro from '../images/maestro.png'
import rupay from '../images/Rupay.png'
import masterCard from '../images/masterCard.png'
import upi from '../images/upi.png'

function Footer() {
    const date = new Date().getFullYear()
    return (
        <>
            <div className="FooterDiv">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <h5>Social Links</h5>
                            <h3><i class="fab fa-facebook"></i> facebook</h3>
                            <h4><i class="fab fa-instagram"> instagram</i></h4>
                        </div>
                        <div class="col-sm">
                            <h5>Delivery Details</h5>
                            <p className="FooterPara">Timings :10 am - 8.30 pm</p>
                            <p className="FooterPara">Maharashtra,Pune Some random Address</p>
                        </div>
                        <div class="col-sm">
                            <h5>Contact Us</h5>
                            <p className="FooterPara">contact@gmail.com</p>
                        </div>
                        <div class="col-sm">
                            <h5>Quick links</h5>
                            <p className="FooterPara">About Us</p>
                            <p className="FooterPara"> Terms of Use</p>
                            <p className="FooterPara">Privacy Policy </p>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <img className="visa" src={visa}></img>
                    <img className="maestro"  src={maestro}></img>
                    <img  className="masterCard" src={masterCard}></img>
                    <img   className="rupay" src={rupay}></img>
                    <img className="upi" src={upi}></img>
                </div>
                <hr style={{ width: "80%" }} />
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                        <p className="FooterBranding">Some SelfBranding</p>
                        </div>
                        <div class="col-sm">
                        <div className="container  copyRight">
                         &copy; {date}-{date + 1}
                        </div>
                        </div>
                    </div>
                </div>
              

            </div>
        </>
    )
}

export default Footer
