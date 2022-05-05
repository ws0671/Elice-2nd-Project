const githubUrl = () => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.REACT_APP_GITHUB_CLIENT,
    scope: "read:user user:email",
    allow_signup: true,
  };
  const parmas = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${parmas}`;
  return finalUrl;
};

const googleUrl = () => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const config = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT,
    response_type: "code",
    scope: "email profile",
    redirect_uri: "http://localhost:3000/auth/google/callback",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return finalUrl;
};

const kakaoUrl = () => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.REACT_APP_KAKAO_CLIENT,
    redirect_uri: "http://localhost:3000/auth/kakao/callback",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return finalUrl;
};

export { githubUrl, googleUrl, kakaoUrl };
