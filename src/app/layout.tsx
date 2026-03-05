import type { Metadata } from 'next'
import { Inter, Anton } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
// Using Anton for the massive, distressed architectural font feel
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })

export const metadata: Metadata = {
    title: 'SHAN PUTHA | SUPER UI',
    description: 'Digital Experience of Shan Putha (SPMP Magampura). Developed by VZiP DEVELOGENZ.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${anton.variable} font-sans bg-spBlack text-white antialiased`}>
                <CustomCursor />
                {children}
            </body>
        </html>
    )
}
