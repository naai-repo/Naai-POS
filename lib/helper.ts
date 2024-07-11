import axios from "axios";
import { Urls } from "./api";
import { CustomerInfoInterface } from "./types";

export const sendMessageToUser = async (user: CustomerInfoInterface, message: string) => {
  try {
    const body = {
      Text: `${message}`,
      Number: user.phoneNumber,
      SenderId: process.env.NEXT_PUBLIC_SENDER_ID,
      DRNotifyUrl: "https://www.domainname.com/notifyurl",
      DRNotifyHttpMethod: "POST",
      Tool: "API",
    };

    // Sends SMS OTP to user.
    const data = await axios.post(
      `https://restapi.smscountry.com/v0.1/Accounts/${process.env.NEXT_PUBLIC_AUTH_KEY}/SMSes/`,
      body,
      {
        auth: {
          username: process.env.NEXT_PUBLIC_AUTH_KEY || "",
          password: process.env.NEXT_PUBLIC_AUTH_TOKEN || "",
        },
      }
    );

    console.log("Message Sent to User!");
  } catch (err) {
    console.log(err);
  }
};

export const titleArr: string[] = [
  "services",
  "products",
  "packages",
  "memberships",
];
export const serviceCategoriesArr: string[] = [
  "nails",
  "body",
  "hair colour",
  "makeup",
  "threading",
  "hands & feet",
  "test again",
  "bleach",
  "hair",
  "waxing",
  "hair treatment",
  "spa",
  "facial",
];

export const currencyOptions = {
  style: "currency",
  currency: "INR",
};

export const dateOptions = {
  timeZone: "Asia/Kolkata"
}

export const getVariablesData = async (serviceId: string) => {
  const response = await axios.get(
    Urls.GetSingleService + serviceId
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.data;
  for(let variable of data.variables){
   variable["serviceId"] = data._id,
   variable["serviceTitle"] = data.serviceTitle
   variable["cutPrice"] = variable.variableCutPrice
  }
  data.variables.sort((a : any, b : any) => {
    return a.variableName.localeCompare(b.variableName)
  })
  let titles = data.variables.map((ele : any) => ele.variableName)
  titles.sort();
  return {data: data.variables, titles};
}
