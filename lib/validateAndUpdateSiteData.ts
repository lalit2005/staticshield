import { GeneralSiteSettingsFormValues } from './interfaces';
import * as z from 'zod';
import axios from 'axios';

const schema = z.object({
  site_name: z.string().nonempty().min(2).max(48),
  password: z.string().nonempty().min(8).max(50),
  site_desc: z.string(),
  expiration_days: z.number().int().min(1).max(365),
});

export default async function validateAndUpdateSiteData(
  data: GeneralSiteSettingsFormValues,
  field: 'site_name' | 'site_desc' | 'password' | 'expiration_days',
  siteId: string
): Promise<{ success: boolean }> {
  if (!schema.safeParse(data).success) {
    return {
      success: false,
    };
  }

  console.log(data);
  if (field === 'site_name') {
    try {
      const response = axios.post('/api/site/update-name', {
        siteName: data.site_name,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  }
}
