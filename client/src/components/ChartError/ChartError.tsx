import "./ChartError.scss";

export const ChartError = (props: { title: string }) => {
  return <div className="chartError">{props.title}</div>;
};
