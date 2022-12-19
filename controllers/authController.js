const axios = require('axios');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL, FRONTEND_URL, GOOGLE_FRONTEND_HANDLER } = process.env;
const queryString = require('query-string');
const { authWithGoogle } = require('../services/users');

const googleAuth = (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BACKEND_URL}/auth/google-redirect`,
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(
      ' '
    ),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`);
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  if (!urlParams) return res.json({ message: 'error 2' });
  console.log({ urlParams });

  const code = urlParams.code;
  const tokenData = (
    await axios({
      url: 'https://oauth2.googleapis.com/token',
      method: 'POST',
      data: {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BACKEND_URL}/auth/google-redirect`,
        grant_type: 'authorization_code',
        code,
      },
    })
  ).data;

  if (!tokenData) return res.json({ message: 'error 3' });

  const userData = (
    await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })
  ).data;

  if (!userData) return res.json({ message: 'error 4' });
  const { name, email } = userData;

  const user = await authWithGoogle(name, email);

  const token = user.token;
  const isNew = user.isNewUser;
  const paramsString = queryString.stringify({ name, email, token, isNew });
  const returnRedirectUrl = `${FRONTEND_URL}/${GOOGLE_FRONTEND_HANDLER}?${paramsString}`;

  return res.redirect(returnRedirectUrl);
};

module.exports = {
  googleAuth,
  googleRedirect,
};
