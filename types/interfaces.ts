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
  is_login_blocked: boolean;
}

export interface FrameworkCardProps {
  name: string;
  link: string;
  img: any;
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
  expiration_days: number;
  cap: string;
}

export interface HarperDBRecordWithoutDefaults {
  last_login: string;
  is_login_blocked: boolean;
  site_url: string;
  max_login_duration: number;
  max_logins: number;
  no_of_logins: number;
  site_desc: string;
  no_of_failed_logins: number;
  site_name: string;
  user_id: string;
  password_hash: string;
  cap: string;
  title: string;
  logo_url: string;
}

export interface HarperDBRecord extends HarperDBRecordWithoutDefaults {
  id: string;
  __createdtime__: number;
  __updatedtime__: number;
}

export interface GeneralSiteSettingsFormValues {
  site_name?: string;
  site_desc?: string;
  expiration_days?: number;
  password?: string;
  site_id?: string;
  cap: string;
  title: string;
  logo_url: string;
}
export interface AdvancedSiteSettingsFormValues {
  is_login_blocked: boolean;
}
