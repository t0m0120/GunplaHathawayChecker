// import fetch from "node-fetch";
import * as axios from "axios";
require('dotenv').config();

export const RAKUTEN_SEARCH_API = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706`;

const mapStories = {
  Xi: "HG クスィーガンダム",
  Penelope: "HG ペーネロペー",
  Messer: "HG メッサー",
  GustavKarl: "HG グスタフ・カール",
};

const get = (path, keyword, page) => {
  return axios
    .get(path, {
      headers: { "User-Agent": "chrome" },
      params: {
        applicationId: process.env.RAKUTEN_APP_ID,
        affiliateId: process.env.RAKUTEN_AFFI_ID,
        sort: "+itemPrice",
        keyword,
        NGKeyword: decodeURIComponent("デカール"),
        page,
        genreId: 0,
      },
    })
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      // 
    });
};

export function getGunpla(name, page) {
  
  const error_name = name === "favicon.ico" ? "Xi" : null;
  const search_keyword = mapStories[error_name || name];
  
  if (!search_keyword) [];
  return get(`${RAKUTEN_SEARCH_API}`, search_keyword, page);
}
