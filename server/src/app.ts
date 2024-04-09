const express = require("express");
const { PrismaClient } = require("@prisma/client");

const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
app.use(cors());


// Middleware para dar parse no json que vem na requisição
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Requisição para buscar os posts
app.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// Requisição para exibir determinado post completo

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.json(post);
});


app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  const result = await prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  })

  res.json(result)
});


// Requisição para criar post

app.post("/posts", async (req, res) => {
  const body = req.body;
  console.log(body);
  // Criando um novo post

  try {
    const created = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    res.status(201).json(created);
  } catch (e) {
    console.log(e);
  }
});

// Executar server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
