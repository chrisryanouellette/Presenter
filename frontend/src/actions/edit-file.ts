import { FilePath } from "../constants";
import { Events } from "../reducer";

export type ChangeAction = {
  type: Events.Change;
  fileName: string;
};
export type ChangeReturn = {
  type: Events.Change;
  return: string;
};

const handleChangeFile = async (
  action: ChangeAction
): Promise<ChangeReturn["return"]> => {
  const res = await fetch(`${FilePath}?path=${action.fileName}`);
  const text = await res.text();
  return text;
};

export { handleChangeFile };
