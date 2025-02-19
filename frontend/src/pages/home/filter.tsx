import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Place } from "../../types";
import { getPlaces } from "../../utils/service";
import { sortOptions } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

const Filter: FC = () => {
  const [params, setParams] = useSearchParams();

  //* 2. defa useQuery'i çağırdık. Bu durumda API'a tekrar istek gitmiyor. İlk atılan istek ön bellekte saklanıyor ve daha sonrasında yapılan istekler ön bellekte tutulan veri tarafından kullanılıyor.
  const { isLoading, data } = useQuery<Place[]>({
    queryKey: ["places"],
    queryFn: () => getPlaces(),
  });

  //* Sadece benzersiz konum isimlerinden oluşan bir dizi oluştur
  const locations = [...new Set(data?.map((i) => i.location))];

  //* URL'e parametre ekle
  const handleChange = (name: string, value: string): void => {
    params.set(name, value);
    setParams(params);
  };

  //console.log(location);
  return (
    <form className="flex flex-col gap-4 lg:gap-10 lg:mt-15 ">
      <div className="field">
        <label>Konaklanacak İl seçiniz</label>

        {!isLoading ? (
          <select
            onChange={(e) => handleChange("location", e.target.value)}
            value={params.get("location") || ""}
            className="input"
          >
            <option value="">Seçiniz</option>
            {locations.map((i, key) => (
              <option key={key} value={i}>
                {i}
              </option>
            ))}
          </select>
        ) : (
          <div className="h-[31px]"></div>
        )}
      </div>

      <div className="field">
        <label>Konaklama yeri adına göre ara</label>
        <input
          value={params.get("title") || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          type="text"
          placeholder="Havuzlu Villa"
          className="input"
        />
      </div>

      <div className="field">
        <label>Sıralamak için</label>
        <select
          value={params.get("order") || ""}
          onChange={(e) => handleChange("order", e.target.value)}
          className="input"
        >
          {sortOptions.map((i, key) => (
            <option key={key} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setParams({})}
          type="reset"
          className="bg-blue-500 p-1 px-4 text-white rounded-md w-fit"
        >
          Filtreleri Temizle
        </button>
      </div>
    </form>
  );
};

export default Filter;
