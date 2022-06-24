import "./LoadingBox.scss";

export interface LoadingProps {
  size: "sm" | "md" | "lg" | "xl";
}
export const LoadingBox = (props: { size: string }) => {
  return (
    <div className="loadingContainer" data-testid="loadingBox">
      <div className={`loadingSpinner ${props.size}`} data-testid="loadingSpinner"></div>
    </div>
  );
};
