import HeaderSignedIn from "@/components/atoms/layouts/headers/HeaderSignedIn";
import styles from "./page.module.css";
import Footer from "@/components/atoms/layouts/Footer/Footer";
import ClientProvider from "../../../../../ClientProvider";
import UserEdit from "@/components/UserEdit";

const Edit = (user) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <HeaderSignedIn /> */}
      <UserEdit user={user} />
      <Footer />
    </div>
  );
};

export default Edit;
