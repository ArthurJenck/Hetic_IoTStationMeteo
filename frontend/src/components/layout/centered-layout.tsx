type CenteredLayoutProps = {
    children: React.ReactNode;
};

export function CenteredLayout({ children }: CenteredLayoutProps) {
    return (
        <div className="min-h-screen grid place-items-center">
            {children}
        </div>
    );
}