import request from "request";
import cheerio from "cheerio";
import axios from "axios";

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

  getYoutubeDatas: async (keyword) => {
    const params = {
      key: process.env.YOUTUBE_API_KEY,
      q: keyword,
      part: "snippet",
      type: "video",
      maxResults: 5,
      fields: "items(id, snippet(title))",
      videoEmbeddable: true,
    };
    const youtubeDatas = axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params,
      }
    );
    return youtubeDatas;
  },

  getSearchedVideos: async (youtubeDatas) => {
    const searchedVideos = [];
    const videoLists = youtubeDatas.data.items;
    videoLists.forEach((element) => {
      const videoId = element.id.videoId;
      const title = element.snippet.title;
      searchedVideos.push({ videoId, title });
    });
    return searchedVideos;
  },
};

export { OutsideApi };
