"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export default function Page(){


const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [aadhaar,setAadhaar]=useState("");
const [father,setFather]=useState("");
const [dob,setDob]=useState("");
const [email,setEmail]=useState("");
const [address,setAddress]=useState("");

const [photo,setPhoto]=useState<File|null>(null);
const [signature,setSignature]=useState<File|null>(null);
const [aadhaarFront,setAadhaarFront]=useState<File|null>(null);
const [aadhaarBack,setAadhaarBack]=useState<File|null>(null);
const [birthProof,setBirthProof]=useState<File|null>(null);

const [loading,setLoading]=useState(false);



const submitOrder=async()=>{


if(
!name ||
!mobile ||
!aadhaar ||
!father ||
!dob ||
!email ||
!address
){

alert("Please fill all details");
return;

}



try{


setLoading(true);


const orderID="EWH-"+Date.now();



await addDoc(

collection(db,"orders"),

{

orderID:orderID,

service:"PAN Card Apply",

price:"200",

name:name,

mobile:mobile,

aadhaar:aadhaar,

fatherName:father,

dateOfBirth:dob,

email:email,

address:address,


photo:photo?.name || "",

signature:signature?.name || "",

aadhaarFront:aadhaarFront?.name || "",

aadhaarBack:aadhaarBack?.name || "",

birthProof:birthProof?.name || "",


status:"Pending",

createdAt:serverTimestamp()

}

);



alert(
"PAN Apply Order Submitted\nOrder ID: "+orderID
);



setName("");
setMobile("");
setAadhaar("");
setFather("");
setDob("");
setEmail("");
setAddress("");



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


<div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">



<h1 className="text-3xl font-bold text-blue-700">

PAN Card Apply

</h1>


<p className="mt-2">

Complete PAN Application Form

</p>




<input
className="w-full border p-3 rounded mt-5"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>




<input
className="w-full border p-3 rounded mt-3"
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
/>




<input
className="w-full border p-3 rounded mt-3"
placeholder="Aadhaar Number"
value={aadhaar}
onChange={(e)=>setAadhaar(e.target.value)}
/>




<input
className="w-full border p-3 rounded mt-3"
placeholder="Father Name"
value={father}
onChange={(e)=>setFather(e.target.value)}
/>




<input
type="date"
className="w-full border p-3 rounded mt-3"
value={dob}
onChange={(e)=>setDob(e.target.value)}
/>




<input
className="w-full border p-3 rounded mt-3"
placeholder="Email ID"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>




<textarea

className="w-full border p-3 rounded mt-3"

placeholder="Full Address"

value={address}

onChange={(e)=>setAddress(e.target.value)}

/>





<h2 className="font-bold mt-6 text-xl">

Upload Documents

</h2>



<p className="mt-3">
Photo
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setPhoto(e.target.files?.[0] || null)}
/>




<p className="mt-3">
Signature
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setSignature(e.target.files?.[0] || null)}
/>




<p className="mt-3">
Aadhaar Front
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarFront(e.target.files?.[0] || null)}
/>




<p className="mt-3">
Aadhaar Back
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarBack(e.target.files?.[0] || null)}
/>




<p className="mt-3">
Proof of Birth Document
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setBirthProof(e.target.files?.[0] || null)}
/>





<div className="mt-6 bg-blue-50 p-5 rounded-xl">


<h2 className="text-xl font-bold">
Payment
</h2>


<p className="mt-2">
Charge: ₹200
</p>


<p className="font-bold mt-2">
UPI: kshatriya0665@ptyes
</p>



<Image

src="/qr.png"

width={250}

height={250}

alt="QR Code"

className="mt-4"

/>


</div>





<button

onClick={submitOrder}

className="mt-6 w-full bg-blue-700 text-white p-3 rounded-xl font-bold"

>

{

loading ? "Submitting..." : "Submit PAN Apply"

}


</button>




</div>


</main>


);


}