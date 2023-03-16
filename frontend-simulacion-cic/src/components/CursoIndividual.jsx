import { rutas } from '../rutas/rutas';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export const CursoIndividual = ({ lista }) => {

    const navigate = useNavigate();

    const preEliminarCurso = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Este curso ya no existe.',
                    'success'
                )
                eliminarCurso();
            }
        })
    };

    const eliminarCurso = async () => {
        try {
            await axios.post(rutas.backend + rutas.eliminarb, { idcurso: lista.idcurso }).then(res => { });
            navigate(0);
        }
        catch (err) {
            console.log(err)
            alert('Lo sentimos, ocurrio un error durante el proceso, vuelve a intentarlo')
        }
    }

    return (
        <div className='card'>
            <div className="card-body">
                <div><b>Nombre: </b><br />{lista.nombre}</div>
                <div><b>Tutor: </b><br />{lista.tutor}</div>
                <div><b>Temas: </b><br />{lista.temas}</div>
                <div className='col text-center' style={{marginTop:'15px'}}>
                    <Link to={rutas.editar + lista.idcurso}>
                        <li className="btn btn-primary regular-button">Editar</li>
                    </Link>
                    &nbsp;
                    <button onClick={preEliminarCurso}
                        className="btn btn-danger regular-button">Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}
