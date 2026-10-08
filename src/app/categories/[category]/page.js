import BackButton from "@/components/module/BackButton";
import CarsPage from "@/components/templates/CarsPage";
import carsData from "@/data/carsData";

async function Category({ params }) {
  const { category } = await params;
  const cars = carsData.filter((car) => car.category === category);

  return (
    <div>
      <BackButton href="/cars" />
      <CarsPage data={cars} />
    </div>
  );
}

export default Category;