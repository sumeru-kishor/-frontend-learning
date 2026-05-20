import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

function Details() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser({ id: docSnap.id, ...docSnap.data() });
          setStatus({ loading: false, error: null });
        } else {
          throw new Error("User not found in database");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setStatus({ loading: false, error: err.message });
      }
    };

    fetchUserDetails();
  }, [id]);

  if (status.loading) return <p>Loading profile...</p>;
  if (status.error) return <p style={{ color: "red" }}>Error: {status.error}</p>;

 return (
  <div className="details-container">
    {user && (
      <div className="profile-card">
        {/* Render the image from the Firestore 'avatar' field */}
        <img 
          src={user.avatar || "https://via.placeholder.com/150"} 
          alt={`${user.first_name}'s avatar`} 
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #2563eb"
          }}
        />
        
        <h2>{user.first_name} {user.last_name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )}
  </div>
);
}

export default Details;