import { OptionType } from "@/shared/settings/types";

export const useMakeSetting = <T>(data: T[], i18nKey: string): OptionType<T>[] => {
    const setting =
        data.map(el => ({
            i18nKey: `${i18nKey}.${el}`,
            value: el
        }))

    return setting
}