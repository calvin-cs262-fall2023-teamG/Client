import React from 'react';
import Mailer from 'react-native-mail';

//Function to send an email
const sendEmail = () => {
    Mailer.mail({
        subject: "Reset Password",
        recipients: 'danielp315@gmail.com',
        body: 'Please follow the instructions to reset your password.',
        isHTML: false,
    }, (error, event) => {
        if(error){
            alert("Coul no send mail. Please try again later.");
        }
    });
};


export default sendEmail;