import React from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import demoimg from "../images/cryptoicon.png";

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: `Cryptocurrency`,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <div>Loading...</div>;

  return (
    <div className="crypto-card-container mt-12 grid grid-cols-12">
      {cryptoNews?.value?.map((news, i) => (
        <div
          key={i}
          className="col-span-12 sm:col-span-6 lg:col-span-4 gap-3 mx-3 border-l-2 border-primary my-10 shadow-md rounded-lg overflow-hidden hover:shadow-xl ease duration-200"
        >
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="news-image-container flex justify-between">
              <h1 className="text-lg md:text-xl lg:text2-xl font-bold p-3">{news.name}</h1>
              <img
                src={news?.image?.thumbnail?.contentUrl || demoimg}
                alt="News Banner"
                className="w-auto h-20 aspect-auto"
              ></img>
            </div>
            <p className="p-4">
              {news.description > 100
                ? `${news.description.substring(0, 100)}+...`
                : news.description}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
