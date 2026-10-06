import { NavBar } from "../components/NavBar";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch("http://localhost:3000/api/articles");

    //simulacion
  const articles = [
    { id: 1, title: "Primer artículo", excerpt: "Resumen del primero", author: "agustin" },
    { id: 2, title: "Segundo artículo", excerpt: "Resumen del segundo", author: "ivan" },
  ];

  // if (isLoading) return <p>Cargando artículos...</p>;
  // if (error) return <p>{error}</p>;
  if (articles.length === 0) return <p>No hay artículos publicados</p>;

  return (
    <>
        <header>
            <NavBar />
        </header>
        <main>
            <h1>Artículos</h1>
        {/* map recorre el array y dibuja un bloque por cada artículo.
            "article" es el elemento de cada vuelta.
            key={article.id}: React usa el id para distinguir cada elemento de la lista.
            La consigna pide el id y no el índice, porque el índice cambia si la lista se reordena. */}
        {articles.map((article) => (
            <article key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <p>Autor: {article.author}</p>
            </article>
        ))}
        </main>
    </> 
  );
};