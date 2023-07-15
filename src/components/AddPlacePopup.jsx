import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  //очищаем форму при открытии попапа добавления нового места
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  //функция-обработчик изменения значений поля названия
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //функция-обработчик изменения значений поля ссылки
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="picture"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      loadingButtonText="Сохранение..."
      showButton={true}
      showTitle={true}
    >
      <input
        type="text"
        className="popup__input"
        id="input-picture"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error input-picture-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input"
        id="input-link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
