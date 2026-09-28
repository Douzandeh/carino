import carsData from "@/data/carsData";

async function CarDetail({ params }) {
  const { carId } = await params;
  const carDetails = carsData[carId - 1];
  console.log(carDetails);

  return <div>CarDetail</div>;
}

export default CarDetail;