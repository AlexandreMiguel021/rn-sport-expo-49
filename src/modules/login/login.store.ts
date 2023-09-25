import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '@/utils/mmkv-storage'
import { LoginFormData } from './login.schema'

interface LoginStore {
  rememberedUserCredentials?: LoginFormData | null
  setRememberedUserCredentials: (credentials?: LoginFormData | null) => void
}

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      rememberedUserCredentials: {} as LoginFormData,

      setRememberedUserCredentials: (credentials?: LoginFormData | null) => {
        set({ rememberedUserCredentials: credentials })
      }
    }),
    {
      name: 'login-storage',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
