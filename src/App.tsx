import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageHeader from "./Modules/Page_Sructure/Page_Header/PageHeader";
import AppIcon from "@mui/icons-material/grain";
import PageFooter from "./Modules/Page_Sructure/Page_Footer/PageFooter";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  const headerIcon = <AppIcon />;
  const headerTitle = "Nyx Master";
  const headerSubtitle = "Automatic Telescope Motion Control & Image Analysis";
  const footerContents = <div></div>;

  return (
    <Router>
      <PageHeader icon={headerIcon} title={headerTitle} subtitle={headerSubtitle} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <PageFooter
        contents={footerContents}
        // title="NyxMaster"
        // creator="Ermis A. Ntaviskas"
        // mail="Hermes.Daviskas@gmail.com"
        // weburl="www.NyxMaster.com"
        // phone="6907703785"
      />
    </Router>
  );
}

export default App;
