"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import {
  ArrowLeft,
  Clock,
  ImageIcon,
  Info,
  Languages,
  Loader2,
  MapPin,
  Plus,
  Route,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransport, useUpdateTransport } from "@/hooks/use-transports"
import { useVehicles } from "@/hooks/use-vehicles"
import { useDeleteImage, useUploadImage } from "@/hooks/use-uploads"
import type { Coordinates, Lang, RouteStep, TransportImage, WeekDay } from "@/types/transport"
import { SUPPORTED_LANGS } from "@/types/transport"

const WEEKDAYS: { value: WeekDay; label: string }[] = [
  { value: "monday", label: "Lunes" },
  { value: "tuesday", label: "Martes" },
  { value: "wednesday", label: "Miercoles" },
  { value: "thursday", label: "Jueves" },
  { value: "friday", label: "Viernes" },
  { value: "saturday", label: "Sabado" },
  { value: "sunday", label: "Domingo" },
]

function sanitizeCoordinates(value?: Partial<Coordinates> & { _id?: string }): Coordinates {
  return {
    name: value?.name || "",
    lat: typeof value?.lat === "number" ? value.lat : 0,
    lng: typeof value?.lng === "number" ? value.lng : 0,
  }
}

function sanitizeTransportImage(image?: Partial<TransportImage> & { _id?: string }): TransportImage | undefined {
  if (!image?.url || !image?.publicId) {
    return undefined
  }

  return {
    url: image.url,
    publicId: image.publicId,
  }
}

