export interface UserInfo {
  DbName: string;
  DbServer: string;
  Role: 'Site Admin' | 'Account Management';
  UserId: string;
  Username: string;
  aud: string;
  exp: number;
  iss: string;
}
