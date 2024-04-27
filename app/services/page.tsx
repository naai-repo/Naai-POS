import CardDisplay from "@/components/main/components/CardDisplay";
import axios from "axios";

const salonId = "65e28c422ebce658ad29fdb0";

async function getServiceCategories(){
  try{
    const response = await axios.get(`https://m.naai.in/partner/service/category/all?salonId=${salonId}`);
    let data = response.data.data;
    data.sort();
    return data;
  }catch(err : any ){
    console.log(err);
  }
}

const Page = async () => {
  const serviceCategories = await getServiceCategories();
  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
      ]}
    />
  );
};

export default Page;
