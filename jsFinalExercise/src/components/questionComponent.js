class QuestionComponent extends HTMLElement{

   questions = [];
   shadowRoot;
   
   constructor(){
      super();
      this.checkQuestions(); 
      this.shadowRoot = this.attachShadow({mode: 'open'});
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.getAttribute('css');
      this.shadowRoot.appendChild(link);
   }  

   build(){
      
      this.shadowRoot.appendChild(this.createQuestionForm());
   }

   checkQuestions() {
      const intervalId = setInterval(() => {
        if (this.questions.length > 0) {
          clearInterval(intervalId);
          this.build();
        }
      }, 100);
  
      setTimeout(() => {
        if (this.questions.length === 0) {
          clearInterval(intervalId);
          console.error('Error: Questions data not loaded within 10 seconds.');
        }
      }, 10000);
    }

   async connectedCallback(){
      this.questions = await this.getQuestions();
   }

   async getQuestions(){
      const response = await fetch('./data/questions.json')
      const data = await response.json();
      return data.questions;
   }

   createQuestion(title, answers, index){
      const $questionContainer = document.createElement('div');
      $questionContainer.className = 'question';
      const $questionTitle = document.createElement('p');
      $questionTitle.textContent = index + ". " + title;
      $questionContainer.appendChild($questionTitle);

      const $answersContainer = document.createElement('div');
      answers.forEach(answer => {
         const $alternative = document.createElement('input');
         $alternative.type = 'radio';
         $alternative.name = 'inputQuestion' + index;
         $alternative.value = answer;
         $alternative.id = 'inputQuestion' + index + answer;
         $alternative.required = true;
         $alternative.className = 'alternativeInput';


         const $label = document.createElement('label');
         $label.textContent = answer;
         $label.htmlFor = 'inputQuestion' + index + answer;
         $label.className = 'alternativeLabel';


         $label.appendChild($alternative);
         $answersContainer.appendChild($label);
      });
      $questionContainer.appendChild($answersContainer);
      return $questionContainer;
   }

   createQuestionForm(){
      const $form = document.createElement('form');
      this.questions.forEach((question, index) => {
         const $question = this.createQuestion(question.question, question.options, index + 1);
         $form.appendChild($question);
      });

      const $submitButton = document.createElement('button');
      $submitButton.type = 'submit';
      $submitButton.textContent = 'Submit';
      $form.appendChild($submitButton);
      $form.addEventListener('submit', (ev) => {
         this.formSubmit(ev);
         $form.reset();
      } )
      return $form;
   }

   formSubmit(event){
      event.preventDefault();
      const $answersInput = this.shadowRoot.querySelectorAll('.alternativeInput:checked');
      const $answers = Array.from($answersInput).map($input => $input.value);
      this.compareResults($answers);
   }

   compareResults(answers){
      const correctAnswers = this.questions.map(question => question.answer);
      const markedCorrectAnswers = answers.map((answer, index) => answer.toString() === correctAnswers[index]);
      window.scrollTo(0, 0);
      window.alert('You got ' + markedCorrectAnswers.filter(answer => answer).length + ' correct answers');
   }
   
}
customElements.define('question-component', QuestionComponent);