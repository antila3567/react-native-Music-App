import { rootRtkApi } from '../rootApi-RTK';

interface TPost {
  tags: string[];
  _id: string;
  author: string;
  content: string;
  country: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

interface TNewPost {
  author: string;
  content: string;
  country: string;
  title: string;
}

export const postsApi = rootRtkApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllPosts: builder.query<TPost[], { search: string; id?: string }>({
      query: () => 'posts/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Posts' as const, id: _id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],

      transformResponse: (rawResult: TPost[]) => {
        // meta, args
        // const transformArr = rawResult.filter(el => el.author === args.search);
        return rawResult;
      },
    }),
    getAllPostsByClick: builder.query<TPost[], null>({
      query: () => 'posts/',
      providesTags: () => [
        {
          type: 'Posts',
        },
      ],
    }),
    updateSpecificPost: builder.mutation<TPost, { id: string; content: string }>({
      query: ({ id, ...data }) => {
        return {
          url: `posts/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    addNewPost: builder.mutation<TPost, TNewPost>({
      query: (newPost) => {
        return {
          url: 'posts/',
          method: 'POST',
          body: newPost,
        };
      },
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<TPost, { id: string; sth?: Array<[]> }>({
      query: (args) => {
        return {
          url: `posts/${args.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useLazyGetAllPostsByClickQuery,
  useUpdateSpecificPostMutation,
  useAddNewPostMutation,
  useDeletePostMutation,
} = postsApi;
