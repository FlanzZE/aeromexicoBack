import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { postNewCharacter } from '../../app/actions';
import { Cross } from '..';
const Index = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const fileInput = useRef(null);
  const [binary, setBinary] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    if (binary) {
      const { name,
        dateOfBirth,
        eyeColour,
        hairColour,
        gender,
        pos } = data;
      const newData = {
        alive: true,
        dateOfBirth,
        eyeColour,
        favorite: false,
        gender,
        hairColour,
        hogwartsStaff: pos === "staff",
        hogwartsStudent: pos === "student",
        house: "Gryffindor",
        id: state.characters.length + 1,
        image: binary,
        name
      }
      dispatch(postNewCharacter(newData))
      setShowModal(false)
      return false
    }
    alert("No se encontro una imagen seleccionada")
  };

  const getBinary = (e) => {
    const photo = e?.target?.files[0]
    if (photo) {
      if (photo.size > 1316406) {
        alert("El tamaño de la imagen supera lo permitido, por favor selecciona una imagen valida")
        setBinary(null)
        return;
      }
      const reader = new FileReader();
      reader.onload = function (evt) {
        const contents = evt.target.result;
        setBinary(contents)
      };
      reader.readAsDataURL(photo);
      return false;
    }

    setBinary(null)
  }

  return (
    <form className="formAddCharacter" onSubmit={handleSubmit(onSubmit)}>
      <div className="headerContainer">
        <h1>Agrega un personaje</h1>
        <Cross onClick={() => { setShowModal(false) }} />
      </div>
      <div className="labelContainer">
        <label>
          NOMBRE
          <input type="text"  {...register("name", { required: true })} />
          {errors.name && <span className="error">Campo requerido*</span>}

        </label>
        <label>
          CUMPLEAÑOS
          <input type="date" {...register("dateOfBirth", { required: true })} />
          {errors.dateOfBirth && <span className="error">Campo requerido*</span>}
        </label>
      </div>

      <div className="labelContainer">
        <label>
          COLOR DE OJOS
          <input type="text"  {...register("eyeColour", { required: true })} />
          {errors.eyeColour && <span className="error">Campo requerido*</span>}
        </label>
        <label>
          COLOR DE PELO
          <input type="text"  {...register("hairColour", { required: true })} />
          {errors.hairColour && <span className="error">Campo requerido*</span>}
        </label>
      </div>

      <div className="labelContainer">
        <label>
          GÉNERO
          <div className="radioContainer">
            <div>
              <input type="radio" value="male" {...register("gender", { required: true })} />
              <p>Male</p>
            </div>
            <div>
              <input type="radio" value="female" {...register("gender", { required: true })} />
              <p>Female</p>
            </div>
            {errors.gender && <span className="error">Campo requerido*</span>}
          </div>
        </label>
        <label>
          POSICIÓN
          <div className="radioContainer">
            <div>
              <input type="radio" value="student" {...register("pos", { required: true })} />
              <p>Estudiante</p>
            </div>
            <div>
              <input type="radio" value="staff" {...register("pos", { required: true })} />
              <p>Staff</p>
            </div>
            {errors.pos && <span className="error">Campo requerido*</span>}
          </div>
        </label>
      </div>

      <label> FOTOGRAFIA
        <input
          onChange={getBinary}
          type="file" ref={fileInput}
          accept="image/*"
          size={500}
        />
      </label>
      <input type="submit" value="GUARDAR" />
    </form>
  )
}

export default Index

