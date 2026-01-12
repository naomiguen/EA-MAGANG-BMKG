import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Navbar from "./components/Navbar";

// IMPORT HALAMAN
import Dashboard from "./pages/Dashboard";
import OrganizationDiagramPage from "./pages/OrganizationDiagramPage";
import StrategyMapPage from "./pages/StrategyMapPage";
import ValueChainPage from "./pages/ValueChainPage";
import ArchitecturePrinciplesPage from "./pages/ArchitecturePrinciplesPage";
import ArchitectureGoalsPage from "./pages/ArchitectureGoalsPage";
import StakeholderPage from "./pages/StakeholderPage";
import StakeholderTable from "./pages/StakeholderPage";
import OrgStructurePage from "./pages/OrganizationalActorPage";
import FunctionalDecompositionPage from "./pages/FuncDecomposePage";
import DataPrinciplesPage from "./pages/DataPrinciplesPage";
import DataEntityPage from "./pages/DataEntityComponentPage";
import LogicalDataDiagram from "./pages/LogicalDataPage";
import DataFunctionMatrixPage from "./pages/DataFunctionMatrixPage";
import BusinessProcessRiskMatrix from "./pages/BusinessProcessRiskMatrix";
import TechnologyPrinciples from "./pages/TechnologyPrinciples";
import AppDataMatrixPage from "./pages/AppDataMatrixPage";
import ConceptualDiagramPage from "./pages/ConceptualPage";
import SolutionConceptPage from "./pages/SolutionConceptPage";

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
          <Route path="/business/organization" element={<OrganizationDiagramPage />} />
          <Route path="/vision/principles" element={<ArchitecturePrinciplesPage />} />
          <Route path="/vision/goals" element={<ArchitectureGoalsPage />} />
          <Route path="/vision/solution" element={<SolutionConceptPage />} />
          <Route path="/business/organizational" element={<OrgStructurePage />} />
          <Route path="/business/functional" element={<FunctionalDecompositionPage />} />
          <Route path="/data/dataprinciples" element={<DataPrinciplesPage />} />
          <Route path="/data/component" element={<DataEntityPage />} />
          <Route path="/data/logical" element={<LogicalDataDiagram />} />
          <Route path="/data/function_matrix" element={<DataFunctionMatrixPage />} />
          <Route path="/business/RiskMatrix" element={<BusinessProcessRiskMatrix />} />
          <Route path="/vision/technologyPrinciples" element={<TechnologyPrinciples />} />
          <Route path="/data/appmatrix" element={<AppDataMatrixPage />} />
          <Route path="/data/concept" element={<ConceptualDiagramPage />} />

          
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