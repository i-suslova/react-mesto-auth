import iconConsent from "../images/iconConsent.svg";
import iconRefusal from "../images/iconRefusal.svg";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
  if (!props.isOpen) {
    return null;
  }

  let iconImage;
  let message;
  if (props.isStatus) {
    iconImage = iconConsent;
    message = "Вы успешно зарегистрировались!";
  } else {
    iconImage = iconRefusal;
    message = "Что-то пошло не так! Попробуйте ещё раз.";
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      showButton={false}
      isStatus={props.isStatus}
    >
      <img src={iconImage} alt={message} className="popup__icon" />
      <h3 className="popup__result-title">{message}</h3>
    </PopupWithForm>
  );
}

export default InfoTooltip;
