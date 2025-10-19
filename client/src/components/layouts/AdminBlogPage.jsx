import React from "react";

export const AdminBlogPage = () => {
  const htmlContent =
    "<div>Hey there! 👋</div><div><br></div><div>I’m excited to finally introduce you to Blogify—my personal project and a platform I’ve been working on with a lot of love and dedication. It’s been quite a journey, and I can’t wait to share it with you!</div><div><br></div><div>Blogify is a simple, user-friendly blogging platform that I created with one goal in mind: to make it easier for anyone (including myself!) to share their thoughts, ideas, and creativity with the world. Whether you’re a beginner blogger or someone who’s been at it for a while, Blogify is here to provide a smooth, enjoyable experience that lets you focus on writing, not worrying about the technical stuff.</div><div><br></div><div><b>Built with the MERN Stack &amp; TailwindCSS</b></div><div><br></div><div>As a developer, I wanted to challenge myself and use modern tools to build Blogify. I decided to use the MERN stack (MongoDB, Express.js, React, Node.js) to power the back-end and front-end of the platform. This combination gave me the flexibility to build a highly dynamic and scalable platform.</div><div><br></div><div><ul><li><i><u>MongoDB:</u></i> For the database, I went with MongoDB, which allowed me to easily store and manage the content posted by users in a flexible way.</li><li><br></li><li><i><u>Express.js &amp; Node.js:</u></i> These two worked together on the back-end to handle all of the server-side logic and routing. Express made it easy to build RESTful APIs, while Node.js provided the fast and reliable runtime for my server.</li><li><br></li><li><i><u>React:</u></i> The front-end is powered by React, which made the development process efficient, especially for handling dynamic content. It also provides a smooth user experience with fast page loading and easy updates.</li><li><br></li><li><u><i>TailwindCSS:</i></u> For styling, I chose TailwindCSS, which helped me quickly design a clean, responsive layout without getting bogged down in writing custom CSS. It made the whole process more enjoyable and gave the platform a modern, minimalist feel.</li></ul></div><div><br></div><div>Building Blogify with these technologies allowed me to create something both functional and scalable, while still being personal and simple to use.</div><div><br></div><div><b>A Platform Built for Writers, By a Writer</b></div><div><br></div><div>This platform isn’t about impressing others with fancy features—it’s about building something that I, as a writer, would love to use. Whether you're writing your first blog post or you're an experienced creator looking for a simpler place to publish, Blogify was made with love and a little bit of personal struggle in mind (I’ve spent way too many hours figuring out themes and plugins on other platforms!).</div><div><br></div><div><b>What’s Next for Blogify?</b></div><div><br></div><div>I’m still in the early stages with Blogify, and there’s a lot more I want to do. I plan to continually improve the platform, add new features, and potentially make it easier for others to share their own blogs in the future.</div><div><br></div><div>For now, I’m excited to have this space to experiment, share, and learn. Who knows where this journey will take me, but I’m looking forward to it!</div><div><br></div><div><b>Join Me on This Journey</b></div><div><br></div><div>If you’re reading this, thank you so much for checking out Blogify. I’m happy you’re here! Feel free to browse around, read my posts, and maybe even start your own blog if you’re feeling inspired.</div><div><br></div><div>This is just the beginning, and I’m excited to see where this project takes me (and you!). If you have any thoughts or feedback, don’t hesitate to reach out—I’d love to hear what you think!</div><div><br></div><div>Thanks for reading, and happy blogging! ✍️</div>";

  return (
    <>
      <img
        src={`http://localhost:8001/images/thumbnail.png`}
        alt="thumbnail"
        className="w-full h-full object-cover pt-21 justify-self-center aspect-5/2"
      />
      <div className="flex flex-col min-h-screen max-w-screen mx-30 items-start pt-15 pb-20 space-y-5">
        <h1 className="text-4xl text-white/90 font-bold">Introducing Blogify</h1>
        <div className="font-semibold text-white/50 text-xl"> - Admin</div>
        <div className="para text-white/85 pt-10">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </>
  );
};
