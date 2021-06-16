import useSWR, { mutate } from 'swr';
import fetcher from './fetcher';

export default function useSites(siteId?: string) {
  const { data, error } = useSWR(
    `/api/get-site-from-site-id/?siteId=${siteId}`,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
}
