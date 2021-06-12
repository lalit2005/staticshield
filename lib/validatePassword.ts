import dumbPasswords from 'dumb-passwords';

type IsGoodPasswordResponse = {
  isGoodPassword: boolean;
  message: string;
};

export default function checkIsGoodPassword(
  password: string
): IsGoodPasswordResponse {
  if (dumbPasswords.check(password)) {
    const rate = dumbPasswords.rateOfUsage(password);
    let message =
      "Dear user, that's a very weak password! Please change it at once. ";
    message += ' Why? For every 100,000 user accounts on the internet, ';
    message += rate.frequency + ' are "protected" using that same password.';
    console.log(message);
    return {
      isGoodPassword: false,
      message: message,
    };
  } else {
    return {
      isGoodPassword: true,
      message: 'Well done',
    };
  }
}
