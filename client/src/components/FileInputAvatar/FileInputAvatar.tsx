import "./fileInputAvatar.scss";

import React, { useEffect, useState } from "react";

import DefaultImage from "../resources/images/default-image.jpg";

// Currently unused
// TODO: Add user settings (where you will be able to change avatar)
export const FileInputAvatar = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>(DefaultImage);
  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="avatarSelect">
      <input
        type="file"
        onChange={onSelectFile}
        className="customFileInput"
        accept=".jpg,.png.,jpeg"
      />
      <img src={preview} alt="Avatar preview" />
    </div>
  );
};
