import nodeMailer from 'nodemailer';

const sendEmail=async(to,subject,htmlContent)=>{
    try{
        const transporter=nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            }
        })

        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:to,
            subject:subject,
            html:htmlContent,
        })

        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export default sendEmail;