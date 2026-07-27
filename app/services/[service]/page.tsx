"use client";

import { useParams } from "next/navigation";
import { services } from "../../data/services";
import { useState } from "react";
import Image from "next/image";

import { db } from "../../firebase";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";



export default function ServicePage(){


const params = useParams();

const slug = params.service as string;


const service = services.find(
(item)=>item.slug===slug
);



const [name,setName]=useState("");
const [mobile,setMobile]=useState("");
const [address,setAddress]=useState("");


const [aadhaarFront,setAadhaarFront]=useState<File|null>(null);
const [aadhaarBack,setAadhaarBack]=useState<File|null>(null);
const [photo,setPhoto]=useState<File|null>(null);
const [signature,setSignature]=useState<File|null>(null);
const [birthProof,setBirthProof]=useState<File|null>(null);



const [paymentDone,setPaymentDone]=useState(false);

const [loading,setLoading]=useState(false);





if(!service){

return(

<h1 className="p-10 text-3xl font-bold">
Service Not Found
</h1>

)

}





const uploadToCloudinary = async(file:File)=>{


const formData = new FormData();


formData.append(
"file",
file
);



formData.append(
"upload_preset",
"easyharsh"
);



const res = await fetch(

"https://api.cloudinary.com/v1_1/z32nzjc6/upload",

{

method:"POST",

body:formData

}

);



const data = await res.json();



if(!data.secure_url){

console.log(data);

throw new Error("Upload Failed");

}



return data.secure_url;


};
const sendWhatsApp=()=>{


window.open(

`https://wa.me/916306623917?text=Hello%20EASY%20WITH%20HARSH%0A%0AService:%20${service.name}%0AAmount:%20₹${service.price}`,

"_blank"

);


};







const submitOrder=async()=>{


if(!paymentDone){

alert("Please send payment screenshot first");

return;

}



if(!name || !mobile || !address){

alert("Please fill all details");

return;

}




try{


setLoading(true);



let documents:any={};




if(aadhaarFront){

documents.aadhaarFront =
await uploadToCloudinary(aadhaarFront);

}




if(aadhaarBack){

documents.aadhaarBack =
await uploadToCloudinary(aadhaarBack);

}





if(photo){

documents.photo =
await uploadToCloudinary(photo);

}





if(signature){

documents.signature =
await uploadToCloudinary(signature);

}





if(birthProof){

documents.proofOfBirth =
await uploadToCloudinary(birthProof);

}






await fetch("/api/telegram",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

service:service.name,

name:name,

mobile:mobile,

price:service.price,

address:address

})

});

collection(db,"orders"),

{


service:service.name,


price:service.price,


customerName:name,


mobile:mobile,


address:address,



documents:documents,



paymentStatus:"Screenshot Sent",


status:"Pending",



createdAt:serverTimestamp()


}


);




alert("Order Submitted Successfully");



setName("");

setMobile("");

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


<div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">



<h1 className="text-3xl font-bold text-blue-700">

{service.name}

</h1>




<p className="text-xl font-bold mt-3">

Charge: ₹{service.price}

</p>





<input

className="border p-3 w-full rounded mt-5"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>





<input

className="border p-3 w-full rounded mt-4"

placeholder="Mobile Number"

value={mobile}

onChange={(e)=>setMobile(e.target.value)}

/>






<textarea

className="border p-3 w-full rounded mt-4"

placeholder="Full Address"

value={address}

onChange={(e)=>setAddress(e.target.value)}

/>







<h2 className="text-xl font-bold mt-6">

📂 Upload Documents

</h2>





<label className="block mt-3">
Aadhaar Front
</label>

<input

type="file"

accept="image/*,.pdf"

className="border p-2 w-full"

onChange={(e)=>
setAadhaarFront(e.target.files?.[0] || null)
}

/>





<label className="block mt-3">
Aadhaar Back
</label>

<input

type="file"

accept="image/*,.pdf"

className="border p-2 w-full"

onChange={(e)=>
setAadhaarBack(e.target.files?.[0] || null)
}

/>






<label className="block mt-3">
Photo
</label>

<input

type="file"

accept="image/*"

className="border p-2 w-full"

onChange={(e)=>
setPhoto(e.target.files?.[0] || null)
}

/>







<label className="block mt-3">
Signature
</label>

<input

type="file"

accept="image/*,.pdf"

className="border p-2 w-full"

onChange={(e)=>
setSignature(e.target.files?.[0] || null)
}

/>







<label className="block mt-3">
Proof of Birth
</label>

<input

type="file"

accept="image/*,.pdf"

className="border p-2 w-full"

onChange={(e)=>
setBirthProof(e.target.files?.[0] || null)
}

/>








<div className="text-center mt-7">


<h2 className="text-xl font-bold">

UPI Payment

</h2>



<Image

src="/qr.png"

width={250}

height={250}

alt="QR"

/>



<p className="font-bold text-blue-700 mt-3">

UPI ID: KSHATRIYA0665@PTYES

</p>



</div>







<button

onClick={sendWhatsApp}

className="bg-green-600 text-white w-full p-3 rounded-xl mt-5"

>

📲 Send Payment Screenshot

</button>







<label className="flex gap-2 mt-5">


<input

type="checkbox"

checked={paymentDone}

onChange={(e)=>
setPaymentDone(e.target.checked)
}

/>


Payment Screenshot Sent


</label>







<button

onClick={submitOrder}

disabled={!paymentDone || loading}

className="bg-blue-700 text-white w-full p-3 rounded-xl mt-5"

>


{

loading ? "Uploading..." : "Submit Order"

}



</button>





</div>


</main>


);


}