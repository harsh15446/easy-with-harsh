"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export default function Page() {


  const [name,setName] = useState("");
  const [mobile,setMobile] = useState("");
  const [pan,setPan] = useState("");
  const [loading,setLoading] = useState(false);



  const submitOrder = async()=>{


    if(!name || !mobile || !pan){

      alert("Please fill all details");
      return;

    }


    try{


      setLoading(true);


      const orderID = "EWH-" + Date.now();



      await addDoc(

        collection(db,"orders"),

        {

          orderID:orderID,

          name:name,

          mobile:mobile,

          pan:pan,

          service:"PAN Card PDF",

          price:"50",

          status:"Pending",

          createdAt:serverTimestamp()

        }

      );



      alert(
        "Order Submitted\nOrder ID: "+orderID
      );


      setName("");
      setMobile("");
      setPan("");


    }

    catch(error){

      console.log(error);

      alert("Order Failed");

    }

    finally{

      setLoading(false);

    }


  };



  return (

    <main className="min-h-screen bg-gray-100 p-5">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">


        <h1 className="text-3xl font-bold text-blue-700">
          PAN Card PDF
        </h1>


        <p className="mt-2">
          PAN Card PDF service ke liye details submit kare.
        </p>



        <input

          className="w-full border p-3 rounded mt-5"

          placeholder="Your Name"

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

          placeholder="PAN Number"

          value={pan}

          onChange={(e)=>setPan(e.target.value)}

        />



        <div className="mt-6 bg-blue-50 p-5 rounded-xl">


          <h2 className="text-xl font-bold">
            Payment
          </h2>


          <p className="mt-2">
            Charge: ₹50
          </p>


          <p className="mt-2 font-bold">
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
            loading ? "Submitting..." : "Submit Order"
          }

        </button>



      </div>


    </main>

  );

}