export default function EditTransportPage() {
  const router = useRouter()
  const params = useParams()
  const transportId = params.id as string
  const locale = params.locale as string

  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    routeDescription: "",
    currentPrice: 0,
    oldPrice: 0,
    vehicle: "",
    durationHours: 0,
    durationMinutes: 0,
    departureTime: "",
    arrivalTime: "",
    titleTranslations: {} as Partial<Record<Lang, string>>,
    descriptionTranslations: {} as Partial<Record<Lang, string>>,
    routeDescriptionTranslations: {} as Partial<Record<Lang, string>>,
  })
  const [origin, setOrigin] = useState<Coordinates>({ name: "", lat: 0, lng: 0 })
  const [destination, setDestination] = useState<Coordinates>({ name: "", lat: 0, lng: 0 })
  const [route, setRoute] = useState<RouteStep[]>([])
  const [images, setImages] = useState<TransportImage[]>([])
  const [availableDays, setAvailableDays] = useState<WeekDay[]>([])

  const { data: transport, isLoading } = useTransport(transportId)
  const { data: vehiclesData } = useVehicles(1, 100)
  const updateTransportMutation = useUpdateTransport()
  const uploadImageMutation = useUploadImage()
  const deleteImageMutation = useDeleteImage()

  const vehicles = vehiclesData?.data || []

  useEffect(() => {
    if (!transport) return

    const vehicleId = typeof transport.vehicle === "string" ? transport.vehicle : transport.vehicle?._id || ""
    const durationHours =
      transport.durationHours ??
      (transport.durationMinutes && transport.durationMinutes >= 60 ? Math.floor(transport.durationMinutes / 60) : 0)
    const durationMinutes =
      transport.durationHours == null && transport.durationMinutes && transport.durationMinutes >= 60
        ? transport.durationMinutes % 60
        : transport.durationMinutes ?? 0

    setFormData({
      title: transport.title || "",
      description: transport.description || "",
      routeDescription: transport.routeDescription || "",
      currentPrice: transport.currentPrice || 0,
      oldPrice: transport.oldPrice || 0,
      vehicle: vehicleId,
      durationHours,
      durationMinutes,
      departureTime: transport.departureTime || "",
      arrivalTime: transport.arrivalTime || "",
      titleTranslations: transport.titleTranslations || {},
      descriptionTranslations: transport.descriptionTranslations || {},
      routeDescriptionTranslations: transport.routeDescriptionTranslations || {},
    })
    setOrigin(sanitizeCoordinates(transport.origin))
    setDestination(sanitizeCoordinates(transport.destination))
    setRoute(
      transport.route?.map((step, index) => ({
        order: step.order || index + 1,
        name: step.name || "",
        lat: step.lat || 0,
        lng: step.lng || 0,
        image: sanitizeTransportImage(step.image),
        translations: step.translations || {},
      })) || [],
    )
    setImages((transport.images || []).map((image) => sanitizeTransportImage(image)).filter((image): image is TransportImage => Boolean(image)))
    setAvailableDays(transport.availableDays || [])
  }, [transport])

  const toggleAvailableDay = (day: WeekDay) => {
    setAvailableDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const addRouteStep = () => {
    const newStep: RouteStep = {
      order: route.length + 1,
      name: "",
      lat: 0,
      lng: 0,
      translations: {},
    }
    setRoute([...route, newStep])
  }

  const updateRouteStep = (index: number, field: keyof RouteStep, value: unknown) => {
    const updatedRoute = [...route]
    updatedRoute[index] = { ...updatedRoute[index], [field]: value }
    setRoute(updatedRoute)
  }

  const updateRouteStepTranslation = (index: number, lang: Lang, value: string) => {
    const updatedRoute = [...route]
    updatedRoute[index] = {
      ...updatedRoute[index],
      translations: { ...updatedRoute[index].translations, [lang]: value },
    }
    setRoute(updatedRoute)
  }

  const removeRouteStep = async (index: number) => {
    const step = route[index]
    if (step?.image?.publicId) {
      try {
        await deleteImageMutation.trigger(step.image.publicId)
      } catch (error) {
        console.error("Error deleting route step image:", error)
      }
    }

    const updatedRoute = route.filter((_, i) => i !== index)
    updatedRoute.forEach((stepItem, i) => {
      stepItem.order = i + 1
    })
    setRoute(updatedRoute)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      try {
        const result = await uploadImageMutation.trigger(file)
        if (result) {
          setImages((prev) => [...prev, { url: result.url, publicId: result.publicId }])
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        toast.error("No se pudo subir una imagen")
      }
    }

    e.target.value = ""
  }

  const handleRemoveImage = async (index: number) => {
    const image = images[index]
    if (image?.publicId) {
      try {
        await deleteImageMutation.trigger(image.publicId)
      } catch (error) {
        console.error("Error deleting image:", error)
        toast.error("No se pudo eliminar la imagen")
        return
      }
    }
    setImages(images.filter((_, i) => i !== index))
  }

  const handleRouteStepImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const currentImage = route[index]?.image

    try {
      const result = await uploadImageMutation.trigger(file)
      if (result) {
        if (currentImage?.publicId) {
          try {
            await deleteImageMutation.trigger(currentImage.publicId)
          } catch (error) {
            console.error("Error deleting previous route image:", error)
          }
        }
        updateRouteStep(index, "image", { url: result.url, publicId: result.publicId })
      }
    } catch (error) {
      console.error("Error uploading route step image:", error)
      toast.error("No se pudo subir la imagen del itinerario")
    }

    e.target.value = ""
  }

  const handleRemoveRouteStepImage = async (index: number) => {
    const image = route[index]?.image
    if (image?.publicId) {
      try {
        await deleteImageMutation.trigger(image.publicId)
      } catch (error) {
        console.error("Error deleting route image:", error)
        toast.error("No se pudo eliminar la imagen del itinerario")
        return
      }
    }
    updateRouteStep(index, "image", undefined)
  }

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("El titulo es obligatorio")
      setActiveTab("general")
      return
    }

    if (!formData.vehicle) {
      toast.error("Selecciona un vehiculo")
      setActiveTab("general")
      return
    }

    if (!origin.name.trim() || !destination.name.trim()) {
      toast.error("Completa origen y destino")
      setActiveTab("location")
      return
    }

    if (route.some((step) => !step.name.trim())) {
      toast.error("Cada paso del itinerario debe tener nombre")
      setActiveTab("route")
      return
    }

    try {
      const sanitizedOrigin = sanitizeCoordinates(origin)
      const sanitizedDestination = sanitizeCoordinates(destination)
      const sanitizedImages = images
        .map((image) => sanitizeTransportImage(image))
        .filter((image): image is TransportImage => Boolean(image))

      const transportData = {
        title: formData.title,
        description: formData.description || undefined,
        routeDescription: formData.routeDescription || undefined,
        titleTranslations: Object.keys(formData.titleTranslations).length > 0 ? formData.titleTranslations : undefined,
        descriptionTranslations:
          Object.keys(formData.descriptionTranslations).length > 0 ? formData.descriptionTranslations : undefined,
        routeDescriptionTranslations:
          Object.keys(formData.routeDescriptionTranslations).length > 0
            ? formData.routeDescriptionTranslations
            : undefined,
        route:
          route.length > 0
            ? route.map((step, index) => ({
                order: index + 1,
                name: step.name,
                lat: step.lat,
                lng: step.lng,
                translations:
                  step.translations && Object.keys(step.translations).length > 0 ? step.translations : undefined,
                image: sanitizeTransportImage(step.image),
              }))
            : undefined,
        origin: sanitizedOrigin,
        destination: sanitizedDestination,
        vehicle: formData.vehicle,
        currentPrice: formData.currentPrice,
        oldPrice: formData.oldPrice > 0 ? formData.oldPrice : undefined,
        durationHours: formData.durationHours > 0 ? formData.durationHours : undefined,
        durationMinutes: formData.durationMinutes > 0 ? formData.durationMinutes : undefined,
        departureTime: formData.departureTime || undefined,
        arrivalTime: formData.arrivalTime || undefined,
        availableDays: availableDays.length > 0 ? availableDays : undefined,
        images: sanitizedImages.length > 0 ? sanitizedImages : undefined,
      }

      await updateTransportMutation.trigger({ id: transportId, data: transportData })
      toast.success("Paquete de transporte actualizado")
      router.push(`/${locale}/dashboard/transports`)
    } catch (error) {
      console.error("Error updating transport:", error)
      toast.error("No se pudo actualizar el transporte")
    }
  }

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </SidebarInset>
    )
  }

  if (!transport) {
    return (
      <SidebarInset>
        <div className="m-4 rounded-lg border bg-background p-8 text-center text-muted-foreground">
          No se encontro el paquete de transporte solicitado.
        </div>
      </SidebarInset>
    )
  }

  return (
    <SidebarInset>
      <div className="m-4 rounded-lg overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 rounded-t-lg">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/${locale}/dashboard/transports`}>
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Editar Paquete de Transporte</h1>
                  <p className="text-sm text-muted-foreground">Actualiza el transporte y su itinerario completo</p>
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={updateTransportMutation.isMutating}>
                {updateTransportMutation.isMutating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Guardar Cambios
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-background/50 backdrop-blur rounded-b-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 h-auto">
              <TabsTrigger value="general" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">General</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Ubicacion</span>
              </TabsTrigger>
              <TabsTrigger value="route" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Route className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Itinerario</span>
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Horarios</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Imagenes</span>
              </TabsTrigger>
              <TabsTrigger value="translations" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Traducciones</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informacion General</CardTitle>
                  <CardDescription>Detalles basicos del paquete de transporte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titulo</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ej: Transfer Aeropuerto - Hotel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripcion</Label>
                    <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe el servicio de transporte..." rows={4} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPrice">Precio Actual</Label>
                      <Input id="currentPrice" type="number" value={formData.currentPrice} onChange={(e) => setFormData({ ...formData, currentPrice: Number(e.target.value) || 0 })} placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oldPrice">Precio Anterior</Label>
                      <Input id="oldPrice" type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) || 0 })} placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehiculo</Label>
                    <Select value={formData.vehicle} onValueChange={(value) => setFormData({ ...formData, vehicle: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un vehiculo" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle._id} value={vehicle._id}>
                            {vehicle.name} - {vehicle.brand} {vehicle.model} ({vehicle.capacity} pax)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ubicaciones</CardTitle>
                  <CardDescription>Define origen, destino y descripcion de la ruta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Origen</Label>
                    <Input value={origin.name} onChange={(e) => setOrigin({ ...origin, name: e.target.value })} placeholder="Nombre del lugar de origen" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" step="any" value={origin.lat} onChange={(e) => setOrigin({ ...origin, lat: Number(e.target.value) || 0 })} placeholder="Latitud" />
                      <Input type="number" step="any" value={origin.lng} onChange={(e) => setOrigin({ ...origin, lng: Number(e.target.value) || 0 })} placeholder="Longitud" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Destino</Label>
                    <Input value={destination.name} onChange={(e) => setDestination({ ...destination, name: e.target.value })} placeholder="Nombre del lugar de destino" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" step="any" value={destination.lat} onChange={(e) => setDestination({ ...destination, lat: Number(e.target.value) || 0 })} placeholder="Latitud" />
                      <Input type="number" step="any" value={destination.lng} onChange={(e) => setDestination({ ...destination, lng: Number(e.target.value) || 0 })} placeholder="Longitud" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="routeDescription">Descripcion de la Ruta</Label>
                    <Textarea id="routeDescription" value={formData.routeDescription} onChange={(e) => setFormData({ ...formData, routeDescription: e.target.value })} placeholder="Describe la ruta del transporte..." rows={4} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="route" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Itinerario del Transporte</CardTitle>
                  <CardDescription>Define los pasos, paradas o hitos de la ruta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Agrega y edita los pasos del itinerario del transporte.</p>
                    <Button type="button" onClick={addRouteStep} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Paso
                    </Button>
                  </div>

                  {route.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No hay pasos agregados. Haz clic en Agregar Paso para comenzar.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {route.map((step, index) => (
                        <Card key={index} className="relative">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">Paso {step.order}</CardTitle>
                              <Button type="button" variant="ghost" size="icon" onClick={() => void removeRouteStep(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              <Label>Nombre del Lugar</Label>
                              <Input value={step.name} onChange={(e) => updateRouteStep(index, "name", e.target.value)} placeholder="Ej: Mirador del Valle" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label>Latitud</Label>
                                <Input type="number" step="any" value={step.lat} onChange={(e) => updateRouteStep(index, "lat", Number(e.target.value) || 0)} placeholder="0.0" />
                              </div>
                              <div className="space-y-2">
                                <Label>Longitud</Label>
                                <Input type="number" step="any" value={step.lng} onChange={(e) => updateRouteStep(index, "lng", Number(e.target.value) || 0)} placeholder="0.0" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Imagen del Paso</Label>
                              <Input type="file" accept="image/*" onChange={(e) => void handleRouteStepImageUpload(index, e)} />
                              {step.image?.url && (
                                <div className="relative mt-2">
                                  <Image src={step.image.url} alt={`Route step ${index + 1}`} width={200} height={150} className="rounded-lg object-cover w-full h-32" />
                                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => void handleRemoveRouteStepImage(index)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Traducciones del Nombre</Label>
                              <div className="grid grid-cols-2 gap-2">
                                {SUPPORTED_LANGS.filter((lang) => lang !== "es").map((lang) => (
                                  <div key={lang} className="space-y-1">
                                    <Label htmlFor={`route-${index}-${lang}`} className="text-xs uppercase">{lang}</Label>
                                    <Input id={`route-${index}-${lang}`} value={step.translations?.[lang] || ""} onChange={(e) => updateRouteStepTranslation(index, lang, e.target.value)} placeholder={`Nombre en ${lang}`} className="text-sm" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Horarios y Duracion</CardTitle>
                  <CardDescription>Configura los horarios del servicio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="durationHours">Duracion (Horas)</Label>
                      <Input id="durationHours" type="number" value={formData.durationHours} onChange={(e) => setFormData({ ...formData, durationHours: Number(e.target.value) || 0 })} placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="durationMinutes">Duracion (Minutos)</Label>
                      <Input id="durationMinutes" type="number" value={formData.durationMinutes} onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) || 0 })} placeholder="0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departureTime">Hora de Salida</Label>
                      <Input id="departureTime" type="time" value={formData.departureTime} onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrivalTime">Hora de Llegada</Label>
                      <Input id="arrivalTime" type="time" value={formData.arrivalTime} onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })} />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Dias Disponibles</Label>
                    <p className="text-sm text-muted-foreground mb-4">Selecciona los dias en los que el servicio esta disponible</p>
                    <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                      {WEEKDAYS.map((day) => (
                        <Button key={day.value} type="button" variant={availableDays.includes(day.value) ? "default" : "outline"} onClick={() => toggleAvailableDay(day.value)} className="w-full justify-center text-xs sm:text-sm">
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Imagenes</CardTitle>
                  <CardDescription>Administra las imagenes del servicio de transporte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Subir Imagenes</Label>
                    <div className="flex items-center gap-2">
                      <Input id="images" type="file" accept="image/*" multiple onChange={(e) => void handleImageUpload(e)} className="flex-1" />
                      <Button type="button" variant="outline" size="icon" disabled={uploadImageMutation.isMutating}>
                        {uploadImageMutation.isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={`${image.publicId}-${index}`} className="relative group">
                          <Image src={image.url} alt={`Transport image ${index + 1}`} width={200} height={150} className="rounded-lg object-cover w-full h-32" />
                          <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => void handleRemoveImage(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="translations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traducciones</CardTitle>
                  <CardDescription>Actualiza las traducciones del transporte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {SUPPORTED_LANGS.filter((lang) => lang !== "es").map((lang) => (
                    <div key={lang} className="space-y-4 p-4 border rounded-lg">
                      <h3 className="font-semibold text-sm uppercase">{lang}</h3>

                      <div className="space-y-2">
                        <Label htmlFor={`title-${lang}`}>Titulo</Label>
                        <Input id={`title-${lang}`} value={formData.titleTranslations[lang] || ""} onChange={(e) => setFormData({ ...formData, titleTranslations: { ...formData.titleTranslations, [lang]: e.target.value } })} placeholder={`Titulo en ${lang}`} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${lang}`}>Descripcion</Label>
                        <Textarea id={`description-${lang}`} value={formData.descriptionTranslations[lang] || ""} onChange={(e) => setFormData({ ...formData, descriptionTranslations: { ...formData.descriptionTranslations, [lang]: e.target.value } })} placeholder={`Descripcion en ${lang}`} rows={3} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`routeDescription-${lang}`}>Descripcion de la Ruta</Label>
                        <Textarea id={`routeDescription-${lang}`} value={formData.routeDescriptionTranslations[lang] || ""} onChange={(e) => setFormData({ ...formData, routeDescriptionTranslations: { ...formData.routeDescriptionTranslations, [lang]: e.target.value } })} placeholder={`Descripcion de la ruta en ${lang}`} rows={3} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarInset>
  )
}
