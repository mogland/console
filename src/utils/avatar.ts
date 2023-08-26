import md5 from "md5";

export const mailAvatar = (mail: string) => {
  const md5Mail = md5(mail);
  return `https://cravatar.cn/avatar/${md5Mail}`;
};
