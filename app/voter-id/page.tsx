"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export default function Page() {


const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [aadhaar,setAadhaar]=useState("");
const [father,setFather]=useState("");
const [dob,setDob]=useState("");
const [address,setAddress]=useState("");
const [state,setState]=useState("");
const [district,setDistrict]=useState("");

const [photo,setPhoto]=useState<File|null>(null);
const [signature,setSignature]=useState<File|null>(null);
const [aadhaarFront,setAadhaarFront]=useState<File|null>(null);
const [aadhaarBack,setAadhaarBack]=useState<File|null>(null);

const [loading,setLoading]=useState(false);



const submitOrder = async()=>{


if(
!name ||
!mobile ||
!aadhaar ||
!father ||
!dob ||
!address ||
!state ||
!district
){

alert("Please fill all required details");
return;

}



try{


setLoading(true);


const orderID="EWH-"+Date.now();


await addDoc(

collection(db,"orders"),

{

orderID,

service:"Voter ID Apply",

price:"60",

name,

mobile,

aadhaar,

fatherName:father,

dateOfBirth:dob,

address,

state,

district,


photo:photo?.name || "",

signature:signature?.name || "",

aadhaarFront:aadhaarFront?.name || "",

aadhaarBack:aadhaarBack?.name || "",


status:"Pending",

createdAt:serverTimestamp()

}

);



alert(
"Voter ID Submitted\nOrder ID: "+orderID
);


}

catch(error){

console.log(error);

alert("Error submitting order");

}


finally{

setLoading(false);

}


};





return (

<main className="min-h-screen bg-gray-100 p-5">


<div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">


<h1 className="text-3xl font-bold text-blue-700">
Voter ID Apply
</h1>


<p className="mt-2">
Online Voter ID Registration
</p>



<input
className="w-full border p-3 rounded mt-5"
placeholder="Name"
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



<textarea
className="w-full border p-3 rounded mt-3"
placeholder="Full Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>



<input
className="w-full border p-3 rounded mt-3"
placeholder="State"
value={state}
onChange={(e)=>setState(e.target.value)}
/>



<input
className="w-full border p-3 rounded mt-3"
placeholder="District"
value={district}
onChange={(e)=>setDistrict(e.target.value)}
/>




<h2 className="font-bold text-xl mt-6">
Upload Documents
</h2>



<p className="mt-3">Photo</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setPhoto(e.target.files?.[0] || null)}
/>



<p className="mt-3">Signature</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setSignature(e.target.files?.[0] || null)}
/>



<p className="mt-3">Aadhaar Front</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarFront(e.target.files?.[0] || null)}
/>



<p className="mt-3">Aadhaar Back</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarBack(e.target.files?.[0] || null)}
/>




<div className="mt-6 bg-blue-50 p-5 rounded-xl">


<h2 className="text-xl font-bold">
Payment
</h2>


<p>
Charge: ₹60
</p>


<p className="font-bold mt-2">
UPI: kshatriya0665@ptyes
</p>



<Image
src="/qr.png"
width={250}
height={250}
alt="QR Code"
/>


</div>




<button

onClick={submitOrder}

className="mt-6 w-full bg-blue-700 text-white p-3 rounded-xl font-bold"

>

{
loading ? "Submitting..." : "Submit Voter ID"
}


</button>


</div>


</main>

);


}