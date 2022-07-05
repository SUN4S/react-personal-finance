import "./LoadingBox.scss";

export interface LoadingProps {
  size: "sm" | "md" | "lg" | "xl";
}

// creates a loader, with size prop defining its size
// sm=12px md=24px lg=48px xl=96px
export const LoadingBox = (props: { size: string }) => {
  return (
    <div className="loadingContainer" data-testid="loadingBox">
      <div className={`loadingSpinner ${props.size}`} data-testid="loadingSpinner"></div>
    </div>
  );
};
