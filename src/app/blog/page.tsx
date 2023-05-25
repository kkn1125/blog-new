"use client";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <div>
      blog
      <button
        onClick={() => {
          router.push("/blog/test/");
        }}>
        test
      </button>
    </div>
  );
}

export default Page;
