// After the API loads, call a function to enable the search box.
handleAPILoaded = () => {
  $("#search-button").attr("disabled", false);
};

// Search for a specified string.
search = () => {
  console.log("Search Started");
  var apiKey = "AIzaSyAjRdhq7W78Q7IQY62PxNfq8FXopVAlCn4";
  var q = $("#query").val();

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
    // order: "viewCount",
  });

  request.execute((res) => {
    // console.log(res.result);
    // var documentStr = JSON.stringify(res.result);
    // $("#search-container").html("<pre>" + documentStr + "</pre>");
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
