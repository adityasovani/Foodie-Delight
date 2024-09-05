import React, { useEffect } from 'react';
// @ts-ignore
import Modal from 'react-modal';
import './AddRestaurentModal.css';
import { useForm } from 'react-hook-form';
import { updateRestaurent } from '../../utils/SupabaseAPI';

type Props = {
    data: any;
    show: boolean;
    setShow: any;
    onUpdateFormSubmit: any;
    setData: any;
}

const UpdateModal: React.FC<Props> = ({ data, show, setShow, onUpdateFormSubmit, setData }) => {

    const { register, handleSubmit, formState: { isValid }, reset } = useForm({
        defaultValues: {
            name: data?.name,
            owner_name: data?.owner_name,
            address: data?.address,
            description: data?.description
        }
    });

    useEffect(() => {
        reset({
            name: data?.name,
            owner_name: data?.owner_name,
            address: data?.address,
            description: data?.description
        });
    }, [data]);

    const submitForm = async (e: any) => {
        try {
            let { error } = await updateRestaurent(data?.id, e.name, e.owner_name, e.address, e.description);
            if (error) {
                alert('Error occured while updating')
            } else {
                onUpdateFormSubmit();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal isOpen={show}
            onRequestClose={() => setShow(false)}
            className="modal-container"
            onAfterClose={() => { setData(null); reset() }}
        >
            <form onSubmit={handleSubmit(submitForm)}>
                <h1 className="display-6 mb-4">Update Restaurent</h1>
                <div className="mb-3">
                    <i className="bi bi-building" /><label htmlFor="name" className="form-label">&nbsp;Name</label>
                    <input {...register("name", { required: true, value: data?.name })} type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-file-earmark-person" /><label htmlFor="ownerName" className="form-label">&nbsp;Owner Name</label>
                    <input {...register("owner_name", { required: true, value: data?.owner_name })} type="text" className="form-control" id="ownerName" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-pin-map" /><label htmlFor="address" className="form-label">&nbsp;Address</label>
                    <input {...register("address", { required: true, value: data?.address })} type="text" className="form-control" id="address" />
                </div>
                <div className="mb-3">
                    <i className="bi bi-card-heading" /><label htmlFor="address" className="form-label">&nbsp;Description</label>
                    <textarea {...register("description", { required: true, value: data?.description })} className="form-control" id="description" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>Submit</button>
            </form>
        </Modal>
    )
}

export default UpdateModal