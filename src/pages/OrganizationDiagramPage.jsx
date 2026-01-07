// src/pages/OrganizationDiagramPage.jsx
import { useCallback, useEffect, useMemo, useState } from "react"
import "./css/OrganizationDiagramPage.css"
import { supabase } from "../lib/supabaseClient"

const DEFAULT_CHART_NAME = "default"

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

function slugify(value) {
  const s = String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+/, "")
    .replace(/_+$/, "")

  return s || "item"
}

function makeCode(prefix, label) {
  return `${prefix}_${slugify(label)}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`
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

function normalizeChartRow(chartRow) {
  const headRaw = chartRow?.org_head
  const head = Array.isArray(headRaw) ? headRaw[0] : headRaw

  const coordinatorsRaw = [...(chartRow?.org_coordinators || [])].sort(
    (a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0)
  )

  const coordinators = coordinatorsRaw.map((c) => {
    const unitsRaw = [...(c.org_units || [])].sort(
      (a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0)
    )

    const units = unitsRaw.map((u) => {
      const membersRaw = [...(u.org_members || [])].sort(
        (a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0)
      )
      const members = membersRaw.map((m) => m.name)
      return { id: u.id, title: u.title, members }
    })

    return {
      id: c.id,
      title: c.title,
      name: c.name,
      units
    }
  })

  return {
    chartId: chartRow?.id || null,
    data: {
      head: {
        title: head?.title || "Kepala Stasiun",
        name: head?.name || ""
      },
      coordinators
    }
  }
}

export default function OrganizationDiagramPage() {
  const [chartId, setChartId] = useState(null)
  const [data, setData] = useState({
    head: { title: "Kepala Stasiun", name: "" },
    coordinators: []
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [dbError, setDbError] = useState("")

  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState(null)
  const [selectedUnitId, setSelectedUnitId] = useState(null)

  const refreshFromDb = useCallback(
    async ({ nextCoordinatorId, nextUnitId } = {}) => {
      setDbError("")
      setIsLoading(true)

      const { data: chartRow, error } = await supabase
        .from("org_charts")
        .select(
          `
          id,
          name,
          org_head ( title, name ),
          org_coordinators ( id, title, name, sort_order,
            org_units ( id, title, sort_order,
              org_members ( id, name, sort_order )
            )
          )
        `
        )
        .eq("name", DEFAULT_CHART_NAME)
        .maybeSingle()

      if (error) {
        setDbError(error.message || "Gagal mengambil data dari database")
        setIsLoading(false)
        return
      }

      if (!chartRow) {
        setDbError(
          `Chart '${DEFAULT_CHART_NAME}' tidak ditemukan di tabel org_charts. Buat 1 baris org_charts name = '${DEFAULT_CHART_NAME}'.`
        )
        setChartId(null)
        setData({ head: { title: "Kepala Stasiun", name: "" }, coordinators: [] })
        setIsLoading(false)
        return
      }

      const normalized = normalizeChartRow(chartRow)
      setChartId(normalized.chartId)
      setData(normalized.data)

      if (typeof nextCoordinatorId !== "undefined") setSelectedCoordinatorId(nextCoordinatorId)
      if (typeof nextUnitId !== "undefined") setSelectedUnitId(nextUnitId)

      setIsLoading(false)
    },
    []
  )

  useEffect(() => {
    refreshFromDb()
  }, [refreshFromDb])

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

  async function addCoordinator() {
    const title = newCoordinatorTitle.trim()
    const name = newCoordinatorName.trim()
    if (!chartId || !title || !name) return

    setIsSaving(true)
    setDbError("")

    const sort_order = (data.coordinators || []).length + 1
    const code = makeCode("coord", title)

    const { data: inserted, error } = await supabase
      .from("org_coordinators")
      .insert({ chart_id: chartId, code, title, name, sort_order })
      .select("id")
      .single()

    if (error) {
      setDbError(error.message || "Gagal menambah koordinator")
      setIsSaving(false)
      return
    }

    setNewCoordinatorTitle("")
    setNewCoordinatorName("")
    await refreshFromDb({ nextCoordinatorId: inserted.id, nextUnitId: null })
    setIsSaving(false)
  }

  async function saveCoordinatorEdits() {
    if (!selectedCoordinator) return
    const title = editCoordinatorTitle.trim()
    const name = editCoordinatorName.trim()
    if (!title || !name) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase
      .from("org_coordinators")
      .update({ title, name })
      .eq("id", selectedCoordinator.id)

    if (error) {
      setDbError(error.message || "Gagal menyimpan koordinator")
      setIsSaving(false)
      return
    }

    await refreshFromDb({ nextCoordinatorId: selectedCoordinator.id })
    setIsSaving(false)
  }

  async function deleteCoordinator() {
    if (!selectedCoordinator) return
    if ((selectedCoordinator.units || []).length > 0) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase
      .from("org_coordinators")
      .delete()
      .eq("id", selectedCoordinator.id)

    if (error) {
      setDbError(error.message || "Gagal menghapus koordinator")
      setIsSaving(false)
      return
    }

    await refreshFromDb({ nextCoordinatorId: null, nextUnitId: null })
    setIsSaving(false)
  }

  async function addUnit() {
    if (!selectedCoordinator) return
    const title = newUnitTitle.trim()
    if (!title) return

    setIsSaving(true)
    setDbError("")

    const sort_order = (selectedCoordinator.units || []).length + 1
    const code = makeCode("unit", title)

    const { data: inserted, error } = await supabase
      .from("org_units")
      .insert({
        coordinator_id: selectedCoordinator.id,
        code,
        title,
        sort_order
      })
      .select("id")
      .single()

    if (error) {
      setDbError(error.message || "Gagal menambah unit")
      setIsSaving(false)
      return
    }

    setNewUnitTitle("")
    await refreshFromDb({ nextCoordinatorId: selectedCoordinator.id, nextUnitId: inserted.id })
    setIsSaving(false)
  }

  async function saveUnitEdits() {
    if (!selectedUnit) return
    const title = editUnitTitle.trim()
    if (!title) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase.from("org_units").update({ title }).eq("id", selectedUnit.id)

    if (error) {
      setDbError(error.message || "Gagal menyimpan unit")
      setIsSaving(false)
      return
    }

    await refreshFromDb({ nextCoordinatorId: selectedCoordinator?.id, nextUnitId: selectedUnit.id })
    setIsSaving(false)
  }

  async function deleteUnit() {
    if (!selectedCoordinator || !selectedUnit) return
    if ((selectedUnit.members || []).length > 0) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase.from("org_units").delete().eq("id", selectedUnit.id)

    if (error) {
      setDbError(error.message || "Gagal menghapus unit")
      setIsSaving(false)
      return
    }

    await refreshFromDb({ nextCoordinatorId: selectedCoordinator.id, nextUnitId: null })
    setIsSaving(false)
  }

  async function addMember() {
    if (!selectedUnit) return
    const name = newMemberName.trim()
    if (!name) return

    setIsSaving(true)
    setDbError("")

    const sort_order = (selectedUnit.members || []).length + 1

    const { error } = await supabase
      .from("org_members")
      .insert({ unit_id: selectedUnit.id, name, sort_order })

    if (error) {
      setDbError(error.message || "Gagal menambah anggota")
      setIsSaving(false)
      return
    }

    setNewMemberName("")
    await refreshFromDb({ nextCoordinatorId: selectedCoordinator?.id, nextUnitId: selectedUnit.id })
    setIsSaving(false)
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

  async function saveEditMember() {
    if (!selectedUnit) return
    if (editingMemberIndex === null) return

    const newName = editingMemberName.trim()
    if (!newName) return

    const oldName = selectedUnit.members[editingMemberIndex]
    if (!oldName) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase
      .from("org_members")
      .update({ name: newName })
      .eq("unit_id", selectedUnit.id)
      .eq("name", oldName)

    if (error) {
      setDbError(error.message || "Gagal edit anggota")
      setIsSaving(false)
      return
    }

    cancelEditMember()
    await refreshFromDb({ nextCoordinatorId: selectedCoordinator?.id, nextUnitId: selectedUnit.id })
    setIsSaving(false)
  }

  async function deleteMember(index) {
    if (!selectedUnit) return
    const name = selectedUnit.members[index]
    if (!name) return

    setIsSaving(true)
    setDbError("")

    const { error } = await supabase
      .from("org_members")
      .delete()
      .eq("unit_id", selectedUnit.id)
      .eq("name", name)

    if (error) {
      setDbError(error.message || "Gagal menghapus anggota")
      setIsSaving(false)
      return
    }

    if (editingMemberIndex === index) cancelEditMember()
    await refreshFromDb({ nextCoordinatorId: selectedCoordinator?.id, nextUnitId: selectedUnit.id })
    setIsSaving(false)
  }

  async function resetData() {
    await refreshFromDb()
    setIsCrudOpen(false)
  }

  const coordinatorUnitCount = selectedCoordinator ? (selectedCoordinator.units || []).length : 0
  const canDeleteCoordinator = selectedCoordinator ? coordinatorUnitCount === 0 : false
  const coordinatorMemberCount = selectedCoordinator ? countMembers(selectedCoordinator) : 0
  const canDeleteUnit = selectedUnit ? (selectedUnit.members || []).length === 0 : false

  const hasMultipleCoordinators = data.coordinators.length > 1

  return (
    <div className="orgPageWrapper">
      <div className="orgTopBar">
        <div>
          <div className="orgPageTitle">Diagram Dekomposisi Organisasi</div>
          {isLoading ? <div className="orgMuted">Memuat data dari database...</div> : null}
          {dbError ? (
            <div className="orgWarning" style={{ marginTop: 8 }}>
              {dbError}
            </div>
          ) : null}
        </div>

        <div className="orgTopActions">
          <button
            className="orgBtn orgBtnGhost"
            type="button"
            onClick={() => setIsCrudOpen(true)}
            disabled={isLoading}
          >
            Kelola Data
          </button>
        </div>
      </div>

      <div className="orgDiagramCardFull">
        <div className="orgDiagramHeader">
          <div>Diagram</div>
          <button
            className="orgBtn orgBtnGhost"
            type="button"
            onClick={() => setIsCrudOpen(true)}
            disabled={isLoading}
          >
            Edit
          </button>
        </div>

        <div className="orgDiagramCanvasFull">
          <div className="orgChartFull">
            <div className="orgChartHead">
              <OrgNode title={data.head.title} subtitle={data.head.name} />
              {data.coordinators.length > 0 && <div className="orgLineDownHead" />}
            </div>

            {hasMultipleCoordinators && (
              <div className="orgHorizontalLineWrapper">
                <div className="orgHorizontalLine" />
              </div>
            )}

            <div className="orgCoordinatorsWrapper">
              {data.coordinators.map((coordinator) => {
                const units = coordinator.units || []
                const hasMultipleUnits = units.length > 1

                return (
                  <div key={coordinator.id} className="orgCoordinatorColumn">
                    {hasMultipleCoordinators && <div className="orgVerticalLineToCoord" />}

                    <OrgNode title={coordinator.title} subtitle={coordinator.name} />

                    {units.length > 0 && <div className="orgVerticalLineToUnits" />}

                    {hasMultipleUnits && (
                      <div className="orgHorizontalLineWrapper">
                        <div className="orgHorizontalLine" />
                      </div>
                    )}

                    {units.length > 0 && (
                      <div className="orgUnitsWrapper">
                        {units.map((unit) => (
                          <div key={unit.id} className="orgUnitColumn">
                            {hasMultipleUnits && <div className="orgVerticalLineToUnit" />}
                            <UnitNode title={unit.title} members={unit.members || []} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal open={isCrudOpen} title="Kelola Struktur Organisasi" onClose={() => setIsCrudOpen(false)}>
        <div className="orgModalGrid">
          <div className="orgSection">
            <div className="orgSectionTitle">Pilih Koordinator</div>

            <select
              className="orgSelect"
              value={selection.coordinatorId || ""}
              onChange={(e) => {
                const id = e.target.value || null
                setSelectedCoordinatorId(id)
                const coordinator = data.coordinators.find((x) => x.id === id)
                setSelectedUnitId(coordinator?.units?.[0]?.id || null)
              }}
              disabled={isLoading}
            >
              {data.coordinators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            {selectedCoordinator ? (
              <div className="orgMeta">
                Total unit: <b>{coordinatorUnitCount}</b>
                <br />
                Total anggota (akumulasi semua unit): <b>{coordinatorMemberCount}</b>
              </div>
            ) : null}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Tambah Koordinator</div>

            <div className="orgField">
              <label className="orgLabel">Judul Koordinator</label>
              <input
                className="orgInput"
                value={newCoordinatorTitle}
                onChange={(e) => setNewCoordinatorTitle(e.target.value)}
                placeholder="Contoh: Koordinator Bidang Pengamatan"
                disabled={isLoading || isSaving}
              />
            </div>

            <div className="orgField">
              <label className="orgLabel">Nama Koordinator</label>
              <input
                className="orgInput"
                value={newCoordinatorName}
                onChange={(e) => setNewCoordinatorName(e.target.value)}
                placeholder="Contoh: Nama, Gelar"
                disabled={isLoading || isSaving}
              />
            </div>

            <button
              className="orgBtn"
              onClick={addCoordinator}
              type="button"
              disabled={isLoading || isSaving || !chartId}
            >
              Tambah Koordinator
            </button>
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Edit Koordinator Terpilih</div>

            <div className="orgField">
              <label className="orgLabel">Judul Koordinator</label>
              <input
                className="orgInput"
                value={editCoordinatorTitle}
                onChange={(e) => setEditCoordinatorTitle(e.target.value)}
                disabled={!selectedCoordinator || isLoading || isSaving}
              />
            </div>

            <div className="orgField">
              <label className="orgLabel">Nama Koordinator</label>
              <input
                className="orgInput"
                value={editCoordinatorName}
                onChange={(e) => setEditCoordinatorName(e.target.value)}
                disabled={!selectedCoordinator || isLoading || isSaving}
              />
            </div>

            <div className="orgRowBtns">
              <button
                className="orgBtn"
                onClick={saveCoordinatorEdits}
                type="button"
                disabled={!selectedCoordinator || isLoading || isSaving}
              >
                Simpan Edit
              </button>

              <button
                className="orgBtn orgBtnDanger"
                onClick={deleteCoordinator}
                type="button"
                disabled={!selectedCoordinator || !canDeleteCoordinator || isLoading || isSaving}
                title={
                  canDeleteCoordinator
                    ? "Hapus koordinator"
                    : "Tidak bisa hapus karena koordinator masih memiliki unit"
                }
              >
                Hapus Koordinator
              </button>
            </div>

            {!canDeleteCoordinator && selectedCoordinator ? (
              <div className="orgWarning">
                Tidak bisa menghapus koordinator jika masih memiliki unit. Hapus unit terlebih dahulu.
              </div>
            ) : null}
          </div>

          <div className="orgSection">
            <div className="orgSectionTitle">Unit di Bawah Koordinator</div>

            <select
              className="orgSelect"
              value={selection.unitId || ""}
              onChange={(e) => setSelectedUnitId(e.target.value || null)}
              disabled={
                !selectedCoordinator || (selectedCoordinator.units || []).length === 0 || isLoading
              }
            >
              {(selectedCoordinator?.units || []).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>

            <div className="orgField">
              <label className="orgLabel">Tambah Unit</label>
              <input
                className="orgInput"
                value={newUnitTitle}
                onChange={(e) => setNewUnitTitle(e.target.value)}
                placeholder="Contoh: Unit Pelayanan"
                disabled={!selectedCoordinator || isLoading || isSaving}
              />
            </div>

            <button
              className="orgBtn"
              onClick={addUnit}
              type="button"
              disabled={!selectedCoordinator || isLoading || isSaving}
            >
              Tambah Unit
            </button>

            {selectedUnit ? (
              <>
                <div className="orgDivider" />

                <div className="orgField">
                  <label className="orgLabel">Edit Nama Unit</label>
                  <input
                    className="orgInput"
                    value={editUnitTitle}
                    onChange={(e) => setEditUnitTitle(e.target.value)}
                    disabled={isLoading || isSaving}
                  />
                </div>

                <div className="orgRowBtns">
                  <button
                    className="orgBtn"
                    onClick={saveUnitEdits}
                    type="button"
                    disabled={isLoading || isSaving}
                  >
                    Simpan Unit
                  </button>

                  <button
                    className="orgBtn orgBtnDanger"
                    onClick={deleteUnit}
                    type="button"
                    disabled={!canDeleteUnit || isLoading || isSaving}
                    title={canDeleteUnit ? "Hapus unit" : "Tidak bisa hapus karena masih ada anggota"}
                  >
                    Hapus Unit
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
            <div className="orgSectionTitle">Anggota pada Unit Terpilih</div>

            {!selectedUnit ? (
              <div className="orgMuted">Belum ada unit yang dipilih.</div>
            ) : (
              <>
                <div className="orgField">
                  <label className="orgLabel">Tambah Anggota</label>
                  <input
                    className="orgInput"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Contoh: Nama, Gelar"
                    disabled={isLoading || isSaving}
                  />
                </div>

                <button
                  className="orgBtn"
                  onClick={addMember}
                  type="button"
                  disabled={isLoading || isSaving}
                >
                  Tambah Anggota
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
                              disabled={isSaving}
                            />
                            <div className="orgRowBtns">
                              <button
                                className="orgBtn"
                                onClick={saveEditMember}
                                type="button"
                                disabled={isSaving}
                              >
                                Simpan
                              </button>
                              <button
                                className="orgBtn orgBtnGhost"
                                onClick={cancelEditMember}
                                type="button"
                                disabled={isSaving}
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
                                disabled={isSaving}
                              >
                                Edit
                              </button>
                              <button
                                className="orgBtn orgBtnDanger"
                                onClick={() => deleteMember(idx)}
                                type="button"
                                disabled={isSaving}
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
            <button
              className="orgBtn orgBtnDanger"
              type="button"
              onClick={resetData}
              disabled={isLoading || isSaving}
            >
              Muat Ulang dari Database
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
