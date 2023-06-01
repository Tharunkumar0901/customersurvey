  var questions = [{
      id: 1,
      text: "How satisfied are you with our products?",
      type: "rating",
      options: [1, 2, 3, 4, 5]
  }, {
      id: 2,
      text: "How fair are the prices compared to similar retailers?",
      type: "rating",
      options: [1, 2, 3, 4, 5]
  }, {
      id: 3,
      text: "How satisfied are you with the value for money of your purchase?",
      type: "rating",
      options: [1, 2, 3, 4, 5]
  }, {
      id: 4,
      text: "On a scale of 1-10, how would you recommend us to your friends and family?",
      type: "rating",
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }, {
      id: 5,
      text: "What could we do to improve our service?",
      type: "text",
      options: []
  }];

  // State
  var currentQuestionIndex = 0;
  var surveyData = {};

  // DOM Elements
  var welcomeScreen = document.querySelector('.welcome-screen');
  var surveyScreen = document.querySelector('.survey-screen');
  var completionScreen = document.querySelector('.completion-screen');
  var questionNumberElement = document.getElementById('questionNumber');
  var questionTextElement = document.getElementById('questionText');
  var questionOptionsElement = document.getElementById('questionOptions');
  var startButton = document.getElementById('startButton');
  var previousButton = document.getElementById('previousButton');
  var skipButton = document.getElementById('skipButton');
  var nextButton = document.getElementById('nextButton');
  var submitButton = document.getElementById('submitButton');

  // Event Listeners
  startButton.addEventListener('click', startSurvey);
  previousButton.addEventListener('click', goToPreviousQuestion);
  skipButton.addEventListener('click', skipQuestion);
  nextButton.addEventListener('click', goToNextQuestion);
  submitButton.addEventListener('click', submitSurvey);

  // Functions
  function startSurvey() {
      welcomeScreen.style.display = 'none';
      surveyScreen.style.display = 'block';
      displayQuestion();
  }

  function goToPreviousQuestion() {
      if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          displayQuestion();
      }
  }

  function skipQuestion() {
      if (currentQuestionIndex < questions.length - 1) {
          surveyData[questions[currentQuestionIndex].id] = "Skipped";
          currentQuestionIndex++;
          displayQuestion();
      }
  }

  function goToNextQuestion() {
      var answer = getSelectedAnswer();
      if (answer !== null) {
          surveyData[questions[currentQuestionIndex].id] = answer;
          currentQuestionIndex++;
          if (currentQuestionIndex === questions.length - 1) {
              nextButton.style.display = 'none';
              submitButton.style.display = 'inline-block';
          }
          if (currentQuestionIndex === questions.length) {
              completeSurvey();
          } else {
              displayQuestion();
          }
      }
  }

  function getSelectedAnswer() {
      var options = document.getElementsByName('answer');
      for (var i = 0; i < options.length; i++) {
          if (options[i].checked) {
              return options[i].value;
          }
      }
      return null;
  }

  function displayQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      questionNumberElement.textContent = (currentQuestionIndex + 1) + '/' + questions.length;
      questionTextElement.textContent = currentQuestion.text;
      questionOptionsElement.innerHTML = '';

      if (currentQuestion.type === 'rating') {
          var options = currentQuestion.options;
          for (var i = 0; i < options.length; i++) {
              var optionLabel = document.createElement('label');
              optionLabel.classList.add('rating-label');
              optionLabel.textContent = options[i];
              var optionInput = document.createElement('input');
              optionInput.setAttribute('type', 'radio');
              optionInput.setAttribute('name', 'answer');
              optionInput.setAttribute('value', options[i]);
              optionLabel.appendChild(optionInput);
              questionOptionsElement.appendChild(optionLabel);
          }
      } else if (currentQuestion.type === 'text') {
          var textInput = document.createElement('textarea');
          textInput.classList.add('text-input');
          textInput.setAttribute('name', 'answer');
          textInput.setAttribute('placeholder', 'Please provide your feedback');
          questionOptionsElement.appendChild(textInput);
      }
  }

  function completeSurvey() {
      surveyScreen.style.display = 'none';
      completionScreen.style.display = 'block';
      saveSurveyData();
  }

 
  
function saveSurveyData() {

  var surveyData = { /* survey data object */ };
  var jsonData = JSON.stringify(surveyData);
  localStorage.setItem("surveyData", jsonData);
  console.log("Survey data saved to local storage.");
  }
function getSurveyData() {
  var jsonData = localStorage.getItem("surveyData");
  if (jsonData) {
    var surveyData = JSON.parse(jsonData);
    console.log("Survey data retrieved from local storage:")     
    console.log(surveyData);

  } else {
    console.log("No survey data found in local storage.");

  }

}



  function submitSurvey() {
      var answer = getSelectedAnswer();
      if (answer == null) {
          surveyData[questions[currentQuestionIndex].id] = answer;
          completeSurvey();
      }
  }
