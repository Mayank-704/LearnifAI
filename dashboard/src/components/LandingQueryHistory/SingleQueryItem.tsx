import { FaMicrophone } from "react-icons/fa";

interface SingleQueryItemProps {
  title: string;
  time: string;
  type: string;
}

const SingleQueryItem = ({ title, time, type }: SingleQueryItemProps) => {
  return (
    <li className="flex items-center justify-between px-6 py-4">
      <div>
        <h4 className="text-md font-medium">{title}</h4>
        <p className="text-gray-400 text-sm">
          {time} • {type}
        </p>
      </div>
      <FaMicrophone className="text-green-400" />
    </li>
  );
};

export default SingleQueryItem;
