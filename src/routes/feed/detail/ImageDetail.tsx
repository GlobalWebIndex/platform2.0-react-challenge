import {
  ActionFunctionArgs,
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ImageIcon } from "@radix-ui/react-icons";
import { ImageService, FavouritesService } from "../../../api";
import type { Image as ImageType } from "../../router";
import { Link, Info, Image, Modal, Card, CardFooter, CardBody } from "~/ui";
import { FavouriteButton } from "../FavouriteButton";
import { Suspense } from "react";

export function loader({ params }: LoaderFunctionArgs) {
  return defer({
    image: ImageService.getImage(params.imgId!).then((r) => r.json()),
  });
}

export async function action({ request }: ActionFunctionArgs) {
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
  const { images } = useOutletContext() as { images: ImageType[] };
  const navigate = useNavigate();
  const listImageUrl = images?.find((img) => img.id === params.imgId)?.url;
  const data = useLoaderData() as { image: ImageType };

  return (
    <Modal
      isOpen={!!params.imgId}
      onOpenChange={() => navigate("..", { preventScrollReset: true })}
    >
      <Card>
        <CardBody>
          <>
            <Suspense
              fallback={
                <div className="overflow-hidden max-h-[50vh] border">
                  {listImageUrl ? (
                    <Image id={params.imgId!} src={listImageUrl} />
                  ) : (
                    <ImageIcon />
                  )}
                </div>
              }
            >
              <Await resolve={data.image}>
                {(image) => {
                  return (
                    <div className="overflow-hidden max-h-[50vh] border">
                      <Image
                        id={image.id}
                        width={image.width}
                        height={image.height}
                        src={listImageUrl || image.url}
                      />
                    </div>
                  );
                }}
              </Await>
            </Suspense>

            <div className="p-2">
              <Suspense fallback="Loading breed data...">
                <Await resolve={data.image}>
                  {(image: ImageType) => {
                    const breed = image?.breeds?.[0];
                    return breed ? (
                      <>
                        <div className="flex justify-between items-center">
                          <Dialog.Title className="text-2xl text-mauve-11 font-bold mb-2">
                            {breed.name}
                          </Dialog.Title>
                          <div className="flex space-x-1">
                            <Link
                              className="hover:underline text-blue-11"
                              to={`/breeds/${breed.id}`}
                              end
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
                            <Info
                              label="Temperament"
                              value={breed.temperament}
                            />
                            <Info label="Origin" value={breed.origin} />

                            <div className="flex justify-between text-sm">
                              <Info label="LifeSpan" value={breed.life_span} />
                              <Info
                                label="Weight"
                                value={`${breed.weight.metric}kg`}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="">No breed data</div>
                    );
                  }}
                </Await>
              </Suspense>
            </div>
          </>
        </CardBody>
        <CardFooter>
          <FavouriteButton imgId={params.imgId!} />
        </CardFooter>
      </Card>
    </Modal>
  );
}
