type AppLayoutProps = {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
            <div className="mx-auto max-w-2xl space-y-6">
                {children}
            </div>
        </main>
    )
}