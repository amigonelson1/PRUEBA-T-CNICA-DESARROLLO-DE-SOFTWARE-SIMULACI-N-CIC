import { CrearCursos } from './components/CrearCursos';
import { EditarCursos } from './components/EditarCursos';
import { EliminarCursos } from './components/EliminarCursos';
import { ListarCursos } from './components/ListarCursos';
import { Routes, Route, Link } from 'react-router-dom';
import { rutas } from './rutas/rutas';
import { PiePagina } from './components/PiePagina';


export const App = () => {
    return (
        <>
            <div><h1>Bienvenidos a nuestros cursos</h1></div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={rutas.home}>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to={rutas.crear}>Crear curso</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div>
                <Routes>
                    <Route path={rutas.home} element={<ListarCursos />} exact />
                    <Route path={rutas.crear} element={<CrearCursos />} exact />
                    <Route path={rutas.editar + ':idcurso'} element={<EditarCursos />} exact />
                    <Route path={rutas.eliminar} element={<EliminarCursos />} exact />
                </Routes>
            </div>
            <PiePagina />
        </>
    )
}
