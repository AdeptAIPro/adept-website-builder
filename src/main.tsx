
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

createRoot(document.getElementById("root")!).render(<App />);
