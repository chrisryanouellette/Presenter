import { ChangeEvent, FC } from "react";
import { concat } from "../utilities/concat";

type HeaderProps = {
  files: string[];
  selectedFile: string;
  onSelect: (fileName: string) => void;
};

const Header: FC<HeaderProps> = ({ files, selectedFile, onSelect }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    onSelect(e.target.value);
  };

  return (
    <header
      className={concat(
        "print:hidden",
        "flex",
        "flex-col",
        "md:flex-row",
        "items-center",
        "justify-between",
        "mb-4",
        "max-w-screen-2xl",
        "mx-auto",
        "w-full"
      )}
    >
      <h1 className="text-4xl">Presenter</h1>
      {files.length ? (
        <label>
          Select file:
          <select
            className="text-lg ml-2 mt-4 md:mt-0"
            value={selectedFile}
            onChange={handleChange}
          >
            {files.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </header>
  );
};

export { Header };
