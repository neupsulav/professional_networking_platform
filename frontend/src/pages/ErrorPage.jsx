import React from "react";

const NotFound = () => {
  return (
    <div className="error_page_container">
      <div className="error_page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Sorry, but the page you are looking for does not exist, has been
          removed, or is temporarily unavailable.
        </p>
        <a href="/" className="home-link">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
