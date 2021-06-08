import { UserProfile } from '@auth0/nextjs-auth0';

export interface NavBarProps {
  feature: string;
  children: JSX.Element;
}

export interface DashboardNavbarProps {
  user: UserProfile;
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
