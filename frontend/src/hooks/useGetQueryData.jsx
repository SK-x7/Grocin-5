import { useQueryClient } from "@tanstack/react-query";


export const useGetFetchQuery = (queryName) => {
    console.log(queryName);
    const queryClient = useQueryClient();
    // return queryClient.getQueryData(queryName);
    const cachedData= queryClient.getQueryData(queryName);
    return cachedData;
    // const res=cachedData?.data;
    // return res;
};