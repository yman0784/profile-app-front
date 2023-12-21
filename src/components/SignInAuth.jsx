import axios from "axios";

const SignInAuth = async (email, password) => {
  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  const Params = {
    email: email,
    password: password,
  };

  try {
    const res = await apiClient.post(
      // "http://localhost:3000/api/v1/auth/sign_in",
      "https://profileapp-api.onrender.com/api/v1/auth/sign_in",
      Params
    );
    const loginMessage = res.data.message;
    const user = res.data.data;
    if (res.status === 200) {
      console.log("signinauth:", true);
    }
  } catch (error) {
    console.error("エラーレスポンス:", error.response);
  }
};

export default SignInAuth;
