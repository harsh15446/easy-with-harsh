"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export default function Page(){


const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [aadhaar,setAadhaar]=useState("");
const [father,setFather]=useState("");
const [dob,setDob]=useState("");
const [address,setAddress]=useState("");

const [blood,setBlood]=useState("");
const [vehicle,setVehicle]=useState("");

const [photo,setPhoto]=useState<File|null>(null);
const [signature,setSignature]=useState<File|null>(null);
const [aadhaarFront,setAadhaarFront]=useState<File|null>(null);
const [aadhaarBack,setAadhaarBack]=useState<File|null>(null);
const [learningLicence,setLearningLicence]=useState<File|null>(null);

const [loading,setLoading]=useState(false);



const submitOrder=async()=>{


if(
!name ||
!mobile ||
!aadhaar ||
!father ||
!dob ||
!address ||
!vehicle ||
!learningLicence
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

orderID:orderID,

service:"Driving Licence Apply",

price:"1200",


name:name,

mobile:mobile,

aadhaar:aadhaar,

fatherName:father,

dateOfBirth:dob,

address:address,


bloodGroup:blood || "Not Provided",


vehicleType:vehicle,


photo:photo?.name || "",

signature:signature?.name || "",

aadhaarFront:aadhaarFront?.name || "",

aadhaarBack:aadhaarBack?.name || "",

learningLicence:learningLicence?.name || "",



status:"Pending",

createdAt:serverTimestamp()

}

);



alert(
"DL Apply Order Submitted\nOrder ID: "+orderID
);



setName("");
setMobile("");
setAadhaar("");
setFather("");
setDob("");
setAddress("");
setBlood("");
setVehicle("");
setLearningLicence(null);



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

Driving Licence Apply

</h1>


<p className="mt-2">

DL Apply Online Service

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



<textarea

className="w-full border p-3 rounded mt-3"

placeholder="Full Address"

value={address}

onChange={(e)=>setAddress(e.target.value)}

/>




<input

className="w-full border p-3 rounded mt-3"

placeholder="Blood Group (Optional)"

value={blood}

onChange={(e)=>setBlood(e.target.value)}

/>




<select

className="w-full border p-3 rounded mt-3"

value={vehicle}

onChange={(e)=>setVehicle(e.target.value)}

>


<option value="">
Select Vehicle Type
</option>

<option value="Bike">
Bike
</option>

<option value="Car">
Car
</option>

<option value="Both">
Both (Bike + Car)
</option>


</select>





<h2 className="font-bold text-xl mt-6">

Upload Documents

</h2>



<p className="mt-3">
Photo
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setPhoto(e.target.files?.[0]||null)}
/>




<p className="mt-3">
Signature
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setSignature(e.target.files?.[0]||null)}
/>




<p className="mt-3">
Aadhaar Front
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarFront(e.target.files?.[0]||null)}
/>




<p className="mt-3">
Aadhaar Back
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setAadhaarBack(e.target.files?.[0]||null)}
/>




<p className="mt-3 font-bold">
Learning Licence Upload (Required)
</p>

<input
type="file"
className="w-full border p-3 rounded"
onChange={(e)=>setLearningLicence(e.target.files?.[0]||null)}
/>





<div className="mt-6 bg-blue-50 p-5 rounded-xl">


<h2 className="text-xl font-bold">
Payment
</h2>


<p>
Charge: ₹1200
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

loading ? "Submitting..." : "Submit DL Apply"

}


</button>



</div>


</main>


);


}