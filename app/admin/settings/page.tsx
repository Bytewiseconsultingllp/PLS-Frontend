"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Save, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const generalFormSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  siteDescription: z.string().optional(),
  siteUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  logo: z.string().optional(),
  favicon: z.string().optional(),
})

const seoFormSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
})

const advancedFormSchema = z.object({
  maintenanceMode: z.boolean().default(false),
  cacheEnabled: z.boolean().default(true),
  debugMode: z.boolean().default(false),
})

export default function SettingsPage() {
  const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false)
  const [isSeoSubmitting, setIsSeoSubmitting] = useState(false)
  const [isAdvancedSubmitting, setIsAdvancedSubmitting] = useState(false)
  const { toast } = useToast()

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "Content Management System",
      siteDescription: "A flexible content management system with customizable components",
      siteUrl: "https://example.com",
      logo: "/logo.svg",
      favicon: "/favicon.ico",
    },
  })

  const seoForm = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      metaTitle: "Content Management System",
      metaDescription: "A flexible content management system with customizable components",
      ogImage: "/og-image.jpg",
      googleAnalyticsId: "",
    },
  })

  const advancedForm = useForm<z.infer<typeof advancedFormSchema>>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      maintenanceMode: false,
      cacheEnabled: true,
      debugMode: false,
    },
  })

  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    setIsGeneralSubmitting(true)

    // In a real app, you would save the settings to your database
    console.log(values)

    setTimeout(() => {
      setIsGeneralSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your general settings have been saved successfully.",
      })
    }, 1000)
  }

  function onSeoSubmit(values: z.infer<typeof seoFormSchema>) {
    setIsSeoSubmitting(true)

    // In a real app, you would save the settings to your database
    console.log(values)

    setTimeout(() => {
      setIsSeoSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your SEO settings have been saved successfully.",
      })
    }, 1000)
  }

  function onAdvancedSubmit(values: z.infer<typeof advancedFormSchema>) {
    setIsAdvancedSubmitting(true)

    // In a real app, you would save the settings to your database
    console.log(values)

    setTimeout(() => {
      setIsAdvancedSubmitting(false)
      toast({
        title: "Settings saved",
        description: "Your advanced settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the general settings for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-4">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Site name" {...field} />
                        </FormControl>
                        <FormDescription>The name of your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Site description" {...field} />
                        </FormControl>
                        <FormDescription>A brief description of your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="siteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>The URL of your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <FormControl>
                            <Input placeholder="/logo.svg" {...field} />
                          </FormControl>
                          <FormDescription>The path to your logo image.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon</FormLabel>
                          <FormControl>
                            <Input placeholder="/favicon.ico" {...field} />
                          </FormControl>
                          <FormDescription>The path to your favicon.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isGeneralSubmitting}>
                      {isGeneralSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configure the SEO settings for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(onSeoSubmit)} className="space-y-4">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Meta title" {...field} />
                        </FormControl>
                        <FormDescription>The default meta title for your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Meta description" {...field} />
                        </FormControl>
                        <FormDescription>The default meta description for your website.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Open Graph Image</FormLabel>
                        <FormControl>
                          <Input placeholder="/og-image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>The default image for social media sharing.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input placeholder="G-XXXXXXXXXX" {...field} />
                        </FormControl>
                        <FormDescription>Your Google Analytics tracking ID.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSeoSubmitting}>
                      {isSeoSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>

              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">Role</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">Admin User</td>
                      <td className="p-3">admin@example.com</td>
                      <td className="p-3">Administrator</td>
                      <td className="p-3">Active</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Editor User</td>
                      <td className="p-3">editor@example.com</td>
                      <td className="p-3">Editor</td>
                      <td className="p-3">Active</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">Author User</td>
                      <td className="p-3">author@example.com</td>
                      <td className="p-3">Author</td>
                      <td className="p-3">Inactive</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced settings for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...advancedForm}>
                <form onSubmit={advancedForm.handleSubmit(onAdvancedSubmit)} className="space-y-4">
                  <FormField
                    control={advancedForm.control}
                    name="maintenanceMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Maintenance Mode</FormLabel>
                          <FormDescription>Put your website in maintenance mode.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={advancedForm.control}
                    name="cacheEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Caching</FormLabel>
                          <FormDescription>Enable caching for better performance.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={advancedForm.control}
                    name="debugMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Debug Mode</FormLabel>
                          <FormDescription>Enable debug mode for development.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>
                    <div className="rounded-lg border border-destructive p-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Clear Cache</h4>
                            <p className="text-sm text-muted-foreground">Clear all cached data.</p>
                          </div>
                          <Button variant="destructive">Clear Cache</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Reset Settings</h4>
                            <p className="text-sm text-muted-foreground">Reset all settings to default values.</p>
                          </div>
                          <Button variant="destructive">Reset</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isAdvancedSubmitting}>
                      {isAdvancedSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
