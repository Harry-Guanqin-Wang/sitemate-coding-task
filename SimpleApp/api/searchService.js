import { apiClient } from "./apiClient";

// service for fetching all the news base on a search query
export const searchNews = async ({
  query,
  from,
  to,
  sortBy,
  language,
  pageSize,
  page,
  ...otherParams
}) => {
  return await apiClient("everything", {
    q: query,
    from,
    to,
    sortBy,
    language,
    pageSize,
    page,
    ...otherParams,
  });
};
