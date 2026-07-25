"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


export default function Home(){


const services = [
{ name:"Aadhaar Card PDF", price:10 },
{ name:"Aadhaar Card Correction", price:600 },
{ name:"Aadhaar PVC Apply", price:100 },

{ name:"PAN Card PDF", price:50 },
{ name:"PAN Card Apply", price:200 },
{ name:"PAN Card Correction", price:170 },

{ name:"Driving Licence SLOT BOOKING", price:1200 },
{ name:"DL Apply", price:250 },
{ name:"DL Renewal", price:1800 },

{ name:"Voter ID PDF", price:10 },
{ name:"Voter ID Apply", price:60 },

{ name:"Ration Card PDF", price:50 },
{ name:"Caste Certificate", price:70 },
{ name:"Income Certificate", price:70 },
{ name:"Domicile Certificate", price:70 },
{ name:"Character Certificate", price:150 },

{ name:"Government Form Fill", price:70 },
{ name:"Scholarship Form", price:80 },
{ name:"Exam Form Fill", price:60 },
{ name:"Admission Form", price:100 },

{ name:"Admit Card Download", price:20 },
{ name:"Result Download", price:30 },
{ name:"Marksheet Download", price:30 },
{ name:"Certificate Download", price:30 },
{ name:"Migration Certificate", price:40 },

{ name:"College/University Form", price:100 },

{ name:"Bill Payment", price:20 },

{ name:"Vehicle RC PDF", price:50 },
{ name:"Vehicle Insurance PDF", price:110 },
{ name:"Challan Check", price:35 },
{ name:"Vehicle Related Online Work", price:100 }

];


const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [service,setService]=useState("");
const [price,setPrice]=useState("");
const [file,setFile]=useState<File|null>(null);
const [loading,setLoading]=useState(false);



const selectService=(item:any)=>{

setService(item.name);
setPrice(item.price.toString());

};





const uploadPDF=async()=>{


if(!file) return "";


const formData=new FormData();

formData.append("file",file);

formData.append(
"upload_preset",
"easyharsh"
);


const res=await fetch(

"https://api.cloudinary.com/v1_1/z32nzjc6/raw/upload",

{
method:"POST",
body:formData
}

);


const data=await res.json();

return data.secure_url;


};






const submitOrder=async()=>{


if(!name || !mobile || !service || !file){

alert("Please fill all details");

return;

}


try{


setLoading(true);


const pdfURL=await uploadPDF();


const orderID="EWH-"+Date.now();



await addDoc(

collection(db,"orders"),

{

orderID:orderID,

name:name,

mobile:mobile,

service:service,

price:price,

document:pdfURL,

status:"Pending",

createdAt:serverTimestamp()

}

);



alert(
"Order Submitted\nOrder ID: "+orderID
);



setName("");
setMobile("");
setService("");
setPrice("");
setFile(null);


}

catch(error){

console.log(error);

alert("Order Failed");

}

finally{

setLoading(false);

}


};





return(


<main className="min-h-screen bg-gray-100 p-5">


<div className="max-w-6xl mx-auto">



<div className="bg-blue-700 text-white p-8 rounded-2xl text-center shadow">


<h1 className="text-4xl font-bold">

💻 EASY WITH HARSH

</h1>


<p className="text-xl mt-2">

Digital Service Portal

</p>


<p className="mt-2">

Fast & Secure Online Services

</p>



<a

href="https://wa.me/916306623917?text=Hello%20EASY%20WITH%20HARSH%20I%20need%20service"

target="_blank"

className="inline-block mt-5 bg-green-600 px-6 py-3 rounded-full font-bold"

>

🟢 WhatsApp For Enquiry

</a>


</div>







<h2 className="text-3xl font-bold mt-8 mb-5">

🛠 Select Your Service

</h2>




<div className="grid md:grid-cols-3 gap-4">


{

services.map((item)=>(


<button

key={item.name}

onClick={()=>selectService(item)}

className={`bg-white p-5 rounded-xl shadow text-left

${service===item.name ? "border-4 border-blue-600":""}

`}

>


<p className="font-bold">

📄 {item.name}

</p>


<p className="text-blue-700 mt-2">

Charge: ₹{item.price}

</p>


</button>


))

}


</div>







<div className="bg-white mt-8 p-8 rounded-2xl shadow">


<h2 className="text-2xl font-bold mb-5">

📝 Place Your Order

</h2>



<input

className="w-full border p-3 rounded mb-4"

placeholder="Your Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>




<input

className="w-full border p-3 rounded mb-4"

placeholder="Mobile Number"

value={mobile}

onChange={(e)=>setMobile(e.target.value)}

/>




<input

className="w-full border p-3 rounded mb-4 bg-gray-100"

placeholder="Service Charge"

value={price}

readOnly

/>





<input

type="file"

accept="application/pdf"

className="w-full border p-3 rounded mb-4"

onChange={(e)=>

setFile(e.target.files?.[0] || null)

}

/>





<button

onClick={submitOrder}

className="w-full bg-blue-700 text-white p-3 rounded-xl font-bold"

>


{

loading ?

"Uploading..."

:

"Submit Order"

}


</button>



</div>



</div>


</main>


);


}