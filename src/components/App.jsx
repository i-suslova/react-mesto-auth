import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";
import apiAuth from "../utils/apiAuth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PictureDeletePopup from "./PictureDeletePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

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
  //определяем, открыт ли попап для информации о регистрации
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //сохраняем информации о карточке, которая должна быть удалена
  const [deletedCard, setDeletedCard] = useState(null);
  //сохраняем информацию о выбранной карточке
  const [selectedCard, setSelectedCard] = useState(null);
  //сохраняем контент модального окна
  const [isRegistration, setIsRegistration] = useState(null);
  //данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  //сохраняем массив карточек
  const [cards, setCards] = useState([]);
  //отслеживанияем статус загрузки
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    if (!loggedIn) return;
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
  }, [loggedIn]);

  React.useEffect(() => {
    const checkToken = async () => {
      if (!localStorage.getItem("JWT")) return;

      try {
        const res = await apiAuth.getToken(localStorage.getItem("JWT"));
        if (res.data) {
          setEmail(res.data.email);
          setLoggedIn(true);
        }
      } catch (err) {
        setLoggedIn(false);
        console.log(err);
      }
    };
    checkToken();
  }, []);

  const handleRegister = (email, password) => {
    apiAuth
      .signup({ email, password })
      .then((result) => {
        setEmail(result.data.email);
        setIsRegistration(true);
        setIsInfoTooltipOpen(true);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
        setIsRegistration(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    apiAuth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("JWT", res.token);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    setIsInfoTooltipOpen(false);
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

  //удаляем JWT токен из локального хранилища браузера
  function handleSignOut() {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {/* //  <Header loggedIn={loggedIn} onSignOut={handleSignOut} /> */}
          <Header />
          <Routes>
            {/* Маршруты для регистрации и авторизации */}
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/sign-up" replace={true} />
                ) : (
                  <Navigate to="/sign-in" replace={true} />
                )
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <ProtectedRoute
                    element={Main}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handlePictureDeleteClick}
                    onCardLike={handleCardLike}
                    loggedIn={loggedIn}
                    email={email}
                    onSignOut={handleSignOut}
                  />
                ) : (
                  <Navigate to="/sign-in" replace={true} />
                )
              }
            />
          </Routes>

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
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isRegistration={isRegistration}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
