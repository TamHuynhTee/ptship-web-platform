import React, { useState } from 'react';
import Logo from '../../../../components/Logo';
import ForgotPass from '../../components/ForgotPass';
import LoginForm from '../../components/LoginForm';
import { RegisterForm } from '../../components/RegisterForm';
import './style.scss';

function Home() {
    const [page, setPage] = useState(1);
    const thisYear = new Date().getFullYear();
    // const dispatch = useDispatch();
    // const user = useSelector(selectCurrentUser);
    // const history = useHistory();

    // React.useEffect(() => {
    //     dispatch(getCurrentUserAsync());
    // }, []);

    // React.useEffect(() => {
    //     if (user !== undefined) {
    //         history.push('/dashboard');
    //     }
    // }, []);

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
