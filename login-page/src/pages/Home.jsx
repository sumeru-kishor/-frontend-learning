import React from "react";

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Firebase Auth App</h2>
     
      <hr />

      <h3>Project Details:</h3>
      <p>
        This website is now integrated with <strong>Google Firebase</strong>. 
        It uses <strong>Firebase Auth</strong> for secure login/signup and 
        <strong>Cloud Firestore</strong> to manage the user database. 
      </p>
      <p>
        Your credentials and database configuration are securely managed via 
        <strong> .env </strong> variables.
      </p>
    </div>
  );
}

export default Home;