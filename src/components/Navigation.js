import React, { useEffect, useState } from 'react';
import Link from 'next/link'

const Navigation = () => {

    return(
        <div className="navigationBar">
            <Link href={'/'} as={'/'}>Cats</Link>
            <Link href={'/favorites'} as={'/favorites'}>Favorites</Link>
        </div>
    )
  }

  export default Navigation;