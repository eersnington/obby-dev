// This file structure is used for the web container component
export interface FileContent {
  file?: {
    contents: string;
  };
  directory?: {
    [key: string]: FileContent;
  };
}

export type projectFiles = {
  [key: string]: FileContent;
};