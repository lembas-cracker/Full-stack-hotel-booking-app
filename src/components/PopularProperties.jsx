import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import "./popular-properties.css";
import { Link, useLocation } from "react-router-dom";
import { searchParamsFromQuery, searchParamsToQuery } from "../context/SearchContext";

const PopularProperties = () => {
  const location = useLocation();
  const searchParams = searchParamsFromQuery(location.search);
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels/?featured=true&limit=4");

  return (
    <div className="popular">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data?.map((item) => (
            <div className="popular-item" key={item._id}>
              <Link to={`/hotels/${item._id}?${searchParamsToQuery(searchParams)}`}>
                <span className="popular-img-container">
                  <img src={item.photos[0]} alt="" className="popular-img" />
                </span>
              </Link>
              <span className="popular-name">{item.name}</span>
              <span className="popular-city">{item.city}</span>
              <span className="popular-price">Starting from ${item.cheapestPrice}</span>
              {item.rating ? (
                <div className="popular-rating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              ) : (
                <span style={{ color: "gray" }}>Not Rated Yet</span>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PopularProperties;
