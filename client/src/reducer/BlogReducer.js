import {
  BLOGS_ERROR,
  BLOGS_LOADED,
  BLOGS_UNLOADED,
  BLOG_LOADED,
  BLOG_UNLOADED,
  POST_BLOG,
  REVIEWS_LOADED,
  REVIEWS_UNLOADED,
  BLOG_LOADING,
  POST_REVIEW,
} from "./constants";

const initialState = {
  blogs: [],
  blog: {},
  reviews: [],
  loading: true,
  error: null,
};

function BlogReducer(state, action) {
  switch (action.type) {
    case BLOGS_LOADED:
      return { ...state, blogs: action.payload, loading: false };
    case BLOG_LOADED:
      return { ...state, blog: action.payload, loading: false };
    case POST_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        loading: false,
      };
    case BLOG_UNLOADED:
      return { ...state, blog: {}, loading: true };
    case BLOGS_UNLOADED:
      return { ...state, blogs: [], loading: false };
    case BLOGS_ERROR:
      return { ...state, error: action.payload };
    case REVIEWS_LOADED:
      return { ...state, reviews: action.payload };
    case REVIEWS_UNLOADED:
      return { ...state, reviews: [] };
    case POST_REVIEW: {
      return { ...state, reviews: [...state.reviews, action.payload] };
    }
    case BLOG_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export { BlogReducer, initialState };
