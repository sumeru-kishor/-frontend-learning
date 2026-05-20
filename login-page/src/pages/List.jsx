import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function List() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setUsers(userData);
        setStatus({ loading: false, error: null });
      } catch (err) {
        console.error("Firestore Error:", err);
        setStatus({ 
          loading: false, 
          error: "Failed to fetch users from database." 
        });
      }
    };

    fetchUsers();
  }, []);

  if (status.loading) return <p>Loading data from Firestore...</p>;
  if (status.error) return <p style={{ color: "red" }}>{status.error}</p>;

  return (
    <div>
      <h2>User List (Firestore)</h2>
      {users.length === 0 ? (
        <p>No users found. Add some in the Firebase Console!</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              {user.first_name} {user.last_name} -
              <Link to={`/details/${user.id}`} style={{ marginLeft: "10px" }}>
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;