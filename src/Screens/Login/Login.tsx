import React, { useEffect, useState } from 'react';
import { signIn } from '../../utils/SupabaseAPI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../Config/routesnames';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../Redux/authActions';

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { isValid }, } = useForm<any>({
        mode: 'onChange'
    });

    const [showPassword, setShowPassword] = useState(false);
    const userDetails = useSelector((state: any) => state.user);

    useEffect(() => {
        if (userDetails?.aud === 'authenticated') {
            navigate(RouteNames.DASHBOARD);
        }
    }, [userDetails?.user])

    const handleLogin = async (event: any) => {
        try {
            const { data: UserDetails } = await signIn(event?.username, event?.password);
            console.log(UserDetails);
            dispatch(loginSuccess(UserDetails?.user));
            navigate(RouteNames.DASHBOARD)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex flex-column gap-4 justify-content-center align-items-center vh-100">
            <span className="display-4">Admin Login</span>
            <form className=" border p-4 rounded" onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input {...register("username", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div className="input-group">
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} className="form-control" id="exampleInputPassword1" />
                        <button title='eye' className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i></button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!isValid}>Login</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    )
}

export default Login;


