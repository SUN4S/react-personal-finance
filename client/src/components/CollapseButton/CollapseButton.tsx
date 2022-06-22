import "./CollapseButton.scss";

import { IconArrow } from "../Icons/IconArrow/IconArrow";

export const CollapseButton = (props: { clickFunction: Function }) => {
  return (
    <button className="collapseButton" onClick={() => props.clickFunction()}>
      <IconArrow />
    </button>
  );
};
