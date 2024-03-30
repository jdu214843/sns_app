import { unstable_HistoryRouter } from "react-router-dom";

const handleLastPage = () => {
  const history = unstable_HistoryRouter();
  history.goBack();
};

export { handleLastPage };
