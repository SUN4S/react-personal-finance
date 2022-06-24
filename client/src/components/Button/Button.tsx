import "./Button.scss";

import React from "react";

// typescript defined button props
// 3 Required and 3 situational props
export type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  class: string;
  action?: Function;
  disabled?: boolean;
  loading?: boolean;
};

// Button prop with a ripple animation
export const Button = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If action props exists, execute it
    // this is here because some components need to dispatch actions
    props.action && props.action();

    const button = e.currentTarget;
    // Modal breaks animation, so check is required
    // explanation: buttons are rendered on modal, which is pushed to the RIGHt off-screen
    // this causes ripple animation to be rendere off-screen aswell
    const modalElement = document.querySelector(".Modal")!;
    let modalWidth = 0;
    if (modalElement) {
      const modalStyle = getComputedStyle(modalElement).width;
      modalWidth = Number(modalStyle.replace(/\D/g, ""));
    }
    const checkIfModal = props.class.split(" ").includes("modalBtn")
      ? window.innerWidth - modalWidth
      : 0;

    // Hence forward are the ripple animation calculations
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      e.clientX - (button.offsetLeft + radius) - checkIfModal
    }px`;
    circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <button
      type={props.type}
      className={props.class}
      onClick={handleClick}
      disabled={props.disabled}
      data-testid="button"
    >
      {props.loading ? (
        <span className="loader" data-testid="buttonLoader"></span>
      ) : (
        props.text
      )}
    </button>
  );
};
