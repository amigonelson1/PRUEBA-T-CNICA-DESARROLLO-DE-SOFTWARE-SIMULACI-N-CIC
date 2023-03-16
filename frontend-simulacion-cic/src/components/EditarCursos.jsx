import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { rutas } from '../rutas/rutas';

export const EditarCursos = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [tutor, setTutor] = useState('');
  const [temas, setTemas] = useState('');

  useEffect(() => {
    axios.post(rutas.backend + rutas.obtener1b, { idcurso: params.idcurso }).then(res => {
      const { nombre, tutor, temas } = res.data[0];
      setNombre(nombre);
      setTemas(temas);
      setTutor(tutor);
    })

    return () => {

    }
  }, [])

  const editarCurso = async () => {
    const cursoactualizado = {
      nombre: nombre,
      tutor: tutor,
      temas: temas,
      idcurso: params.idcurso,
    };
    try {
      await axios.post(rutas.backend + rutas.editarb, cursoactualizado)
        .then(res => {
          alert('Curso actualizado exitosamente');
          navigate(rutas.home);
        })
    }
    catch (err) { alert('Lo sentimos, no se pudo editar el curso, vuelve a intentarlo') }

  }


  return (
    <div className="container" style={{marginTop:'20px'}}>      
      <div className="row">
        <div className="col-sm-6" style={{margin:'0 auto', backgroundColor:'white'}}>
          <h2>Editar este curso</h2>
          <div className="mb-3">
            <label htmlform='nombre' className="form-label" >Nombre del curso</label>
            <input onChange={e => setNombre(e.target.value)}
              autoFocus maxLength={'80'} type='text' className="form-control" value={nombre} />
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
          <div className='col text-center' style={{marginBottom:'20px'}}>
            <button onClick={editarCurso}
              className="btn btn-primary regular-button">Editar
            </button>
            &nbsp;
            <Link to={rutas.home}>
              <li className="btn btn-info regular-button">Cancelar</li>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
