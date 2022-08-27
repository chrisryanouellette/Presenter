import { ChangeEvent, FC } from "react";

type HeaderProps = {
  files: string[];
  onSelect: (fileName: string) => void;
};

const Header: FC<HeaderProps> = ({ files, onSelect }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    onSelect(e.target.value);
  };

  return (
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-4xl">Presenter</h1>
      <label>
        Select file:
        <select className="text-lg ml-2" onChange={handleChange}>
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
};

export { Header };
