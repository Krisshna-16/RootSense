"use client";

import {
    Users,
    Shield,
    CheckCircle,
    AlertCircle,
    Settings,
    Activity,
    ArrowUpRight,
    MoreHorizontal,
    Search,
    Filter,
    Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

// Mock data for admin dashboard
const userStats = [
    { label: "Total Users", value: "1,247", growth: "+89", icon: Users, color: "text-blue-500" },
    { label: "Active Admins", value: "5", growth: "0", icon: Shield, color: "text-purple-500" },
    { label: "Pending Approvals", value: "23", growth: "+4", icon: CheckCircle, color: "text-green-500" },
    { label: "Reported Issues", value: "7", growth: "-2", icon: AlertCircle, color: "text-red-500" },
]

const recentUsers = [
    { id: 1, name: "Arjun Mehta", email: "arjun.m@university.edu", role: "User", status: "Active", joined: "2 hours ago" },
    { id: 2, name: "Sara Khan", email: "s.khan@university.edu", role: "Moderator", status: "Active", joined: "5 hours ago" },
    { id: 3, name: "Vikram Singh", email: "v.singh@university.edu", role: "User", status: "Inactive", joined: "1 day ago" },
    { id: 4, name: "Ananya Iyer", email: "a.iyer@university.edu", role: "User", status: "Active", joined: "2 days ago" },
    { id: 5, name: "Rohan Gupta", email: "r.gupta@university.edu", role: "Admin", status: "Active", joined: "1 week ago" },
]

const pendingTrees = [
    { id: 1, submittedBy: "Priya Sharma", location: "Block A", species: "Banyan", time: "1 hour ago" },
    { id: 2, submittedBy: "Rahul Verma", location: "Sports Complex", species: "Gulmohar", time: "3 hours ago" },
    { id: 3, submittedBy: "Sneha Patel", location: "Library Lawn", species: "Neem", time: "5 hours ago" },
]

export default function AdminDashboardPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Control Panel</h1>
                    <p className="mt-1 text-muted-foreground">Manage campus-wide sustainability system settings and users</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Data
                    </Button>
                    <Button className="gap-2">
                        <Settings className="h-4 w-4" />
                        System Settings
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {userStats.map((stat) => (
                    <Card key={stat.label} className="border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <span className={stat.growth.startsWith('+') ? "text-primary" : "text-destructive"}>
                                    {stat.growth}
                                </span>{" "}
                                since last week
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="moderation">Moderation</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Users Tab */}
                <TabsContent value="users" className="mt-6">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle className="text-foreground">User Management</CardTitle>
                                    <CardDescription>Manage user roles and permissions</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="search"
                                            placeholder="Search users..."
                                            className="h-9 w-[150px] rounded-md border border-input bg-background px-9 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-[250px]"
                                        />
                                    </div>
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.role === "Admin" ? "default" : user.role === "Moderator" ? "secondary" : "outline"}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-primary" : "bg-muted-foreground"}`} />
                                                    <span className="text-sm">{user.status}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{user.joined}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Moderation Tab */}
                <TabsContent value="moderation" className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Tree Approvals</CardTitle>
                                <CardDescription>Review new tree submissions from users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {pendingTrees.map((tree) => (
                                        <div key={tree.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{tree.species} in {tree.location}</span>
                                                <span className="text-xs text-muted-foreground">By {tree.submittedBy} • {tree.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="outline" className="h-8">Review</Button>
                                                <Button size="sm" className="h-8">Approve</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Flagged Issues</CardTitle>
                                <CardDescription>Review items reported by the community</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground">All Clear!</h3>
                                <p className="text-sm text-muted-foreground mt-1">No flagged items require attention at this time.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="mt-6">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-foreground">System Analytics</CardTitle>
                            <CardDescription>Overview of platform growth and engagement</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center border-t border-border mt-4">
                            <div className="text-center">
                                <Activity className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
                                <p className="text-muted-foreground">Advanced analytics visualization would appear here.</p>
                                <Button variant="link" className="mt-2">View Full Analytics Report <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="mt-6">
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-foreground">System Settings</CardTitle>
                            <CardDescription>Configure platform behaviors and integrations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">AI Configuration</h3>
                                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Auto-moderation</span>
                                        <span className="text-xs text-muted-foreground">Use AI to automatically flag inappropriate content</span>
                                    </div>
                                    <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="font-medium">Gemini Model</span>
                                        <span className="text-xs text-muted-foreground">Select AI model for tree health analysis</span>
                                    </div>
                                    <Badge variant="secondary">Gemini 1.5 Pro</Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">System Health</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg border border-border bg-secondary/30">
                                        <div className="text-xs text-muted-foreground mb-1">Database</div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="font-medium">Connected</span>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-border bg-secondary/30">
                                        <div className="text-xs text-muted-foreground mb-1">API Status</div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span className="font-medium">Operational</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border flex justify-end gap-3">
                                <Button variant="outline">Reset Defaults</Button>
                                <Button>Save Configuration</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
