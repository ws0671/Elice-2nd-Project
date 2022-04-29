import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.innerHTML = `         
      var OAUTH2_CLIENT_ID =
      "402173322407-la29919gqppl6pj7g3kgbmhu299it9pq.apps.googleusercontent.com";
      var OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];
  
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
   `;
    script1.type = "text/javascript";
    script1.async = "async";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `         
      handleAPILoaded = () => {
        $("#search-button").attr("disabled", false);
      };
  
      search = () => {
        console.log("Search Started");
        var apiKey = "AIzaSyAjRdhq7W78Q7IQY62PxNfq8FXopVAlCn4";
        var q = "게임 리뷰";
      
        gapi.client.setApiKey(apiKey);
        gapi.client.load("youtube", "v3", () => {
          isLoad = true;
        });
        console.log("Search Request");
      
        var request = gapi.client.youtube.search.list({
          q: q,
          part: "snippet",
          type: "video",
          maxResults: 5,
          fields: "items(id, snippet(title, publishedAt))",
          videoEmbeddable: true,
        });
      
        request.execute((res) => {
          const videoIdList = res.result.items;
          videoIdList.forEach((element) => console.log(element.id.videoId));
      
          videoIdList.forEach((element) => {
            $("#seachResultIframe").append(
              "<iframe id='seachVideo' width='560' height='315' src='https://www.youtube.com/embed/" +
                element.id.videoId +
                "?rel=0&enablejsapi=1'frameborder='0' allow='fullscreen'></iframe>"
            );
          });
        });
      };
   `;
    script2.type = "text/javascript";
    script2.async = "async";
    document.head.appendChild(script2);
  }, []);

  return (
    <>
      {/* <div id="buttons">
        <label>
          <input id="query" value="게임 리뷰" type="text" />
          <Button id="search-button">Search</Button>
        </label>
      </div> */}
      <div id="seachResultIframe"></div>
    </>
  );
}

export default App;
