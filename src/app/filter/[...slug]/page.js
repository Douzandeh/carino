import CarsList from "@/components/templates/CarsList";
import carsData from "@/data/carsData";

async function FilteredCars({ params }) {
  const { slug } = await params;
  const [min, max] = slug || [];

  const filteredData = carsData.filter(
    (item) => item.price > Number(min) && item.price < Number(max),
  );

  if (!filteredData.length) return <h3>NotFound</h3>;

  return <CarsList data={filteredData} />;
}

export default FilteredCars;