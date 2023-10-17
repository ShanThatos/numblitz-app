import { useAuth } from "pocketbase-react"

import {
  FlexCol,
  FullCenter,
  Header2,
  Header5,
  View,
} from "../../components/base"
import GoogleButton from "../../components/socialbuttons/GoogleButton"

export default function SignInIndex() {
  const { actions } = useAuth()

  return (
    <FullCenter>
      <View className="self-stretch p-3">
        <View className="mx-auto w-full max-w-lg rounded-lg bg-white p-8 shadow">
          <View className="mb-4">
            <Header2 className="text-center">NumBlitz</Header2>
            <Header5 className="text-center italic">
              Level up your math skills!
            </Header5>
          </View>

          <FlexCol className="items-center">
            <GoogleButton
              onPress={() => {
                actions.signInWithProvider("google")
              }}
            />
          </FlexCol>
        </View>
      </View>
    </FullCenter>
  )
}
