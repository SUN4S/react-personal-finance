import "./CollapseButton.scss";

export const CollapseButton = (props: { onClick: Function }) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button className="collapseButton" onClick={handleClick}>
      <i className="fa-solid fa-arrow-left-long"></i>
    </button>
  );
};
