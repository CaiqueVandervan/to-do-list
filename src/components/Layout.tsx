import React from "react"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="w-full h-screen bg-gradient-to-t from-[#0f0c29] via-[#302b63] to-[#4e54c8] flex justify-center items-center">
            <div>{children}</div>
        </main>
    )
}
export default Layout