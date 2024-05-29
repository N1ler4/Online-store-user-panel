import useProductStore from "@store-product";
import { useEffect, useState } from "react";
import { Carousel } from "@components";

export default function Index() {
  const { product , like } = useProductStore();
  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async () => {
    try {
      const res = await product(1, 10);
      if (res && res.status === 200) {
        setData(res.data.products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div>
      <Carousel />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
        {data.length > 0 ? (
          data.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between w-full hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <img
                  src={item.image_url[0]}
                  alt={item.product_name}
                  className="h-[200px] w-full object-cover mb-4 rounded-lg"
                />
                <h1 className="text-2xl font-semibold mb-2">
                  {item.product_name}
                </h1>
                <p className="text-gray-600 mb-3">{item.description}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Age Range:</span>{" "}
                  {item.age_min} - {item.age_max}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Color:</span> {item.color}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Gender:</span>{" "}
                  {item.for_gender}
                </p>
                <p className="text-lg font-bold mb-1 text-green-700">
                  ${Math.ceil(item.cost / item.discount)}
                  <span className="text-red-300 line-through ml-2">
                    ${item.cost}
                  </span>
                </p>
                <div className="flex justify-between">
                  {" "}
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    View
                  </button>
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={
                    () => {
                      like(item.product_id)
                    }
                  }>
                    Like
                  </button>
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}