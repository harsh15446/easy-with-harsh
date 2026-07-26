"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {

const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [aadhaar,setAadhaar]=useState("");
const [father,setFather]=useState("");
const [dob,setDob]=useState("");
const [address,setAddress]=useState("");
const [state,setState]=useState("");
const [district,setDistrict]=useState("");


const submit=()=>{

alert(
"Voter ID Apply Submitted\nName: "+name
);

};


return(

<main className="min-h-screen bg-gray-100 p-5">

<div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">


<h1 className="text-3xl font-bold text-blue-700">
Voter ID Apply
</h1>


<p className="mt-2">
New Voter ID Registration
</p>



<input
className="border p-3 w-full mt-4 rounded"
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
/>


<input
className="border p-3 w-full mt-3 rounded"
placeholder="Mobile Number"
onChange={(e)=>setMobile(e.target.value)}
/>


<input
className="border p-3 w-full mt-3 rounded"
placeholder="Aadhaar Number"
onChange={(e)=>setAadhaar(e.target.value)}
/>


<input
className="border p-3 w-full mt-3 rounded"
placeholder="Father Name"
onChange={(e)=>setFather(e.target.value)}
/>


<input
type="date"
className="border p-3 w-full mt-3 rounded"
onChange={(e)=>setDob(e.target.value)}
/>


<textarea
className="border p-3 w-full mt-3 rounded"
placeholder="Full Address"
onChange={(e)=>setAddress(e.target.value)}
/>


<input
className="border p-3 w-full mt-3 rounded"
placeholder="State"
onChange={(e)=>setState(e.target.value)}
/>


<input
className="border p-3 w-full mt-3 rounded"
placeholder="District"
onChange={(e)=>setDistrict(e.target.value)}
/>



<h2 className="text-xl font-bold mt-6">
Upload Documents
</h2>


<p>Photo</p>
<input type="file" className="border p-2 w-full"/>


<p className="mt-3">Signature</p>
<input type="file" className="border p-2 w-full"/>


<p className="mt-3">Aadhaar Front</p>
<input type="file" className="border p-2 w-full"/>


<p className="mt-3">Aadhaar Back</p>
<input type="file" className="border p-2 w-full"/>




<div className="bg-blue-100 p-5 rounded mt-6">


<h2 className="text-xl font-bold">
Payment
</h2>


<p>
Fees: ₹60
</p>


<p className="font-bold">
UPI: kshatriya0665@ptyes
</p>


<Image
src="/qr.png"
width={250}
height={250}
alt="UPI QR"
/>


</div>




<button

onClick={submit}

className="bg-blue-700 text-white w-full p-3 rounded mt-6"

>

Submit Voter ID Apply

</button>


</div>

</main>


);

}