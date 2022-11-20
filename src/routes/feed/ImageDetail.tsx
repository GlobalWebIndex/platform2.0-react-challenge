import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, StarIcon, Link2Icon } from "@radix-ui/react-icons";
import { ImageService } from "../../api";
import type { ImageStore, Actions, Image as ImageType } from "../router";
import {
  Link,
  Info,
  Image,
  Modal,
  Card,
  CardFooter,
  CardBody,
} from "~/components";

export function loader(store: ImageStore, actions: Actions) {
  return async function ({ params }: LoaderFunctionArgs) {
    if (!store.byId.has(params.imgId!)) {
      const result = (await ImageService.getImage(params.imgId!).then((r) =>
        r.json()
      )) as ImageType;

      actions.saveImage(result);
    }

    return store.byId.get(params.imgId!);
  };
}

export function ImageDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const image = useLoaderData() as ImageType;
  const breed = image.breeds?.[0];

  return (
    <Modal
      isOpen={params.imgId === image?.id}
      onOpenChange={() => navigate("/feed")}
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
                  <Dialog.Title className="text-2xl text-gray-900 font-bold mb-2">
                    {breed.name}
                  </Dialog.Title>
                  <div className="flex space-x-1">
                    <Link
                      className="hover:underline text-blue-600 hover:text-blue-700"
                      to={`/breeds/${breed.id}`}
                    >
                      detail
                    </Link>
                    <div className="border-l border-cool-gray-800"></div>
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
          <Dialog.Close asChild>
            <button className="bg-emerald-700 hover:bg-emerald-800 rounded py-2 px-3 text-white">
              <div className="flex space-x-2 items-center">
                <span>Add to favorites</span>{" "}
                <StarIcon height={20} width={20} />
              </div>
            </button>
          </Dialog.Close>
        </CardFooter>
      </Card>
    </Modal>
  );
}
