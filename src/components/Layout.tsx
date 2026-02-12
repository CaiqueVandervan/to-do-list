import React from "react"
import Image from "next/image"

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="h-screen bg-gradient-to-t from-[#0f0c29] via-[#302b63] to-[#4e54c8] grid grid-rows-3">
            <div className="flex items-start justify-center mt-10">
                <Image
                    src="/images/logo.svg"
                    width={400}
                    height={400}
                    alt="todolist_logo"
                />
            </div>
            <div className="flex items-center justify-center">
                {children}
            </div>

        </main>
    )
}
export default Layout