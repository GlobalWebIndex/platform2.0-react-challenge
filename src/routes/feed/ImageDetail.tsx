import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ImageService, FavouritesService } from "../../api";
import type { Image as ImageType, Favourite } from "../router";
import { Link, Info, Image, Modal, Card, CardFooter, CardBody } from "~/ui";
import { FavouriteButton } from "./FavouriteButton";

export async function loader({ params }: LoaderFunctionArgs) {
  return await ImageService.getImage(params.imgId!);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { favourite, id } = Object.fromEntries(await request.formData()) as {
    favourite: string;
    id: string;
  };

  return favourite === "true"
    ? FavouritesService.addFavourite(id)
    : FavouritesService.deleteFavourite(id);
}

export function ImageDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const image = useLoaderData() as ImageType;
  const breed = image?.breeds?.[0];

  return (
    <Modal
      isOpen={params.imgId === image?.id}
      onOpenChange={() => navigate("..", { preventScrollReset: true })}
    >
      <Card>
        <CardBody>
          <div className="overflow-hidden max-h-[50vh] border">
            <Image
              id={image.id}
              width={image.width}
              height={image.height}
              src={image.url}
            />
          </div>
          <div className="p-2">
            {breed && (
              <>
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-2xl text-mauve-9 font-bold mb-2">
                    {breed.name}
                  </Dialog.Title>
                  <div className="flex space-x-1">
                    <Link
                      className="hover:underline text-blue-11"
                      to={`/breeds/${breed.id}`}
                    >
                      detail
                    </Link>
                    <div className="border-l border-mauve-7"></div>
                    {breed.wikipedia_url && (
                      <Link isExternal href={breed.wikipedia_url}>
                        wiki
                      </Link>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-1 px-1">
                    <Info label="Temperament" value={breed.temperament} />
                    <Info label="Origin" value={breed.origin} />

                    <div className="flex justify-between text-sm">
                      <Info label="LifeSpan" value={breed.life_span} />
                      <Info label="Weight" value={`${breed.weight.metric}kg`} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <FavouriteButton imgId={image.id} />
        </CardFooter>
      </Card>
    </Modal>
  );
}
