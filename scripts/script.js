const data = [
  {
    pergunta: "Quantas pernas tem um cavalo?",
    respostas: ["1", "2", "6", "4"],
    respostaCorreta: "4" 
  },
  {
    pergunta: "Quantas portas tem uma moto?",
    respostas: ["0", "2", "75", "10"],
    respostaCorreta: "0"
  }
]

const quiz = {
  acertos: 0,
  erros: 0,
  countQuests: 0,
  cancel() {
    const divRespostas = document.querySelector(".divRespostas")
    const divPergunta = document.querySelector(".divPergunta")
    const img = document.querySelector("img")
    img.setAttribute('src', './assets/quest.svg')
    divPergunta.innerText = "Pergunta"
    quiz.countQuests = 0
    quiz.erros = 0
    quiz.acertos = 0
    divRespostas.innerHTML = "" 
    buttonIniciar.removeAttribute("disabled", "")
  },
  skip() {
    const divRespostas = document.querySelector(".divRespostas")
    quiz.countQuests += 1
    quiz.erros += 1
    divRespostas.innerHTML = "" 
    quiz.mostrarQuest()
  },
  results() {
    const inputSelected = document.querySelector('input.clicado')
    const valueInput = inputSelected.getAttribute("value")
    if(valueInput == data[quiz.countQuests].respostaCorreta) {
      quiz.acertos += 1
    }else {
      quiz.erros += 1
    }
  },
  toogleClassSelecionado() {
    const inputs = document.querySelectorAll('input')

    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        inputs.forEach((input)=>{input.classList.remove('clicado')})
        input.classList.add('clicado')
      })
    })
  },
  nextQuest() {
    quiz.results()
    const divRespostas = document.querySelector(".divRespostas")
    divRespostas.innerHTML = "" 
    quiz.countQuests += 1
    quiz.mostrarQuest()
  },
  prepareResp(res) {
    const divRespostas = document.querySelector(".divRespostas")
    const inputRadio = document.createElement("input")
    const label = document.createElement("label")
    const div = document.createElement("div")
    const idInput = "res" + res

    inputRadio.setAttribute("type", "radio")
    inputRadio.setAttribute("name", "res")
    inputRadio.setAttribute("value", res)
    inputRadio.setAttribute("id", idInput)
    label.setAttribute("for", "res" + res)
    label.innerText = res

    div.appendChild(inputRadio)
    div.appendChild(label)

    divRespostas.appendChild(div)
    // divRespostas.appendChild(inputRadio)
    // divRespostas.appendChild(label)
  },
  mostrarQuest() {
    const divPergunta = document.querySelector(".divPergunta")
    if(quiz.countQuests <= data.length-1) {
      buttonIniciar.setAttribute("disabled", "")
      buttonPular.removeAttribute("disabled", "")
      buttonCancelar.removeAttribute("disabled", "")
      divPergunta.innerText = data[quiz.countQuests].pergunta
      data[quiz.countQuests].respostas.forEach((res) => {
        quiz.prepareResp(res)
      })
      quiz.toogleClassSelecionado()
    } else {
      const divRespostas = document.querySelector(".divRespostas")
      const img = document.querySelector("img")
      img.setAttribute('src', './assets/winner.svg')
      divRespostas.innerText = `Você acertou ${quiz.acertos} perguntas e errou ${quiz.erros} perguntas`
      buttonIniciar.removeAttribute("disabled", "")
      divPergunta.innerText = "Fim!"
      quiz.countQuests = 0
      buttonIniciar.innerText = "Tentar novamente"
      buttonPular.setAttribute("disabled", "")
      buttonCancelar.setAttribute("disabled", "")
    }
  }
}

const buttonIniciar = document.querySelector('.buttonIniciar')
buttonIniciar.addEventListener('click', () => {
  const img = document.querySelector("img")
  img.setAttribute('src', './assets/quest2.svg')
  quiz.mostrarQuest()
})

const buttonEnviarRes = document.querySelector('.buttonEnviarRes')
buttonEnviarRes.addEventListener('click', quiz.nextQuest)

const buttonPular = document.querySelector('.buttonPular')
buttonPular.addEventListener('click', quiz.skip)

const buttonCancelar = document.querySelector('.buttonCancelar')
buttonCancelar.addEventListener('click', quiz.cancel)