import { api } from './baseApi'
import type { AppSettings } from '../types'

export type SlaSettingsInput = Pick<
  AppSettings,
  'slaCriticalHours' | 'slaMajorHours' | 'slaMinorHours'
>

export const settingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<AppSettings, void>({
      query: () => '/settings',
      providesTags: ['Settings'],
    }),

    updateSettings: builder.mutation<AppSettings, SlaSettingsInput>({
      query: (body) => ({ url: '/settings', method: 'PUT', body }),
      invalidatesTags: ['Settings'],
    }),
  }),
})

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi
