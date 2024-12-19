import './pages/index.css';
import { addCard, removeCard, addInitialCards, initialCards } from './scripts/cards.js';
import { launchEditPopup, launchAddCardPopup } from './scripts/edit_info.js'

addInitialCards(initialCards);
launchEditPopup();
launchAddCardPopup();

