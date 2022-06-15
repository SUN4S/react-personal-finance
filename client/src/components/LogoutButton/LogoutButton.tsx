export const LogoutButton = (props: { onClick: Function }) => {
  const handleClick = async () => {
    await props.onClick();
  };

  return (
    <div>
      <i className="fa-solid fa-power-off" onClick={handleClick}></i>
    </div>
  );
};
