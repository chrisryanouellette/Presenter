import { FC } from "react";
import { Icon } from "./Icon";

const NoMarkdown: FC = () => {
  return (
    <div className="flex flex-col items-center m-auto">
      <Icon name="ri-radar-line" />
      <p className="text-lg">Unable to find any content in this file!</p>
    </div>
  );
};

export { NoMarkdown };
