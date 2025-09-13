import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal-image");
    this._caption = this._popup.querySelector(".modal__caption");
  }

  open(name, local) {
    this._image.src = local;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
