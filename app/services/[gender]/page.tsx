import CardDisplay from "@/components/main/components/CardDisplay";
import { SALONID } from "@/lib/api";
import { Gender } from "@/lib/enums";
import { genderType } from "@/lib/types";
import axios from "axios";

const salonId = SALONID;

async function getServiceCategories(gender: genderType) {
  console.log(salonId);
  if(!gender){
    throw new Error("Please select a valid gender")
  }
  let sex: Gender;
  if (gender === "men") {
    sex = Gender.MEN;
  } else if (gender === "women") {
    sex = Gender.WOMEN;
  } else {
    sex = Gender.UNISEX;
  }
  const response = await axios.get(
    `https://m.naai.in/partner/service/category/all?salonId=${salonId}&sex=${sex}`
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }

  let data = response.data.data;
  data.sort();
  return data;
}

const Page = async ({ params }: { params: { gender: genderType } }) => {
  const serviceCategories = await getServiceCategories(params.gender);
  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "gender", navigate: "/services" },
        {
          name: "service Categories",
          navigate: `/services/${params.gender?.toLowerCase()}`,
        },
      ]}
    />
  );
};

export default Page;
