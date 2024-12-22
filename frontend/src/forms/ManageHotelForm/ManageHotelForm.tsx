import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import HotelDetailsSection from "./DetailsSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number; 
};

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
    
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel);
      }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
          });

        onSave(formData);
    })
  
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={onSubmit}>
            <HotelDetailsSection />
            <GuestsSection />
            <ImagesSection />
            {/* Submit Button  */}
            <span className="flex justify-end">
            <button
            disabled={isLoading}
            type="submit"
            className="bg-slate-700 text-white p-2 rounded-md font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
            {isLoading ? "Saving..." : "Save"}
            </button>
            </span>
            </form>
        </FormProvider>
        
    );
};

export default ManageHotelForm