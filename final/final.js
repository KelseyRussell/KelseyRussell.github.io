document.addEventListener('DOMContentLoaded', function() {
  var numberBox = document.getElementById('numberBox');
  var responseSection = document.getElementById('responseSection');
  var submitButton = document.getElementById('submitButton');
  var container = document.querySelector('.container');
  var confirmationSection = document.getElementById('confirmationSection');
  var correctNumbersBox = document.getElementById('correctNumbersBox');

  var animals = ["ant", "bat", "cat", "dog", "elk", "fox", "cow", "ape", "bee", "pig"];
  var animalToNumber = {
      "ant": 0,
      "bat": 1,
      "cat": 2,
      "dog": 3,
      "elk": 4,
      "fox": 5,
      "cow": 6,
      "ape": 7,
      "bee": 8,
      "pig": 9
  };
  var selectedNumbers = [];
  var currentStep = 1;

  function generateRandomWordList() {
      var shuffledAnimals = shuffleArray(animals.slice());
      return shuffledAnimals;
  }

  function shuffleArray(array) {
      var currentIndex = array.length, randomIndex;

      while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
      }

      return array;
  }

  function showResponseSection() {
      responseSection.style.display = 'block';
  }

  function displayWordList() {
      var shuffledAnimals = generateRandomWordList();
      numberBox.innerHTML = '';
      shuffledAnimals.forEach(function(word) {
          var wordDiv = document.createElement('div');
          wordDiv.classList.add('word');
          wordDiv.textContent = word;
          numberBox.appendChild(wordDiv);
      });
  }

  function updatePrompt() {
      var label = document.querySelector('#responseSection label');
      switch (currentStep) {
          case 1:
              label.textContent = `Type three animal names for the first three digits, separated by commas.`;
              break;
          case 2:
              label.textContent = `Type three animal names for the next three digits, separated by commas.`;
              break;
          case 3:
              label.textContent = `Type four animal names for the last four digits, separated by commas.`;
              break;
      }
  }

  function showConfirmation(partialNumber) {
      confirmationSection.innerHTML = `Is this part of your number: ${formatNumber(partialNumber)}? <button id="yesButton">Yes</button> <button id="noButton">No</button>`;
      document.getElementById('yesButton').addEventListener('click', function() {
          correctNumbersBox.innerHTML += formatNumber(partialNumber);
          confirmationSection.innerHTML = '';
          if (currentStep === 3) {
              alert(`Congratulations! Your number is ${formatNumber(selectedNumbers.join(''))}`);
              responseSection.style.display = 'none';
              submitButton.style.display = 'none';
          } else {
              currentStep++;
              updatePrompt();
          }
      });
      document.getElementById('noButton').addEventListener('click', function() {
          selectedNumbers = selectedNumbers.slice(0, currentStep === 1 ? 0 : (currentStep === 2 ? 3 : 6));
          confirmationSection.innerHTML = '';
      });
  }

  function formatNumber(number) {
      return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  function checkAnimal(inputField) {
      var animalsInput = inputField.value.toLowerCase().split(',').map(s => s.trim());
      inputField.value = '';

      if (animalsInput.length !== (currentStep === 3 ? 4 : 3)) {
          alert(`Please type exactly ${currentStep === 3 ? 4 : 3} animal names.`);
          return;
      }

      for (let animal of animalsInput) {
          if (!animalToNumber.hasOwnProperty(animal)) {
              alert(`Please type valid animal names from the list.`);
              return;
          }
      }

      selectedNumbers.push(...animalsInput.map(animal => animalToNumber[animal]));

      var partialNumber = selectedNumbers.slice(currentStep === 1 ? 0 : (currentStep === 2 ? 3 : 6), selectedNumbers.length).join('');
      showConfirmation(partialNumber);
  }

  displayWordList();
  updatePrompt();
  showResponseSection();

  submitButton.addEventListener('click', function() {
      var responseInput = document.getElementById('response');
      checkAnimal(responseInput);
  });
});