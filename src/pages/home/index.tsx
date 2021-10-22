import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';
import ForgotPass from '../../components/ForgotPass';
import axios from 'axios';
import authApi from '../../apis/authApi';
import { Loading } from '../../static/Loading';
import { RegisterForm } from '../../components/RegisterForm';
// import axios from 'axios';

function Home() {
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const history = useHistory();
    const thisYear = new Date().getFullYear();

    const Login = async (info: { phone: string; password: string }) => {
        if (!info.phone) setError('Chưa nhập số điện thoại!');
        else if (!info.password) setError('Chưa nhập mật khẩu!');
        else {
            const body = {
                phone: info.phone,
                password: info.password,
            };
            const response: any = await authApi.login(body);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/admin');
            } else {
                setError('Số điện thoại hoặc mật khẩu sai');
            }
        }
    };

    const ChangePage = (currentPage: number) => {
        setPage(currentPage);
        setError('');
    };

    return (
        <div className="home-container">
            <div className="home-navbar">
                <Logo className="logo" />
            </div>
            <div className="home-body">
                <div id="login-frame">
                    {page === 1 ? (
                        <LoginForm
                            Login={Login}
                            error={error}
                            ChangePage={ChangePage}
                        />
                    ) : page === 2 ? (
                        <ForgotPass ChangePage={ChangePage} />
                    ) : (
                        <RegisterForm ChangePage={ChangePage} />
                    )}
                </div>
            </div>
            <div className="home-footer">
                <span id="footer-content">&copy; PTSHIP - {thisYear}</span>
            </div>
        </div>
    );
}

export default Home;
