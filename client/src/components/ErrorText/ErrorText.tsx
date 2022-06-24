import "./ErrorText.scss";

// simple function to render string
export const ErrorText = (props: { title: string }) => {
  return (
    <div className="errorText" data-testid="errorText">
      <span>{props.title}</span>
    </div>
  );
};
