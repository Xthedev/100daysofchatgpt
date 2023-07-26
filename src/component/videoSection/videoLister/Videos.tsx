import { ReactNode, useEffect, useState } from "react";

const Videos = () => {
  const [videoArray, setVideoArray] = useState<
    {
      videoToggoler: boolean;
      attributes: {
        title: string;
        description: string;
        image: string;
        videourl: string;
        id: number;
      };
    }[]
  >([]);

  const [videolink, setvideolink] = useState<string>("");

  const handleClick = (id: number) => {
    setVideoArray((prevArray) => {
      return prevArray.map((obj, index) => {
        if (index === id) {
          return {
            ...obj,
            videoToggoler: true,
          };
        }
        return { ...obj, videoToggoler: false };
      });
    });

    videoArray.map((items, id) => {
      if (id === id) {
        console.log(items.attributes.videourl);
        let videourllink = items.attributes.videourl;
        let videoId = videourllink.split('v=')[1].split('&')[0]
        console.log(videoId)
        setvideolink(videoId)     
        
        
       
       
      }
    });
  };

  useEffect(() => {
    fetch("http://165.232.79.43:1337/api/challenges", {
      headers: {
        Authorization:
          "Bearer 31a37807c34c3cbcb10702fe9af79a80e1faa8ef2146a7206633ca415a52407f57c68a874bce4ec10bb10e5aeb3c261abb7dbf5e3b6c337f8696e2adbb635f6306714c334e7a529cc5a016edd7a3edcd9decc3d9a695288ca0c5ed71ef48bff2a4ef358fa9c056ba1bce92f384651722adfd2ffdfe8e3d7593d801f64d0673db",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.data);
        setVideoArray(data.data);
      });
  }, []);

  const handleClose = () => {
    setVideoArray((prevArray) => {
      return prevArray.map((obj) => {
        if (obj.videoToggoler === true) {
          return {
            ...obj,
            videoToggoler: false,
          };
        }
        return { ...obj };
      });
    });
  };

  const isAnyVideoToggled = videoArray.some((item) => item.videoToggoler);

  return (
    <>
      <section className="mx-10 md:mx-16 lg:mx-20 h-auto">
        <div className="grid py-3 w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videoArray.map((item, index: number) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="md:h-[250px] hover:shadow-2xl h-[300px] w-[100%] overflow-hidden border flex flex-col shadow-md rounded-md"
            >
              <div className="bg-black w-full h-[60%]">
                <img
                  src={item.attributes.image}
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div>
                <h1 className="mx-2 text-black font-[poppins] text-sm my-2">
                  {item.attributes.title}
                </h1>
                <p className="mx-2 my-2 text-black font-light font-[poppins] text-xs ">
                  {item.attributes.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isAnyVideoToggled && (
        <section className=" fixed top-0  bg-[rgba(0,0,0,0.6)] w-full h-full ">
          <div className="w-full flex justify-center items-center h-full relative">
            <div
              className="absolute w-full h-full z-10 "
              onClick={() => handleClose()}
            ></div>
            <div className=" absolute z-30 w-[90%] bg-black h-[30%] md:h-[90%]">
              {/* <video  src={`${videolink}`} controls className="w-full h-full"></video> */}
              <iframe
                
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videolink}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Videos;
