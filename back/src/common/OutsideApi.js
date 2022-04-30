import request from "request";
import cheerio from "cheerio";
import { google } from "googleapis";
import { authenticate } from "./youtubeAuth";

const OutsideApi = {
  // 온라인: "O" | PC: "P" | 비디오: "V" | 웹게임: "W" | 모바일: "M"
  getNews: async (category) => {
    console.log("getNews function");
    return new Promise((res, rej) => {
      request(
        {
          url: `https://www.gamemeca.com/news.php?ca=${category}`,
          method: "GET",
        },
        (error, response, body) => {
          if (error) {
            console.error(error);
            rej(new Error("error"));
          }
          if (response.statusCode === 200) {
            console.log("response ok");
            // cheerio를 활용하여 body에서 데이터 추출
            const $ = cheerio.load(body);
            const list_news = $(
              "#content > div.news-list > div > ul > li"
            ).toArray(); // 한 페이지는 뉴스 15개

            const result = [];
            list_news.forEach((li) => {
              // result에 1. 뉴스글 url / 2. 뉴스 썸네일 / 3. 뉴스제목
              const aTag = $(li).find("a");
              const path = aTag.attr("href"); // 첫번째 <a> 태그 href
              const url = `https://www.gamemeca.com/${path}`; // 도메인을 붙인 url 주소

              const thumbnail = aTag.find("img").attr("src"); // 썸네일 url

              const divTag = $(li).find("div").first();
              const title = divTag.find("strong").find("a").text().trim();

              result.push({ url, thumbnail, title });
            });
            res(result);
          }
        }
      );
    });
  },

  getYoutubeDatas: async (oauth2Client, keyword) => {
    console.log("getYoutubeVideos function");
    const service = google.youtube("v3");

    console.log("Search Request");
    const res = await service.search.list({
      auth: oauth2Client,
      // key: "AIzaSyAjRdhq7W78Q7IQY62PxNfq8FXopVAlCn4",
      q: keyword,
      part: "snippet",
      type: "video",
      maxResults: 5,
      fields: "items(id, snippet(title, publishedAt))",
      videoEmbeddable: true,
      // order: "viewCount",
    });
    if (res.statusCode === 200) {
      if (res.data.items == null || res.data.items.length === 0) {
        throw new Error("데이터가 존재하지 않습니다.");
      }

      return res.data;
    }
  },

  getSeachedVideos: async () => {
    console.log("getSeachedVideos function");
    let client = await authenticate();
    console.log(client);
    let searchList = await getYoutubeDatas(client, "게임 리뷰");

    console.log(JSON.stringify(searchList.items, null, 4));
  },
};

export { OutsideApi };

// return new Promise((res, rej) => {
// (error, response) => {
//   if (error) {
//     console.log(error);
//     rej(error);
//   }
//   if (response.statusCode === 200) {
//     console.log("response ok");
//     const videoIdList = res.result.items;
//     res(videoIdList);
//   }
//   if (videoIdList.length == 0) {
//     console.log("검색된 동영상이 없습니다.")
//   } else {
//       console.log(JSON.stringify(videoIdList))
//       res(videoIdList)
//   }
//     }
//   );

//   request.execute((res) => {
//     // console.log(res.result);
//     const videoIdList = res.result.items;
//     videoIdList.forEach((element) => console.log(element.id.videoId));
//     res(videoIdList);
//   });
//     });
//   },
