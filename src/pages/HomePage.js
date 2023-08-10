import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";

import "./styles.scss";

const HomePage = () => {
  const [outputImage, setOutputImage] = useState();
  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const [loading, setLoading] = useState(false);

  async function loadImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function convertToWebP(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(blob);
      }, "image/webp");
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const image = await loadImage(file);
    const webpDataURL = await convertToWebP(image);
    setOutputImage(webpDataURL);

    setLoading(false);
  };

  console.log(outputImage);
  return (
    <MainLayout classname="home">
      <h2>WEBP Converter</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="image"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Convert</button>
      </form>
      {loading && <>Loading...</>}
      {outputImage && (
        <div className="output_container">
          <img src={outputImage} />
          <a href={outputImage} download={file.name.split(".")[0] + ".webp"}>
            Download
          </a>
        </div>
      )}
    </MainLayout>
  );
};

export default HomePage;
