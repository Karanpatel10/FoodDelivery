
import sendEmail from './sendEmail.js';

const messageTemple=(name,email,subject,message)=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <img src="https://yourcompanylogo.com/logo.png" alt="Company Logo" style="max-width: 150px;"/>
          <h2>New Contact Us Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong>${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
    `;
}


const contacaustemp=async(req,res)=>{
    try{
        const {name,email,subject,message}=req.body;
        const htmlContent=messageTemple(name,email,subject,message);
        const emailsent=await sendEmail(process.env.EMAIL_USER,"Try to rech you",htmlContent);
        if(emailsent)
        {
        return res.json({success:true,message:'Message send successfully'});
        }
        else{
            return res.json({success:false,message:'Error sending Message'});
        }
    }catch(error){
        console.log(error);
        return res.json({success:false,message:'Error sending message'});
    }

}

export default contacaustemp;

