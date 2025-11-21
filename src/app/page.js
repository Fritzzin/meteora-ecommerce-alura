import styles from "./page.module.css";
import { Categorias } from "./components/Categorias";
import { Produtos } from "./components/Produtos";

async function fetchProdutosApi() {
  const res = await fetch(`https://api.npoint.io/ae7156a63741041f5ce1`);
  if (!res) {
    throw new Error('Nao foi possivel obter os dados');
  }

  const produtos = await res.json();

  return produtos;
}

async function fetchCategoriasApi() {
  const res = await fetch(`https://api.npoint.io/946b79023ed21595e8db`);
  if (!res) {
    throw new Error('Nao foi possivel obter os dados');
  }

  const categorias = await res.json();

  return categorias;
}

async function fetchDadosApi() {
  const produtosPromise = fetchProdutosApi();
  const categoriasPromise = fetchCategoriasApi();
  const [produtos, categorias] = await Promise.all([produtosPromise, categoriasPromise])
  return { produtos, categorias };
}

export default async function Home() {
  const respostasDaApi = await fetchDadosApi();
  const produtos = respostasDaApi.produtos;
  const categorias = respostasDaApi.categorias;
  return (
    <>
      <main className={styles.main}>
        <Categorias categorias={categorias} />
        <Produtos produtos={produtos} />
      </main>
    </>
  );
}
