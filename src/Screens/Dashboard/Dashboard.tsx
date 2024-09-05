import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../Components/Sidebar/Sidebar';
import StatsPane from '../../Components/StatsPane/StatsPane';
import './Dashboard.css';
import HotelsListing from '../../Components/HotelsListing/HotelsListing';
import RouteNames from '../../Config/routesnames';
import { useNavigate } from 'react-router-dom';

const Dasboard: React.FC = () => {
    const userDetails = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!(userDetails?.aud === 'authenticated')) {
            navigate(RouteNames.LOGIN);
        }
    }, []);

    return (
        <div className="container-fluid overflow-hidden">
            <div className="row vh-100 overflow-auto">
                {false && <nav className="navbar navbar-expand navbar-light bg-transparent">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Foodie Delight</a>
                        <div className="d-flex">
                            <button className="btn btn-outline-secondary me-2" type="button">Send message</button>
                            <button className="btn btn-outline-secondary" type="button">Add channel</button>
                        </div>
                    </div>
                </nav>}
                <Sidebar />
                <div className="col d-flex flex-column h-100">
                    <main className="row h-100 overflow-auto dashboard-content">
                        <div className="col pt-4">
                            <StatsPane />
                            <div className="pt-3">
                                <HotelsListing />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dasboard