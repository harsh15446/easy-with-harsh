"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";


export default function Admin() {

  const [orders, setOrders] = useState<any[]>([]);


  const loadOrders = async () => {

    const snapshot = await getDocs(
      collection(db, "orders")
    );

    const data:any[] = [];

    snapshot.forEach((item)=>{

      data.push({
        id:item.id,
        ...item.data()
      });

    });

    setOrders(data);

  };



  useEffect(()=>{

    loadOrders();

  },[]);





  const completeOrder = async(id:string)=>{

    await updateDoc(
      doc(db,"orders",id),
      {
        status:"Completed"
      }
    );

    loadOrders();

  };






  const deleteOrder = async(id:string)=>{

    await deleteDoc(
      doc(db,"orders",id)
    );

    loadOrders();

  };






  const deleteAllOrders = async()=>{


    const confirmDelete = confirm(
      "Kya aap saare orders delete karna chahte hain?"
    );


    if(!confirmDelete) return;



    const snapshot = await getDocs(
      collection(db,"orders")
    );



    for(const item of snapshot.docs){

      await deleteDoc(
        doc(db,"orders",item.id)
      );

    }


    loadOrders();


  };







  const totalOrders = orders.length;



  const pendingOrders = orders.filter(
    (order)=>order.status?.toLowerCase()==="pending"
  ).length;




  const completedOrders = orders.filter(
    (order)=>order.status==="Completed"
  ).length;







  const totalAmount = orders.reduce(

    (sum,order)=>{

      let price = String(order.price || "");

      price = price.replace(/₹/g,"");


      return sum + (Number(price) || 0);


    },

    0

  );








return (

<main className="min-h-screen bg-gray-100 p-5">



<div className="bg-blue-700 text-white p-6 rounded-xl shadow">


<h1 className="text-3xl font-bold">

💻 EASY WITH HARSH

</h1>


<p>
Digital Service Center | Jaunpur
</p>


<h2 className="mt-2">
ADMIN PANEL
</h2>


</div>







<div className="grid md:grid-cols-4 gap-5 mt-6">



<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">
📦 Total Orders
</h2>

<p className="text-4xl font-bold text-blue-700">
{totalOrders}
</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">
⏳ Pending
</h2>

<p className="text-4xl font-bold text-orange-600">
{pendingOrders}
</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">
✅ Completed
</h2>

<p className="text-4xl font-bold text-green-600">
{completedOrders}
</p>

</div>





<div className="bg-white p-5 rounded-xl shadow text-center">

<h2 className="font-bold">
💰 Revenue
</h2>

<p className="text-4xl font-bold">
₹{totalAmount}
</p>

</div>



</div>







<button

onClick={deleteAllOrders}

className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-bold"

>

🗑 Delete All Orders

</button>







<h2 className="text-3xl font-bold mt-8 mb-5">

📋 Customer Orders

</h2>







{

orders.length===0 ?


<div className="bg-white p-5 rounded-xl">

No Orders Found

</div>



:


orders.map((order)=>(



<div

key={order.id}

className="bg-white p-6 rounded-xl shadow mb-5"

>


<h3 className="text-xl font-bold mb-3">

🆕 {order.service}

</h3>



<p>
👤 Name : {order.name}
</p>


<p>
📱 Mobile : {order.mobile}
</p>


<p>
📍 Address : {order.address}
</p>


<p>
💰 Price : ₹{String(order.price || "").replace(/₹/g,"")}
</p>


<p>
🧾 Transaction : {order.transaction}
</p>


<p>
📌 Status : {order.status}
</p>




<div className="flex gap-3 mt-5">


<button

onClick={()=>completeOrder(order.id)}

className="bg-green-600 text-white px-5 py-2 rounded"

>

✅ Complete

</button>





<button

onClick={()=>deleteOrder(order.id)}

className="bg-red-600 text-white px-5 py-2 rounded"

>

🗑 Delete

</button>



</div>



</div>



))


}




</main>

);


}