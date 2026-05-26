import { Rounded, WriteText } from "@/shared/ui"
import { TouchableOpacity } from "react-native";

type ProfileButtonProps = {
    title: string
    active: boolean
    onPress: () => void
}

const ProfileButton = ({ title, active, onPress }: ProfileButtonProps) => {
    const color = active ? '#ffffff' : '#bbbbbb'

    return (
        <TouchableOpacity onPress={onPress}>
            <Rounded style={{ paddingVertical: 10, paddingHorizontal: 15, borderColor: color }}>
                <WriteText 
                    style={{ color: color }}
                >
                    {title}
                </WriteText>
            </Rounded>
        </TouchableOpacity>
    )
}

export default ProfileButton;