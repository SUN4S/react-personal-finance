import "./ImageModal.scss";

import { useEffect, useState } from "react";

import { IconClose } from "../../resources/icons/IconClose/IconClose";
import { RootState } from "../../app/store";
import { toggleImageModal } from "../../features/ImageModalSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";

export const ImageModal = () => {
  const imageModalStatus = useSelector(
    (state: RootState) => state.imageModal.isOpen
  );
  const imageModalSrc = useSelector((state: RootState) => state.imageModal.src);

  const dispatch = useAppDispatch();

  return (
    <div id="imageModal" className={`${imageModalStatus && "openModal"}`}>
      <span
        className="close"
        onClick={() => dispatch(toggleImageModal({ isOpen: false }))}
      >
        <IconClose />
      </span>
      <div className="imageContainer">
        <img
          className="modalImage"
          src={`${process.env.SERVER_URL}/resources/expense_image/${imageModalSrc}`}
        />
      </div>
      <div
        className="overlay"
        onClick={() => dispatch(toggleImageModal({ isOpen: false }))}
      ></div>
    </div>
  );
};
