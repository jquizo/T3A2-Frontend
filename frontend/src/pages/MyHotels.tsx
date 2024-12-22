import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BsMap } from "react-icons/bs";
import { BiHotel, BiMoney } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.fetchMyHotels,
        {
          onError: () => {},
        }
      );

      if (!hotelData) {
        return <span>No Hotels found</span>;
      }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link
            to="/add-hotel"
            className="flex bg-slate-800 rounded-lg text-white text-xl font-bold p-3 hover:bg-blue-500"
            >
            Add Hotel
            </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="whitespace-pre-line text-gray-800">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-slate-800 rounded-lg text-white text-xl font-bold p-3 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
        </div>
    )
}

export default MyHotels