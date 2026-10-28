import type { Metadata } from 'next';
export const metadata: Metadata = { title:'AiDo — Imagine it. Make it happen.', description:'Upload your space, visualise a change with AI, and plan your next home project.', icons:{icon:'/favicon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="stylesheet" href="/style.css"/></head><body>{children}</body></html>}
