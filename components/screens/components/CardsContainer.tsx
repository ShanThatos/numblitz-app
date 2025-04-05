import { Children, ReactNode } from "react";
import { View } from "react-native";

interface CardsContainerProps {
  children?: ReactNode;
}

export default function CardsContainer({ children }: CardsContainerProps) {
  return (
    <View className="flex flex-col p-4 md:flex-row md:flex-wrap">
      {Children.map(children, (child) => (
        <View className="flex p-1.5 md:min-h-32 md:min-w-[50%] md:basis-1 lg:p-2 xl:min-w-[33.333%]">
          {child}
        </View>
      ))}
    </View>
  );
}
