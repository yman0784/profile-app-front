"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${pathname}`);
        setUser(response.data.user);
        setLoading(false);
        setImageUrl(response.data.image);
        console.log("ures", response);
        console.log("user", user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <div>{imageUrl && <img src={imageUrl} alt="User Image" />}</div>
    </div>
  );
};

export default UserDetails;
