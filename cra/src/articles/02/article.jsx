import React from "react";
import image from "./images/img.jpg";
import video from "./videos/screen.mp4";
import { x } from "./huge.js";

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
