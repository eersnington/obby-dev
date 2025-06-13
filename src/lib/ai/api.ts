import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import type { AIResponse } from "@/stores/chat";
import type { projectFiles } from "@/types/webcontainer-files";
import { env } from "@/env";

const URL = env.NEXT_PUBLIC_BASE_URL;

export const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    console.log(err.name, err.message);
    toast.success(err.name as string, {
      description: err.message,
    });
  }
  if (err instanceof AxiosError) {
    toast.error("Axios error occurred view in console.");
    console.error(err);
  } else {
    toast.error("An unknown error occurred view in console.");
    console.error(err);
  }
};

const enhancePromptApi = async (inputValue: string) => {
  try {
    const response: Response = await fetch(`${URL}/api/v1/ai/refinePrompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputValue }),
    });
    return response;
  } catch (err) {
    errorHandler(err);
  }
};

const createProject = async (userEmail: string, projectName: string) => {
  try {
    const response = await axios.post(`${URL}/api/v1/project/createProject`, {
      userEmail,
      projectName,
      projectDescription: "this is a react project",
    });
    console.log(response.data);
    toast.success("Project created successfully");
    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};
const getALLProject = async (userEmail: string) => {
  try {
    const response: Response = await axios.post(
      `${URL}/api/v1/project/getAllProject`,
      {
        userEmail,
      },
    );
    return response;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

const createMessage = async (
  message: string | AIResponse,
  role: "user" | "assistant",
  projectId: number | null,
) => {
  try {
    console.log(message, role, projectId);
    const response: Response = await axios.post(
      `${URL}/api/v1/message/createMessage`,
      {
        message: { role: role, content: message },
        projectId,
      },
    );
    return response;
  } catch (err) {
    errorHandler(err);
  }
};

const getALLMessage = async (projectId: number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const response = await fetch(
    `${API_URL}/api/v1/message/getMessage/${projectId}`,
  );
  const data = await response.json();
  return data;
};

const sendCode = async (projectId: number, code: projectFiles) => {
  try {
    const response = await axios.post(`${URL}/api/v1/code/createCode`, {
      projectId,
      code,
    });
    return response;
  } catch (err) {
    errorHandler(err);
  }
};

const updateCode = async (projectId: number, code: projectFiles) => {
  try {
    const response = await axios.put(`${URL}/api/v1/code/updateCode`, {
      projectId,
      code,
    });
    return response;
  } catch (err) {
    errorHandler(err);
  }
};
const getCode = async (projectId: number) => {
  try {
    const response = await axios.get(`${URL}/api/v1/code/getCode/${projectId}`);
    return response;
  } catch (err) {
    errorHandler(err);
  }
};
const getProject = async (projectId: number) => {
  try {
    const response = await axios.get(
      `${URL}/api/v1/project/getProject/${projectId}`,
    );
    return response;
  } catch (err) {
    errorHandler(err);
  }
};
const deleteProject = async (projectId: number) => {
  try {
    const response = await axios.delete(
      `${URL}/api/v1/project/deleteProject/${projectId}`,
    );
    return response;
  } catch (err) {
    errorHandler(err);
  }
};
// AI endpoints
export { enhancePromptApi };

// Project endpoints
export { createProject, getALLProject, deleteProject };

// Message endpoints
export { createMessage, getALLMessage };

// Send code endpoint
export { sendCode, updateCode, getCode, getProject };
