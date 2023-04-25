import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Front_End_challenges/react-first-steps/game-app/',
    plugins: [react()]
})
