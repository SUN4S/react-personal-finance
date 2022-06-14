import "./ChartError.scss";

// simple function to render string
export const ChartError = (props: { title: string }) => {
  return (
    <div className="chartError">
      <span>{props.title}</span>
    </div>
  );
};
