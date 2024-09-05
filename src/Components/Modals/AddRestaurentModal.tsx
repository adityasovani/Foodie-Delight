import React, { useState } from "react";
// @ts-ignore
import Modal from 'react-modal';
import './AddRestaurentModal.css';
import { useForm } from "react-hook-form";
import { addRestaurent } from "../../utils/SupabaseAPI";

type Props = {
    show: boolean;
    setShow: any;
    onAddFormSubmit: any;
};

const AddRestaurentModal: React.FC<Props> = ({ show, setShow, onAddFormSubmit }) => {
    Modal.setAppElement('#root');

    const { register, handleSubmit, formState: { isValid } } = useForm();

    const submitForm = async (e: any) => {
        try {
            let { error } = await addRestaurent(e.name, e.owner_name, e.address, e.description);
            if (error) {
                alert('Error occured while adding')
            } else {
                onAddFormSubmit();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal isOpen={show}
            onRequestClose={() => setShow(false)}
            className="modal-container"
            onAfterClose={() => setShow(false)}
        >
            <form onSubmit={handleSubmit(submitForm)}>
                <h1 className="display-6 mb-4">Add new Restaurent</h1>
                <div className="mb-3">
                    <i className="bi bi-building" /><label htmlFor="name" className="form-label">&nbsp;Name</label>
                    <input {...register("name", { required: true })} type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-file-earmark-person" /><label htmlFor="ownerName" className="form-label">&nbsp;Owner Name</label>
                    <input {...register("owner_name", { required: true })} type="text" className="form-control" id="ownerName" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-pin-map" /><label htmlFor="address" className="form-label">&nbsp;Address</label>
                    <input {...register("address", { required: true })} type="text" className="form-control" id="address" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-card-heading" /><label htmlFor="address" className="form-label">&nbsp;Description</label>
                    <textarea {...register("description", { required: true })} className="form-control" id="description" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>Submit</button>
            </form>
        </Modal>
    );
}

export default AddRestaurentModal;