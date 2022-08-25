import { FilePath } from "../constants";
import { Events } from "../reducer";

export type RenameAction = {
  type: Events.Rename;
  fileName: string;
};
export type RenameReturn = {
  type: Events.Rename;
  return: string | null;
};

const handleRenameFile = async (
  action: RenameAction
): Promise<RenameReturn["return"]> => {
  const res = await fetch(`${FilePath}?path=${action.fileName}`);
  const text = await res.text();
  return text;
};

export { handleRenameFile };
