import { google } from "googleapis";
import http from "http";
import destroyer from "destroyer";
// The client ID is obtained from the Google API Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
const oauth2Client = new google.auth.OAuth2(
  "402173322407-la29919gqppl6pj7g3kgbmhu299it9pq.apps.googleusercontent.com",
  "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",
  "/"
);
const oauth2Scopes = ["https://www.googleapis.com/auth/youtube"];

let refreshToken = "";
console.log(oauth2Client);
async function authenticate() {
  return new Promise((resolve, reject) => {
    if (refreshToken !== "") {
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });

      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(e);
        }
        resolve(oauth2Client);
      });
    } else {
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: oauth2Scopes,
      });

      const server = http.createServer(async (req, res) => {
        try {
          if (req.url.indexOf("/api/oauth2callback") > -1) {
            const qs = new url.URL(req.url, "http://localhost:5001")
              .searchParams;
            server.destroy();

            const { tokens } = await oauth2Client.getToken(qs.get("code"));
            oauth2Client.credentials = tokens;
            console.log(tokens);
            resolve(oauth2Client);
          }
        } catch (e) {
          opn(authorizeUrl, {
            wait: false,
          }).then((cp) => cp.unref());
        }
      });

      destroyer(server);
    }
  });
}

export { authenticate };

// const youtubeAuth = {
//   // Upon loading, the Google APIs JS client automatically invokes this callback.
//   googleApiClientReady: () => {
//     gapi.auth.init(() => {
//       window.setTimeout(checkAuth, 1);
//     });
//   },

//   checkAuth: () => {
//     gapi.auth.authorize(
//       {
//         client_id: OAUTH2_CLIENT_ID,
//         scope: OAUTH2_SCOPES,
//         immediate: true,
//       },
//       handleAuthResult
//     );
//   },

//   // Handle the result of a gapi.auth.authorize() call.
//   handleAuthResult: (authResult) => {
//     if (authResult && !authResult.error) {
//       $(".pre-auth").hide();
//       $(".post-auth").show();
//       loadAPIClientInterfaces();
//     } else {
//       $("#login-link").click(function () {
//         gapi.auth.authorize(
//           {
//             client_id: OAUTH2_CLIENT_ID,
//             scope: OAUTH2_SCOPES,
//             immediate: false,
//           },
//           handleAuthResult
//         );
//       });
//     }
//   },

//   loadAPIClientInterfaces: () => {
//     gapi.client.load("youtube", "v3", function () {
//       handleAPILoaded();
//     });
//   },
// };
