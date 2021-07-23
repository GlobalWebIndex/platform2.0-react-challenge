import CatList from "../components/CatList";
import { fetchCats } from "../api/requests";
import { useInfiniteQuery } from "react-query";
import Loading from "../components/Loading";
import { CacheKeys } from "../constants/constants";

const Home: React.FC = () => {
  const {
    data: cats,
    status,
    fetchNextPage,
  } = useInfiniteQuery(CacheKeys.CatsList, fetchCats, {
    getNextPageParam: (_lastPage, pages) => pages.length,
    staleTime: Infinity,
    keepPreviousData: true,
  });

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <CatList
      cats={cats?.pages.flatMap((val) => val) ?? []}
      onFetchMore={fetchNextPage}
    />
  );
};

export default Home;
