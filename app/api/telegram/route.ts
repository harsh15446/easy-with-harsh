import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {

    const body = await req.json();


    const message = `
🆕 New Order Received

📌 Service: ${body.service}

👤 Name: ${body.name}

📱 Mobile: ${body.mobile}

💰 Amount: ₹${body.price}

🏠 Address:
${body.address}

⏳ Status: Pending
`;



    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;



    console.log(
      "TOKEN CHECK:",
      token ? "FOUND" : "MISSING"
    );

    console.log(
      "CHAT ID:",
      chatId
    );



    if (!token || !chatId) {

      return NextResponse.json({

        success:false,

        error:"Telegram Environment Variable Missing"

      });

    }



    const telegramResponse = await fetch(

      `https://api.telegram.org/bot${token}/sendMessage`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify({

          chat_id:chatId,

          text:message

        })

      }

    );



    const result = await telegramResponse.json();



    console.log(
      "TELEGRAM RESPONSE:",
      result
    );



    return NextResponse.json({

      success:telegramResponse.ok,

      telegram:result

    });


  }

  catch(error){


    console.log(
      "TELEGRAM ERROR:",
      error
    );


    return NextResponse.json({

      success:false,

      error:String(error)

    });


  }

}