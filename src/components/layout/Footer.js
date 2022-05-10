import React from 'react'

const Footer = () => {
    return (
        <div className='footer'>
            &copy; {new Date().getFullYear()} ReactApp |
            {/* Made with ♥ by{" "} */}
            {""} All rights reserved | Powered by {""}
            <a
                href="https://www.google.com" target="_blank" rel="noopener noreferrer"
                style={{ cursor: "pointer" }} title="Visit The Site"
            >
                Lokinder007
            </a>
        </div>
    )
}

export default Footer