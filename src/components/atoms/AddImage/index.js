import React, { useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const handleFileChange = (event, userId) => {
  const params = useParams;
  // イベントオブジェクトからアクセスできる要素を確認し、存在しない場合は処理を中止
  if (!event.target || !event.target.files || event.target.files.length === 0) {
    return;
  }

  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const apiClient = axios.create({
    withCredentials: true,
  });

  const response = apiClient
    .post(
      `http://localhost:3000/api/v1/users/${userId.userId}/upload_image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log("Image uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.log(userId);
      console.log(userId.userId);
      console.error("Error uploading image:", error);
      console.log(params.userId);
      console.log(params);
    });
};
const AddImage = (userId) => {
  const fileInputRef = useRef(null);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, userId)}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={onButtonClick}>画像を追加する</button>
    </div>
  );
};

export default AddImage;
