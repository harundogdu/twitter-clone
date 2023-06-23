import { useCallback } from "react";
import { useRouter } from "next/router";

import Button from "@/components/shared/Button";

const Custom404 = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex justify-center items-center flex-col mt-24">
      <p className="text-custom-gray-main">
        Hmm...this page doesn&apos;t exist. Try searching for something else.
      </p>
      <Button
        label="Search"
        size="custom"
        labelWeight="bold"
        labelSize="base"
        marginVertical="mt-4"
        onClick={onClick}
      />
    </div>
  );
};
export default Custom404;
