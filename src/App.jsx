import './App.css'

function App() {
  const architectureData = {
    vision: [
      { id: 1, title: "Architecture Principles", type: "text" },
      { id: 2, title: "Architecture Goals", type: "text" },
      { id: 3, title: "Vision, Mission and Corporate Strategy", type: "text" },
      { id: 4, title: "Value Chain Diagram", type: "diagram" },
      { id: 5, title: "Business Model Canvas", type: "text" },
      { id: 6, title: "Organization Decomposition Diagram", type: "diagram" },
      { id: 7, title: "Solution Concept Diagram", type: "diagram" },
      { id: 8, title: "Stakeholder Matrix", type: "text" }
    ],
    business: [
      { id: 1, title: "Business Principles", type: "text" },
      { id: 2, title: "Risk", type: "diagram" },
      { id: 3, title: "KPI", type: "text" },
      { id: 4, title: "Organizational Value Catalog", type: "diagram" },
      { id: 5, title: "Functional Decomposition Diagram", type: "diagram" },
      { id: 6, title: "Business Interaction Diagram", type: "diagram" },
      { id: 7, title: "Business Process - Risk Matrix", type: "matrix" },
      { id: 8, title: "Business Process - Data Matrix", type: "matrix" }
    ],
    data: [
      { id: 1, title: "Data Principles", type: "text" },
      { id: 2, title: "Data Entity - Business Function Matrix", type: "matrix" },
      { id: 3, title: "Conceptual Data", type: "diagram" },
      { id: 4, title: "Logical Data Diagram", type: "diagram" }
    ],
    application: [
      { id: 1, title: "Application Principles", type: "text" },
      { id: 2, title: "Application Portfolio Catalog", type: "diagram" },
      { id: 3, title: "Application Use Case Diagram", type: "diagram" },
      { id: 4, title: "Application - Data Matrix", type: "matrix" },
      { id: 5, title: "Application - User and Location Diagram", type: "diagram" },
      { id: 6, title: "Application - Business Process Matrix", type: "matrix" },
      { id: 7, title: "Application - Communication Diagram", type: "diagram" },
      { id: 8, title: "Application - Classification Matrix", type: "matrix" },
      { id: 9, title: "Application - Organization Matrix", type: "matrix" }
    ],
    technology: [
      { id: 1, title: "Technology Principles", type: "text" },
      { id: 2, title: "Technology Standard Catalog", type: "diagram" },
      { id: 3, title: "Environment and Location Diagram", type: "diagram" },
      { id: 4, title: "Network Communication Diagram", type: "diagram" },
      { id: 5, title: "Technology - Application Matrix", type: "matrix" }
    ],
    implementation: [
      { id: 1, title: "Architecture Implementation Planning", type: "diagram" },
      { id: 2, title: "Architecture Governance", type: "diagram" }
    ]
  }

  const getCardColor = (type) => {
    const colors = {
      text: "card-green",
      diagram: "card-blue",
      matrix: "card-pink",
      catalog: "card-yellow"
    }
    return colors[type] || "card-blue"
  }

  const renderSection = (title, items) => (
    <div className="architecture-section" key={title}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {items.map((item) => (
          <div key={item.id} className={`arch-card ${getCardColor(item.type)}`}>
            <div className="card-icon">📄</div>
            <p className="card-label">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="architecture-container">
      {/* Vision Section */}
      <div className="vision-section">
        {renderSection("Architecture Vision", architectureData.vision)}
      </div>

      {/* Main Architecture Sections */}
      <div className="main-sections">
        {renderSection("Business Architecture", architectureData.business)}
        {renderSection("Data Architecture", architectureData.data)}
        {renderSection("Application Architecture", architectureData.application)}
        {renderSection("Technology Architecture", architectureData.technology)}
      </div>

      {/* Implementation Section */}
      <div className="implementation-section">
        {renderSection("Architecture Implementation", architectureData.implementation)}
      </div>
    </div>
  )
}

export default App

