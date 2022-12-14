//Import js modules
import './form';
//import './submit'
import { initDb, getDb, postDb, deleteDb, editDb } from './database.js'
import { fetchCards } from './card.js';
import { toggleForm, clearForm } from './form.js'

//Import css
import '../css/index.css';

import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import images
import Logo from '../images/contact-info_64px.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//Install button
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';

  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

window.addEventListener('appInstalled', (event) => {
  console.log('Installed!', 'appInstalled', event);
});

//Add function to share the PWA using a button
const shareData = {
  title: 'Contact Cards Application',
  text: 'Install the Contact Cards Application',
  url: 'https://vast-depths-68083.herokuapp.com/'
}

const btn = document.getElementById('shareBtn');
const resultPara = document.querySelector('.result');

//Share must be triggered by "user activation"
btn.addEventListener('click', async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = '👍';
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
  }
});

//Add images on load
window.addEventListener('load', function () {
  // //We are temporarily placing getDb() and postDb() function calls here for testing. We will move them to another event listener later.
  initDb();
  //postDb('Toby', 'toby_da_pup@fluff.com', 5212345678, 'Dog');
  // getDb();
  fetchCards();

  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

//Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
})

form.addEventListener('submit', event => {
  //Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  //Post form data to IndexedDB or Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
    //Obtain values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;
    //Call the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
    editDb(profileId, name, email, phone, profile);

    fetchCards();
    //Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  //Clear form
  clearForm();
  //Toggle form
  toggleForm();
  //Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
  //Grab id from the button element attached to the contact card using parseInt() method
  let id = parseInt(e.id);
  //Delete the card
  deleteDb(id);
  //Reload the DOM
  fetchCards();
};

window.editCard = (e) => {
  //Grab id from the button element attached to the contact card and sets a global variable that will be used in the form element
  profileId = parseInt(e.dataset.id);

  //Grab information to pre-populate edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";
  //Toggle the submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};

//Service worker registration
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  })
};