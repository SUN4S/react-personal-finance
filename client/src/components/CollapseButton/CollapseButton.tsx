import "./CollapseButton.scss";

import { IconArrow } from "../../resources/icons/IconArrow/IconArrow";

export const CollapseButton = (props: { clickFunction: Function }) => {
  return (
    <button
      className="collapseButton"
      data-testid="collapseButton"
      onClick={() => props.clickFunction()}
    >
      <IconArrow />
    </button>
  );
};
