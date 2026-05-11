import { useEffect, useState } from 'react'
import type { Pet, PetSpecies } from '../../types/pet'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'

interface PetEditModalProps {
  open: boolean
  pet: Pet | null  // null이면 신규 등록
  onClose: () => void
  onSubmit: (input: {
    name: string
    species: PetSpecies
    breed: string
    birthYear?: number
    weightKg?: number
    photoUrl?: string
    notes?: string
  }) => void
}

const SPECIES: PetSpecies[] = ['강아지', '고양이', '기타']

export function PetEditModal({ open, pet, onClose, onSubmit }: PetEditModalProps) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState<PetSpecies>('강아지')
  const [breed, setBreed] = useState('')
  const [birthYear, setBirthYear] = useState<string>('')
  const [weightKg, setWeightKg] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    if (pet) {
      setName(pet.name)
      setSpecies(pet.species)
      setBreed(pet.breed)
      setBirthYear(pet.birthYear ? String(pet.birthYear) : '')
      setWeightKg(pet.weightKg !== undefined ? String(pet.weightKg) : '')
      setPhotoUrl(pet.photoUrl ?? '')
      setNotes(pet.notes ?? '')
    } else {
      setName('')
      setSpecies('강아지')
      setBreed('')
      setBirthYear('')
      setWeightKg('')
      setPhotoUrl('')
      setNotes('')
    }
    setError(null)
  }, [open, pet])

  const onPickFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setPhotoUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const submit = () => {
    if (!name.trim()) {
      setError('이름을 입력해 주세요.')
      return
    }
    const yr = Number(birthYear)
    const wt = Number(weightKg)
    onSubmit({
      name: name.trim(),
      species,
      breed: breed.trim(),
      birthYear: birthYear && Number.isFinite(yr) ? yr : undefined,
      weightKg: weightKg && Number.isFinite(wt) ? wt : undefined,
      photoUrl: photoUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    })
  }

  return (
    <Modal open={open} title={pet ? `${pet.name} 정보 수정` : '반려동물 등록'} onClose={onClose}>
      <div className="grid gap-4">
        {error && (
          <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 ring-1 ring-rose-200">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="이름 *" value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 코코" />

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-slate-700">종</label>
            <div className="flex gap-2">
              {SPECIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpecies(s)}
                  className={`flex-1 rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${
                    species === s
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Input label="품종" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="말티즈, 푸들 등" />
          <Input
            label="출생연도"
            type="number"
            inputMode="numeric"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            placeholder="예: 2022"
          />
          <Input
            label="몸무게 (kg)"
            type="number"
            inputMode="decimal"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="예: 4.2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700">사진</label>
          <div className="flex items-center gap-3">
            {photoUrl ? (
              <img src={photoUrl} alt="미리보기" className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200" />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-slate-100 text-2xl">🐾</div>
            )}
            <div className="flex-1 space-y-2">
              <Input
                label=""
                placeholder="사진 URL 또는 아래 파일 업로드"
                value={photoUrl.startsWith('data:') ? '' : photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                파일 업로드
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) onPickFile(f)
                  }}
                />
              </label>
              {photoUrl && (
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="ml-2 text-xs text-slate-500 underline hover:text-rose-700"
                >
                  사진 제거
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-medium text-slate-700">특이사항</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="알러지, 기존 질환, 복용 중인 약 등"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={submit}>
            {pet ? '수정 저장' : '등록'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
