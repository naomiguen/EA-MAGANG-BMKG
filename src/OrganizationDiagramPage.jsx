import { useEffect, useMemo, useState } from "react"
import "./OrganizationDiagramPage.css"

const STORAGE_KEY = "orgDiagramV1"

function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`
}

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.coordinators)) return null
    return parsed
  } catch {
    return null
  }
}

function countMembers(coordinator) {
  return (coordinator.units || []).reduce((acc, unit) => acc + (unit.members || []).length, 0)
}

function clampSelected({ coordinators, selectedCoordinatorId, selectedUnitId }) {
  const firstCoordinator = coordinators[0]
  const coordinator =
    coordinators.find((c) => c.id === selectedCoordinatorId) || firstCoordinator || null

  const coordinatorId = coordinator ? coordinator.id : null
  const units = coordinator ? coordinator.units || [] : []
  const firstUnit = units[0]
  const unit = units.find((u) => u.id === selectedUnitId) || firstUnit || null
  const unitId = unit ? unit.id : null

  return { coordinatorId, unitId }
}

const DEFAULT_DATA = {
  head: { title: "Kepala Stasiun", name: "Kukuh Ribudyanto, M.Si" },
  coordinators: [
    {
      id: "obs",
      title: "Koordinator Bidang Observasi",
      name: "Agusto Pramana Putera, S.Tr.",
      units: [
        {
          id: "obs_teknisi",
          title: "Unit Teknisi",
          members: [
            "Kurniawan Raharjo, S.T",
            "Ahmad Fauzi, S.T",
            "Nasiti Siwi Risantika, S.Tr.Inst",
            "Badia Lumbanbatu, S.Tr.Inst",
            "Mapasena Farid Wijaya, S.Tr.Inst"
          ]
        },
        {
          id: "obs_observasi",
          title: "Unit Observasi",
          members: [
            "Budayasih Setyorini",
            "Agustian Nugraha, SP",
            "Abdul Mutaqobin, A.Md.",
            "Berty Merens Sipolo, A.Md.",
            "Nur Fitriyani, S.Tr.",
            "Hemu Aulia Zuardi, S.Tr.",
            "Huda Abshor Mukhsinin, S.Tr. Met.",
            "Fryska Mazayyah J. Abay, S.Tr. Met"
          ]
        }
      ]
    },
    {
      id: "data",
      title: "Koordinator Bidang Data dan Informasi",
      name: "Diyan Novida, SST",
      units: [
        {
          id: "data_observasi",
          title: "Unit Observasi",
          members: [
            "Heni Herlina",
            "Idham Chalid, A.Md.",
            "Carolina Meylita Sibarani, S.Tr.",
            "Ilham Rosihan Fachturoni, S.Tr.",
            "Iwan Munandar, S.Tr.",
            "Yudha Satrio Oktavandi, S.Tr."
          ]
        }
      ]
    },
    {
      id: "tu",
      title: "Kepala Sub Bagian Tata Usaha",
      name: "Eko Bambang Minarto, S.Si.",
      units: [
        {
          id: "tu_staf",
          title: "Staf Tata Usaha",
          members: [
            "Farida, S.E.",
            "Ni. Nurul Ahyuni",
            "Nia Kurniati, A.Md.",
            "Meirandi Irawan, A.Md.",
            "Pepi Amdani, A.Md."
          ]
        },
        {
          id: "tu_ppnpn",
          title: "PPNPN",
          members: [
            "Supardi Boy",
            "Jamal Adi Wibowo",
            "Rahman",
            "Syamsul Alam Nur",
            "Aditya Wibowo",
            "Hasbi Hasan Gobel",
            "Suparman",
            "Aril Evansyah"
          ]
        }
      ]
    }
  ]
}

function OrgNode({ title, subtitle }) {
  return (
    <div className="orgNode">
      <div className="orgNodeTitle">{title}</div>
      {subtitle ? <div className="orgNodeSubtitle">{subtitle}</div> : null}
    </div>
  )
}

function UnitNode({ title, members }) {
  return (
    <div className="orgUnitNode">
      <div className="orgUnitTitle">{title}</div>
      <div className="orgUnitMembers">
        {(members || []).length === 0 ? (
          <div className="orgMuted">Belum ada anggota</div>
        ) : (
          <ul className="orgMemberList">
            {members.map((m, idx) => (
              <li key={`${m}-${idx}`}>{m}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="orgModalOverlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="orgModal">
        <div className="orgModalHeader">
          <div className="orgModalTitle">{title}</div>
          <button className="orgBtn orgBtnGhost" type="button" onClick={onClose}>
            Tutup
          </button>
        </div>
        <div className="orgModalBody">{children}</div>
      </div>
    </div>
  )
}

export default function OrganizationDiagramPage() {
  const [data, setData] = useState(() => loadInitialData() || DEFAULT_DATA)

  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState(
    data.coordinators[0]?.id || null
  )
  const [selectedUnitId, setSelectedUnitId] = useState(
    data.coordinators[0]?.units?.[0]?.id || null
  )

  const selection = useMemo(
    () =>
      clampSelected({
        coordinators: data.coordinators,
        selectedCoordinatorId,
        selectedUnitId
      }),
    [data.coordinators, selectedCoordinatorId, selectedUnitId]
  )

  useEffect(() => {
    if (
      selection.coordinatorId !== selectedCoordinatorId ||
      selection.unitId !== selectedUnitId
    ) {
      setSelectedCoordinatorId(selection.coordinatorId)
      setSelectedUnitId(selection.unitId)
    }
  }, [selection.coordinatorId, selection.unitId, selectedCoordinatorId, selectedUnitId])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* ignore */
    }
  }, [data])

  const selectedCoordinator = useMemo(() => {
    return data.coordinators.find((c) => c.id === selection.coordinatorId) || null
  }, [data.coordinators, selection.coordinatorId])

  const selectedUnit = useMemo(() => {
    if (!selectedCoordinator) return null
    return (selectedCoordinator.units || []).find((u) => u.id === selection.unitId) || null
  }, [selectedCoordinator, selection.unitId])

  const [isCrudOpen, setIsCrudOpen] = useState(false)

  const [newCoordinatorTitle, setNewCoordinatorTitle] = useState("")
  const [newCoordinatorName, setNewCoordinatorName] = useState("")

  const [editCoordinatorTitle, setEditCoordinatorTitle] = useState("")
  const [editCoordinatorName, setEditCoordinatorName] = useState("")

  useEffect(() => {
    setEditCoordinatorTitle(selectedCoordinator?.title || "")
    setEditCoordinatorName(selectedCoordinator?.name || "")
  }, [selectedCoordinator?.id, selectedCoordinator?.name, selectedCoordinator?.title])

  const [newUnitTitle, setNewUnitTitle] = useState("")
  const [editUnitTitle, setEditUnitTitle] = useState("")

  useEffect(() => {
    setEditUnitTitle(selectedUnit?.title || "")
  }, [selectedUnit?.id, selectedUnit?.title])

  const [newMemberName, setNewMemberName] = useState("")
  const [editingMemberIndex, setEditingMemberIndex] = useState(null)
  const [editingMemberName, setEditingMemberName] = useState("")

  function updateCoordinator(updated) {
    setData((prev) => ({
      ...prev,
      coordinators: prev.coordinators.map((c) => (c.id === updated.id ? updated : c))
    }))
  }

  function addCoordinator() {
    const title = newCoordinatorTitle.trim()
    const name = newCoordinatorName.trim()
    if (!title || !name) return

    const coordinator = { id: newId(), title, name, units: [] }
    setData((prev) => ({ ...prev, coordinators: [...prev.coordinators, coordinator] }))
    setNewCoordinatorTitle("")
    setNewCoordinatorName("")
    setSelectedCoordinatorId(coordinator.id)
    setSelectedUnitId(null)
  }

  function saveCoordinatorEdits() {
    if (!selectedCoordinator) return
    const title = editCoordinatorTitle.trim()
    const name = editCoordinatorName.trim()
    if (!title || !name) return
    updateCoordinator({ ...selectedCoordinator, title, name })
  }

  function deleteCoordinator() {
    if (!selectedCoordinator) return
    const memberCount = countMembers(selectedCoordinator)
    if (memberCount > 0) return

    setData((prev) => ({
      ...prev,
      coordinators: prev.coordinators.filter((c) => c.id !== selectedCoordinator.id)
    }))
  }

  function addUnit() {
    if (!selectedCoordinator) return
    const title = newUnitTitle.trim()
    if (!title) return
    const unit = { id: newId(), title, members: [] }

    updateCoordinator({
      ...selectedCoordinator,
      units: [...(selectedCoordinator.units || []), unit]
    })

    setNewUnitTitle("")
    setSelectedUnitId(unit.id)
  }

  function saveUnitEdits() {
    if (!selectedCoordinator || !selectedUnit) return
    const title = editUnitTitle.trim()
    if (!title) return

    updateCoordinator({
      ...selectedCoordinator,
      units: (selectedCoordinator.units || []).map((u) =>
        u.id === selectedUnit.id ? { ...u, title } : u
      )
    })
  }

  function deleteUnit() {
    if (!selectedCoordinator || !selectedUnit) return
    if ((selectedUnit.members || []).length > 0) return

    updateCoordinator({
      ...selectedCoordinator,
      units: (selectedCoordinator.units || []).filter((u) => u.id !== selectedUnit.id)
    })
  }

  function addMember() {
    if (!selectedCoordinator || !selectedUnit) return
    const name = newMemberName.trim()
    if (!name) return

    const updatedUnits = (selectedCoordinator.units || []).map((u) => {
      if (u.id !== selectedUnit.id) return u
      return { ...u, members: [...(u.members || []), name] }
    })

    updateCoordinator({ ...selectedCoordinator, units: updatedUnits })
    setNewMemberName("")
  }

  function startEditMember(index) {
    if (!selectedUnit) return
    setEditingMemberIndex(index)
    setEditingMemberName(selectedUnit.members[index] || "")
  }

  function cancelEditMember() {
    setEditingMemberIndex(null)
    setEditingMemberName("")
  }

  function saveEditMember() {
    if (!selectedCoordinator || !selectedUnit) return
    if (editingMemberIndex === null) return
    const name = editingMemberName.trim()
    if (!name) return

    const updatedUnits = (selectedCoordinator.units || []).map((u) => {
      if (u.id !== selectedUnit.id) return u
      const members = [...(u.members || [])]
      members[editingMemberIndex] = name
      return { ...u, members }
    })

    updateCoordinator({ ...selectedCoordinator, units: updatedUnits })
    cancelEditMember()
  }

  function deleteMember(index) {
    if (!selectedCoordinator || !selectedUnit) return

    const updatedUnits = (selectedCoordinator.units || []).map((u) => {
      if (u.id !== selectedUnit.id) return u
      const members = [...(u.members || [])]
      members.splice(index, 1)
      return { ...u, members }
    })

    updateCoordinator({ ...selectedCoordinator, units: updatedUnits })
    if (editingMemberIndex === index) cancelEditMember()
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY)
    setData(DEFAULT_DATA)
    setSelectedCoordinatorId(DEFAULT_DATA.coordinators[0]?.id || null)
    setSelectedUnitId(DEFAULT_DATA.coordinators[0]?.units?.[0]?.id || null)
    setIsCrudOpen(false)
  }

  const canDeleteCoordinator = selectedCoordinator ? countMembers(selectedCoordinator) === 0 : false
  const coordinatorMemberCount = selectedCoordinator ? countMembers(selectedCoordinator) : 0
  const canDeleteUnit = selectedUnit ? (selectedUnit.members || []).length === 0 : false

  return (
    <div className="orgPageWrapper">
      <div className="orgTopBar">
        <div>
          <div className="orgPageTitle">Organization Decomposition Diagram</div>
        </div>

        <div className="orgTopActions">
          <button className="orgBtn orgBtnGhost" type="button" onClick={() => setIsCrudOpen(true)}>
            Kelola data
          </button>
        </div>
      </div>

      <div className="orgDiagramCardFull">
        <div className="orgDiagramHeader">
          <div>Diagram</div>
          <button className="orgBtn orgBtnGhost" type="button" onClick={() => setIsCrudOpen(true)}>
            Edit
          </button>
        </div>

        <div className="orgDiagramCanvasFull">
            <div className="orgChartFull">
                <div className="orgChartHead">
                <OrgNode title={data.head.title} subtitle={data.head.name} />
                <div className="orgLineDownHead" />
                </div>

                <div className="orgChartScroll">
                <div className="orgCoordGrid" style={{ "--cols": data.coordinators.length }}>
                    {data.coordinators.map((c) => {
                    const units = c.units || []
                    const unitsHasAcross = units.length > 1

                    return (
                        <div key={c.id} className="orgCoordCol">
                        <div className="orgDownArrow" />
                        <OrgNode title={c.title} subtitle={c.name} />

                        {units.length > 0 ? (
                            <div className="orgUnitsBlock">
                            <div className="orgLineDownToUnits" />
                            <div
                                className={`orgUnitsGrid ${unitsHasAcross ? "orgUnitsGridHasAcross" : ""}`}
                                style={{ "--units": units.length }}
                            >
                                {units.map((u) => (
                                <div key={u.id} className="orgUnitCol">
                                    <div className="orgDownArrow" />
                                    <UnitNode title={u.title} members={u.members || []} />
                                </div>
                                ))}
                            </div>
                            </div>
                        ) : null}
                        </div>
                    )
                    })}
                </div>
              </div>
            </div>
        </div>
      </div>

      <Modal open={isCrudOpen} title="Kelola Struktur Organisasi" onClose={() => setIsCrudOpen(false)}>
        <div className="orgModalGrid">
          <div className="orgSection">
            <div className="orgSectionTitle">Pilih koordinator</div>

            <select
              className="orgSelect"
              value={selection.coordinatorId || ""}
              onChange={(e) => {
                const id = e.target.value || null
                setSelectedCoordinatorId(id)
                const coordinator = data.coordinators.find((x) => x.id === id)
                setSelectedUnitId(coordinator?.units?.[0]?.id || null)
              }}
            >
              {data.coordinators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            {selectedCoordinator ? (
              <div className="orgMeta">
                Total anggota di koordinator terpilih: <b>{coordinatorMemberCount}</b>
              </div>
            ) : null}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Tambah koordinator</div>

            <div className="orgField">
              <label className="orgLabel">Judul koordinator</label>
              <input
                className="orgInput"
                value={newCoordinatorTitle}
                onChange={(e) => setNewCoordinatorTitle(e.target.value)}
                placeholder="Contoh: Koordinator Bidang Pengamatan"
              />
            </div>

            <div className="orgField">
              <label className="orgLabel">Nama koordinator</label>
              <input
                className="orgInput"
                value={newCoordinatorName}
                onChange={(e) => setNewCoordinatorName(e.target.value)}
                placeholder="Contoh: Nama, Gelar"
              />
            </div>

            <button className="orgBtn" onClick={addCoordinator} type="button">
              Tambah koordinator
            </button>
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Edit koordinator terpilih</div>

            <div className="orgField">
              <label className="orgLabel">Judul koordinator</label>
              <input
                className="orgInput"
                value={editCoordinatorTitle}
                onChange={(e) => setEditCoordinatorTitle(e.target.value)}
              />
            </div>

            <div className="orgField">
              <label className="orgLabel">Nama koordinator</label>
              <input
                className="orgInput"
                value={editCoordinatorName}
                onChange={(e) => setEditCoordinatorName(e.target.value)}
              />
            </div>

            <div className="orgRowBtns">
              <button className="orgBtn" onClick={saveCoordinatorEdits} type="button">
                Simpan edit
              </button>

              <button
                className="orgBtn orgBtnDanger"
                onClick={deleteCoordinator}
                type="button"
                disabled={!canDeleteCoordinator}
                title={
                  canDeleteCoordinator
                    ? "Hapus koordinator"
                    : "Tidak bisa hapus karena masih ada anggota"
                }
              >
                Hapus koordinator
              </button>
            </div>

            {!canDeleteCoordinator && selectedCoordinator ? (
              <div className="orgWarning">
                Hapus koordinator hanya bisa jika total anggota di seluruh unit adalah nol.
              </div>
            ) : null}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Unit di bawah koordinator</div>

            <select
              className="orgSelect"
              value={selection.unitId || ""}
              onChange={(e) => setSelectedUnitId(e.target.value || null)}
              disabled={!selectedCoordinator || (selectedCoordinator.units || []).length === 0}
            >
              {(selectedCoordinator?.units || []).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>

            <div className="orgField">
              <label className="orgLabel">Tambah unit</label>
              <input
                className="orgInput"
                value={newUnitTitle}
                onChange={(e) => setNewUnitTitle(e.target.value)}
                placeholder="Contoh: Unit Pelayanan"
                disabled={!selectedCoordinator}
              />
            </div>

            <button
              className="orgBtn"
              onClick={addUnit}
              type="button"
              disabled={!selectedCoordinator}
            >
              Tambah unit
            </button>

            {selectedUnit ? (
              <>
                <div className="orgDivider" />

                <div className="orgField">
                  <label className="orgLabel">Edit nama unit</label>
                  <input
                    className="orgInput"
                    value={editUnitTitle}
                    onChange={(e) => setEditUnitTitle(e.target.value)}
                  />
                </div>

                <div className="orgRowBtns">
                  <button className="orgBtn" onClick={saveUnitEdits} type="button">
                    Simpan unit
                  </button>

                  <button
                    className="orgBtn orgBtnDanger"
                    onClick={deleteUnit}
                    type="button"
                    disabled={!canDeleteUnit}
                    title={
                      canDeleteUnit ? "Hapus unit" : "Tidak bisa hapus karena masih ada anggota"
                    }
                  >
                    Hapus unit
                  </button>
                </div>

                {!canDeleteUnit ? (
                  <div className="orgWarning">
                    Hapus unit hanya bisa jika unit tidak memiliki anggota.
                  </div>
                ) : null}
              </>
            ) : (
              <div className="orgMuted" style={{ marginTop: 8 }}>
                Pilih unit untuk edit dan kelola anggota.
              </div>
            )}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Anggota pada unit terpilih</div>

            {!selectedUnit ? (
              <div className="orgMuted">Belum ada unit yang dipilih.</div>
            ) : (
              <>
                <div className="orgField">
                  <label className="orgLabel">Tambah anggota</label>
                  <input
                    className="orgInput"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Contoh: Nama, Gelar"
                  />
                </div>

                <button className="orgBtn" onClick={addMember} type="button">
                  Tambah anggota
                </button>

                <div className="orgDivider" />

                {(selectedUnit.members || []).length === 0 ? (
                  <div className="orgMuted">Belum ada anggota.</div>
                ) : (
                  <div className="orgMemberCrudList">
                    {selectedUnit.members.map((m, idx) => (
                      <div className="orgMemberRow" key={`${m}-${idx}`}>
                        {editingMemberIndex === idx ? (
                          <>
                            <input
                              className="orgInput"
                              value={editingMemberName}
                              onChange={(e) => setEditingMemberName(e.target.value)}
                            />
                            <div className="orgRowBtns">
                              <button className="orgBtn" onClick={saveEditMember} type="button">
                                Simpan
                              </button>
                              <button
                                className="orgBtn orgBtnGhost"
                                onClick={cancelEditMember}
                                type="button"
                              >
                                Batal
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="orgMemberName">{m}</div>
                            <div className="orgRowBtns">
                              <button
                                className="orgBtn orgBtnGhost"
                                onClick={() => startEditMember(idx)}
                                type="button"
                              >
                                Edit
                              </button>
                              <button
                                className="orgBtn orgBtnDanger"
                                onClick={() => deleteMember(idx)}
                                type="button"
                              >
                                Hapus
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Utilitas</div>
            <button className="orgBtn orgBtnDanger" type="button" onClick={resetData}>
              Reset ke data awal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
