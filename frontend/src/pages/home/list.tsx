import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getPlaces } from "../../utils/service";
import { Place } from "../../types";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card/card";
import { useSearchParams } from "react-router-dom";

const List: FC = () => {
  //*URL'de ki parametreleri al
  const [params] = useSearchParams();
  const paramsObj = Object.fromEntries(params.entries());

  //*API isteği
  const { isLoading, error, data, refetch } = useQuery<Place[]>({
    queryKey: ["places", paramsObj], //*!  Bağımlılık dizisi
    queryFn: () => getPlaces(paramsObj),
    //* Default değeri 4'tür. API'dan veri gelmemesi durumunda 4 defa denedikten sonra hataya düşürür.
    retry: 3,
  });
  return (
    <div className="mt-10">
      <h1 className="font-bold text-2xl">Yakınınızdaki Lokasyonlar</h1>
      <div>
        {isLoading ? (
          <Loader designs="my-20" />
        ) : error ? (
          <Error info={error} refetch={refetch} />
        ) : (
          <div className="grid gap-5 mt-5">
            {data?.map((place) => (
              <Card key={place.id} place={place} />
            ))}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default List;
