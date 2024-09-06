import React, { useEffect } from 'react';
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/authActions';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../Config/routesnames';
import { signOut } from '../../utils/SupabaseAPI';

const Sidebar: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectLink = (event: any) => {
        const links = document.querySelectorAll('.nav-link');
        links.forEach((link: any) => link.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    useEffect(() => {
        document.querySelectorAll('.nav-link')[0].classList.add('active');
    }, []);

    const handleLogout = async () => {
        alert('Are you sure you want to logout?');
        localStorage.clear();
        await signOut();
        dispatch(logout());
    }

    return (
        <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0  d-flex sticky-top sidebar">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5"><i className="bi bi-cookie" /><span className="d-none d-sm-inline m-2">Foodie Delight</span></span>
                </a>
                <hr className='sidebar-hr' />
                <ul className="nav flex-sm-column flex-row flex-nowrap flex-shrink-0 flex-grow-3 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                    <li>
                        <a href="#" onClick={selectLink} className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-speedometer2" />
                            <span className="ms-1 d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                </ul>
                <div className="mt-auto">
                    <button type="button" className="nav-link px-sm-0 px-2 mb-3" title='Log out' onClick={handleLogout}>
                        <i className="fs-5 bi-power" /><span className="ms-1 d-none d-sm-inline">Sign Out</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Sidebar
