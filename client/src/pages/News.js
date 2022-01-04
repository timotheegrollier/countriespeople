import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Article from "../components/Article";
import axios from "axios";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [noAuthor, setNoAuthor] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/articles")
      .then((res) => {setNewsData(res.data) }) ;
      
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.length < 2) {
      setNoAuthor(true);
    } else {
      setNoAuthor(false);
      if (content.length < 25) {
        setError(true);
      } else {
        axios
          .post("/articles", {
            author,
            content,
            date: Date.now(),
          })
          .then(() => {
            setError(false);
            setAuthor("");
            setContent("");
            getData();
          });
      }
    }
  };

  return (

  <div className="news-container">
      <Navigation />
      <Logo />
      <h1>News</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Nom"
          value={author}
        />
        {noAuthor && <p>Veuillez écrire un Nom</p>}
        <textarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message"
          value={content}
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
        ></textarea>
        {error && <p>Veuillez écrire un minimun de 25 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
    {newsData
      .sort((a, b) => b.date - a.date)
      .map((article) => (
        <Article key={article._id} article={article} />
      ))}
  </ul>
    </div>
  );
};

export default News;



