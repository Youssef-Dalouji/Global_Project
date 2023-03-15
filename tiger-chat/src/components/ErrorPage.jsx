import React from 'react';
import '../styles/ErrorPage.css';
const ErrorPage=() => {
    return<>
    <div className='errorpagemain'>
        <div className='errorpagesquare'>
            <div className='errorpageimg'>
                <img src={require('../img/logoTiger2.png')} alt="Logo Tiger" />
            </div>
            <div className='errorpageinfo'>
                <h1>Page Not Found 404</h1>
            </div>
        </div>
    </div>
        
    </>
}
export default ErrorPage;
