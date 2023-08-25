import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";

const getData = async (url: string, setAction: any) => {
  try {
    const res = await axiosInstance.get(url);
    if (res.status === 200) {
      setAction(res.data);
    }
  } catch (error:any) {
    console.log(error)
    return {};
  }
};

export const useTasks = (
  userId: string | undefined,
  currentPage: number,
  type: string,
  sort: string, 
  dataRefresh: boolean
) => {
  const [tasksData, setTasksData] = useState<any>();
  const getTaskData = (
    userId: string | undefined,
    currentPage: number,
    type: string,
    sort: string
  ) =>
    getData(
      `tasks?userId=${userId}&page=${currentPage}&type=${type}&sort=${sort}`,
      setTasksData
    );

  useEffect(() => {
    getTaskData(userId, currentPage, type, sort);
  }, [userId, currentPage, type, sort, dataRefresh]);

  return { tasksData };
};

export const useTaskById = (id: string) => {
  const [tasksData, setTasksData] = useState<any>();
  const getTaskData = (id: string) => getData(`tasks/${id}`, setTasksData);

  useEffect(() => {
    getTaskData(id);
  }, [id]);
  return { tasksData };
};
