import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { APP_URL } from "@/constants/Api";
import { get } from "@/helpers/axioscall";

interface Pagination {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
  total_pages: number;
}

interface UseCustomListContainerProps {
  url: string;
  api_token: string;
  search_query?: string;
  defaultFiltering?: object;
  defaultSorting?: object;
  propParams?: object;
  unique_key?: string;
}

const useCustomListContainer = ({
  url,
  api_token,
  search_query,
  defaultFiltering = {},
  defaultSorting = {},
  propParams = {},
}: UseCustomListContainerProps) => {
  const signal = useRef(axios.CancelToken.source());
  const timeoutSession = useRef<NodeJS.Timeout | null>(null);

  const [list, setList] = useState<any[]>([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    total: 0,
    per_page: 10,
    last_page: 1,
    total_pages: 0,
  });
  const [filtering, setFiltering] = useState(defaultFiltering);
  const [sorting, setSorting] = useState(defaultSorting);
  const [q, setQ] = useState("");
  const [error, setError] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  useEffect(() => {
    getData(1);
    return () => {
      signal.current.cancel();
      if (timeoutSession.current) {
        clearTimeout(timeoutSession.current);
      }
    };
  }, []);

  const updateFilterSort = (type: string, data: object) => {
    if (timeoutSession.current) clearTimeout(timeoutSession.current);
    if (type === "filtering") setFiltering(data);
    if (type === "sorting") setSorting(data);

    timeoutSession.current = setTimeout(() => {
      getData(1);
    }, 450);
  };

  const clear = (type: string) => {
    if (type === "filtering") setFiltering({});
    if (type === "sorting") setSorting({});
    getData(1);
  };

  const searchUpdate = (page: number, query: string) => {
    setQ(query);
    getData(page);
  };

  const updateData = (data: any, index: number) => {
    if (data) {
      const updatedList = [...list];
      updatedList[index] = data;
      setList(updatedList);
    }
  };

  const getData = useCallback(
    (page: number) => {
      setLoading(page === 1);
      setPaginationLoading(page > 1);
      console.log("page--", page);
      const params: any = {
        page,
        api_token,
        ...sorting,
        ...filtering,
        ...propParams,
      };

      if (search_query) {
        params[search_query] = q;
      }

      get({
        url: `${APP_URL}${url}`,
        params,
        cancelToken: signal.current.token,
      })
        .then((response: any) => {
          const newRecords = response.data.data;

          setList((prevList) =>
            page > 1 ? [...prevList, ...newRecords] : newRecords
          );
          setStats(response.data.statuses);
          setPagination(
            response.data.meta?.pagination || {
              current_page: 1,
              total: 0,
              per_page: 10,
              last_page: 1,
            }
          );
          setError(false);
        })
        .catch((error: any) => {
          console.log("error-", error);
          if (!axios.isCancel(error)) {
            setError(true);
            setList([]);
            setPagination({
              current_page: 1,
              total: 0,
              per_page: 10,
              last_page: 1,
              total_pages: 0,
            });
          }
        })
        .finally(() => {
          setLoading(false);
          setPaginationLoading(false);
        });
    },
    [filtering, sorting, q]
  );

  return {
    list,
    stats,
    loading,
    pagination,
    filtering,
    sorting,
    error,
    paginationLoading,
    updateFilterSort,
    clear,
    searchUpdate,
    updateData,
    getData,
  };
};

export default useCustomListContainer;
