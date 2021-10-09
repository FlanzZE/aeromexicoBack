import React, { useEffect } from 'react'
import { FavoriteTag } from '..'
import classNames from 'classnames'
import { Axios } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, addToFavorites } from './../../app/actions';
function isStudent(person) {
  const { hogwartsStaff } = person
  return hogwartsStaff ? "Staff" : "Estudiante"

}
function colorByHouse(house) {
  switch (house) {
    case "Gryffindor":
      return "linear-gradient(135deg, #FF0000 0%, #fe8482 100%)"

    case "Slytherin":
      return "linear-gradient(135deg, #1C792B 0%, #82E95E 100%)"
    case "Hufflepuff":
      return "linear-gradient(135deg, #FFC700 0%, #FFF388 100%)"
    case "Ravenclaw":
      return "linear-gradient(135deg, #0597B7 0%, #66D1FF 100%)"
    default:
      return "linear-gradient(135deg, #ffffff 0%, #000000 100%)"
  }

}

export const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  useEffect(() => {
    dispatch(fetchCharacters())
  }, []);

  function renderCards() {
    if (state.loading) {
      return <h1>Loading...</h1>
    }
    return state.characters?.map(character => {
      return (
        <div className="characterCard">
          <div style={{ background: colorByHouse(character.house) }} className="imgContainer">
            <div className="characterImg" style={{ backgroundImage: `url(${character.image})` }} alt="" />
          </div>
          <div className="descriptionContainer">
            <div className="headerDescription">
              <p>{character.alive ? "Vivo" : "Muerto"} / {isStudent(character)}</p>
              <FavoriteTag
                className={classNames('favTag', { favorite: character?.favorite })}
                onClick={() => {
                  dispatch(addToFavorites(character.id))
                }}
              />
            </div>
            <h1>{character.name}</h1>
            <div className="detailsCharacter">
              <p>Cumpleaños: {character.dateOfBirth || "Sin datos"}</p>
              <p>Género:{character.gender || "Sin datos"}</p>
              <p>Color de ojos: {character.eyeColour || "Sin datos"}</p>
              <p>Color de pelo: {character.hairColour || "Sin datos"}</p>
            </div>

          </div>
        </div>
      )
    })

  }
  return <>{renderCards()}</>


};

export default Index
