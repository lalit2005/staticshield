import axios from 'axios';
import { mutate } from 'swr';
import { HarperDBRecord } from './interfaces';

export default async function blockLogins(
  isLoginBlocked: boolean,
  siteId: string,
  previousData: HarperDBRecord
): Promise<{ success: boolean; response?: any; error?: any }> {
  try {
    const response = axios.post('/api/site/block-logins', {
      isLoginBlocked: isLoginBlocked,
      siteId: siteId,
    });

    console.log('DATA MUTATED');
    return {
      success: true,
      response: response,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}
