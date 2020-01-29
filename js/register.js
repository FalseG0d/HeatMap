const GoogleSpreadSheet=require('google-spreadsheet');
const {promisify}=require('util');
const creds=require('./cient_secret.json');
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:
    {
    user:'from_email',
    pass:'from_pass'
    }
});

const mailOptions={
    from:'from_email',
    to:'recepient',
    subject:'Registration Confirmed',
    text:'Sample Text'
};


async function accessSpreadsheet(){

    let details = $('form').serializeArray();
    // console.log("hek");
   

    // console.log(row);



    const doc=new GoogleSpreadSheet('1nmEQWumszhnBDI6My30VVewUNexU-OQXa1CtXR6eM10');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info=await promisify(doc.getInfo)();
    const sheet=info.worksheets[0];
    // const row={
    //     name:'Apoorv',
    //     college:'MAIT',
    //     gender:'Male',
    //     phone:'9990605289',
    //     mail:'u.garg.10@gmail.com',
    //     events:'Singing',

    // }
    const row = {};
    details.forEach(el => {
        row[el.name] = el.value;
    });
    await promisify(sheet.addRow)(row);
    

}

accessSpreadsheet();
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
    }
    else{
        console.log('Success');
    }
})