import React, { useState, useEffect } from 'react'
import classNames from 'classnames';
import { Trash, User, FavoriteTag, ModalComponent, AddCharacterForm } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCharacters, removeFromFavorites } from '../../app/actions';
const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const [showFavorites, setShowFavorites] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    dispatch(fetchFavoriteCharacters())
  }, []);
  return (
    <div className="favoritesMainContainer">
      <div className="favButtonsContainer">
        <button onClick={() => { setShowFavorites(!showFavorites) }}>
          Favorites
          <FavoriteTag className="favIcons" />
        </button>
        <button onClick={() => {
          setIsOpenModal(true)
        }}>Agregar <User className="favIcons" /></button>
      </div>
      <div className={classNames("favoritesList", { "favoritesListShow": showFavorites })}>
        {state?.favorites?.map(el => {
          return (
            <div className="favoriteElementContainer">
              <div className="favoriteElement">
                <div className="favoriteImg" style={{ backgroundImage: `url(${el.image})` }} alt="" />
                <p>{el.name}</p>
                <Trash className="favIcons" onClick={() => {
                  dispatch(removeFromFavorites(el.id))
                }} />
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <ModalComponent
        className="generalContainerModal"
        isOpenModal={isOpenModal}
        setShowModal={e => {
          setIsOpenModal(e);
        }}
      >
        <div className="modalContent">
          <AddCharacterForm setShowModal={e => {
            setIsOpenModal(e);
          }} />
        </div>


      </ModalComponent>
    </div>
  )
}

export default Index
