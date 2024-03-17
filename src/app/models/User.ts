export class User {
  id = 0;
  email = '';
  username = '';
  firstName = '';
  lastName = '';
  password = '';
  status = '';
  role = '';
  enabled!: boolean;
  authorities!: { authority: string }[]
  credentialsNonExpired!: boolean;
  accountNonExpired!: boolean;
  accountNonLocked!: boolean;
}
