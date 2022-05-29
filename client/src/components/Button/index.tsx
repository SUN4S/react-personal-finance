import "./button.scss";

import React from "react";

export type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  class: string;
  action?: Function;
  disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.action && props.action();
    const button = e.currentTarget;
    // Modal breaks animation, so check is required
    const modalElement = document.querySelector(".Modal")!;
    let modalWidth = 0;
    if (modalElement) {
      const modalStyle = getComputedStyle(modalElement).width;
      modalWidth = Number(modalStyle.replace(/\D/g, ""));
    }
    const checkIfModal = props.class.split(" ").includes("modalBtn")
      ? window.innerWidth - modalWidth
      : 0;

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
    >
      {props.text}
    </button>
  );
};
