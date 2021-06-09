import { UserProfile } from '@auth0/nextjs-auth0';

export interface NavBarProps {
  feature: string;
  children: JSX.Element;
}

export interface DashboardNavbarProps {
  user: UserProfile;
  isNewSiteButtonVisible: boolean;
  isDashboardBadgeVisible: boolean;
}

export interface SiteCardProps {
  id: string;
  site_name: string;
  site_url: string;
  site_desc: string;
}

interface SiteLoginDetails {
  max_login_duration: number;
  no_of_logins: number;
}

export interface SiteProps {
  site_info: SiteCardProps;
  site_login_details: SiteLoginDetails;
}
export interface NewSiteFormValues {
  site_name: string;
  site_url: string;
  site_desc: string;
  password: string;
  expiration_hours: string;
  expiration_days: string;
  expiration_months: string;
}

export interface HarperDBResponse {
  last_login: string;
  site_url: string;
  __createdtime__: number;
  max_login_duration: number;
  max_logins: number;
  no_of_logins: number;
  site_desc: string;
  no_of_failed_logins: number;
  site_name: string;
  id: string;
  user_id: string;
  password_hash: string;
  __updatedtime__: number;
}
