//Import js modules
import './form';
import './submit'
import { initDb, getDb, postDb } from './database'

//Import css
import '../css/index.css';

import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import images
import Logo from '../images/contact-info_64px.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//Add images on load
window.addEventListener('load', function () {

  //We are temporarily placing getDb() and postDb() function calls here for testing. We will move them to another event listener later.
  initDb();

  postDb('Toby', 'toby_da_pup@fluff.com', 5212345678, 'Dog');
  getDb();

  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});