import CarDetails from "@/components/templates/CarDetails";
import carsData from "@/data/carsData";

async function CarDetail({ params }) {
  const { carId } = await params;
  const carDetails = carsData[carId - 1];

  return <CarDetails {...carDetails} />;
}

export default CarDetail;
