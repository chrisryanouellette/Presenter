import {
  ChangeAction,
  ChangeReturn,
  handleChangeFile,
} from "./actions/edit-file";
import {
  handleRenameFile,
  RenameAction,
  RenameReturn,
} from "./actions/rename-file";
import {
  handleRequestFile,
  RequestAction,
  RequestReturn,
} from "./actions/request-all-files";

export enum Events {
  Request = "request",
  Rename = "rename",
  Change = "change",
}

export type Actions = RequestAction | RenameAction | ChangeAction;
export type Returns = RequestReturn | RenameReturn | ChangeReturn;

const reducers: {
  [E in Events]: (
    action: Extract<Actions, { type: E }>
  ) => Promise<Extract<Returns, { type: E }>["return"]>;
} = {
  [Events.Request]: handleRequestFile,
  [Events.Rename]: handleRenameFile,
  [Events.Change]: handleChangeFile,
};

export { reducers };
