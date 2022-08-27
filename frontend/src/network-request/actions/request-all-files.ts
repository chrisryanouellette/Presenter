import { RequestFilePath } from "../../constants";
import { Events } from "..";

export type RequestAction = {
  type: Events.Request;
};
export type RequestReturn = {
  type: Events.Request;
  return: string[];
};

const handleRequestFile = async (): Promise<RequestReturn["return"]> => {
  const res = await fetch(`${RequestFilePath}`);
  const data: string[] = await res.json();
  return data;
};

export { handleRequestFile };
