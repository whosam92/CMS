import { useEffect, useState } from "react";

function fetchRandomVideos(apiKey, query, setVideos) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&maxResults=10&key=${apiKey}&relevanceLanguage=en`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length >= 3) {
        const shuffled = data.items.sort(() => 0.5 - Math.random());
        setVideos(shuffled.slice(0, 3));
      }
    })
    .catch((error) => console.error("Error fetching YouTube videos:", error));
}

export default function Youtube() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = "AIzaSyC3zztIGyRXGt2CVrZPihrAPinqJscdXz4";
  const query = "Construction Building Timelapse";

  useEffect(() => {
    fetchRandomVideos(apiKey, query, setVideos);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {
        /* Youtube Start */
        <div className="container-xxl py-5">
          <div className="container">
            {videos.length > 0 ? (
              <div
                className="carousel-container"
                style={{
                  position: "relative",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <div
                  className="video-container"
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                    src={`https://www.youtube.com/embed/${videos[currentIndex].id.videoId}`}
                    title={videos[currentIndex].snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  ></iframe>
                </div>
                <button
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                >
                  &#8249;
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                >
                  &#8250;
                </button>
              </div>
            ) : (
              <p
                style={{
                  color: "orange",
                  textAlign: "center",
                  fontSize: "1.2rem",
                }}
              >
                Loading videos...
              </p>
            )}
          </div>
        </div>
        /* Youtube End */
      }
    </>
  );
}
