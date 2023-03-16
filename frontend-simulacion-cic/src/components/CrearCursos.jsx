import { useState } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import { rutas } from '../rutas/rutas';
import { useNavigate } from 'react-router-dom';

export const CrearCursos = () => {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [tutor, setTutor] = useState('');
  const [temas, setTemas] = useState('');

  const limpiarDatos = () => {
    setNombre('');
    setTemas('');
    setTutor('');
  }

  const addCourse = async () => {
    if (nombre === '' || tutor === '' || temas === '') { alert('Debe rellenar todos los campos'); return }
    const curso = {
      nombre: nombre,
      tutor: tutor,
      temas: temas,
      idcurso: uniqid(),
    };
    try {
      await axios.post(rutas.backend + rutas.crearb, curso)
        .then(res => {
          alert('Curso creado con exito');
          limpiarDatos();
        })
      navigate(rutas.home);
    }
    catch (err) { alert('Lo sentimos, no se pudo crear el curso, vuelve a intentarlo') }
  }

  return (
    <div className="container" style={{marginTop:'20px'}}>
      <div className="row">
        <div className="col-sm-6" style={{ margin: '0 auto', backgroundColor: 'white' }}>
          <h2>Crear un nuevo curso</h2>
          <div className="mb-3">
            <label htmlform='nombre' className="form-label" >Nombre del curso</label>
            <input onChange={e => setNombre(e.target.value)}
              autoFocus type='text' maxLength={'80'} className="form-control" value={nombre} />
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlform='tutor' className="form-label" >Tutor</label>
              <input onChange={e => setTutor(e.target.value)}
                type='text' maxLength={'80'} className="form-control" value={tutor} />
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlform='temas' className="form-label" >Temas</label>
              <textarea onChange={e => setTemas(e.target.value)}
                maxLength={'350'} className="form-control" value={temas} />
            </div>
          </div>
          <div className='col text-center' style={{ marginBottom: '20px' }}>
            <button onClick={addCourse}
              className="btn btn-primary regular-button">Crear curso
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
