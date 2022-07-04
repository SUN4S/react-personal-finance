import "./FileInputAvatarForm.scss";

import React, { useEffect, useState } from "react";

import { AvatarChangeInput } from "../../models/user";
import { Button } from "../../components/Button/Button";
import DefaultImage from "../../resources/images/default-image.jpg";
import { RootState } from "../../app/store";
import { notification } from "../../features/NotificationSlice";
import { useAddAvatarMutation } from "../../services/user";
import { useAppDispatch } from "../../app/hooks";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// Currently unused
// TODO: Add user settings (where you will be able to change avatar)
export const FileInputAvatarForm = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  const [addAvatar, { isLoading }] = useAddAvatarMutation();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>(DefaultImage);
  const [userImage, setUserImage] = useState<string | undefined>(
    user.image === null || user.image === undefined
      ? undefined
      : `${process.env.SERVER_URL}/resources/avatar_image/${user.image}`
  );

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvatarChangeInput>();

  // On submit, sending request to authenticate user
  const onSubmit = async (data: AvatarChangeInput) => {
    //Calling Redux Toolkit api to authenticate user
    console.log(selectedFile);
    const response: any = await addAvatar({ avatar: selectedFile! });
    if (response.data) {
      // If response goes throught
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Change Avatar",
          message: response.data.msg,
          type: "success",
        })
      );
    } else if (response.error) {
      // If response fails
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Change Avatar",
          message: response.error.data.msg,
          type: "danger",
        })
      );
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setUserImage(undefined);
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
    <div id="avatarContainer">
      <h3 className="avatarHeader">Avatar Image</h3>
      <img src={userImage || preview} alt="Avatar preview" />
      <form onSubmit={handleSubmit(onSubmit)} id="avatarSelect">
        <input
          type="file"
          className="customFileInput"
          {...register("avatar", {
            required: true,
            onChange: (e) => onSelectFile(e),
          })}
          accept=".jpg,.png.,jpeg"
        />
        {errors.avatar && (
          <span data-testid="avatarMissing">This field is required</span>
        )}

        <Button
          type="submit"
          class="primaryBtn"
          text="Change Avatar"
          testId="changePassword"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};
