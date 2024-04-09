document.addEventListener("DOMContentLoaded", main)

function main() {
    const btn = document.getElementById("submit-button").addEventListener("click", (event) => createPost(event))
}

async function createPost(event){
    event.preventDefault()
    const form = document.getElementById("post-form")
    const inputs = form.querySelectorAll("input")

    const data = {title: "", content: ""}
    inputs.forEach((input) => { 
        data[input.name] = input.value
    })

    console.log(data)

    await fetch("http://localhost:3000/posts", {
        method:"POST", 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => console.log(res))
}