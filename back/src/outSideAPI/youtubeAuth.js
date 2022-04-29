import dotenv from "dotenv";
dotenv.config();

// The client ID is obtained from the Google API Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID =
  "402173322407-la29919gqppl6pj7g3kgbmhu299it9pq.apps.googleusercontent.com";
var OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function () {
  gapi.auth.init(function () {
    window.setTimeout(checkAuth, 1);
  });
};

function checkAuth() {
  gapi.auth.authorize(
    {
      client_id: OAUTH2_CLIENT_ID,
      scope: OAUTH2_SCOPES,
      immediate: true,
    },
    handleAuthResult
  );
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    $(".pre-auth").hide();
    $(".post-auth").show();
    loadAPIClientInterfaces();
  } else {
    $("#login-link").click(function () {
      gapi.auth.authorize(
        {
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false,
        },
        handleAuthResult
      );
    });
  }
}

function loadAPIClientInterfaces() {
  gapi.client.load("youtube", "v3", function () {
    handleAPILoaded();
  });
}
