"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";

// 함수를 변수에 할당
const handleFormSubmit = async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    if (response.status === 403) {
      return { message: "user_already_exists" };
    }
    console.log(response.status);
    console.log(await response.json());
    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false, // 서버쪽 리다이렉트 방지
    });
  } catch (error) {
    console.error(error);
    return;
  }

  if (shouldRedirect) {
    redirect("/home");
  }
};

// 수정된 부분: 함수를 변수에 할당한 후, 해당 변수를 export합니다.
export default handleFormSubmit;
