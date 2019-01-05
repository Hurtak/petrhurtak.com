import React from "react";
import image from "./images/img.jpg";
import video from "./videos/screen.mp4";
import { x } from "./huge.js";

export const metadata = {
  title: "Vim basics",

  description: `
      This article focuses on Vim basics and the use case where you are in a
      terminal in the ssh session and want to quickly edit/explore files within
      the terminal.
    `,

  url: "vim",

  datePublication: "2017-12-17 17:00:00",
  dateLastUpdate: "2017-12-17 17:00:00"
};

const Article = () => (
  <article>
    <h2>Article title {x.length}</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam animi
      ipsam cumque dolorem nesciunt a aut consequuntur error libero eum
      reprehenderit, eligendi obcaecati ducimus, optio, delectus ut impedit
      beatae nam.
    </p>

    <br />
    <br />
    <br />
    <img src={image} alt="" width={300} height={300} />
    <video src={video} controls />
  </article>
);
export default Article;
