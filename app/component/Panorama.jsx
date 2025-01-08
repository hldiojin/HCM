import React from "react";
import ReactPannellum, { getConfig } from "react-pannellum";

const Tour3D = () => {
  const handleClick = () => {
    console.log(getConfig());
  };

  const config = {
    autoLoad: true,
    autoRotate: -2,
    showControls: true,
    showZoomCtrl: true,
    showFullscreenCtrl: true,
    preview: "/anh-bai-viet-panorama.jpg",
    orientationOnByDefault: true,
    compass: true,
  };

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="https://cdn2.hoc247.vn/image/lessionnet/2019/20190218/thumbnail/470x246/22_1550826877.jpg"
        config={config}
        style={{ width: "100%", height: "400px" }}
      />
      <div onClick={handleClick}></div>
    </div>
  );
};

export default Tour3D;
