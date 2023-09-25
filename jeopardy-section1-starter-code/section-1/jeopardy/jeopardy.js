// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
    let randomNumber = 0;
    for (let i = 1; i <= 6; i++) {
        randomNumber = Math.floor(Math.random() * 100);
        console.log(randomNumber);

        let url = 'https://jservice.io/api/category?id=' + randomNumber;
    }
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
function getCategory(catId) {
    return fetch('https://jservice.io/api/category?id=' + catId)
        .then(response => response.json())
        .then(category => {
            return {
                title: category.title,
                clues: category.clues.map(clue => ({
                    question: clue.question,
                    answer: clue.answer,
                    showing: null
                }))
            };
        });
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const table = document.querySelector('#jeopardy');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    categories.forEach(category => {
        const th = document.createElement('th');
        th.textContent = category.title;
        headerRow.appendChild(th);
    });
    thead.append(headerRow);

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        categories.forEach(category => {
            const td = document.createElement('td');
            const clue = category.clues[i];
            td.textContent = clue.showing === 'answer' ? clue.answer : '?';
            td.addEventListener('click', handleClick);
            row.appendChild(td);
        });
        tbody.appendChild(row);
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart() {
    // showLoadingView();
    let randomNumber = 0;
    categories = [];
    for (let i = 1; i <= 6; i++) {
        randomNumber = Math.floor(Math.random() * 100);
        const category = await getCategory(randomNumber);
        categories.push(category);
        console.log(category);
        console.log("---------------------------------------");
    }
    fillTable();

}

setupAndStart();

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO