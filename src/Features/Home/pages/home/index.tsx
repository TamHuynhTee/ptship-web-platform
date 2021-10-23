import React, { useState } from 'react';
import './style.scss';
import Logo from '../../../../components/Logo';
import LoginForm from '../../components/LoginForm';
import ForgotPass from '../../components/ForgotPass';
import { RegisterForm } from '../../components/RegisterForm';

function Home() {
    const [page, setPage] = useState(1);
    const thisYear = new Date().getFullYear();

    const ChangePage = (currentPage: number) => {
        setPage(currentPage);
    };
    return (
        <div className="home-container">
            <div className="home-navbar">
                <Logo className="logo" />
            </div>
            <div className="home-body">
                <div id="login-frame">
                    {page === 1 ? (
                        <LoginForm ChangePage={ChangePage} />
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
