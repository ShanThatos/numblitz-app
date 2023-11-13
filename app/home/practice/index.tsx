import { router } from "expo-router"

import {
  FlexRowCenter,
  FullView,
  Header6,
  Image,
  Pressable,
  View,
} from "../../../components/base"
import { useAuthFetchGet } from "../../../hooks/authfetch"

interface MathGenCategory {
  id: string
  name: string
  display: string
}

export default function PracticeIndex() {
  const { data } = useAuthFetchGet<MathGenCategory[]>("/mathgen/categories")

  return (
    <FullView className="bg-white">
      <FlexRowCenter
        className="m-auto w-full max-w-xl flex-wrap p-5"
        style={{
          gap: 20,
        }}
      >
        {data?.map(({ id, name, display }) => (
          <Pressable
            key={id}
            className="flex aspect-[1.5] min-w-[150] max-w-[45%] flex-col rounded-lg border-2 border-transparent bg-primary px-3 py-2 hover:border-neutral-400 hover:shadow-lg"
            onPress={() => {
              router.push(`/home/practice/${id}`)
            }}
          >
            <Image
              className="grow"
              contentFit="contain"
              source={{ uri: display }}
            />
            <View className="mt-auto">
              <Header6 className="text-center">{name}</Header6>
            </View>
          </Pressable>
        ))}
      </FlexRowCenter>
    </FullView>
  )
}
