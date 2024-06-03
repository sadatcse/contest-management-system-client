import React from 'react';


const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
    <aside>
    <img src="https://i.ibb.co/jLBtFLj/logo.png" alt="Company Logo" className="h-12 mb-4 md:mr-4" />
    <div>
                <p className="mb-2">17/2, Dhanmondi 3/A, Dhaka-1209</p>
                <p className="mb-2">E-mail: info@contest.com.bd</p>
                <p className="mb-2">Hotline: 09678-441122</p>
              </div>
    </aside> 
    <nav>
      <header className="footer-title">Services</header> 
      <a className="link link-hover">Contest</a>
      <a className="link link-hover">Custom</a>
      <a className="link link-hover">Dashboard</a>
      <a className="link link-hover">Bulk Contest</a>
    </nav> 
    <nav>
      <header className="footer-title">Company</header> 
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
      <a className="link link-hover">Our Goal</a>
    </nav> 
    <nav>
      <header className="footer-title">EARN</header> 
      <a className="link link-hover">Become User</a>
      <a className="link link-hover">Become Creator</a>
      <a className="link link-hover">Become admin</a>
    </nav>
  </footer>
  );
};

export default Footer;
