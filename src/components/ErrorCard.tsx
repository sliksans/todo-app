import { FunctionComponent } from "react";
import { MdClose } from "react-icons/md";

type ErrorCardProps = {
  error: string;
  onClose: () => void;
};

const ErrorCard: FunctionComponent<ErrorCardProps> = ({ error, onClose }) => {
  return (
    <div
      className="relative mx-4 break-words rounded-md border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-700"
      role="alert"
    >
      <div className="mr-4 text-left font-normal">
        <strong className="font-normal">{error}</strong>
      </div>
      <button className="absolute right-2 top-2" onClick={() => onClose()}>
        <MdClose className="text-lg" />
      </button>
    </div>
  );
};

export default ErrorCard;
