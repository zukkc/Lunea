import { OptionType } from "@/shared/settings/types";

export const useMakeSetting = <T>(data: T[]): OptionType<T>[] => {
    const setting =
        data.map(el => ({
            label: el + ' ',
            value: el
        }))

    return setting
}