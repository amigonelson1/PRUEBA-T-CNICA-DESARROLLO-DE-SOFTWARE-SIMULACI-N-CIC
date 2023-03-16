import { useEffect, useState } from 'react';
import axios from 'axios';
import { rutas } from '../rutas/rutas';
import { CursoIndividual } from './CursoIndividual';

export const ListarCursos = () => {

    const [cursos, setCursos] = useState([])

    useEffect(() => {
        axios.get(rutas.backend + rutas.obtenerb).then(res => { setCursos(res.data) })
            .catch(err => { console.log('Error de retorno papu', err) })

        return () => {

        }
    }, [])

    //mapear los cursos
    const todosCursos = cursos.map(lista => {
        return (
            <div className='tarjeta fixed-size' key={lista.idcurso}>
                <CursoIndividual lista={lista} />
            </div>
        )
    })


    return (
        <div>
            {cursos.length != 0 ?
                <div>
                    <h2>Lista de Cursos</h2>
                    <div className='contenedor'>{todosCursos}</div>
                </div>
                : null}
        </div>
    )
}
