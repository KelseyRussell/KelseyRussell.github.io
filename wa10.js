const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "Once upon a time there was a girl named :insertx:. She found a cabin in the woods and tried :inserty:, however, the first one was too :insertz:. The second one was too :insertz: but the third one was just right."
const insertX= ["Goldy Locks","loldy Gocks","Goldi Locks"]
const insertY = ["some porridge on the table", "to take a nap on a bed", "to sit on a chair"]
const insertZ = ["cold", "hot", "lumpy","stiff", "hard","soft"]

randomize.addEventListener('click', result);

function result() {
    let newStory=storyText;

    const xItem=randomValueFromArray(insertX);
    const yItem=randomValueFromArray(insertY);
    const zItem=randomValueFromArray(insertZ);
    
    newStory=newStory.replaceAll(':insertx:',xItem);
    newStory=newStory.replaceAll(':inserty:',yItem);
    newStory=newStory.replaceAll(':insertz:',zItem);



  if(customName.value !== '') {
    const name = customName.value;
    newStory=newStory.replaceAll("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300*0.0714286)} stone`;
    const temperature =  `${Math.round((94-32) * 5 / 9)} centigrade`;
    newStory = newStory.replaceAll('94 fahrenheit', temperature);
    newStory = newStory.replaceAll('300 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

