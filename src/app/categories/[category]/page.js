import CarsPage from "@/components/templates/CarsPage";
import carsData from "@/data/carsData";

async function Category({ params }) {
  const { category } = await params;
  const cars = carsData.filter((car) => car.category === category);

  return <CarsPage data={cars} />;
}

export default Category;
