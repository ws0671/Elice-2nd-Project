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

export { githubUrl };
