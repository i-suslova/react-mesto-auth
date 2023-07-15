import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__button-close popup__button-close_${props.name} hover`}
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>

        <form
          className="popup__form"
          name={`form-${props.name}`}
          method="post"
          onSubmit={props.onSubmit}
        >
          {props.showTitle && <h2 className="popup__title">{props.title}</h2>}

          {props.children}
          {props.showButton && (
            <button
              type="submit"
              className="popup__button"
              disabled={props.isLoading}
            >
              {props.isLoading ? props.loadingButtonText : props.buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
