import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Claims } from "./components/claims/claims";

export default withPageAuthRequired(
  async function Home() {
    return <Claims />;
  },
  {
    returnTo: "/",
  }
);
