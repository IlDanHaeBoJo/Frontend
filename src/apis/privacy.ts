import { publicApi } from ".";

export const getPrivacyPolicy = async () => {
  const response = await publicApi.get("/privacy/terms", {
    data: {
      title: "메디씨피엑스 개인정보 처리방침",
    },
  });
  return response.data;
};
