export default interface UserCredentials {
  city_id?: number;
  country_id: number;
  education_id: number;
  email: string;
  grade_id: number;
  instagram_handle?: string;
  name: string;
  referral_link: string;
  region_id?: number;
  roles: Array<string>;
  school?: string;
}
