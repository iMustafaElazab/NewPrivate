import axios from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';

// const useGetAllPosts = () => {
//   return useQuery('posts', fetchPosts);
// };

// const fetchPosts = async () => {
//   const {data} = await axios.get(
//     'https://jsonplaceholder.typicode.com/posts?_page=1',
//   );
//   return data;
// };

// export default useGetAllPosts;

const useGetAllPosts = () => {
  return useInfiniteQuery({
    queryKey: 'posts',
    queryFn: ({pageParam = 1}) => fetchPosts({pageParams: pageParam}),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
};

const fetchPosts = async ({pageParams = 1}) => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      _page: pageParams,
    },
  });
  return data;
};

export default useGetAllPosts;
