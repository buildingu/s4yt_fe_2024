export default interface UserCredentials {
  attend_meeting: boolean;
  chests_submitted: { [chest_id: string]: boolean };
  city: number | null;
  country: number;
  education: number;
  email: string;
  name: string;
  referral_link: string;
  region: number | null;
  roles: Array<string>;
  school: string | null;
}
