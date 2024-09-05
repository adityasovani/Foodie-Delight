import React, { useEffect, useState } from 'react';
import './HotelsListing.css';
import { deleteRestaurent, getRestaurents } from '../../utils/SupabaseAPI';
import AddRestaurentModal from '../Modals/AddRestaurentModal';
import UpdateModal from '../Modals/UpdateModal';
import { LISTING_COL_HEADERS } from '../../Config/Listing';

const HotelsListing: React.FC = () => {

    const [hotels, setHotels] = useState<any>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [updateData, setUpdateData] = useState<any>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);

    const onAddFormSubmit = () => {
        setShowAddModal(false);
        setShowUpdateModal(false)
        setHotels([]);
        fetchHotels();
        setUpdateData(null);
    }

    const fetchHotels = async () => {
        try {
            const { data, error } = await getRestaurents(page);
            setHotels(data?.map((hotel: any) => ({
                ...hotel,
                created_at: hotel.created_at.split('T')[0]
            })));
            if (data && data?.length < 20) {
                setHasMorePages(false);
            } else {
                setHasMorePages(true);
            }
            if (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (page > 0) {
            setHotels([]);
            fetchHotels();
        }
    }, [page]);
    useEffect(() => {
        setShowUpdateModal(updateData ? true : false);
    }, [updateData])

    const handleRestaurantDelete = async (id: number) => {
        deleteRestaurent(id).then((response: any) => {
            setHotels([]);
            fetchHotels();
        });
    }

    return (
        <div className='listing-container d-flex align-items-center row w-100'>
            {/* Title */}
            <div className="col-12 d-flex flex-row">
                <div className="p-2">
                    <i className="bi bi-list-columns-reverse fs-5"></i> <span className=" fs-5">Restaurents</span>
                </div>
                <div className="ms-auto mt-2 ">
                    <button type='button' title='Add Restaurent'
                        className="btn btn-sm btn-outline-secondary" onClick={() => setShowAddModal(!showAddModal)}>
                        <i className="bi bi-plus-circle" role='button' title='Edit' /> Add Restaurent
                    </button>
                </div>
            </div>
            <hr />
            {/* Table */}
            <div className="mt-2">
                {
                    (hotels?.length > 0) ? <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                {Object.keys(hotels?.[0]).map((key: string) => <th className={`table-header ${key === 'id' ? 'top-left' : ''} text-center`} key={key}>{LISTING_COL_HEADERS[key]}</th>)}
                                <th className='table-header top-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel: any) => <tr>
                                {Object.keys(hotel).map(key => <td className='text-center' style={{ whiteSpace: (key === 'created_at') ? 'nowrap' : 'normal' }} role='button' key={hotel.id}>{hotel[key]}</td>)}
                                <td className='text-center'>
                                    <div className="d-flex align-items-center p-3">
                                        <i className="bi bi-pencil me-2" role='button' title='Edit'
                                            onClick={() => setUpdateData({ ...hotel })}></i>
                                        <i className="bi bi-trash" title='Delete' role='button' onClick={() => handleRestaurantDelete(hotel.id)}></i>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table> :
                        <div className="placeholder-glow mb-3 d-flex flex-column gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div className="d-flex gap-2 flex-row justify-content-center" key={i}>
                                    <span className="placeholder col-3"></span>
                                    <span className="placeholder col-5"></span>
                                    <span className="placeholder col-3"></span>
                                </div>
                            ))}
                        </div>

                }
                <nav aria-label="Pagination">
                    <ul className="pagination justify-content-center">
                        {/* previous arrow */}
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous"
                                onClick={() => (page > 1) && setPage(page - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {/* numbers */}
                        {(page - 1) > 0 && <li className="page-item"><a className="page-link" onClick={() => (page > 1) && setPage(page - 1)}>{page - 1}</a></li>}
                        <li className="page-item active"><a className="page-link">{page}</a></li>
                        {hasMorePages && <li className="page-item"><a className="page-link" onClick={() => (page) && setPage(page + 1)}>{page + 1}</a></li>}
                        {/* Next arrow */}
                        <li className="page-item">
                            <a className="page-link" aria-label="Next"
                                onClick={() => (hasMorePages) && setPage(page + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <AddRestaurentModal
                show={showAddModal}
                setShow={setShowAddModal}
                onAddFormSubmit={onAddFormSubmit}
            />
            <UpdateModal
                show={showUpdateModal}
                setShow={setShowUpdateModal}
                onUpdateFormSubmit={onAddFormSubmit}
                data={updateData}
                setData={setUpdateData}
            />
        </div>
    )
}

export default HotelsListing;


