"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInAuth from "./SignInAuth";
import axios from "axios";

export async function SaveCookiesSignIn(authorization, res) {
  // if (SignInAuth(email, password)) {
  const cookieStore = cookies();
  cookieStore.set("Authorization", authorization, {
    httpOnly: true,
    secure: true,
  });
  // console.log(`cookiestore:${cookieStore}`);
  // await console.log(`cookiestore-token: ${JSON.stringify(cookieStore)}`);
  // await console.log(`authorization:${authorization}`);
  redirect(`/sign_in`);
  // }
}

export async function AuthorizationForFetch(path) {
  try {
    const cookieStore = cookies();
    const authorization = await cookieStore.get("Authorization");
    // await console.log(authorization);
    await console.log(authorization.value);
    // await cookies().set("Authorization", authorization, { secure: true });
    const apiClient = axios.create({
      // withCredentials: true,
      secure: true,

      headers: {
        "Content-Type": "application/json",
        Authorization: authorization.value,
      },
    });
    const response = await apiClient.get(
      // `http://localhost:3000/api/v1${path}`
      `https://profileapp-api.onrender.com/api/v1${path}`
    );
    // console.log(`AuthorizationForFetch,${path}`);
    // console.log(response);
    console.log(response.data);
    const fetchData = response.data;
    // console.log(fetchData);
    // await console.log(`user:${fetchData.user}`);
    // await console.log(`image:${fetchData.image}`);
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
    const response = await apiClient.get(
      // `http://localhost:3000/api/v1/users/${params.slug}`
      `https://profileapp-api.onrender.com/api/v1/users/${params.slug}`
    );
    const fetchData = response.data;
    return fetchData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function PutData(data) {
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
    // const res = await apiClient.put("http://localhost:3000/api/v1/auth", {
    const res = await apiClient.put(
      "https://profileapp-api.onrender.com/api/v1/auth",
      {
        registration: { self_introduction: data.introduction },
      }
    );
    const resData = res.data;
    return resData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function SignOut() {
  const cookieStore = cookies();
  const id = await cookieStore.get("num");
  const handleLogoutResponse = () => {
    cookieStore.delete("_access_token");
    cookieStore.delete("_client");
    cookieStore.delete("_uid");
    cookieStore.delete("token");
    cookieStore.delete("num");
    cookieStore.delete("Authorization");
  };
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
    const res = await apiClient.delete(
      // "http://localhost:3000/api/v1/auth/sign_out",
      `https://profileapp-api.onrender.com/api/v1/auth/sign_out`
    );
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
  handleLogoutResponse();
}

export async function fetchSkills() {
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
    const response = await apiClient.get(
      // "http://localhost:3000/api/v1/skills"),
      "https://profileapp-api.onrender.com/api/v1/skills"
    );
    const fetchData = response.data;
    return fetchData;
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
}

export async function EditSkillLevel(Params) {
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
    const res = await apiClient.put(
      // `http://localhost:3000/api/v1/skills/${Params.id}`,
      `https://profileapp-api.onrender.com/api/v1//skills/${Params.skill.id}`,
      Params
    );
    const ChangedLanguage = `${res.data.language}の習得レベルを保存しました!`;
    return ChangedLanguage;
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
}

export async function DeleteSkill(Params) {
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

    const res = await apiClient.delete(
      // `http://localhost:3000/api/v1/skills/${Params.id}`,
      `https://profileapp-api.onrender.com/api/v1/skills/${Params.id}`,
      Params
    );
    console.log(`Params:${Params}`);
    console.log(`Params.id:${Params.id}`);
    console.log(`res:${res}`);
    const ChangedLanguage = `${res.data.language}の項目を削除しました!`;
    return ChangedLanguage;
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
}

export async function AddSkill(Params) {
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

    const res = await apiClient.post(
      // "http://localhost:3000/api/v1/skills",
      "https://profileapp-api.onrender.com/api/v1/skills",
      Params
    );
    const resStatus = res.status;
    return resStatus;
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
}
