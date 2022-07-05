import "./CollapseButton.scss";

import { IconArrow } from "../../resources/icons/IconArrow/IconArrow";

// Arrow component that opens dropdown menu
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
