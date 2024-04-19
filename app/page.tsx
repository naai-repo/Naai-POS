import CardDisplay from "@/components/main/components/CardDisplay";
import { titleArr } from "@/lib/helper";

export default function Home() {
  return (
    <CardDisplay titles={titleArr} breadcrumbs={[{ name: "Home", navigate: "" }]} />
  );
}
