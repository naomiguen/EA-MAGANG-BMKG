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
import BusinessProcessKPIMatrixPage from "./pages/BusinessProcessKPIMatrix";
import TechnologyNetworkDiagram from "./pages/TechnologyNetworkDiagram";
import TechnologyAppMatrix from "./pages/TechnologyAppMatrix";
import SolutionConceptPage from "./pages/SolutionConceptPage";
import ApplicationPortfolioPage from "./pages/PortfolioCatalogPage";
import AppBusinessProcessMatrixPage from "./pages/AppBusinessProcessMatrix";
import AppOrgMatrixPage from "./pages/AppOrgMatrix";
import AppUserLocationPage from "./pages/AppUserLocation";
import ApplicationPrinciples from "./pages/ApplicationPrinciples";
import ApplicationClassificationMatrix from "./pages/ApplicationClassificationMatrix";
import BusinessInteractionDiagram from "./pages/BusinessInteractionDiagram";
import CorporateGovernancePage from "./pages/CorporateGovernancePage";
import OrganizationDiagramPage from "./pages/OrganizationDiagramPage";
import PetaKonsepPage from "./pages/PetaKonsepPage";
import PetaKonsepLevel0Page from "./pages/PetaKonsepLevel0Page";
import PetaKonsepLevel01Page from "./pages/PetaKonsepLevel01Page";
import ArchitectureGovernancePage from "./pages/ArchitectureGovernance";
import CommunicationDiagramPage from "./pages/CommunicationDiagramPage";
import PortofolioAssesmentPage from "./pages/PortofolioAssesmentPage";
import UseCaseGallery from "./pages/AppUseCasePage";
import DetailPage from "./pages/DetailUsecasePage";
import BusinessProcessAppMatrix from "./pages/BusinessAppMatrix";
import BusinessDataMatrixPage from "./pages/BusinessDataMatrixPage";
import ImplementationPage from "./pages/ImplementationPage";
import Risk from "./pages/Risk";
import SOPListPage from "./pages/SOPListPage";
import QualityPolicyPage from "./pages/QualityPolicyPage";

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
          {/* Vision */}
          <Route
            path="/vision/principles"
            element={<ArchitecturePrinciplesPage />}
          />
          <Route path="/vision/goals" element={<ArchitectureGoalsPage />} />
          <Route
            path="/vision/business-model-canvas"
            element={<BusinessModelCanvas />}
          />
          <Route
            path="/vision/organization"
            element={<OrganizationDiagramPage />}
          />
          <Route path="/vision/stakeholder" element={<StakeholderTable />} />
          <Route path="/vision/solution" element={<SolutionConceptPage />} />
          <Route path="/vision/valuechain" element={<ValueChainPage />} />
          <Route path="/vision/strategy" element={<StrategyMapPage />} />
          {/* Business */}
          <Route
            path="/business/interaction"
            element={<BusinessInteractionDiagram />}
          />
          <Route
            path="/business/risk"
            element={<Risk/>}
          />
          <Route
            path="/business/businessprinciples"
            element={<BusinessPrinciplePage />}
          />
          <Route path="/business/probis" element={<BusinessProcessPage />} />
          <Route
            path="/business/application-matrix"
            element={<BusinessProcessAppMatrix />}
          />
          <Route
            path="/business/data-matrix"
            element={<BusinessDataMatrixPage />}
          />
          <Route
            path="/business/risk-matrix"
            element={<BusinessProcessRiskMatrix />}
          />
          <Route
            path="/business/businessprocess-kpimatrix"
            element={<BusinessProcessKPIMatrixPage />}
          />
          <Route
            path="/business/corporate_governance"
            element={<CorporateGovernancePage />}
          />
          <Route
            path="/business/functional"
            element={<FunctionalDecompositionPage />}
          />
          <Route path="/business/kpi" element={<KPIpage />} />
          <Route
            path="/business/organizational"
            element={<OrgStructurePage />}
          />
          <Route
            path="/business-process/peta-konsep"
            element={<PetaKonsepPage />}
          />
          <Route
            path="/business-process/level-0"
            element={<PetaKonsepLevel0Page />}
          />
          <Route
            path="/business-process/level-01"
            element={<PetaKonsepLevel01Page />}
          />
          {/* Data */}
          <Route
            path="/data/application-matrix"
            element={<AppDataMatrixPage />}
          />
          <Route path="/data/concept" element={<ConceptualDiagramPage />} />
          <Route
            path="/data/function-matrix"
            element={<DataFunctionMatrixPage />}
          />
          <Route path="/data/component-catalog" element={<DataEntityPage />} />
          <Route path="/data/principles" element={<DataPrinciplesPage />} />
          <Route
            path="/data/logical-data-diagram"
            element={<LogicalDataDiagram />}
          />
          {/* Application */}
          <Route path="/app/usecase" element={<UseCaseGallery />} />
          <Route
            path="/app/portfolio-catalog"
            element={<ApplicationPortfolioPage />}
          />
          <Route path="/app/principles" element={<ApplicationPrinciples />} />
          <Route
            path="/app/process-matrix"
            element={<AppBusinessProcessMatrixPage />}
          />
          <Route
            path="/app/classification-matrix"
            element={<ApplicationClassificationMatrix />}
          />
          <Route
            path="/app/communication-diagram"
            element={<CommunicationDiagramPage />}
          />
          <Route
            path="/app/organization-matrix"
            element={<AppOrgMatrixPage />}
          />
          <Route
            path="/app/AppUserLocation"
            element={<AppUserLocationPage />}
          />
          <Route
            path="/app/portofolio-assesment"
            element={<PortofolioAssesmentPage />}
          />
          {/* Technology */}
          <Route
            path="/tech/environment-diagram"
            element={<TechnologyEnvironmentDiagram />}
          />
          <Route
            path="/tech/network-communication-diagram"
            element={<TechnologyNetworkDiagram />}
          />
          <Route
            path="/tech/application-matrix"
            element={<TechnologyAppMatrix />}
          />
          <Route
            path="/tech/technology-principles"
            element={<TechnologyPrinciples />}
          />
          <Route
            path="/tech/standards-catalog"
            element={<TechnologyStandarCatalog />}
          />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/business/appMatrix"
            element={<BusinessProcessAppMatrix />}
          />
          <Route
            path="/business/dataMatrix"
            element={<BusinessDataMatrixPage />}
          />
          <Route path="/sop-list" element={<SOPListPage />} />
          <Route path="/quality-policy" element={<QualityPolicyPage />} />
          {/* implementation */}
          <Route path="/imp/planning" element={<ImplementationPage />} />
          <Route
            path="/imp/governance"
            element={<ArchitectureGovernancePage />}
          />
          {/* Placeholder untuk halaman yang belum ada */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-gray-500">
                <h2 className="text-2xl font-bold">
                  404 - Halaman Belum Dibuat
                </h2>
                <p>Silakan kembali ke Beranda.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
