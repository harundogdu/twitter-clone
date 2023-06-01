import ColorUtils from "@/base/colors";
import SpaceUtils from "@/base/spaces";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Custom404 = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex justify-center items-center flex-col mt-24">
      <p className="text-gray-main">
        Hmm...this page doesn&apos;t exist. Try searching for something else.
      </p>
      <Button
        label="Search"
        size="md"
        bgColor={ColorUtils.colors.main}
        color={ColorUtils.colors.white}
        marginVertical={SpaceUtils.spaces.lg}
        paddingHorizontal={SpaceUtils.spaces.md}
        paddingVertical={"0.4rem"}
        fontWeight={700}
        onClick={onClick}
      />
    </div>
  );
};
export default Custom404;
