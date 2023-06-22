import axios from "axios";

export default axios.create({
  baseURL: "https://the-widget-folks-serverless.netlify.app/",
  // baseURL: "http://localhost:4000",
});
