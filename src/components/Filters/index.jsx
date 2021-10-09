import React from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, addToFavorites, filterByStudent, filterByStaff } from './../../app/actions';
export const Filters = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  return (
    <div className="filtersContainer">
      <button className={classNames("buttonFilter", { "isActive": state.filter === "student" })} onClick={() => {
        dispatch(filterByStudent())
      }}>Estudiantes</button><button className={classNames("buttonFilter", { "isActive": state.filter === "staff" })} onClick={() => {
        dispatch(filterByStaff())
      }}>Staff</button>
    </div>
  )
}
export default Filters