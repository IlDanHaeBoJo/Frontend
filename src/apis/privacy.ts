import axios from "axios";

export const getPrivacyPolicy = async () => {
  const response = await axios.get("http://192.168.1.109:8000/privacy/terms", {
    data: {
      title: "메디씨피엑스 개인정보 처리방침",
    },
  });
  return response.data;
};
