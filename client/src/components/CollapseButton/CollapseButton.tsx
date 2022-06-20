import "./CollapseButton.scss";

import { IconArrow } from "../Icons/IconArrow/IconArrow";

export const CollapseButton = (props: { onClick: Function }) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button className="collapseButton" onClick={handleClick}>
      <IconArrow />
    </button>
  );
};
