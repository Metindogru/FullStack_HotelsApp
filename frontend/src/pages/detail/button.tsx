import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { deletePlace } from "../../utils/service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

const Button: FC<Props> = ({ id }) => {
  //* Navigate oluşturarak sayfa silme işlemi sonrasında kullancıyı AnaSayfaya yönlendirdik.
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: () => deletePlace(id),
    onSuccess: () => {
      toast.info("Konaklama noktası kaldırıldı!");
      //* Silme işlemi sonrası anasayfaya git
      navigate("/");
    },
    onError: () => {
      toast.error("Silme işlemi başarısız oldu!");
    },
  });
  return (
    <div className="flex justify-end my-5">
      <button
        disabled={isPending}
        className="border border-zinc-300 py-1 px-4 rounded-md transition hover:bg-zinc-100 cursor-pointer"
        onClick={() => {
          mutate();
        }}
      >
        Kaldır
      </button>
    </div>
  );
};

export default Button;
