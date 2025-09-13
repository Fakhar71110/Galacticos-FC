"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, BarChart3, Camera, Settings, Trophy, FileText, LogOut, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { PlayersManager } from "./players-manager"
import { MatchesManager } from "./matches-manager"
import { StatsManager } from "./stats-manager"
import { GalleryManager } from "./gallery-manager"
import { NewsManager } from "./news-manager"
import { ClubSettings } from "./club-settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black">
      {/* Header */}
      <header className="border-b border-green-800/20 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Local FC Admin</h1>
                <p className="text-xs text-green-400">Content Management System</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-green-900/20 border-green-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-green-700">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Players</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-green-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Matches</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-green-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-green-700">
              <Camera className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-green-700">
              <FileText className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-green-700">
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-green-900/20 border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Players</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">25</div>
                  <p className="text-xs text-green-400">Active squad members</p>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Matches Played</CardTitle>
                  <Calendar className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">15</div>
                  <p className="text-xs text-green-400">This season</p>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Goals Scored</CardTitle>
                  <Trophy className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">23</div>
                  <p className="text-xs text-green-400">Season total</p>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Gallery Photos</CardTitle>
                  <Camera className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">156</div>
                  <p className="text-xs text-green-400">Total uploaded</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-green-900/20 border-green-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-gray-400">Common management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setActiveTab("players")}
                    className="w-full justify-start bg-green-700 hover:bg-green-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Player
                  </Button>
                  <Button
                    onClick={() => setActiveTab("matches")}
                    className="w-full justify-start bg-green-700 hover:bg-green-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Match Result
                  </Button>
                  <Button
                    onClick={() => setActiveTab("gallery")}
                    className="w-full justify-start bg-green-700 hover:bg-green-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Photos
                  </Button>
                  <Button
                    onClick={() => setActiveTab("news")}
                    className="w-full justify-start bg-green-700 hover:bg-green-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Write News Article
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-400">Latest updates and changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Match result added: Local FC 2-1 United FC</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">Player stats updated for Chris Brown</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">New gallery photos uploaded</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players">
            <PlayersManager />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesManager />
          </TabsContent>

          <TabsContent value="stats">
            <StatsManager />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="settings">
            <ClubSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
