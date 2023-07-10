import iconConsent from "../images/iconConsent.svg";
import iconRefusal from "../images/iconRefusal.svg";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
  if (!props.isOpen) {
    return null;
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      showButton={false}
    >
      {props.isRegistration ? (
        <>
          <img
            src={iconConsent}
            alt="Регистрация прошла успешно"
            className="popup__icon"
          />
          <h3 className="popup__result-title">
            Вы успешно зарегистрировались!
          </h3>
        </>
      ) : (
        <>
          <img
            src={iconRefusal}
            alt="Ошибка регистрации"
            className="popup__icon"
          />
          <h3 className="popup__result-title">
            Что-то пошло не так! Попробуйте ещё раз.
          </h3>
        </>
      )}
    </PopupWithForm>
  );
}

export default InfoTooltip;
