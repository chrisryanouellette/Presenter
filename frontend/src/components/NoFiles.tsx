import { FC } from "react";
import { Icon } from "./Icon";

const NoFiles: FC = () => {
  return (
    <div className="flex flex-col items-center m-auto">
      <Icon name="ri-file-list-3-line" />
      <p className="text-lg">There are no files in the files folder!</p>
      <p className="text-lg">Add a .md file to begin seeing a preview.</p>
    </div>
  );
};

export { NoFiles };
