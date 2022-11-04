//Import js modules
import './form';
import './submit'

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
  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});