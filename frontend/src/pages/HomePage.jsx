import { Navbar } from "../components/NavBar";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles",
  );

  //simulacion
  const articles = [
    {
      id: 1,
      title: "Primer artículo",
      excerpt: "Resumen del primero",
      author: "agustin",
    },
    {
      id: 2,
      title: "Segundo artículo",
      excerpt: "Resumen del segundo",
      author: "ivan",
    },
  ];

  // if (isLoading) return <p>Cargando artículos...</p>;
  // if (error) return <p>{error}</p>;
  // NUEVO: el mensaje de lista vacía también lleva estilo (centrado, gris, con margen arriba).
  if (articles.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No hay artículos publicados
      </p>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="shadow-md">
        <Navbar />
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Artículos</h1>
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No hay artículos publicados
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-3">{article.excerpt}</p>
                <p className="text-sm text-gray-500">Autor: {article.author}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
