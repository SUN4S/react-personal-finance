import "./LoadingBox.scss";

export interface LoadingProps {
  size: "sm" | "md" | "lg" | "xl";
}
export const LoadingBox = (props: { size: string }) => {
  return (
    <div className="loadingContainer">
      <div className={`loadingSpinner ${props.size}`}></div>
    </div>
  );
};
