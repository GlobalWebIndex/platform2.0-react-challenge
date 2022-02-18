import { useEffect, useState, useCallback } from "react";
import { getAllCats } from "../lib/api";

export function useMyCatHook() {
    const [status, setStatus] = useState("unstarted");
    const [cats, setCats] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(10);
  
    useEffect(() => {
      getAllCats(currentPage)
        .then((data) => {
          setCats((currentState) => [...(currentState || []), ...data]);
          setStatus("completed");
        })
        .catch((err) => setError(err));
    }, [currentPage]);
  
    // when React re-renders, it creates new references (instances), that can lead to irregular behaviour,
    // using useCallback, helps with re-creating one instance of a function
    const onLoadMore = useCallback(() => {
      const nextPage = currentPage + 1;
  
      setCurrentPage(nextPage);
    }, [currentPage]);
  
    return { status, cats, error, onLoadMore };
  }