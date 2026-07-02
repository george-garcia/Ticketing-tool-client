import { FormEvent, useEffect, useState } from 'react'
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../store/settingsApi'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { LoadingState } from '../../components/States'

const FIELDS = [
  { key: 'slaCriticalHours', label: 'Critical', hint: 'Highest urgency' },
  { key: 'slaMajorHours', label: 'Major', hint: 'Significant impact' },
  { key: 'slaMinorHours', label: 'Minor', hint: 'Low impact' },
] as const

export function SlaSettings() {
  const { data: settings, isLoading } = useGetSettingsQuery()
  const [updateSettings, { isLoading: saving }] = useUpdateSettingsMutation()
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  useEffect(() => {
    if (settings) {
      setValues({
        slaCriticalHours: String(settings.slaCriticalHours),
        slaMajorHours: String(settings.slaMajorHours),
        slaMinorHours: String(settings.slaMinorHours),
      })
    }
  }, [settings])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    try {
      await updateSettings({
        slaCriticalHours: Number(values.slaCriticalHours),
        slaMajorHours: Number(values.slaMajorHours),
        slaMinorHours: Number(values.slaMinorHours),
      }).unwrap()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  if (isLoading) return <LoadingState />

  return (
    <Card className="p-6">
      <p className="mb-4 text-sm text-slate-500">
        Resolution targets (in hours) per priority. Tickets past their target show as SLA breached on the
        dashboard and ticket view.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="label">{f.label} (hours)</label>
              <Input
                type="number"
                min={1}
                max={2160}
                required
                value={values[f.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
              <p className="mt-1 text-xs text-slate-400">{f.hint}</p>
            </div>
          ))}
        </div>

        {status === 'error' && <p className="text-sm font-medium text-red-600">Could not save the SLA settings.</p>}
        {status === 'saved' && <p className="text-sm font-medium text-emerald-600">SLA settings saved.</p>}

        <div className="flex justify-end">
          <Button type="submit" isLoading={saving}>
            Save SLA targets
          </Button>
        </div>
      </form>
    </Card>
  )
}
