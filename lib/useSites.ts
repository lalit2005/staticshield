import useSWR from 'swr';
import fetcher from './fetcher';

export default function useSites<T>(siteId?: string) {
  const { data, error } = useSWR(
    `/api/get-site-from-site-id/?siteId=${siteId}`,
    fetcher
  );

  const response: T = data;

  return {
    response,
    error,
  };
}
