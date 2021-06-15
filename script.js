const cardContainer = document.getElementById('cards-container')
const page = document.getElementById('page')
const nextBtn = document.getElementById('btn-next')
const prevBtn = document.getElementById('btn-prev')
const addCard = document.getElementById('btn-add')
const addContainer = document.getElementById('add-container')
const closeBtn = document.getElementById('btn-close')
const formAdd = document.getElementById('form-add')
const questionElm = document.getElementById('question')
const answerElm = document.getElementById('answer')
const clearBtn = document.getElementById('clear')
const faClose = document.getElementsByClassName('fa-times')

let currentActiveCard =0
let cardElm=[]
let cardData = getData()

// let cardData=[
//     { question: 'What is JavaScript?',
//         answer:'It is a Programming Language'
//     },
//     { question: 'What is HTML used for?',
//         answer:'It is used for creating web pages'
//     },
//     { question: 'What is a variable?',
//         answer:'A variable is a memory location'
//     }
// ]


function createCards(){
    cardData.forEach((data,index) => createCard(data,index))
}

function createCard(data,index){
    const card = document.createElement('div')
    card.classList.add('card')

    if(index === 0){
        card.classList.add('active')
    }

    card.innerHTML=`<div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
    </div>`

    card.addEventListener('click',()=>card.classList.toggle('show-answer'))
    cardElm.push(card)

    cardContainer.appendChild(card)
    updatePage()

}

function updatePage(){
    page.innerHTML=`${currentActiveCard + 1}/${cardElm.length}`
}

function setData(cards){
    localStorage.setItem('cards',JSON.stringify(cards))
    window.location.reload()
}

function getData(){
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

createCards()

nextBtn.addEventListener('click', ()=>{
    cardElm[currentActiveCard].className = 'card left'
    currentActiveCard += 1

    if(currentActiveCard > cardElm.length -1){
        currentActiveCard = cardElm.length-1
    }

    cardElm[currentActiveCard].className = 'card active'

    updatePage()
})

prevBtn.addEventListener('click', ()=>{
    cardElm[currentActiveCard].className = 'card right'
    currentActiveCard -= 1

    if(currentActiveCard < 0){
        currentActiveCard = 0
    }

    cardElm[currentActiveCard].className = 'card active'

    updatePage()
})

addCard.addEventListener('click',()=> addContainer.classList.add('show'))
closeBtn.addEventListener('click',()=> addContainer.classList.remove('show'))


formAdd.addEventListener('click',()=>{
    const question = questionElm.value
    const answer = answerElm.value
    
    if(question.trim() && answer.trim()){
        let newCard = {question, answer}

        createCard(newCard)

        questionElm.value =''
        answerElm.value=''

        cardData.push(newCard)
        setData(cardData)
    }
})

clearBtn.addEventListener('click', ()=>{
    localStorage.clear()
    cardContainer.innerHTML=''
    window.location.reload()
})



