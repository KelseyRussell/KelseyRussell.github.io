document.addEventListener('DOMContentLoaded', function() {
    var numberBox = document.getElementById('numberBox');
    var responseSection = document.getElementById('responseSection');
    var submitButton = document.getElementById('submitButton');
    var container = document.querySelector('.container');
  
    function generateRandomNumber() {
      return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    }
  
    function showResponseSection() {
      responseSection.style.display = 'block';
    }
  
    function createNewResponseSection() {
      var newResponseSection = document.createElement('div');
      newResponseSection.classList.add('response-section');
  
      var newNumberBox = document.createElement('div');
      newNumberBox.classList.add('number-box');
      var newRandomNumber = generateRandomNumber();
      newNumberBox.innerText = newRandomNumber;
  
      var newInputLabel = document.createElement('label');
      newInputLabel.setAttribute('for', 'response');
      newInputLabel.textContent = 'Is this your number? (Type "yes" or "no")   ';
  
      var newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');
      newInput.setAttribute('class', 'response');
  
      var newButton = document.createElement('button');
      newButton.textContent = 'Submit';
      newButton.addEventListener('click', function() {
        checkNumber(newInput, newNumberBox, newResponseSection);
      });
  
      newResponseSection.appendChild(newNumberBox);
      newResponseSection.appendChild(newInputLabel);
      newResponseSection.appendChild(newInput);
      newResponseSection.appendChild(newButton);
  
      container.appendChild(newResponseSection);
    }
  
    function checkNumber(inputField, numberBox, responseSection) {
      var randomNumber = parseInt(numberBox.innerText, 10); 
      var response = inputField.value.toLowerCase();
  
      if (response === 'yes') {
        alert('Congratulations! Your number is ' + randomNumber);
  
        var allResponseSections = document.querySelectorAll('.response-section');
        allResponseSections.forEach(function(section) {
          if (section !== responseSection) {
            section.remove();
          }
        });
  
        responseSection.style.display = 'none';
        submitButton.style.display = 'none';
      } else if (response === 'no') {
        createNewResponseSection();
        inputField.value = '';
      } else {
        alert('Please type "yes" or "no".');
      }
    }
  
    var initialRandomNumber = generateRandomNumber();
    numberBox.innerText = initialRandomNumber;
    showResponseSection();
  
    submitButton.addEventListener('click', function() {
      var responseInput = document.getElementById('response');
      var currentResponseSection = document.querySelector('.response-section');
      checkNumber(responseInput, numberBox, currentResponseSection);
    });
  });
