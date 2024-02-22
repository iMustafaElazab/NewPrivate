import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const useGetAllPosts = () => {
  //  return useQuery('posts', fetchPosts);
};

const fetchPosts = async () => {
  const {data} = await axios.get('https://student.valuxapps.com/api/favorites');
  return data;
};

export default useGetAllPosts;

// const useGetAllPosts = () => {
//   return useInfiniteQuery({
//     queryKey: 'posts',
//     queryFn: ({pageParam = 1}) => fetchPosts({pageParams: pageParam}),
//     getNextPageParam: (lastPage, allPages) => {
//       if (lastPage.length === 0) {
//         return undefined;
//       }
//       return allPages.length + 1;
//     },
//   });
// };

// const fetchPosts = async ({pageParams = 1}) => {
//   const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//     params: {
//       _page: pageParams,
//     },
//   });
//   return data;
// };

//export default useGetAllPosts;
