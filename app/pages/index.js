// Carrega a main assim que reinicia a janela
window.onload = main;

var postArea = null;

const posts = [];

async function main() {
  postArea = document.getElementById("post-area");
  var posts = null;
  try {
    posts = await getPosts();
  } catch (error) {
    alert(error.message);
    return;
  }

  criarPosts(posts);

  // const header = document.getElementsByClassName("header-search")[0];

  // const button = header.getElementsByTagName("button")[0];
  // const input = header.getElementsByTagName("input")[0];
  // button.addEventListener("click", (e) => onClickButton(e, input.value));
}

async function criarPost(post) {
  const postCard = createElementWithClassName("article", "post");

  const deleteButton = createElementWithClassName("button", "delete-post")
  deleteButton.textContent = "Deletar Post"
  deleteButton.addEventListener("click", () => deletarPost(post.id))

  postArea.appendChild(postCard);

  // const fotoAluno = aluno.fotoUrl
  //   ? aluno.fotoUrl
  //   : "https://www.w3schools.com/howto/img_avatar.png";
  // const dataNasc = aluno.dataNasc ? aluno.dataNasc : "não informada";

  postCard.setAttribute("id", post.id);

  const title = createElementWithClassName("h1", "post-title");
  title.textContent = post.title;
  const content = createElementWithClassName("p", "post-content");
  content.textContent = post.content;

  const published_date = createElementWithClassName("p", "post-date")
  published_date.textContent = "Publicado em: " + formatarDAtaDeNascimento(post.createdAt)


  postCard.appendChild(title)
  postCard.appendChild(published_date)
  postCard.appendChild(content);
  postCard.appendChild(deleteButton)
}



function criarPosts(posts) {
  for (i = 0; i < posts.length; i++) {
    var post = posts[i];
    criarPost(post);
  }
}

function formatarDAtaDeNascimento(data) {
  console.log(data)
  const dataNasc = new Date(data);
  const dia = String(dataNasc.getDate()).padStart(2, "0");
  const mes = String(dataNasc.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${dataNasc.getFullYear()}`;
}

function createElementWithClassName(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

// Função assíncrona que pega os alunos da api
// Retorna um array de alunos
async function getPosts() {
  var posts = [];
  await fetch("http://localhost:3000/")
    .catch(() => {
      throw new Error("Não foi possível conectar a API");
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erro ao buscar posts");
    })
    // Pega a resposta e atribui ao objeto alunos
    .then((responseJSON) => {
      posts = responseJSON;
    });
  return posts;
}


async function deletarPost(id){
  const url = `http://localhost:3000/post/${id}`
  await fetch(url, {
        method:"DELETE", 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
}