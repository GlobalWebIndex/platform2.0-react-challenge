import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, StarIcon, Link2Icon } from "@radix-ui/react-icons";
import { config } from "../config";
import type { ImageStore, Actions, Image } from "./router";
import { useState } from "react";

export function loader(store: ImageStore, actions: Actions) {
  return async function ({ params }: LoaderFunctionArgs) {
    console.log("image loader");

    if (!store.byId.has(params.imgId!)) {
      const result = (await fetch(`${config.url}/images/${params.imgId!}`, {
        headers: {
          ...config.headers,
        },
      }).then((r) => r.json())) as Image;

      actions.saveImage(result);
    }

    return store.byId.get(params.imgId!);
  };
}

export function ImageDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const image = useLoaderData() as Image;
  console.log("image", image, params, 32);
  const [open, setOpen] = useState(true);
  return (
    <Dialog.Root
      open={params.imgId === image?.id}
      onOpenChange={() => navigate("/feed")}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-400/40 fixed inset-0 animate-[overlayShow_150ms_ease-in]" />
        <Dialog.Content className="bg-white rounded-md fixed shadow-dark-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg max-h-[85vh] animate-[contentShow_150ms_ease-in] overflow-auto">
          <div className="overflow-hidden border">
            <img
              alt={image.id}
              width={image.width}
              height={image.height}
              className="max-h-[60vh] block object-cover"
              src={image.url}
            />
          </div>
          <div className="p-4">
            {image.breeds.map((breed) => (
              <>
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-2xl text-gray-900 font-bold mb-2">
                    {breed.name}
                  </Dialog.Title>
                  <div className="flex space-x-1">
                    <Link
                      className="hover:underline text-blue-600 hover:text-blue-700"
                      //   to={`/breeds/${breed.id}`}
                      to={`/breeds`}
                    >
                      breeds
                    </Link>
                    <div className="border-l border-cool-gray-800"></div>
                    {breed.wikipedia_url && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={breed.wikipedia_url}
                        className="flex items-center text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        show wiki
                        <Link2Icon />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-1 px-1">
                    <Dialog.Description className="text-sm leading-4 text-gray-600">
                      {breed.description}
                    </Dialog.Description>
                    <div className="flex space-x-2 text-sm">
                      <div className="text-gray-500 ">Temperament:</div>
                      <div className="text-gray-900 ">{breed.temperament}</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex space-x-2">
                        <div className="text-gray-500">Lifespan:</div>
                        <div className="text-gray-900 ">{breed.life_span}</div>
                      </div>

                      <div className="flex space-x-2 text-sm">
                        <div className="text-gray-500">Weight:</div>
                        <div className="text-gray-900">
                          {breed.weight.metric} kg
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 text-sm">
                      <div className="text-gray-500">Origin:</div>
                      <div className="text-gray-900">{breed.origin}</div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className=" flex justify-end p-4">
            <Dialog.Close asChild>
              <button className="bg-emerald-700 hover:bg-emerald-800 rounded py-2 px-3 text-white">
                <div className="flex space-x-2 items-center">
                  <span>Add to favorites</span>{" "}
                  <StarIcon height={20} width={20} />
                </div>
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute border border-gray50 top-2 right-2 bg-slate-900/30 hover:bg-slate-900/80 text-gray-50 rounded-full p-2"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
