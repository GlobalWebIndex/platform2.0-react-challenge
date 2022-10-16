import { TraitProps } from "interfaces/elements/Trait";
import useTranslation from "next-translate/useTranslation";

export const Traits = (props: TraitProps) => {
    const keys = Object.keys(props);
    const values = Object.values(props);
    const { t } = useTranslation("details");

    return (
        <section className="border-b-[1px] pb-4 md:pb-8 border-b-gray-300 dark:border-b-gray-800 mb-8 grid sm:grid-cols-3 lg:grid-cols-3 gap-y-2 gap-x-10">
            {
                keys.map((trait, index: number) => {
                    return (
                        <div key={trait + index} className="flex items-center">
                            <span className="text-gray-400 w-1/3">{t(trait)}</span>
                            <span className="text-gray-400 w-2/3 flex">
                                <span style={{width: `${values[index] * 20}%`}} className={`inline-block h-[20px] bg-gray-200 dark:bg-gray-400 backdrop-blur-lg`} />
                            </span>
                        </div>
                    )
                })
            }
        </section>
    )
};
