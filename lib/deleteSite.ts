import axios from 'axios';

export default async function deleteSite(
  siteId: string
): Promise<{ success: boolean; response: any }> {
  try {
    const response = axios.post('/api/site/delete-site', {
      siteId: siteId,
    });
    return {
      success: true,
      response: response,
    };
  } catch (e) {
    return {
      success: false,
      response: e,
    };
  }
}
