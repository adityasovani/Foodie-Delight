import React, { useEffect, useState } from 'react';
import './StatsPane.css';
import supabase from '../../utils/supabase';

const StatsPane: React.FC = () => {

    const [restaurentsCount, setRestaurentsCount] = useState<number | null>(0);
    const [createdToday, setCreatedToday] = useState<number | null>();

    useEffect(() => {
        const fetchCounts = async () => {
            let { count, error } = await supabase
                .from('Restaurents')
                .select('*', { count: 'exact', head: true });
            setRestaurentsCount(count);

            // filter dates
            const today = new Date()
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

            const createdCountResponse = await supabase
                .from('Restaurents')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', startOfDay.toISOString())
                .lt('created_at', endOfDay.toISOString())

            setCreatedToday(createdCountResponse?.count);

        };
        fetchCounts();
    }, []);

    return (
        <div className='stats-container d-flex align-items-center row w-100'>
            <div className="col-md-6 col-sm-6 d-flex flex-column align-items-center stat-card ">
                <div className="stat-name"><i className="bi bi-cup-hot" /> Total Restaurents</div>
                <div className="stat-number">{restaurentsCount}</div>
            </div>
            <div className="col-md-6 col-sm-6 d-flex flex-column align-items-center stat-card">
                <div className="stat-name"><i className="bi bi-calendar-event" /> Created Today</div>
                <div className="stat-number">{createdToday}</div>
            </div>
        </div>
    )
}

export default StatsPane