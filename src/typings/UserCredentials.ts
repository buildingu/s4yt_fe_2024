export default interface UserCredentials {
  // id: string;
  city: number | null;
  country: number;
  education: number;
  email: string;
  name: string;
  // quiz_submitted: number;
  chests_submitted: { [chest_id: string]: boolean };
  referral_link: string;
  region: number | null;
  roles: Array<string>;
  school: string | null;
}
