const questions = [
    {
        question: "1) When someone disagrees with you, do you:",
        options: ["(a) Try to understand their perspective and have a calm discussion.", "(b) Get defensive and try to win the argument.", "(c) Shut down the conversation and avoid the topic.", "(d) Hold a grudge and bring it up later."],
        points: [5, 3, 0, 10]
    },
    {
        question: "2) When faced with a challenge, do you:",
        options: ["(a) Exercise or meditate.", "(b) Talk to friends or family.", "(c) Ignore it and hope it goes away.",
            "(d) Get angry or frustrated."],
        points: [10, 5, 0, -5]
    },
    {
        question: "3) Jealousy can creep up sometimes. Imagine your partner is getting friendly with someone new. How do you handle that feeling?",
        options: ["(a)I trust my partner and would have an open conversation if anything felt off.", "(b) A little green-eyed monster might appear, but I'd communicate openly.", "(c) I'd keep a close eye on things and maybe confront them (or the other person).",
            "(d)  I'd get super insecure and might lash out without thinking."],
        points: [10, 5, 0, -5]
    },
    {
        question: "4)Let's talk about forgiveness. Can you forgive someone who has truly hurt you, or do you hold grudges?",
        options: ["(a)Forgiveness is possible, but it depends on the situation and their effort to make amends.", "(b) I might take time to forgive, but I believe in second chances.", "(c) Holding grudges can be a burden, but it's hard to let go of some things.",
            "(d) Forgiveness is too difficult. I'd likely cut ties and move on."],
        points: [10, 7, 3, 0]
    },
    {
        question: "5)Let's talk about forgiveness. Can you forgive someone who has truly hurt you, or do you hold grudges?",
        options: ["(a) I evaluate my current relationship and discuss my feelings openly if needed. ", "(b)I keep my feelings to myself and focus on my partner.", "(c) I entertain thoughts of the crush but don’t act on them.",
            "(d) I pursue the crush and consider leaving my partner."],
        points: [10, 7, 3, 0]
    },
    {
        question: "6)Let's talk about forgiveness. Can you forgive someone who has truly hurt you, or do you hold grudges?",
        options: ["(a)  I try to control how often they see their friends. ", "(b) I’m okay with it but prefer they don't do it too often. ", "(c) I feel uneasy and worry they might neglect me.", "(d)I encourage it and enjoy my own time too. "],
        points: [0, 7, 3, 10]
    }

]
let currentQuestionIndex = 0;
let selectedOptions = Array(questions.length).fill(null);
let selectedOptionsPoints = Array(questions.length).fill(null);



function createquestion(questiondata, index) {
    const { question, options, points } = questiondata;
    let html = ` <div class="container">
        <div class="card">
            <div class="question">
                <h2>${question}</h2>
            </div>
            <div class="options">
                <ul class="optionslist">
                ${options.map((option, i) => `
                    <li data-index="${i}" data-points="${points[i]}" class="${selectedOptions[index] === i ? 'checked' : ''}">
                        ${option}
                    </li>`).join('')}
                </ul>
            </div>

            <div class="move">
                <button class="prev" ${currentQuestionIndex === 0 ? 'disabled' : ''}> <-prev</button>
                <button class="next"> next-></button>
                
                
            </div>
        </div>
    </div>`

    document.querySelector(".container").innerHTML = html;
    attachOptionsListener();
    attachNavigationListeners();
}


function callCreateQuestion() {
    createquestion(questions[0]);
}



function attachOptionsListener() {
    const optionslist = document.querySelector('.optionslist');

    // Check if the element exists before adding the event listener
    if (optionslist) {
        optionslist.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                const selectedIndex = parseInt(e.target.dataset.index);
                selectedOptions[currentQuestionIndex] = selectedIndex;
                const selectedIndexPoints = parseInt(e.target.dataset.points);
                selectedOptionsPoints[currentQuestionIndex] = selectedIndexPoints;

                const options = optionslist.querySelectorAll('li');
                options.forEach(option => option.classList.remove('checked'));

                e.target.classList.add('checked');
            }
        }, false);
    }
}

function attachNavigationListeners() {
    document.querySelector('.prev').addEventListener('click', function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            createquestion(questions[currentQuestionIndex], currentQuestionIndex);
        }
    });

    document.querySelector('.next').addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            createquestion(questions[currentQuestionIndex], currentQuestionIndex);
        } else {

            let totalScore = 0;
            for (let i = 0; i < selectedOptionsPoints.length; i++) {
                if (selectedOptionsPoints[i] !== null) {  // Check if option selected
                    totalScore += selectedOptionsPoints[i];
                }
            }
            let flag , col;
            if(totalScore < 50)
                {
                    flag = "Red"
                    col = "#ff0000"
                }
                else{
                    flag = "Green"
                    col = "#25d322"
                }
            let html = ` <div class="Rescard">
        <span><svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:${col};" d="M259.115,25.984C233.19,19.499,206.387,12.8,179.2,12.8c-36.19,0-76.015,12.109-109.261,33.22 L64,49.783v235.119l19.661-12.476C112.913,253.85,147.738,243.2,179.2,243.2c24.013,0,48.145,6.033,73.685,12.416 c25.924,6.485,52.736,13.184,79.915,13.184c26.65,0,82.099,0,111.454-29.346l3.746-3.746V16.538l-21.854,0.017 C404.301,38.4,356.011,38.4,332.8,38.4C308.779,38.4,284.655,32.367,259.115,25.984z"></path> <path style="fill:#ffffff;" d="M51.2,0v512h25.6V293.069C100.292,273.732,140.177,256,179.2,256 c22.443,0,45.824,5.845,70.588,12.032c26.675,6.673,54.255,13.568,83.012,13.568c28.373,0,87.407,0,120.499-33.101 c4.804-4.796,7.501-11.307,7.501-18.099V25.6c0-10.351-6.238-19.686-15.804-23.654C441.83,0.64,438.502,0,435.209,0 c-6.665,0-13.21,2.603-18.108,7.501C398.993,25.6,352.606,25.6,332.8,25.6c-22.443,0-45.824-5.845-70.579-12.032 C235.546,6.895,207.957,0,179.2,0c-37.171,0-73.429,11.682-102.4,27.273V0H51.2z M179.2,25.6c51.209,0,102.4,25.6,153.6,25.6 c25.6,0,76.8,0,102.4-25.6c0,51.2,0,128,0,204.8C409.6,256,358.4,256,332.8,256c-51.2,0-102.409-25.6-153.6-25.6 c-37.53,0-74.957,13.798-102.4,31.215v-204.8C104.252,39.39,141.679,25.6,179.2,25.6z"></path> </g></svg></span>
        <h2>Ohh ! You are A ${flag}Flag</h2>
        <h3>your score is ${totalScore}</h3>
        </div>`

        document.querySelector(".container").innerHTML = html;
        }

       
    });
}

