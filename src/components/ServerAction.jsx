"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInAuth from "./SignInAuth";
import axios from "axios";

export async function SaveCookiesSignIn(authorization) {
  // if (SignInAuth(email, password)) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  cookieStore.set("Authorization", authorization, {
    httpOnly: true,
    secure: true,
  });
  console.log(`cookiestore:${cookieStore}`);
  // await console.log(`cookiestore-token: ${JSON.stringify(cookieStore)}`);
  // await console.log(`authorization:${authorization}`);
  redirect(`/sign_in`);
  // }
}

export async function AuthorizationForFetch(path) {
  try {
    const cookieStore = cookies();
    const authorization = await cookieStore.get("Authorization");
    await console.log(authorization);
    await console.log(authorization.value);
    // await cookies().set("Authorization", authorization, { secure: true });
    const apiClient = axios.create({
      withCredentials: true,
      secure: true,

      headers: {
        "Content-Type": "application/json",
        Authorization: authorization.value,
      },
    });
    const response = await apiClient.get(
      // `http://localhost:3000/api/v1${pathname}`
      `https://profileapp-api.onrender.com/api/v1${path}`
    );
    // console.log(`AuthorizationForFetch,${path}`);
    // console.log(response);
    // console.log(response.data);
    const fetchData = response.data;
    return fetchData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function fetchUser(params) {
  try {
    const cookieStore = cookies();
    const authorization = await cookieStore.get("Authorization");
    const apiClient = axios.create({
      withCredentials: true,
      secure: true,

      headers: {
        "Content-Type": "application/json",
        Authorization: authorization.value,
      },
    });
    const path = params.slug;
    const response = await apiClient.get(
      `https://profileapp-api.onrender.com/api/v1/users/${path}`
    );
    console.log(`params:${params}`);
    console.log(`params.slug:${params.slug}`);
    console.log(`path: ${path}`);
    // console.log(response);
    // console.log(response.data);
    const fetchData = response.data;
    return fetchData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
