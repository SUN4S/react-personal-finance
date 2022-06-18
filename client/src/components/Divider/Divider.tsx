import "./Divider.scss";

interface Props {
  text: string;
}

// Simple divider, so far only used in login
export const Divider = ({ text }: Props) => {
  return (
    <div className="divider" data-testid="divider">
      {text}
    </div>
  );
};
