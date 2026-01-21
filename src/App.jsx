import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Navbar from "./components/Navbar";

// IMPORT HALAMAN
import Dashboard from "./pages/Dashboard";
import StrategyMapPage from "./pages/StrategyMapPage";
import ValueChainPage from "./pages/ValueChainPage";
import BusinessModelCanvas from "./pages/BusinessModelCanvas";
import ArchitecturePrinciplesPage from "./pages/ArchitecturePrinciplesPage";
import ArchitectureGoalsPage from "./pages/ArchitectureGoalsPage";
import StakeholderTable from "./pages/StakeholderPage";
import OrgStructurePage from "./pages/OrganizationalActorPage";
import FunctionalDecompositionPage from "./pages/FuncDecomposePage";
import DataPrinciplesPage from "./pages/DataPrinciplesPage";
import DataEntityPage from "./pages/DataEntityComponentPage";
import LogicalDataDiagram from "./pages/LogicalDataPage";
import DataFunctionMatrixPage from "./pages/DataFunctionMatrixPage";
import TechnologyStandarCatalog from "./pages/TechnologyStandarCatalog";
import TechnologyEnvironmentDiagram from "./pages/TechnologyEnvironmentDiagram";
import TechnologyPrinciples from "./pages/TechnologyPrinciples";
import AppDataMatrixPage from "./pages/AppDataMatrixPage";
import ConceptualDiagramPage from "./pages/ConceptualPage";
import BusinessProcessRiskMatrix from "./pages/BusinessProcessRiskMatrix";
import BusinessProcessPage from "./pages/BusinessProcess";
import BusinessPrinciplePage from "./pages/BusinessPrinciple";
import KPIpage from "./pages/KPI";
import TechnologyNetworkDiagram from "./pages/TechnologyNetworkDiagram";
import TechnologyAppMatrix from "./pages/TechnologyAppMatrix";
import SolutionConceptPage from "./pages/SolutionConceptPage";
import ApplicationPortfolioPage from "./pages/PortfolioCatalogPage";
import AppBusinessProcessMatrixPage from "./pages/AppBusinessProcessMatrix";
import AppOrgMatrixPage from "./pages/AppOrgMatrix";
import ApplicationPrinciples from "./pages/ApplicationPrinciples";
import ApplicationClassificationMatrix from "./pages/ApplicationClassificationMatrix";
import BusinessInteractionDiagram from "./pages/BusinessInteractionDiagram";
import CorporateGovernancePage from "./pages/CorporateGovernancePage";
import OrganizationDiagramPage from "./pages/OrganizationDiagramPage";
import PetaKonsepPage from "./pages/PetaKonsepPage";
import PetaKonsepLevel0Page from "./pages/PetaKonsepLevel0Page";
import PetaKonsepLevel01Page from "./pages/PetaKonsepLevel01Page";
import CommunicationDiagramPage from "./pages/CommunicationDiagramPage";
import PortofolioAssesmentPage from "./pages/PortofolioAssesmentPage"
import UseCaseGallery from "./pages/AppUseCasePage";
import DetailPage from "./pages/DetailUsecasePage";


function App() {
  return (
    <div className="app-container min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. NAVBAR (Muncul di semua halaman) */}
      <Navbar />

      {/*  AREA KONTEN (Berubah sesuai URL) */}
      <div className="content-area flex-1 relative">
        <Routes>
          {/* Halaman Utama (Menu Kotak-kotak) */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Halaman Detail (Sesuai Link Navbar & Dashboard) */}
          <Route path="/vision/valuechain" element={<ValueChainPage />} />
          <Route path="/vision/strategy" element={<StrategyMapPage />} />
          <Route path="/vision/stakeholder" element={<StakeholderTable />} />
          <Route path="/vision/organization" element={<OrganizationDiagramPage />} />
          <Route path="/vision/principles" element={<ArchitecturePrinciplesPage />} />
          <Route path="/vision/businessmodelcanvas" element={<BusinessModelCanvas />} />
          <Route path="/vision/goals" element={<ArchitectureGoalsPage />} />
          <Route path="/vision/technologyPrinciples" element={<TechnologyPrinciples />} />
          <Route path="/business/RiskMatrix" element={<BusinessProcessRiskMatrix />} />
          <Route path="/vision/solution" element={<SolutionConceptPage />} />
          <Route path="/business/organizational" element={<OrgStructurePage />} />
          <Route path="/business/functional" element={<FunctionalDecompositionPage />} />
          <Route path="/business/probis" element={<BusinessProcessPage />} />
          <Route path="/business/businessprinciples" element={<BusinessPrinciplePage />} />
          <Route path="/business/kpi" element={<KPIpage />} />
          <Route path="/data/dataprinciples" element={<DataPrinciplesPage />} />
          <Route path="/data/component" element={<DataEntityPage />} />
          <Route path="/data/logical" element={<LogicalDataDiagram />} />
          <Route path="/data/function_matrix" element={<DataFunctionMatrixPage />} />
          <Route path="/tech/standardsCatalog" element={<TechnologyStandarCatalog />} />
          <Route path="/tech/environmentDiagram" element={<TechnologyEnvironmentDiagram />} />
          <Route path="/business/RiskMatrix" element={<BusinessProcessRiskMatrix />} />
          <Route path="/tech/technologyPrinciples" element={<TechnologyPrinciples />} />
          <Route path="/data/appmatrix" element={<AppDataMatrixPage />} />
          <Route path="/data/concept" element={<ConceptualDiagramPage />} />
          <Route path="/tech/networkCommunicationDiagram" element={<TechnologyNetworkDiagram />} />
          <Route path="/tech/appMatrix" element={<TechnologyAppMatrix />} />
          <Route path="/app/portfolio" element={<ApplicationPortfolioPage />} />
          <Route path="/app/process-matrix" element={<AppBusinessProcessMatrixPage />} />
          <Route path="/app/org_matrix" element={<AppOrgMatrixPage />} />
          <Route path="/app/principles" element={<ApplicationPrinciples />} />
          <Route path="/app/classification" element={<ApplicationClassificationMatrix />} />
          <Route path="/business/interaction" element={<BusinessInteractionDiagram />} />
          <Route path="/business/corporate_governance" element={<CorporateGovernancePage />} />
          <Route path="/business-process/peta-konsep" element={<PetaKonsepPage />} />
          <Route path="/business-process/level-0" element={<PetaKonsepLevel0Page />} />
          <Route path="/business-process/level-01" element={<PetaKonsepLevel01Page />} />
          <Route path="/app/communicationDiagram" element={<CommunicationDiagramPage />} /> 
          <Route path="/app/porto-assesment" element={<PortofolioAssesmentPage />} /> 
          <Route path="/app/usecase" element={<UseCaseGallery />} />
          <Route path="/detail/:id" element={<DetailPage />} />


          {/* Placeholder untuk halaman yang belum ada */}
          <Route path="*" element={
            <div className="p-10 text-center text-gray-500">
              <h2 className="text-2xl font-bold">404 - Halaman Belum Dibuat</h2>
              <p>Silakan kembali ke Beranda.</p>
            </div>
          } />
        </Routes>
      </div>

    </div>
  );
}

export default App;