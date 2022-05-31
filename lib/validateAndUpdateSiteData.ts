import { GeneralSiteSettingsFormValues } from '../types/interfaces';
import * as z from 'zod';
import axios from 'axios';
import { mutate } from 'swr';

const schema = z.object({
  site_name: z.string().nonempty().min(2).max(48),
  password: z.string().nonempty().min(8).max(50),
  site_desc: z.string(),
  expiration_days: z.number().int().min(1).max(365),
});

export default async function validateAndUpdateSiteData(
  data: GeneralSiteSettingsFormValues,
  field:
    | 'site_name'
    | 'site_desc'
    | 'password'
    | 'expiration_days'
    | 'cap'
    | 'title'
    | 'logo_url',
  siteId: string,
  previousData: GeneralSiteSettingsFormValues
): Promise<{ success: boolean }> {
  if (!schema.safeParse(data).success) {
    return {
      success: false,
    };
  }
  // -------------------------------------------------------------
  console.log(data);
  if (field === 'site_name') {
    try {
      await axios.post('/api/site/update-name', {
        siteName: data.site_name,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, site_name: data.site_name },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
  else if (field === 'site_desc') {
    try {
      await axios.post('/api/site/update-site-desc', {
        siteDesc: data.site_desc,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, site_desc: data.site_desc },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
  else if (field === 'expiration_days') {
    try {
      await axios.post('/api/site/update-max-login-duration', {
        max_login_duration: data.expiration_days,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, expiration_days: data.expiration_days },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
  else if (field === 'password') {
    if (data.password === 'A-str0ng-p@55w0rd') {
      return {
        success: false,
      };
    }

    try {
      await axios.post('/api/site/update-site-password', {
        password: data.password,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, password: data.password },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
  else if (field === 'logo_url') {
    try {
      await axios.post('/api/site/update-logo-url', {
        logoUrl: data.logo_url,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, logo_url: data.logo_url },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
  else if (field === 'cap') {
    try {
      await axios.post('/api/site/update-caption', {
        cap: data.cap,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, cap: data.cap },
      false
    );
    return {
      success: true,
    };
  } else if (field === 'title') {
    try {
      await axios.post('/api/site/update-title', {
        title: data.title,
        siteId: siteId,
      });
    } catch (_) {
      return {
        success: false,
      };
    }
    mutate(
      '/api/get-site-from-site-id/?siteId=' + siteId,
      { ...previousData, title: data.title },
      false
    );
    return {
      success: true,
    };
  }
  // -------------------------------------------------------------
}
