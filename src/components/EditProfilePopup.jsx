import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  // Подписка на контекст для хранения данных о текущем пользователе
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  //функция-обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  //функция-обработчик изменения значений поля имени
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //функция-обработчик изменения значений поля описания профиля
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Сохранение..."
    >
      <input
        type="text"
        className="popup__input"
        id="input-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        className="popup__input"
        id="input-job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error input-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
