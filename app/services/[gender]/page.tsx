import CardDisplay from "@/components/main/components/CardDisplay";
import axios from "axios";

const salonId = "65e28c422ebce658ad29fdb0";

async function getServiceCategories(gender:string){
  try{
    const response = await axios.get(`https://m.naai.in/partner/service/category/all?salonId=${salonId}&gender=${gender}`);
    let data = response.data.data;
    data.sort();
    return data;
  }catch(err : any ){
    console.log(err);
  }
}

const Page = async ({params} : {params: {gender: string}}) => {
  const serviceCategories = await getServiceCategories(params.gender);
  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "gender", navigate: "/services" },
        { name: "service Categories", navigate: `/services/${params.gender.toLowerCase()}` },
      ]}
    />
  );
};

export default Page;
