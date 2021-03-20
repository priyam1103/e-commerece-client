import React from 'react'
import Link from 'next/link'
export default function HomeBanner() {
    return (
        <div className="homebanner">
            <Link href="/products/mobiles"><p>
            Buy Mobile Phones
            </p></Link>
            
        </div>
    )
}
