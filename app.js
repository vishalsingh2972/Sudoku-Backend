const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.getElementById('solve-button');
const solutionDisplay = document.querySelector('#solution');
const squares = 81;
const submission = []; //input data submitted to API

for(let i = 0; i < squares; i++){
  const inputElement = document.createElement('input');
  //inputElement.placeholder = `${i}`; //inputElement.placeholder = 'X'; 
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('min', '1');
  inputElement.setAttribute('max', 9);
  if(i < 27){
      inputElement.classList.add('kesariya');
  }
  if(((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53))){
      inputElement.classList.add('ashok-chakra');
  }  
  if(i > 53){
      inputElement.classList.add('harabhara');
  }

  puzzleBoard.appendChild(inputElement);
}

const jointValues = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(INPUT => {
          if(INPUT.value){
              submission.push(INPUT.value);
          }
          else{
              submission.push('.');
          }
      })
      console.log(submission);
}

const populateValues = (isSolvable, solution) => {
      const inputs2 = document.querySelectorAll('input');
      if(isSolvable && solution){
        inputs2.forEach((INPUT2,index) =>{
            INPUT2.value = solution[index];
        })
        solutionDisplay.innerHTML = 'This is the answer';
      }
      else{
        solutionDisplay.innerHTML = 'This is not solvable';
      }
}

//function calling the API
const solve = () => {

    jointValues();
    const data = submission.join('');
    console.log('data', data);

    const options = {
      method: 'POST',
      url: 'https://solve-sudoku.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
        'X-rapidapi-key': 'enter Rapid API key here'
      },
      data: {
        puzzle: data
      }
  }

    axios.request(options).then(function (response){
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution);
    }).catch(function (error){
      console.log(error);
    });
}

//solveButton.addEventListener('click', jointValues);
solveButton.addEventListener('click', solve);
