import React from "react";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PictureDeletePopup from "./PictureDeletePopup";

function App() {
  //определяем, открыт ли попап для редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //определяем, открыт ли попап для добавления нового места
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //определяем, открыт ли попап для редактирования аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //определяем, открыт ли попап для Подтверждения удаления карточки
  const [isPictureDeletePopupOpen, setIsPictureDeletePopupOpen] =
    useState(false);
  //сохраняем информации о карточке, которая должна быть удалена
  const [deletedCard, setDeletedCard] = useState(null);
  //сохраняем информацию о выбранной карточке
  const [selectedCard, setSelectedCard] = useState(null);
  //данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //сохраняем массив карточек
  const [cards, setCards] = useState([]);
  //отслеживанияестатуса загрузки
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await api.getAllNeedData();
        setCurrentUser(data.userData);
        setCards(data.cardData);
      } catch (error) {
        console.error(error);
      }
    };

    getAllData();
  }, []);

  //обработчики событий открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handlePictureDeleteClick = (card) => {
    setDeletedCard(card);
    setIsPictureDeletePopupOpen(true);
  };

  //обработчик закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPictureDeletePopupOpen(false);
    setDeletedCard(false);
    setSelectedCard(null);
  };

  //принимаем карточку в качестве параметра
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deletePersonalCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // отправляем данныхе для изменения данных профиля
  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .getUserId(user)
      .then((data) => {
        setCurrentUser(data); // Обновляем стейт currentUser
        closeAllPopups(); // Закрываем все модальные окна
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((data) => {
        setCurrentUser(data); // Обновляем стейт currentUser
        closeAllPopups(); // Закрываем все модальные окна
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups(); // Закрываем все модальные окна
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handlePictureDeleteClick}
            onCardLike={handleCardLike}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <PictureDeletePopup
            isOpen={isPictureDeletePopupOpen}
            onClose={closeAllPopups}
            deletedCard={deletedCard}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
