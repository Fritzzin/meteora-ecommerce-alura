import styles from "./page.module.css";
import Produto from "@/app/components/Produto";

const urlBase = "http://localhost:3042"

async function fetchProdutoPorSlug(slug) {
  const urlBase = "http://localhost:3042"
  const response = await fetch(`${urlBase}/produtos/${slug}`)
  if (!response) {
    throw new Error("nao foi possivel carregar dados");
  }

  const produto = await response.json();

  return produto;
}

export default async function ProdutoPage({ params }) {
  const produto = await fetchProdutoPorSlug(params.slug);
  return (
    <main className={styles.main}>
      <Produto produto={produto} />
    </main>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`${urlBase}/produtos`);

  const produtos = await res.json();

  return produtos.map((produto) => ({ slug: produto.id.toString() }))
}