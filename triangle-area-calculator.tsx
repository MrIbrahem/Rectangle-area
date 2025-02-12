"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Github, Instagram, Twitter, Facebook } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { TriangleDrawing } from "./triangle-drawing"
import Link from "next/link"

const LEBNA_CONVERSION = 44.44 // 1 لبنة = 44.44 m²

export default function TriangleAreaCalculator() {
  const [sides, setSides] = useState({ side1: "", side2: "", base: "" })
  const [displaySides, setDisplaySides] = useState({ side1: 0, side2: 0, base: 0 })
  const [area, setArea] = useState(0)
  const [totalArea, setTotalArea] = useState(0)

  const calculateArea = () => {
    const a = Number(sides.side1)
    const b = Number(sides.side2)
    const c = Number(sides.base)
    const s = (a + b + c) / 2
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c))

    // Update the display sides before clearing inputs
    setDisplaySides({ side1: a, side2: b, base: c })
    setArea(isNaN(areaValue) ? 0 : areaValue)

    // Clear only the inputs
    setSides({ side1: "", side2: "", base: "" })
  }

  const handleAddToTotal = () => {
    setTotalArea(totalArea + area)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: "تم النسخ بنجاح",
      })
    })
  }

  const convertToLebna = (meters: number) => {
    return (meters / LEBNA_CONVERSION).toFixed(6)
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">حساب مساحة المثلثات</h1>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5 text-blue-500" />
        </Button>
      </header>

      <main className="container mx-auto p-4 max-w-md">
        <Tabs defaultValue="main" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="main" className="text-lg">
              الرئيسية
            </TabsTrigger>
            <TabsTrigger value="record" className="text-lg">
              السجل
            </TabsTrigger>
            <TabsTrigger value="about" className="text-lg">
              عن التطبيق
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-4">
            <TriangleDrawing side1={displaySides.side1} side2={displaySides.side2} base={displaySides.base} />

            <div className="grid grid-cols-3 gap-2 mb-4">
              <Input
                type="number"
                placeholder="الضلع 1 (يمين)"
                value={sides.side1}
                onChange={(e) => setSides({ ...sides, side1: e.target.value })}
                className="text-center"
              />
              <Input
                type="number"
                placeholder="الضلع 2 (يسار)"
                value={sides.side2}
                onChange={(e) => setSides({ ...sides, side2: e.target.value })}
                className="text-center"
              />
              <Input
                type="number"
                placeholder="الوتر (قاعدة)"
                value={sides.base}
                onChange={(e) => setSides({ ...sides, base: e.target.value })}
                className="text-center"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button onClick={calculateArea} className="w-full">
                حساب
              </Button>
              <Button onClick={handleAddToTotal} className="w-full">
                أضف للإجمالي
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>متر مربع</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-50 p-2 rounded text-left">{area.toFixed(2)}</div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(area.toFixed(2))}>
                    نسخ
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>لبنة</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-50 p-2 rounded text-left">{convertToLebna(area)}</div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(convertToLebna(area))}>
                    نسخ
                  </Button>
                </div>
              </div>

              <h2 className="font-bold mt-6 mb-2">إجمالي مساحة المثلثات:</h2>

              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>متر مربع</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-50 p-2 rounded text-left">{totalArea.toFixed(2)}</div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(totalArea.toFixed(2))}>
                    نسخ
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-2 rounded">
                <span>لبنة</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-50 p-2 rounded text-left">{convertToLebna(totalArea)}</div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(convertToLebna(totalArea))}>
                    نسخ
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="w-full bg-gray-200 p-4 text-center mt-8">
        <div className="flex justify-center gap-4 mb-2">
          <Link
            href="https://github.com/MrIbrahem"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.instagram.com/ibrahim_alradaee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://twitter.com/ibrahim_alradaee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.facebook.com/Mr.Ibrahem"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
        <p className="text-sm">م/إبراهيم الرداعي - 770633517</p>
      </footer>
    </div>
  )
}

